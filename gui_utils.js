function processImage(img) {
	var parentDOM = document.getElementById('fileDisplayArea');
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
										}
	);
}

function findAirLight() {
	var canvas = document.getElementById('originalPic');
	var startTime = new Date();
	window.colorArray = makeColorArray(canvas);
	var quantStruct = new QuantKDTree(colorArray.slice(0), 1000);
	var endTime = new Date();
	console.log("Finished quantization in " + (endTime - startTime)/1000 + " secs.");

	startTime = new Date();
	var minEst = new Number(document.getElementById('minAirSlide').value);
	var maxEst = new Number(document.getElementById('maxAirSlide').value);
	window.airLight = estimateAirLight(
		window.colorArray, quantStruct, minEst, maxEst);
	endTime = new Date();
	console.log("Finished air light in " + (endTime - startTime)/1000 + " secs.");

	//Update Color
	var airLightPreview = document.getElementById('airLightPreview');
	var airLightRGB = window.airLight.map(d => Math.round(d*255));
	var airLightString = 'rgb(' + airLightRGB[0] + ',' + airLightRGB[1] + ',' + airLightRGB[2] + ')';
	airLightPreview.style.backgroundColor = airLightString;
}

function findAndDrawResults() {
	var canvas = document.getElementById('originalPic');
	var startTime = new Date();
	window.transmittance = transmittanceMap(canvas, window.airLight);
	var endTime = new Date();
	console.log("Finished transmittance map in " + (endTime - startTime)/1000 + " secs.");

	var transCanvas = document.getElementById('transmittanceResultsPic');
	drawTransmittance(transCanvas, window.transmittance, canvas.width, canvas.height);

	var dehazePreview = document.getElementById('dehazeResult');
	drawDehazed(canvas, dehazePreview, window.transmittance, window.airLight);
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
	var colorArray = makeColorArray(canvas);
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

function quantizeImage(canvas, colorNo) {
	var colorArray = makeColorArray(canvas);
	var q = new QuantKDTree(colorArray, colorNo);
	
	var parentDOM = document.getElementById('fileDisplayArea');
	var canvas2 = document.createElement('canvas');
	var context2 = canvas2.getContext('2d');
	q.quantizeImage(canvas, canvas2);

	canvas2.style.paddingLeft = 2;
	parentDOM.appendChild(canvas2);

	return q;
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
	var transmittance = transmittanceMap(window.origNonResize, window.airLight);
	var endTime = new Date();
	console.log("Finished transmittance map in " + (endTime - startTime)/1000 + " secs.");

	var finalCanvas = document.createElement('canvas');
	drawDehazed(window.origNonResize, finalCanvas, transmittance, window.airLight);
	var img = finalCanvas.toDataURL('image/png');
	var db = document.getElementById('downloadLink');
	db.href = img;
	db.download = "dehazed.png";
}