var Hermite_class = require('./Hermite-resize/dist/hermite.npm.js');

var utils = require('./utils.js');
var cloneCanvas = utils.cloneCanvas;
var work = require('webworkify');

function processImage(img) {
	var gamma = new Number(document.getElementById('gammaSlide').value);
	var canvas = document.getElementById('originalPic');
	var context = canvas.getContext('2d');
	canvas.width = img.width;
	canvas.height = img.height;
	context.drawImage(img, 0, 0);

	window.origNonResize = cloneCanvas(canvas);

	var ratio = 1, maxsize = 600;
	if(img.width > maxsize) {
		ratio = maxsize / img.width;
	}
	if(img.height*ratio > maxsize) {
		ratio = maxsize / img.height;
	}
	var resizer = new Hermite_class();
	resizer.resample(canvas,
					Math.round(img.width*ratio),
					Math.round(img.height*ratio),
					true,
					function() { 
						window.origCanvas = cloneCanvas(canvas);
						changeGamma(window.origCanvas, canvas, gamma);
						canvas.style.visibility = "visible";
					}
	);
}

function dehazePreview() {
	var startTime = new Date();
	var canvas = document.getElementById('originalPic');
	var minEst = new Number(document.getElementById('minAirSlide').value);
	var maxEst = new Number(document.getElementById('maxAirSlide').value);
	var context = canvas.getContext('2d');
	var colorArrayFlat = context.getImageData(
			0, 0, canvas.width, canvas.height).data.slice(0);
	var picWidth = canvas.width;
	var picHeight = canvas.height;

	//Set loading screen
	var statusText = document.getElementById("statusUpdate");
	var loadingElems = Array.from(document.getElementsByClassName('loading'));
	loadingElems.forEach(e => e.style.visibility = 'visible');
	
	var worker = work(require('../workers/dehazer_worker.js'));
	worker.onmessage = function(e) {
		if(e.data.signal === "finish") {
			window.airLight = e.data.airLight;
			var airLightPreview = document.getElementById('airLightPreview');
			var airLightRGB = window.airLight.map(d => Math.round(d*255));
			var airLightString = 'rgb(' + airLightRGB[0] + ',' + airLightRGB[1] + ',' + airLightRGB[2] + ')';
			airLightPreview.style.backgroundColor = airLightString;

			window.transmittance = e.data.transmittance;
			var endTime = new Date();
			console.log("Finished transmittance map in " + (endTime - startTime)/1000 + " secs.");
			statusText.innerHTML = "Post processing…";
			var transCanvas = document.getElementById('transmittanceResultsPic');
			drawTransmittance(transCanvas, window.transmittance, canvas.width, canvas.height);
			var dehazePreview = document.getElementById('dehazeResult');
			drawDehazed(canvas, dehazePreview, window.transmittance, window.airLight);

			loadingElems.forEach(e => e.style.visibility = 'hidden');
			document.getElementById("transmittanceDiv").style.visibility = "visible";
		} else {
			statusText.innerHTML = e.data.signal;
		}
	}
	worker.postMessage({
		image: colorArrayFlat,
		clusters: 500,
		minEst: minEst,
		maxEst: maxEst,
		picWidth: picWidth,
		picHeight: picHeight
	}, [colorArrayFlat.buffer]);
}

function findAirLight() {
	var canvas = document.getElementById('originalPic');
	var minEst = new Number(document.getElementById('minAirSlide').value);
	var maxEst = new Number(document.getElementById('maxAirSlide').value);
	var context = canvas.getContext('2d');
	var colorArrayFlat = context.getImageData(
			0, 0, canvas.width, canvas.height).data.slice(0);
	
	var worker = work(require('../workers/kdtree_worker.js'));
	worker.onmessage = function(e) {
		window.airLight = e.data;
		var airLightPreview = document.getElementById('airLightPreview');
		var airLightRGB = e.data.map(d => Math.round(d*255));
		var airLightString = 'rgb(' + airLightRGB[0] + ',' + airLightRGB[1] + ',' + airLightRGB[2] + ')';
		airLightPreview.style.backgroundColor = airLightString;
	}
	worker.postMessage({image: colorArrayFlat, clusters: 500, minEst: minEst, maxEst: maxEst}, [colorArrayFlat.buffer]);
}

function findAndDrawResults() {
	var canvas = document.getElementById('originalPic');
	var context = canvas.getContext('2d');
	var picWidth = canvas.width,
		  picHeight = canvas.height;
	var colorArray = context.getImageData(0, 0, picWidth, picHeight).data;
	var startTime = new Date();
	var worker = work(require('../workers/transmittance_worker.js'));
	worker.onmessage = function(e) {
		window.transmittance = e.data;
		var endTime = new Date();
		console.log("Finished transmittance map in " + (endTime - startTime)/1000 + " secs.");
		var transCanvas = document.getElementById('transmittanceResultsPic');
		drawTransmittance(transCanvas, window.transmittance, canvas.width, canvas.height);
		var dehazePreview = document.getElementById('dehazeResult');
		drawDehazed(canvas, dehazePreview, window.transmittance, window.airLight);
	}
	worker.postMessage({
		colorArray: colorArray,
		picWidth: picWidth,
		picHeight: picHeight,
		airLight: window.airLight
	}, [colorArray.buffer]);
}

function drawDehazed(canvas, destCanvas, transmittance, airLight) {
	var dehazeAmount = new Number(
		document.getElementById("hazeAmountSlide").value
	);
	var distance = new Number(
		document.getElementById("distSlide").value
	);
	var gamma = new Number(
		document.getElementById("gammaOutSlide").value
	);
	var fac = Math.pow(2, distance);

	window.dehazeFlat = hazeArray(canvas, transmittance, airLight, fac);
	mixHaze(window.dehazeFlat, canvas.width, canvas.height,
					destCanvas, transmittance, airLight, dehazeAmount);
	window.dehazedCanvas = cloneCanvas(destCanvas);
	changeGamma(window.dehazedCanvas, destCanvas, 1/gamma);
}

function hazeArray(canvas, transmittance, airLight, fac) {
	var colorFlat = canvas.getContext('2d').getImageData(0, 0, canvas.width, canvas.height).data;
	var dehazeFlat = new Uint8ClampedArray(4*transmittance.length).fill(255);
	transmittance.forEach((t,i) => {
		var tp = t*fac;
		dehazeFlat[4*i] = (colorFlat[4*i] - (1-tp)*airLight[0]*255) / (tp+1e-4);
		dehazeFlat[4*i + 1] = (colorFlat[4*i + 1] - (1-tp)*airLight[1]*255) / (tp+1e-4);
		dehazeFlat[4*i + 2] = (colorFlat[4*i + 2] - (1-tp)*airLight[2]*255) / (tp+1e-4);
	});
	return dehazeFlat;
}

function mixHaze(origData, width, height, destCanvas,
									transmittance, airLight, mixVal) {
	var destData = new Uint8ClampedArray(origData.length).fill(255);
	for(var i = 0; i < transmittance.length; i++) {
		var tp = Math.pow(transmittance[i], mixVal);
		destData[4*i] = tp*origData[4*i] + (1-tp)*airLight[0]*255;
		destData[4*i+1] = tp*origData[4*i+1] + (1-tp)*airLight[1]*255;
		destData[4*i+2] = tp*origData[4*i+2] + (1-tp)*airLight[2]*255;
	}
	destCanvas.width = width;
	destCanvas.height = height;
	var destContext = destCanvas.getContext('2d');
	var imageData = destContext.createImageData(width, height);
	imageData.data.set(destData);
	destContext.putImageData(imageData, 0, 0);
}


function drawTransmittance(canvas, transmittance, width, height) {
	var context = canvas.getContext('2d');

	var transFlat = new Uint8ClampedArray(transmittance.length*4);
	transmittance.forEach((d, i) => {
		transFlat[i*4] = d*255;
		transFlat[i*4 + 1] = d*255;
		transFlat[i*4 + 2] = d*255;
		transFlat[i*4 + 3] = 255;
	});
	canvas.width = width;
	canvas.height = height;
	var imageData = context.createImageData(canvas.width, canvas.height);
	imageData.data.set(transFlat);
	context.putImageData(imageData, 0, 0);
}

function sliderChange(slider, target) {
	target.innerHTML = slider.value;
}

function changeGamma(origCanvas, canvas, gamma) {
	var context = canvas.getContext('2d');
	var origData = origCanvas.getContext('2d')
	.getImageData(0, 0, canvas.width, canvas.height).data;
	var destData = new Uint8ClampedArray(origData.length).fill(255);
	for(var i = 0; i < origData.length; i += 4) {
		destData[i] = Math.pow(origData[i]/255, gamma)*255;
		destData[i+1] = Math.pow(origData[i+1]/255, gamma)*255;
		destData[i+2] = Math.pow(origData[i+2]/255, gamma)*255;
	}
	var imageData = context.createImageData(canvas.width, canvas.height);
	imageData.data.set(destData);
	context.putImageData(imageData, 0, 0);
}

function calculateOriginal() {
	var gamma = document.getElementById('gammaSlide').value;
	changeGamma(window.origNonResize, window.origNonResize, gamma);
	var startTime = new Date();
	var context = window.origNonResize.getContext('2d');
	var picWidth = window.origNonResize.width,
		  picHeight = window.origNonResize.height;
	var colorArray = context.getImageData(0, 0, picWidth, picHeight).data;

	var statusText = document.getElementById("statusUpdate");
	var loadingElems = Array.from(document.getElementsByClassName('loading'));
	loadingElems.forEach(e => e.style.visibility = 'visible');

	var worker = work(require('../workers/transmittance_worker.js'));
	worker.onmessage = function(e) {
		if(e.data.signal === "finish") {
			var transmittance = e.data.transmittance;
			var endTime = new Date();
			console.log("Finished transmittance map in " + (endTime - startTime)/1000 + " secs.");

			var finalCanvas = document.createElement('canvas');
			drawDehazed(window.origNonResize, finalCanvas, transmittance, window.airLight);

			console.log(finalCanvas.width);
			var db = document.getElementById('downloadLink');
			finalCanvas.toBlob(function(blob) {
				db.href = URL.createObjectURL(blob);
			});
			var revokeURL = function() {
				requestAnimationFrame(function() {
					URL.revokeObjectURL(this.href);
					this.href = null;
				});
				this.removeEventListener('click', revokeURL);
			};
			db.addEventListener('click', revokeURL);
			db.download = "dehazed.png";
			loadingElems.forEach(e => e.style.visibility = 'hidden');
			document.getElementById("transmittanceDiv").style.visibility = "visible";
		} else {
			statusText.innerHTML = e.data.signal;
		}
	}
	worker.postMessage({
		colorArray: colorArray,
		picWidth: picWidth,
		picHeight: picHeight,
		airLight: window.airLight
	}, [colorArray.buffer]);
}

module.exports.processImage = processImage;
module.exports.sliderChange = sliderChange;
module.exports.changeGamma = changeGamma;
module.exports.dehazePreview = dehazePreview;
module.exports.findAirLight = findAirLight;
module.exports.findAndDrawResults = findAndDrawResults;
module.exports.drawDehazed = drawDehazed;
module.exports.mixHaze = mixHaze;
module.exports.calculateOriginal = calculateOriginal;