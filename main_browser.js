(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
/**
 * hermite-resize - Canvas image resize/resample using Hermite filter with JavaScript.
 * @version v2.2.4
 * @link https://github.com/viliusle/miniPaint
 * @license MIT
 */
function Hermite_class(){var t,a,e=[];this.init=void(t=navigator.hardwareConcurrency||4),this.getCores=function(){return t},this.resample_auto=function(t,a,e,r,i){var h=this.getCores();window.Worker&&h>1?this.resample(t,a,e,r,i):(this.resample_single(t,a,e,!0),void 0!=i&&i())},this.resize_image=function(t,a,e,r,i){var h=document.getElementById(t),o=document.createElement("canvas");if(o.width=h.width,o.height=h.height,o.getContext("2d").drawImage(h,0,0),void 0==a&&void 0==e&&void 0!=r&&(a=h.width/100*r,e=h.height/100*r),void 0==e){var n=h.width/a;e=h.height/n}a=Math.round(a),e=Math.round(e);var s=function(){var t=o.toDataURL();h.width=a,h.height=e,h.src=t,t=null,o=null};void 0==i||1==i?this.resample(o,a,e,!0,s):(this.resample_single(o,a,e,!0),s())},this.resample=function(r,i,h,o,n){var s=r.width,d=r.height;i=Math.round(i);var c=d/(h=Math.round(h));if(e.length>0)for(u=0;u<t;u++)void 0!=e[u]&&(e[u].terminate(),delete e[u]);e=new Array(t);for(var g=r.getContext("2d"),v=[],l=2*Math.ceil(d/t/2),f=-1,u=0;u<t;u++){var M=f+1;if(!(M>=d)){f=M+l-1,f=Math.min(f,d-1);var m=l;m=Math.min(l,d-M),v[u]={},v[u].source=g.getImageData(0,M,s,l),v[u].target=!0,v[u].start_y=Math.ceil(M/c),v[u].height=m}}!0===o?(r.width=i,r.height=h):g.clearRect(0,0,s,d);for(var w=0,u=0;u<t;u++)if(void 0!=v[u].target){w++;var p=new Worker(a);e[u]=p,p.onmessage=function(t){w--;var a=t.data.core;e[a].terminate(),delete e[a];var r=Math.ceil(v[a].height/c);v[a].target=g.createImageData(i,r),v[a].target.data.set(t.data.target),g.putImageData(v[a].target,0,v[a].start_y),w<=0&&void 0!=n&&n()};var _={width_source:s,height_source:v[u].height,width:i,height:Math.ceil(v[u].height/c),core:u,source:v[u].source.data.buffer};p.postMessage(_,[_.source])}},a=window.URL.createObjectURL(new Blob(["(",function(){onmessage=function(t){for(var a=t.data.core,e=t.data.width_source,r=t.data.height_source,i=t.data.width,h=t.data.height,o=e/i,n=r/h,s=Math.ceil(o/2),d=Math.ceil(n/2),c=new Uint8ClampedArray(t.data.source),g=(c.length,i*h*4),v=new ArrayBuffer(g),l=new Uint8ClampedArray(v,0,g),f=0;f<h;f++)for(var u=0;u<i;u++){var M=4*(u+f*i),m=0,w=0,p=0,_=0,y=0,b=0,C=0,I=f*n,D=Math.floor(u*o),R=Math.ceil((u+1)*o),U=Math.floor(f*n),A=Math.ceil((f+1)*n);R=Math.min(R,e),A=Math.min(A,r);for(var x=U;x<A;x++)for(var B=Math.abs(I-x)/d,L=u*o,j=B*B,k=D;k<R;k++){var q=Math.abs(L-k)/s,E=Math.sqrt(j+q*q);if(!(E>=1)){var W=4*(k+x*e);C+=(m=2*E*E*E-3*E*E+1)*c[W+3],p+=m,c[W+3]<255&&(m=m*c[W+3]/250),_+=m*c[W],y+=m*c[W+1],b+=m*c[W+2],w+=m}}l[M]=_/w,l[M+1]=y/w,l[M+2]=b/w,l[M+3]=C/p}var z={core:a,target:l};postMessage(z,[l.buffer])}}.toString(),")()"],{type:"application/javascript"})),this.resample_single=function(t,a,e,r){for(var i=t.width,h=t.height,o=i/(a=Math.round(a)),n=h/(e=Math.round(e)),s=Math.ceil(o/2),d=Math.ceil(n/2),c=t.getContext("2d"),g=c.getImageData(0,0,i,h),v=c.createImageData(a,e),l=g.data,f=v.data,u=0;u<e;u++)for(var M=0;M<a;M++){var m=4*(M+u*a),w=0,p=0,_=0,y=0,b=0,C=0,I=0,D=u*n,R=Math.floor(M*o),U=Math.ceil((M+1)*o),A=Math.floor(u*n),x=Math.ceil((u+1)*n);U=Math.min(U,i),x=Math.min(x,h);for(var B=A;B<x;B++)for(var L=Math.abs(D-B)/d,j=M*o,k=L*L,q=R;q<U;q++){var E=Math.abs(j-q)/s,W=Math.sqrt(k+E*E);if(!(W>=1)){var z=4*(q+B*i);I+=(w=2*W*W*W-3*W*W+1)*l[z+3],_+=w,l[z+3]<255&&(w=w*l[z+3]/250),y+=w*l[z],b+=w*l[z+1],C+=w*l[z+2],p+=w}}f[m]=y/p,f[m+1]=b/p,f[m+2]=C/p,f[m+3]=I/_}!0===r?(t.width=a,t.height=e):c.clearRect(0,0,i,h),c.putImageData(v,0,0)}}
module.exports = Hermite_class;

},{}],2:[function(require,module,exports){
var utils = require('./utils.js');
var arange = utils.arange,
		linRange = utils.linRange,
		cartesian = utils.cartesian,
		range = utils.range;

function estimateAirLight(colorArray, quantStruct, minEst, maxEst) {
	var diff = maxEst - minEst;
	var step = 0;
	if(diff > 0.6) {step = 0.08;}
	else if (diff > 0.2) {step = 0.05;}
	else {step = 0.02;}
	var quantWithIds = quantStruct.quantizeID(colorArray);
	var weights = Array(quantStruct.centroids.length).fill(0);
	quantWithIds.forEach(element => {
		weights[element]++;
	});
	var weightsum = weights.reduce((a, b) => a+b);
	weights = weights.map(d => d/weightsum);

	var colors = quantStruct.centroids.map(d => d.map(e => e / 255));

	var AvalsR = arange(minEst, step, maxEst);
	var AvalsG = arange(minEst, step, maxEst);
	var AvalsB = arange(minEst, step, maxEst);

	var directions = linRange(0, 25, Math.PI/2);
	var dirTrig = directions.map((d) => [Math.cos(d), Math.sin(d)]);

	/* Vote for each two channels */
	var VotesRG = vote2D(colors, 0, 1, AvalsR, AvalsG, dirTrig, weights);
	var VotesGB = vote2D(colors, 1, 2, AvalsG, AvalsB, dirTrig, weights);
	var VotesRB = vote2D(colors, 0, 2, AvalsR, AvalsB, dirTrig, weights);

	var vote3D = Array(AvalsR.length*AvalsG.length*AvalsB.length).fill()
			.map(function(_, idx) {
				var Ri = Math.floor(idx / (AvalsG.length*AvalsB.length));
				var Gi = Math.floor(idx / AvalsB.length) % AvalsG.length;
				var Bi = idx % AvalsB.length;
				var RGi = Ri*AvalsG.length + Gi;
				var GBi = Gi*AvalsB.length + Bi;
				var RBi = Ri*AvalsB.length + Bi;
				return VotesRG[RGi]*VotesGB[GBi]*VotesRB[RBi];
			});
	var idx = (vote3D.indexOf(Math.max(...vote3D)));
	var Ri = Math.floor(idx / (AvalsG.length*AvalsB.length));
	var Gi = Math.floor(idx / AvalsB.length) % AvalsG.length;
	var Bi = idx % AvalsB.length;

	var retColor = Array(3).fill(0);
	var normWeight = 0;
	for(var i = Math.max(Ri-1, 0); i < Math.min(Ri+2, AvalsR.length); ++i) {
		for(var j = Math.max(Gi-1, 0); j < Math.min(Gi+2, AvalsG.length); ++j) {
			for(var k = Math.max(Bi-1, 0); k < Math.min(Bi+2, AvalsB.length); ++k) {
				var idx = i*AvalsG.length*AvalsB.length + j*AvalsB.length + k;
				var w = vote3D[idx];
				normWeight += w;
				retColor[0] += AvalsR[i]*w;
				retColor[1] += AvalsG[j]*w;
				retColor[2] += AvalsB[k]*w;
			}
		}
	}
	retColor = retColor.map(d => d/normWeight);
	return retColor;
}

function vote2D(colors, ch1, ch2, A1, A2, dirTrig, weights) {
	var nBins = dirTrig.length;
	var thresh = 0.01;
	var votesTotal = [];

	colors.forEach(color => {
		var A1start = A1.findIndex(p => p > color[ch1]);
		var A2start = A2.findIndex(p => p > color[ch2]);

		if (A1start < 0 || A2start < 0) return;

		var Aranges = cartesian(A1.slice(A1start), A2.slice(A2start));
		var Aidxs = cartesian(range(A1start, A1.length), range(A2start, A2.length))
								.map(d => d[0]*A2.length + d[1]);
		var votes = Array(A1.length*A2.length*nBins).fill(0);
		Aranges.forEach((Ac, idx) => {
			//Get Angle
			var xcomp = Ac[0] - color[ch1],
					ycomp = Ac[1] - color[ch2],
					dist = Math.sqrt(xcomp*xcomp + ycomp*ycomp),
					xn = xcomp / dist,
					//yn = ycomp / dist,
					angle = Math.acos(xn),
					bin = Math.round(angle/Math.PI*2 * nBins);
			if(bin == nBins) {bin--;}
			
			var voteIdx = Aidxs[idx]*nBins + bin;
			votes[voteIdx] = 1;
			var lineDist = Array(nBins).fill().map(function(_, idx2) {
				return Math.abs(
					(Ac[0] - color[ch1])*dirTrig[idx2][0]
						- (Ac[1] - color[ch2])*dirTrig[idx2][1]);
			});
			var tempVotes = Array(nBins).fill().map(function(_, idx2) {
				return (lineDist[idx2] < 2*thresh*(dist*Math.SQRT1_2 + 1))?1:0;
			});
			tempVotes.forEach((data, idx2) => {
				var voteIdx = Aidxs[idx]*nBins + idx2;
				votes[voteIdx] = data;
			});
		});
		votesTotal.push(votes);
	});

	var varCount = votesTotal.reduce((a, b) => 
		a.map((d, i) => d + b[i])  
	);
	var candFlag = varCount.map(d => d >= 2);
	var candIdx = [];
	var ind = -1;
	while((ind = candFlag.indexOf(true, ind + 1)) != -1) {
		candIdx.push(ind);
	}
	var candDecode = candIdx.map(d => [
		Math.floor(d / (A2.length*nBins)),
		Math.floor(d / nBins) % A2.length,
		d % nBins
	]);

	/* Cast vote. */
	var finalVote = Array(A1.length*A2.length*nBins).fill(0);
	var Aranges = cartesian(A1, A2);
	candIdx.forEach((param, idx) => {
		var Aidx = Math.floor(param / nBins),
				Ac = Aranges[Aidx];
		colors.forEach((color, coloridx) => {
			var xcomp = Ac[0] - color[ch1],
					ycomp = Ac[1] - color[ch2],
					dist = Math.sqrt(xcomp*xcomp + ycomp*ycomp),
					distweight = weights[coloridx]*Math.exp(5*-dist + 1);
			finalVote[param] += distweight;
		});
	});

	var returnMat = Array(A1.length*A2.length).fill()
		.map((_, idx) => finalVote.slice(idx*nBins, idx*nBins + nBins))
		.map(data => data.reduce((a, b) => a+b));
	
	var y = (returnMat.indexOf(Math.max(...returnMat)));
	return returnMat;
}

module.exports = estimateAirLight;
},{"./utils.js":20}],3:[function(require,module,exports){
var QuantKDTree = require('./min-variance-quantization');
var Hermite_class = require('./Hermite-resize/dist/hermite.npm.js');
var transmittanceMap = require('./transmittance_sci.js');
var estimateAirLight = require('./airlight.js');

var utils = require('./utils.js');
var makeColorArray = utils.makeColorArray,
		cloneCanvas = utils.cloneCanvas;

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
	//var img = finalCanvas.toDataURL('image/png');//.replace("image/png", "image/octet-stream");

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
	var clickEvent = new MouseEvent("click", {
    "view": window,
    "bubbles": true,
    "cancelable": false
	});

	db.dispatchEvent(clickEvent);
}

module.exports.processImage = processImage;
module.exports.sliderChange = sliderChange;
module.exports.changeGamma = changeGamma;
module.exports.findAirLight = findAirLight;
module.exports.findAndDrawResults = findAndDrawResults;
module.exports.drawDehazed = drawDehazed;
module.exports.mixHaze = mixHaze;
module.exports.calculateOriginal = calculateOriginal;
},{"./Hermite-resize/dist/hermite.npm.js":1,"./airlight.js":2,"./min-variance-quantization":7,"./transmittance_sci.js":19,"./utils.js":20}],4:[function(require,module,exports){
(function (global){
(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.PriorityQueue = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(_dereq_,module,exports){
var AbstractPriorityQueue, ArrayStrategy, BHeapStrategy, BinaryHeapStrategy, PriorityQueue,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

AbstractPriorityQueue = _dereq_('./PriorityQueue/AbstractPriorityQueue');

ArrayStrategy = _dereq_('./PriorityQueue/ArrayStrategy');

BinaryHeapStrategy = _dereq_('./PriorityQueue/BinaryHeapStrategy');

BHeapStrategy = _dereq_('./PriorityQueue/BHeapStrategy');

PriorityQueue = (function(superClass) {
  extend(PriorityQueue, superClass);

  function PriorityQueue(options) {
    options || (options = {});
    options.strategy || (options.strategy = BinaryHeapStrategy);
    options.comparator || (options.comparator = function(a, b) {
      return (a || 0) - (b || 0);
    });
    PriorityQueue.__super__.constructor.call(this, options);
  }

  return PriorityQueue;

})(AbstractPriorityQueue);

PriorityQueue.ArrayStrategy = ArrayStrategy;

PriorityQueue.BinaryHeapStrategy = BinaryHeapStrategy;

PriorityQueue.BHeapStrategy = BHeapStrategy;

module.exports = PriorityQueue;


},{"./PriorityQueue/AbstractPriorityQueue":2,"./PriorityQueue/ArrayStrategy":3,"./PriorityQueue/BHeapStrategy":4,"./PriorityQueue/BinaryHeapStrategy":5}],2:[function(_dereq_,module,exports){
var AbstractPriorityQueue;

module.exports = AbstractPriorityQueue = (function() {
  function AbstractPriorityQueue(options) {
    var ref;
    if ((options != null ? options.strategy : void 0) == null) {
      throw 'Must pass options.strategy, a strategy';
    }
    if ((options != null ? options.comparator : void 0) == null) {
      throw 'Must pass options.comparator, a comparator';
    }
    this.priv = new options.strategy(options);
    this.length = (options != null ? (ref = options.initialValues) != null ? ref.length : void 0 : void 0) || 0;
  }

  AbstractPriorityQueue.prototype.queue = function(value) {
    this.length++;
    this.priv.queue(value);
    return void 0;
  };

  AbstractPriorityQueue.prototype.dequeue = function(value) {
    if (!this.length) {
      throw 'Empty queue';
    }
    this.length--;
    return this.priv.dequeue();
  };

  AbstractPriorityQueue.prototype.peek = function(value) {
    if (!this.length) {
      throw 'Empty queue';
    }
    return this.priv.peek();
  };

  AbstractPriorityQueue.prototype.clear = function() {
    this.length = 0;
    return this.priv.clear();
  };

  return AbstractPriorityQueue;

})();


},{}],3:[function(_dereq_,module,exports){
var ArrayStrategy, binarySearchForIndexReversed;

binarySearchForIndexReversed = function(array, value, comparator) {
  var high, low, mid;
  low = 0;
  high = array.length;
  while (low < high) {
    mid = (low + high) >>> 1;
    if (comparator(array[mid], value) >= 0) {
      low = mid + 1;
    } else {
      high = mid;
    }
  }
  return low;
};

module.exports = ArrayStrategy = (function() {
  function ArrayStrategy(options) {
    var ref;
    this.options = options;
    this.comparator = this.options.comparator;
    this.data = ((ref = this.options.initialValues) != null ? ref.slice(0) : void 0) || [];
    this.data.sort(this.comparator).reverse();
  }

  ArrayStrategy.prototype.queue = function(value) {
    var pos;
    pos = binarySearchForIndexReversed(this.data, value, this.comparator);
    this.data.splice(pos, 0, value);
    return void 0;
  };

  ArrayStrategy.prototype.dequeue = function() {
    return this.data.pop();
  };

  ArrayStrategy.prototype.peek = function() {
    return this.data[this.data.length - 1];
  };

  ArrayStrategy.prototype.clear = function() {
    this.data.length = 0;
    return void 0;
  };

  return ArrayStrategy;

})();


},{}],4:[function(_dereq_,module,exports){
var BHeapStrategy;

module.exports = BHeapStrategy = (function() {
  function BHeapStrategy(options) {
    var arr, i, j, k, len, ref, ref1, shift, value;
    this.comparator = (options != null ? options.comparator : void 0) || function(a, b) {
      return a - b;
    };
    this.pageSize = (options != null ? options.pageSize : void 0) || 512;
    this.length = 0;
    shift = 0;
    while ((1 << shift) < this.pageSize) {
      shift += 1;
    }
    if (1 << shift !== this.pageSize) {
      throw 'pageSize must be a power of two';
    }
    this._shift = shift;
    this._emptyMemoryPageTemplate = arr = [];
    for (i = j = 0, ref = this.pageSize; 0 <= ref ? j < ref : j > ref; i = 0 <= ref ? ++j : --j) {
      arr.push(null);
    }
    this._memory = [];
    this._mask = this.pageSize - 1;
    if (options.initialValues) {
      ref1 = options.initialValues;
      for (k = 0, len = ref1.length; k < len; k++) {
        value = ref1[k];
        this.queue(value);
      }
    }
  }

  BHeapStrategy.prototype.queue = function(value) {
    this.length += 1;
    this._write(this.length, value);
    this._bubbleUp(this.length, value);
    return void 0;
  };

  BHeapStrategy.prototype.dequeue = function() {
    var ret, val;
    ret = this._read(1);
    val = this._read(this.length);
    this.length -= 1;
    if (this.length > 0) {
      this._write(1, val);
      this._bubbleDown(1, val);
    }
    return ret;
  };

  BHeapStrategy.prototype.peek = function() {
    return this._read(1);
  };

  BHeapStrategy.prototype.clear = function() {
    this.length = 0;
    this._memory.length = 0;
    return void 0;
  };

  BHeapStrategy.prototype._write = function(index, value) {
    var page;
    page = index >> this._shift;
    while (page >= this._memory.length) {
      this._memory.push(this._emptyMemoryPageTemplate.slice(0));
    }
    return this._memory[page][index & this._mask] = value;
  };

  BHeapStrategy.prototype._read = function(index) {
    return this._memory[index >> this._shift][index & this._mask];
  };

  BHeapStrategy.prototype._bubbleUp = function(index, value) {
    var compare, indexInPage, parentIndex, parentValue;
    compare = this.comparator;
    while (index > 1) {
      indexInPage = index & this._mask;
      if (index < this.pageSize || indexInPage > 3) {
        parentIndex = (index & ~this._mask) | (indexInPage >> 1);
      } else if (indexInPage < 2) {
        parentIndex = (index - this.pageSize) >> this._shift;
        parentIndex += parentIndex & ~(this._mask >> 1);
        parentIndex |= this.pageSize >> 1;
      } else {
        parentIndex = index - 2;
      }
      parentValue = this._read(parentIndex);
      if (compare(parentValue, value) < 0) {
        break;
      }
      this._write(parentIndex, value);
      this._write(index, parentValue);
      index = parentIndex;
    }
    return void 0;
  };

  BHeapStrategy.prototype._bubbleDown = function(index, value) {
    var childIndex1, childIndex2, childValue1, childValue2, compare;
    compare = this.comparator;
    while (index < this.length) {
      if (index > this._mask && !(index & (this._mask - 1))) {
        childIndex1 = childIndex2 = index + 2;
      } else if (index & (this.pageSize >> 1)) {
        childIndex1 = (index & ~this._mask) >> 1;
        childIndex1 |= index & (this._mask >> 1);
        childIndex1 = (childIndex1 + 1) << this._shift;
        childIndex2 = childIndex1 + 1;
      } else {
        childIndex1 = index + (index & this._mask);
        childIndex2 = childIndex1 + 1;
      }
      if (childIndex1 !== childIndex2 && childIndex2 <= this.length) {
        childValue1 = this._read(childIndex1);
        childValue2 = this._read(childIndex2);
        if (compare(childValue1, value) < 0 && compare(childValue1, childValue2) <= 0) {
          this._write(childIndex1, value);
          this._write(index, childValue1);
          index = childIndex1;
        } else if (compare(childValue2, value) < 0) {
          this._write(childIndex2, value);
          this._write(index, childValue2);
          index = childIndex2;
        } else {
          break;
        }
      } else if (childIndex1 <= this.length) {
        childValue1 = this._read(childIndex1);
        if (compare(childValue1, value) < 0) {
          this._write(childIndex1, value);
          this._write(index, childValue1);
          index = childIndex1;
        } else {
          break;
        }
      } else {
        break;
      }
    }
    return void 0;
  };

  return BHeapStrategy;

})();


},{}],5:[function(_dereq_,module,exports){
var BinaryHeapStrategy;

module.exports = BinaryHeapStrategy = (function() {
  function BinaryHeapStrategy(options) {
    var ref;
    this.comparator = (options != null ? options.comparator : void 0) || function(a, b) {
      return a - b;
    };
    this.length = 0;
    this.data = ((ref = options.initialValues) != null ? ref.slice(0) : void 0) || [];
    this._heapify();
  }

  BinaryHeapStrategy.prototype._heapify = function() {
    var i, j, ref;
    if (this.data.length > 0) {
      for (i = j = 1, ref = this.data.length; 1 <= ref ? j < ref : j > ref; i = 1 <= ref ? ++j : --j) {
        this._bubbleUp(i);
      }
    }
    return void 0;
  };

  BinaryHeapStrategy.prototype.queue = function(value) {
    this.data.push(value);
    this._bubbleUp(this.data.length - 1);
    return void 0;
  };

  BinaryHeapStrategy.prototype.dequeue = function() {
    var last, ret;
    ret = this.data[0];
    last = this.data.pop();
    if (this.data.length > 0) {
      this.data[0] = last;
      this._bubbleDown(0);
    }
    return ret;
  };

  BinaryHeapStrategy.prototype.peek = function() {
    return this.data[0];
  };

  BinaryHeapStrategy.prototype.clear = function() {
    this.length = 0;
    this.data.length = 0;
    return void 0;
  };

  BinaryHeapStrategy.prototype._bubbleUp = function(pos) {
    var parent, x;
    while (pos > 0) {
      parent = (pos - 1) >>> 1;
      if (this.comparator(this.data[pos], this.data[parent]) < 0) {
        x = this.data[parent];
        this.data[parent] = this.data[pos];
        this.data[pos] = x;
        pos = parent;
      } else {
        break;
      }
    }
    return void 0;
  };

  BinaryHeapStrategy.prototype._bubbleDown = function(pos) {
    var last, left, minIndex, right, x;
    last = this.data.length - 1;
    while (true) {
      left = (pos << 1) + 1;
      right = left + 1;
      minIndex = pos;
      if (left <= last && this.comparator(this.data[left], this.data[minIndex]) < 0) {
        minIndex = left;
      }
      if (right <= last && this.comparator(this.data[right], this.data[minIndex]) < 0) {
        minIndex = right;
      }
      if (minIndex !== pos) {
        x = this.data[minIndex];
        this.data[minIndex] = this.data[pos];
        this.data[pos] = x;
        pos = minIndex;
      } else {
        break;
      }
    }
    return void 0;
  };

  return BinaryHeapStrategy;

})();


},{}]},{},[1])(1)
});
}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],5:[function(require,module,exports){
/**
 * k-d Tree JavaScript - V 1.01
 *
 * https://github.com/ubilabs/kd-tree-javascript
 *
 * @author Mircea Pricop <pricop@ubilabs.net>, 2012
 * @author Martin Kleppe <kleppe@ubilabs.net>, 2012
 * @author Ubilabs http://ubilabs.net, 2012
 * @license MIT License <http://www.opensource.org/licenses/mit-license.php>
 */

 (function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define(['exports'], factory);
    } else if (typeof exports === 'object') {
        factory(exports);
    } else {
        factory(root);
    }
}(this, function (exports) {
  function Node(obj, dimension, parent) {
    this.obj = obj;
    this.left = null;
    this.right = null;
    this.parent = parent;
    this.dimension = dimension;
  }

  function kdTree(points, metric, dimensions) {

    var self = this;

    function buildTree(points, depth, parent) {
      var dim = depth % dimensions.length,
        median,
        node;

      if (points.length === 0) {
        return null;
      }
      if (points.length === 1) {
        return new Node(points[0], dim, parent);
      }

      points.sort(function (a, b) {
        return a[dimensions[dim]] - b[dimensions[dim]];
      });

      median = Math.floor(points.length / 2);
      node = new Node(points[median], dim, parent);
      node.left = buildTree(points.slice(0, median), depth + 1, node);
      node.right = buildTree(points.slice(median + 1), depth + 1, node);

      return node;
    }

    // Reloads a serialied tree
    function loadTree (data) {
      // Just need to restore the `parent` parameter
      self.root = data;

      function restoreParent (root) {
        if (root.left) {
          root.left.parent = root;
          restoreParent(root.left);
        }

        if (root.right) {
          root.right.parent = root;
          restoreParent(root.right);
        }
      }

      restoreParent(self.root);
    }

    // If points is not an array, assume we're loading a pre-built tree
    if (!Array.isArray(points)) loadTree(points, metric, dimensions);
    else this.root = buildTree(points, 0, null);

    // Convert to a JSON serializable structure; this just requires removing
    // the `parent` property
    this.toJSON = function (src) {
      if (!src) src = this.root;
      var dest = new Node(src.obj, src.dimension, null);
      if (src.left) dest.left = self.toJSON(src.left);
      if (src.right) dest.right = self.toJSON(src.right);
      return dest;
    };

    this.insert = function (point) {
      function innerSearch(node, parent) {

        if (node === null) {
          return parent;
        }

        var dimension = dimensions[node.dimension];
        if (point[dimension] < node.obj[dimension]) {
          return innerSearch(node.left, node);
        } else {
          return innerSearch(node.right, node);
        }
      }

      var insertPosition = innerSearch(this.root, null),
        newNode,
        dimension;

      if (insertPosition === null) {
        this.root = new Node(point, 0, null);
        return;
      }

      newNode = new Node(point, (insertPosition.dimension + 1) % dimensions.length, insertPosition);
      dimension = dimensions[insertPosition.dimension];

      if (point[dimension] < insertPosition.obj[dimension]) {
        insertPosition.left = newNode;
      } else {
        insertPosition.right = newNode;
      }
    };

    this.remove = function (point) {
      var node;

      function nodeSearch(node) {
        if (node === null) {
          return null;
        }

        if (node.obj === point) {
          return node;
        }

        var dimension = dimensions[node.dimension];

        if (point[dimension] < node.obj[dimension]) {
          return nodeSearch(node.left, node);
        } else {
          return nodeSearch(node.right, node);
        }
      }

      function removeNode(node) {
        var nextNode,
          nextObj,
          pDimension;

        function findMin(node, dim) {
          var dimension,
            own,
            left,
            right,
            min;

          if (node === null) {
            return null;
          }

          dimension = dimensions[dim];

          if (node.dimension === dim) {
            if (node.left !== null) {
              return findMin(node.left, dim);
            }
            return node;
          }

          own = node.obj[dimension];
          left = findMin(node.left, dim);
          right = findMin(node.right, dim);
          min = node;

          if (left !== null && left.obj[dimension] < own) {
            min = left;
          }
          if (right !== null && right.obj[dimension] < min.obj[dimension]) {
            min = right;
          }
          return min;
        }

        if (node.left === null && node.right === null) {
          if (node.parent === null) {
            self.root = null;
            return;
          }

          pDimension = dimensions[node.parent.dimension];

          if (node.obj[pDimension] < node.parent.obj[pDimension]) {
            node.parent.left = null;
          } else {
            node.parent.right = null;
          }
          return;
        }

        // If the right subtree is not empty, swap with the minimum element on the
        // node's dimension. If it is empty, we swap the left and right subtrees and
        // do the same.
        if (node.right !== null) {
          nextNode = findMin(node.right, node.dimension);
          nextObj = nextNode.obj;
          removeNode(nextNode);
          node.obj = nextObj;
        } else {
          nextNode = findMin(node.left, node.dimension);
          nextObj = nextNode.obj;
          removeNode(nextNode);
          node.right = node.left;
          node.left = null;
          node.obj = nextObj;
        }

      }

      node = nodeSearch(self.root);

      if (node === null) { return; }

      removeNode(node);
    };

    this.nearest = function (point, maxNodes, maxDistance) {
      var i,
        result,
        bestNodes;

      bestNodes = new BinaryHeap(
        function (e) { return -e[1]; }
      );

      function nearestSearch(node) {
        var bestChild,
          dimension = dimensions[node.dimension],
          ownDistance = metric(point, node.obj),
          linearPoint = {},
          linearDistance,
          otherChild,
          i;

        function saveNode(node, distance) {
          bestNodes.push([node, distance]);
          if (bestNodes.size() > maxNodes) {
            bestNodes.pop();
          }
        }

        for (i = 0; i < dimensions.length; i += 1) {
          if (i === node.dimension) {
            linearPoint[dimensions[i]] = point[dimensions[i]];
          } else {
            linearPoint[dimensions[i]] = node.obj[dimensions[i]];
          }
        }

        linearDistance = metric(linearPoint, node.obj);

        if (node.right === null && node.left === null) {
          if (bestNodes.size() < maxNodes || ownDistance < bestNodes.peek()[1]) {
            saveNode(node, ownDistance);
          }
          return;
        }

        if (node.right === null) {
          bestChild = node.left;
        } else if (node.left === null) {
          bestChild = node.right;
        } else {
          if (point[dimension] < node.obj[dimension]) {
            bestChild = node.left;
          } else {
            bestChild = node.right;
          }
        }

        nearestSearch(bestChild);

        if (bestNodes.size() < maxNodes || ownDistance < bestNodes.peek()[1]) {
          saveNode(node, ownDistance);
        }

        if (bestNodes.size() < maxNodes || Math.abs(linearDistance) < bestNodes.peek()[1]) {
          if (bestChild === node.left) {
            otherChild = node.right;
          } else {
            otherChild = node.left;
          }
          if (otherChild !== null) {
            nearestSearch(otherChild);
          }
        }
      }

      if (maxDistance) {
        for (i = 0; i < maxNodes; i += 1) {
          bestNodes.push([null, maxDistance]);
        }
      }

      if(self.root)
        nearestSearch(self.root);

      result = [];

      for (i = 0; i < Math.min(maxNodes, bestNodes.content.length); i += 1) {
        if (bestNodes.content[i][0]) {
          result.push([bestNodes.content[i][0].obj, bestNodes.content[i][1]]);
        }
      }
      return result;
    };

    this.balanceFactor = function () {
      function height(node) {
        if (node === null) {
          return 0;
        }
        return Math.max(height(node.left), height(node.right)) + 1;
      }

      function count(node) {
        if (node === null) {
          return 0;
        }
        return count(node.left) + count(node.right) + 1;
      }

      return height(self.root) / (Math.log(count(self.root)) / Math.log(2));
    };
  }

  // Binary heap implementation from:
  // http://eloquentjavascript.net/appendix2.html

  function BinaryHeap(scoreFunction){
    this.content = [];
    this.scoreFunction = scoreFunction;
  }

  BinaryHeap.prototype = {
    push: function(element) {
      // Add the new element to the end of the array.
      this.content.push(element);
      // Allow it to bubble up.
      this.bubbleUp(this.content.length - 1);
    },

    pop: function() {
      // Store the first element so we can return it later.
      var result = this.content[0];
      // Get the element at the end of the array.
      var end = this.content.pop();
      // If there are any elements left, put the end element at the
      // start, and let it sink down.
      if (this.content.length > 0) {
        this.content[0] = end;
        this.sinkDown(0);
      }
      return result;
    },

    peek: function() {
      return this.content[0];
    },

    remove: function(node) {
      var len = this.content.length;
      // To remove a value, we must search through the array to find
      // it.
      for (var i = 0; i < len; i++) {
        if (this.content[i] == node) {
          // When it is found, the process seen in 'pop' is repeated
          // to fill up the hole.
          var end = this.content.pop();
          if (i != len - 1) {
            this.content[i] = end;
            if (this.scoreFunction(end) < this.scoreFunction(node))
              this.bubbleUp(i);
            else
              this.sinkDown(i);
          }
          return;
        }
      }
      throw new Error("Node not found.");
    },

    size: function() {
      return this.content.length;
    },

    bubbleUp: function(n) {
      // Fetch the element that has to be moved.
      var element = this.content[n];
      // When at 0, an element can not go up any further.
      while (n > 0) {
        // Compute the parent element's index, and fetch it.
        var parentN = Math.floor((n + 1) / 2) - 1,
            parent = this.content[parentN];
        // Swap the elements if the parent is greater.
        if (this.scoreFunction(element) < this.scoreFunction(parent)) {
          this.content[parentN] = element;
          this.content[n] = parent;
          // Update 'n' to continue at the new position.
          n = parentN;
        }
        // Found a parent that is less, no need to move it further.
        else {
          break;
        }
      }
    },

    sinkDown: function(n) {
      // Look up the target element and its score.
      var length = this.content.length,
          element = this.content[n],
          elemScore = this.scoreFunction(element);

      while(true) {
        // Compute the indices of the child elements.
        var child2N = (n + 1) * 2, child1N = child2N - 1;
        // This is used to store the new position of the element,
        // if any.
        var swap = null;
        // If the first child exists (is inside the array)...
        if (child1N < length) {
          // Look it up and compute its score.
          var child1 = this.content[child1N],
              child1Score = this.scoreFunction(child1);
          // If the score is less than our element's, we need to swap.
          if (child1Score < elemScore)
            swap = child1N;
        }
        // Do the same checks for the other child.
        if (child2N < length) {
          var child2 = this.content[child2N],
              child2Score = this.scoreFunction(child2);
          if (child2Score < (swap == null ? elemScore : child1Score)){
            swap = child2N;
          }
        }

        // If the element needs to be moved, swap it, and continue.
        if (swap != null) {
          this.content[n] = this.content[swap];
          this.content[swap] = element;
          n = swap;
        }
        // Otherwise, we are done.
        else {
          break;
        }
      }
    }
  };

  exports.kdTree = kdTree;
  exports.BinaryHeap = BinaryHeap;
}));

},{}],6:[function(require,module,exports){
var gui_utils = require('./gui_utils.js');
var processImage = gui_utils.processImage,
    sliderChange = gui_utils.sliderChange,
    changeGamma = gui_utils.changeGamma,
    findAirLight = gui_utils.findAirLight,
    findAndDrawResults = gui_utils.findAndDrawResults,
    drawDehazed = gui_utils.drawDehazed,
    mixHaze = gui_utils.mixHaze,
    calculateOriginal = gui_utils.calculateOriginal;

window.onload = function() {
	var fileInput = document.getElementById('fileInput');
	var fileDisplayArea = document.getElementById('fileDisplayArea');

	fileInput.addEventListener('change', function(e) {
		var file = fileInput.files[0];
		var imageType = /image.*/;

		if (file.type.match(imageType)) {
			var reader = new FileReader();
			reader.readAsDataURL(file);	
			reader.onload = function(e) {
				fileDisplayArea.innerHTML = "";

				var img = new Image();
				img.src = reader.result;
				img.onload = function() {
					processImage(img);
				};
			}
		} else {
			fileDisplayArea.innerHTML = "File not supported!"
		}
	});

	var gammaSlide = document.getElementById('gammaSlide'),
			gammaVal = document.getElementById('gammaVal');
	gammaSlide.addEventListener('input', function(e){
		sliderChange(this, gammaVal);
		var canvas = document.getElementById('originalPic');
		changeGamma(window.origCanvas, canvas, new Number(this.value))
	});
	gammaVal.innerHTML = gammaSlide.value;

	var minAirSlide = document.getElementById('minAirSlide'),
			minAirVal = document.getElementById('minAirVal'),
			maxAirSlide = document.getElementById('maxAirSlide'),
			maxAirVal = document.getElementById('maxAirVal');
	minAirSlide.addEventListener('input', function(e){
		if(maxAirSlide.value - 0.05 < this.value) {
			this.value = maxAirSlide.value - 0.05;
		}
		sliderChange(this, minAirVal);
	});
	minAirVal.innerHTML = minAirSlide.value;
	maxAirSlide.addEventListener('input', function(e){
		if(minAirSlide.value > this.value - 0.05) {
			this.value = new Number(minAirSlide.value) + 0.05;
		}
		sliderChange(this, maxAirVal);
	});
	maxAirVal.innerHTML = maxAirSlide.value;

	var airLightButton = document.getElementById('airLightButton');
	airLightButton.addEventListener('click', function(e){
		findAirLight();
	});
	var transmittanceButton = document.getElementById('transmittanceButton');
	transmittanceButton.addEventListener('click', function(e){
		findAndDrawResults();
	});

	var distSlide = document.getElementById('distSlide'),
	    distVal = document.getElementById('distVal'),
	    hazeAmountSlide = document.getElementById('hazeAmountSlide'),
	    hazeAmountVal = document.getElementById('hazeAmountVal'),
	    gammaOutSlide = document.getElementById('gammaOutSlide'),
			gammaOutVal = document.getElementById('gammaOutVal');

	distSlide.addEventListener('input', function(e){
		oninput=sliderChange(this, distVal);
		var canvas = document.getElementById('originalPic');
		var destCanvas = document.getElementById('dehazeResult');
		drawDehazed(canvas, destCanvas, window.transmittance, window.airLight);
	});
	distVal.innerHTML = distSlide.value;
	hazeAmountSlide.addEventListener('input', function(e){
		sliderChange(this, hazeAmountVal);
		var canvas = window.origCanvas;
		mixHaze(window.dehazeFlat, canvas.width, canvas.height,
						window.dehazedCanvas, window.transmittance, window.airLight,
						new Number(this.value));
		var gammaVal = new Number(document.getElementById('gammaOutSlide').value);
		canvas = document.getElementById('dehazeResult');
		changeGamma(window.dehazedCanvas, canvas, 1/gammaVal)
	});
	hazeAmountVal.innerHTML = hazeAmountSlide.value;
	gammaOutSlide.addEventListener('input', function(e){
		sliderChange(this, gammaOutVal);
		var canvas = document.getElementById('dehazeResult');
		changeGamma(window.dehazedCanvas, canvas, 1/new Number(this.value))
	});
	gammaOutVal.innerHTML = gammaOutSlide.value;

	var originalButton = document.getElementById("originalButton");
	originalButton.addEventListener('click', function(e){
		calculateOriginal();
	});
}

},{"./gui_utils.js":3}],7:[function(require,module,exports){
var PriorityQueue = require('./js-priority-queue/priority-queue.js');

function QuantKDTreeNode(colorArray, startIdx, endIdx, minVal, maxVal, parent) {
	this.minVal = minVal.slice(0);
	this.maxVal = maxVal.slice(0);
	
	this.startIdx = startIdx;
	this.endIdx = endIdx;
	this.splitChannel = -1; // must be integer;
	this.splitThreshold = -1;
	this.splitVariance = -1;
	this.left = -1;
	this.right = -1;
	this.parent = parent;
	this.isLeaf = true;
	this.index = -1;

	/* TODO: Find optimal split */
	for(var i = 0; i < 3; i++) {
		var histo = Array(256).fill(0);
		colorArray.slice(this.startIdx, this.endIdx).forEach(element => {
			histo[element[i]]++;
		});

		/* Find split with Otsu's Algorithm */
		var sumB = 0, wB = 0;
		var sum1 = histo.map((data, idx) => data*idx)
		                .reduce((a, b) => a+b, 0);
		var total = histo.reduce((a, b) => a+b, 0);
		for(var j = 0; j < 256; ++j) {
			wB += histo[j];
			var wF = total - wB;
			if(wB == 0 || wF == 0) {
				continue;
			}
			sumB += j*histo[j];
			var mF = (sum1 - sumB) / wF;
			var tempRat = sumB / wB - mF;
			var between = wB*wF*tempRat*tempRat;

			if(between >= this.splitVariance) {
				this.splitChannel = i;
				this.splitThreshold = j;
				this.splitVariance = between;
			}
		}
	}
} 

function QuantKDTree(colorArray, clusters) {
	//var colorArray = makeColorArray(canvas);
	var pq = new PriorityQueue({
		comparator: function(a, b) {
			return b.splitVariance - a.splitVariance;
		}
	});

	pq.queue(new QuantKDTreeNode(
		colorArray, 0, colorArray.length,
		[0, 0, 0], [255, 255, 255],
		-1)
	);

	this.kdtree = Array(2*clusters - 1);
	var idx = 0, currLeaves = 0;

	while(pq.length > 0 && currLeaves + pq.length < clusters) {
		var front = pq.dequeue();
		if(front.parent >= 0) {
			var parent = this.kdtree[front.parent];
			if (parent.minVal.every(
				(v, i) => v === front.minVal[i])) {
				parent.left = idx;
			} else {
				parent.right = idx;
			}
		}

		this.kdtree[idx] = front;

		if(front.splitChannel == -1) {
			idx++;
			currLeaves++;
			continue;
		}

		var sc = front.splitChannel, st = front.splitThreshold;

		// Split colorArray
		var colorslice = colorArray.slice(front.startIdx, front.endIdx);
		var left = colorslice.filter(color => color[sc] < st);
		var right = colorslice.filter(color => color[sc] >= st);
		var pivot = front.startIdx + left.length;
		if(pivot == front.startIdx || pivot == front.endIdx) {
			idx++;
			currLeaves++;
			continue;
		}
		var partition = left.concat(right);
		partition.forEach((data, idx) => {
			colorArray[front.startIdx + idx] = data;
		});

		var thresh = front.maxVal.slice(0);
		thresh[sc] = st;
		pq.queue(new QuantKDTreeNode(
			colorArray, front.startIdx, pivot,
			front.minVal, thresh, idx
		));
		thresh = front.minVal.slice(0);
		thresh[sc] = st+1;
		pq.queue(new QuantKDTreeNode(
			colorArray, pivot, front.endIdx,
			thresh, front.maxVal, idx
		));

		this.kdtree[idx].isLeaf = false;
		idx++;
	}
	while(pq.length > 0) {
		var front = pq.dequeue();
		if(front.parent >= 0) {
			var parent = this.kdtree[front.parent];
			if (parent.minVal.every(
				(v, i) => v === front.minVal[i])) {
				parent.left = idx;
			} else {
				parent.right = idx;
			}
		}
		this.kdtree[idx] = front;
		idx++;
	}
	var leafindex = 0;
	this.centroids = [];
	for(var i = 0; i < idx; ++i) {
		if(this.kdtree[i].isLeaf) {
			this.kdtree[i].index = leafindex;
			leafindex++;

			//Calculate centroid
			var leaf = this.kdtree[i];
			var colorslice = colorArray.slice(leaf.startIdx, leaf.endIdx);
			var elems = leaf.endIdx - leaf.startIdx;
			leaf.centroid = colorslice.reduce((a, b) => [a[0]+b[0], a[1]+b[1], a[2]+b[2]])
																.map(data => Math.round(data/elems));
			this.centroids.push(leaf.centroid);
		}
	}
}

QuantKDTree.prototype.lookupColor = function(color) {
	var currNode = this.kdtree[0];
	while(!currNode.isLeaf) {
		var chan = currNode.splitChannel;
		currNode = (color[chan] < currNode.splitThreshold)?
			        this.kdtree[currNode.left]:
			        this.kdtree[currNode.right];
	}
	return currNode.centroid.slice(0);
}

QuantKDTree.prototype.lookupID = function(color) {
	var currNode = this.kdtree[0];
	while(!currNode.isLeaf) {
		var chan = currNode.splitChannel;
		currNode = (color[chan] < currNode.splitThreshold)?
			        this.kdtree[currNode.left]:
			        this.kdtree[currNode.right];
	}
	return currNode.index;
}

QuantKDTree.prototype.quantizeImage = function(canvas, destCanvas) {
	var colorArray = makeColorArray(canvas);

	var destColorArray = colorArray.map(data => this.lookupColor(data).concat(255));
	var destFlat = new Uint8ClampedArray([].concat.apply([], destColorArray));
	
	destCanvas.width = canvas.width;
	destCanvas.height = canvas.height;
	var dContext = destCanvas.getContext("2d");
	var imageData = dContext.createImageData(canvas.width, canvas.height);
	imageData.data.set(destFlat);
	dContext.putImageData(imageData, 0, 0);
}

QuantKDTree.prototype.quantizeID = function(colorArray) {
	return colorArray.map(data => this.lookupID(data));
}

module.exports = QuantKDTree;
},{"./js-priority-queue/priority-queue.js":4}],8:[function(require,module,exports){
"use strict"

var createThunk = require("./lib/thunk.js")

function Procedure() {
  this.argTypes = []
  this.shimArgs = []
  this.arrayArgs = []
  this.arrayBlockIndices = []
  this.scalarArgs = []
  this.offsetArgs = []
  this.offsetArgIndex = []
  this.indexArgs = []
  this.shapeArgs = []
  this.funcName = ""
  this.pre = null
  this.body = null
  this.post = null
  this.debug = false
}

function compileCwise(user_args) {
  //Create procedure
  var proc = new Procedure()
  
  //Parse blocks
  proc.pre    = user_args.pre
  proc.body   = user_args.body
  proc.post   = user_args.post

  //Parse arguments
  var proc_args = user_args.args.slice(0)
  proc.argTypes = proc_args
  for(var i=0; i<proc_args.length; ++i) {
    var arg_type = proc_args[i]
    if(arg_type === "array" || (typeof arg_type === "object" && arg_type.blockIndices)) {
      proc.argTypes[i] = "array"
      proc.arrayArgs.push(i)
      proc.arrayBlockIndices.push(arg_type.blockIndices ? arg_type.blockIndices : 0)
      proc.shimArgs.push("array" + i)
      if(i < proc.pre.args.length && proc.pre.args[i].count>0) {
        throw new Error("cwise: pre() block may not reference array args")
      }
      if(i < proc.post.args.length && proc.post.args[i].count>0) {
        throw new Error("cwise: post() block may not reference array args")
      }
    } else if(arg_type === "scalar") {
      proc.scalarArgs.push(i)
      proc.shimArgs.push("scalar" + i)
    } else if(arg_type === "index") {
      proc.indexArgs.push(i)
      if(i < proc.pre.args.length && proc.pre.args[i].count > 0) {
        throw new Error("cwise: pre() block may not reference array index")
      }
      if(i < proc.body.args.length && proc.body.args[i].lvalue) {
        throw new Error("cwise: body() block may not write to array index")
      }
      if(i < proc.post.args.length && proc.post.args[i].count > 0) {
        throw new Error("cwise: post() block may not reference array index")
      }
    } else if(arg_type === "shape") {
      proc.shapeArgs.push(i)
      if(i < proc.pre.args.length && proc.pre.args[i].lvalue) {
        throw new Error("cwise: pre() block may not write to array shape")
      }
      if(i < proc.body.args.length && proc.body.args[i].lvalue) {
        throw new Error("cwise: body() block may not write to array shape")
      }
      if(i < proc.post.args.length && proc.post.args[i].lvalue) {
        throw new Error("cwise: post() block may not write to array shape")
      }
    } else if(typeof arg_type === "object" && arg_type.offset) {
      proc.argTypes[i] = "offset"
      proc.offsetArgs.push({ array: arg_type.array, offset:arg_type.offset })
      proc.offsetArgIndex.push(i)
    } else {
      throw new Error("cwise: Unknown argument type " + proc_args[i])
    }
  }
  
  //Make sure at least one array argument was specified
  if(proc.arrayArgs.length <= 0) {
    throw new Error("cwise: No array arguments specified")
  }
  
  //Make sure arguments are correct
  if(proc.pre.args.length > proc_args.length) {
    throw new Error("cwise: Too many arguments in pre() block")
  }
  if(proc.body.args.length > proc_args.length) {
    throw new Error("cwise: Too many arguments in body() block")
  }
  if(proc.post.args.length > proc_args.length) {
    throw new Error("cwise: Too many arguments in post() block")
  }

  //Check debug flag
  proc.debug = !!user_args.printCode || !!user_args.debug
  
  //Retrieve name
  proc.funcName = user_args.funcName || "cwise"
  
  //Read in block size
  proc.blockSize = user_args.blockSize || 64

  return createThunk(proc)
}

module.exports = compileCwise

},{"./lib/thunk.js":10}],9:[function(require,module,exports){
"use strict"

var uniq = require("uniq")

// This function generates very simple loops analogous to how you typically traverse arrays (the outermost loop corresponds to the slowest changing index, the innermost loop to the fastest changing index)
// TODO: If two arrays have the same strides (and offsets) there is potential for decreasing the number of "pointers" and related variables. The drawback is that the type signature would become more specific and that there would thus be less potential for caching, but it might still be worth it, especially when dealing with large numbers of arguments.
function innerFill(order, proc, body) {
  var dimension = order.length
    , nargs = proc.arrayArgs.length
    , has_index = proc.indexArgs.length>0
    , code = []
    , vars = []
    , idx=0, pidx=0, i, j
  for(i=0; i<dimension; ++i) { // Iteration variables
    vars.push(["i",i,"=0"].join(""))
  }
  //Compute scan deltas
  for(j=0; j<nargs; ++j) {
    for(i=0; i<dimension; ++i) {
      pidx = idx
      idx = order[i]
      if(i === 0) { // The innermost/fastest dimension's delta is simply its stride
        vars.push(["d",j,"s",i,"=t",j,"p",idx].join(""))
      } else { // For other dimensions the delta is basically the stride minus something which essentially "rewinds" the previous (more inner) dimension
        vars.push(["d",j,"s",i,"=(t",j,"p",idx,"-s",pidx,"*t",j,"p",pidx,")"].join(""))
      }
    }
  }
  if (vars.length > 0) {
    code.push("var " + vars.join(","))
  }  
  //Scan loop
  for(i=dimension-1; i>=0; --i) { // Start at largest stride and work your way inwards
    idx = order[i]
    code.push(["for(i",i,"=0;i",i,"<s",idx,";++i",i,"){"].join(""))
  }
  //Push body of inner loop
  code.push(body)
  //Advance scan pointers
  for(i=0; i<dimension; ++i) {
    pidx = idx
    idx = order[i]
    for(j=0; j<nargs; ++j) {
      code.push(["p",j,"+=d",j,"s",i].join(""))
    }
    if(has_index) {
      if(i > 0) {
        code.push(["index[",pidx,"]-=s",pidx].join(""))
      }
      code.push(["++index[",idx,"]"].join(""))
    }
    code.push("}")
  }
  return code.join("\n")
}

// Generate "outer" loops that loop over blocks of data, applying "inner" loops to the blocks by manipulating the local variables in such a way that the inner loop only "sees" the current block.
// TODO: If this is used, then the previous declaration (done by generateCwiseOp) of s* is essentially unnecessary.
//       I believe the s* are not used elsewhere (in particular, I don't think they're used in the pre/post parts and "shape" is defined independently), so it would be possible to make defining the s* dependent on what loop method is being used.
function outerFill(matched, order, proc, body) {
  var dimension = order.length
    , nargs = proc.arrayArgs.length
    , blockSize = proc.blockSize
    , has_index = proc.indexArgs.length > 0
    , code = []
  for(var i=0; i<nargs; ++i) {
    code.push(["var offset",i,"=p",i].join(""))
  }
  //Generate loops for unmatched dimensions
  // The order in which these dimensions are traversed is fairly arbitrary (from small stride to large stride, for the first argument)
  // TODO: It would be nice if the order in which these loops are placed would also be somehow "optimal" (at the very least we should check that it really doesn't hurt us if they're not).
  for(var i=matched; i<dimension; ++i) {
    code.push(["for(var j"+i+"=SS[", order[i], "]|0;j", i, ">0;){"].join("")) // Iterate back to front
    code.push(["if(j",i,"<",blockSize,"){"].join("")) // Either decrease j by blockSize (s = blockSize), or set it to zero (after setting s = j).
    code.push(["s",order[i],"=j",i].join(""))
    code.push(["j",i,"=0"].join(""))
    code.push(["}else{s",order[i],"=",blockSize].join(""))
    code.push(["j",i,"-=",blockSize,"}"].join(""))
    if(has_index) {
      code.push(["index[",order[i],"]=j",i].join(""))
    }
  }
  for(var i=0; i<nargs; ++i) {
    var indexStr = ["offset"+i]
    for(var j=matched; j<dimension; ++j) {
      indexStr.push(["j",j,"*t",i,"p",order[j]].join(""))
    }
    code.push(["p",i,"=(",indexStr.join("+"),")"].join(""))
  }
  code.push(innerFill(order, proc, body))
  for(var i=matched; i<dimension; ++i) {
    code.push("}")
  }
  return code.join("\n")
}

//Count the number of compatible inner orders
// This is the length of the longest common prefix of the arrays in orders.
// Each array in orders lists the dimensions of the correspond ndarray in order of increasing stride.
// This is thus the maximum number of dimensions that can be efficiently traversed by simple nested loops for all arrays.
function countMatches(orders) {
  var matched = 0, dimension = orders[0].length
  while(matched < dimension) {
    for(var j=1; j<orders.length; ++j) {
      if(orders[j][matched] !== orders[0][matched]) {
        return matched
      }
    }
    ++matched
  }
  return matched
}

//Processes a block according to the given data types
// Replaces variable names by different ones, either "local" ones (that are then ferried in and out of the given array) or ones matching the arguments that the function performing the ultimate loop will accept.
function processBlock(block, proc, dtypes) {
  var code = block.body
  var pre = []
  var post = []
  for(var i=0; i<block.args.length; ++i) {
    var carg = block.args[i]
    if(carg.count <= 0) {
      continue
    }
    var re = new RegExp(carg.name, "g")
    var ptrStr = ""
    var arrNum = proc.arrayArgs.indexOf(i)
    switch(proc.argTypes[i]) {
      case "offset":
        var offArgIndex = proc.offsetArgIndex.indexOf(i)
        var offArg = proc.offsetArgs[offArgIndex]
        arrNum = offArg.array
        ptrStr = "+q" + offArgIndex // Adds offset to the "pointer" in the array
      case "array":
        ptrStr = "p" + arrNum + ptrStr
        var localStr = "l" + i
        var arrStr = "a" + arrNum
        if (proc.arrayBlockIndices[arrNum] === 0) { // Argument to body is just a single value from this array
          if(carg.count === 1) { // Argument/array used only once(?)
            if(dtypes[arrNum] === "generic") {
              if(carg.lvalue) {
                pre.push(["var ", localStr, "=", arrStr, ".get(", ptrStr, ")"].join("")) // Is this necessary if the argument is ONLY used as an lvalue? (keep in mind that we can have a += something, so we would actually need to check carg.rvalue)
                code = code.replace(re, localStr)
                post.push([arrStr, ".set(", ptrStr, ",", localStr,")"].join(""))
              } else {
                code = code.replace(re, [arrStr, ".get(", ptrStr, ")"].join(""))
              }
            } else {
              code = code.replace(re, [arrStr, "[", ptrStr, "]"].join(""))
            }
          } else if(dtypes[arrNum] === "generic") {
            pre.push(["var ", localStr, "=", arrStr, ".get(", ptrStr, ")"].join("")) // TODO: Could we optimize by checking for carg.rvalue?
            code = code.replace(re, localStr)
            if(carg.lvalue) {
              post.push([arrStr, ".set(", ptrStr, ",", localStr,")"].join(""))
            }
          } else {
            pre.push(["var ", localStr, "=", arrStr, "[", ptrStr, "]"].join("")) // TODO: Could we optimize by checking for carg.rvalue?
            code = code.replace(re, localStr)
            if(carg.lvalue) {
              post.push([arrStr, "[", ptrStr, "]=", localStr].join(""))
            }
          }
        } else { // Argument to body is a "block"
          var reStrArr = [carg.name], ptrStrArr = [ptrStr]
          for(var j=0; j<Math.abs(proc.arrayBlockIndices[arrNum]); j++) {
            reStrArr.push("\\s*\\[([^\\]]+)\\]")
            ptrStrArr.push("$" + (j+1) + "*t" + arrNum + "b" + j) // Matched index times stride
          }
          re = new RegExp(reStrArr.join(""), "g")
          ptrStr = ptrStrArr.join("+")
          if(dtypes[arrNum] === "generic") {
            /*if(carg.lvalue) {
              pre.push(["var ", localStr, "=", arrStr, ".get(", ptrStr, ")"].join("")) // Is this necessary if the argument is ONLY used as an lvalue? (keep in mind that we can have a += something, so we would actually need to check carg.rvalue)
              code = code.replace(re, localStr)
              post.push([arrStr, ".set(", ptrStr, ",", localStr,")"].join(""))
            } else {
              code = code.replace(re, [arrStr, ".get(", ptrStr, ")"].join(""))
            }*/
            throw new Error("cwise: Generic arrays not supported in combination with blocks!")
          } else {
            // This does not produce any local variables, even if variables are used multiple times. It would be possible to do so, but it would complicate things quite a bit.
            code = code.replace(re, [arrStr, "[", ptrStr, "]"].join(""))
          }
        }
      break
      case "scalar":
        code = code.replace(re, "Y" + proc.scalarArgs.indexOf(i))
      break
      case "index":
        code = code.replace(re, "index")
      break
      case "shape":
        code = code.replace(re, "shape")
      break
    }
  }
  return [pre.join("\n"), code, post.join("\n")].join("\n").trim()
}

function typeSummary(dtypes) {
  var summary = new Array(dtypes.length)
  var allEqual = true
  for(var i=0; i<dtypes.length; ++i) {
    var t = dtypes[i]
    var digits = t.match(/\d+/)
    if(!digits) {
      digits = ""
    } else {
      digits = digits[0]
    }
    if(t.charAt(0) === 0) {
      summary[i] = "u" + t.charAt(1) + digits
    } else {
      summary[i] = t.charAt(0) + digits
    }
    if(i > 0) {
      allEqual = allEqual && summary[i] === summary[i-1]
    }
  }
  if(allEqual) {
    return summary[0]
  }
  return summary.join("")
}

//Generates a cwise operator
function generateCWiseOp(proc, typesig) {

  //Compute dimension
  // Arrays get put first in typesig, and there are two entries per array (dtype and order), so this gets the number of dimensions in the first array arg.
  var dimension = (typesig[1].length - Math.abs(proc.arrayBlockIndices[0]))|0
  var orders = new Array(proc.arrayArgs.length)
  var dtypes = new Array(proc.arrayArgs.length)
  for(var i=0; i<proc.arrayArgs.length; ++i) {
    dtypes[i] = typesig[2*i]
    orders[i] = typesig[2*i+1]
  }
  
  //Determine where block and loop indices start and end
  var blockBegin = [], blockEnd = [] // These indices are exposed as blocks
  var loopBegin = [], loopEnd = [] // These indices are iterated over
  var loopOrders = [] // orders restricted to the loop indices
  for(var i=0; i<proc.arrayArgs.length; ++i) {
    if (proc.arrayBlockIndices[i]<0) {
      loopBegin.push(0)
      loopEnd.push(dimension)
      blockBegin.push(dimension)
      blockEnd.push(dimension+proc.arrayBlockIndices[i])
    } else {
      loopBegin.push(proc.arrayBlockIndices[i]) // Non-negative
      loopEnd.push(proc.arrayBlockIndices[i]+dimension)
      blockBegin.push(0)
      blockEnd.push(proc.arrayBlockIndices[i])
    }
    var newOrder = []
    for(var j=0; j<orders[i].length; j++) {
      if (loopBegin[i]<=orders[i][j] && orders[i][j]<loopEnd[i]) {
        newOrder.push(orders[i][j]-loopBegin[i]) // If this is a loop index, put it in newOrder, subtracting loopBegin, to make sure that all loopOrders are using a common set of indices.
      }
    }
    loopOrders.push(newOrder)
  }

  //First create arguments for procedure
  var arglist = ["SS"] // SS is the overall shape over which we iterate
  var code = ["'use strict'"]
  var vars = []
  
  for(var j=0; j<dimension; ++j) {
    vars.push(["s", j, "=SS[", j, "]"].join("")) // The limits for each dimension.
  }
  for(var i=0; i<proc.arrayArgs.length; ++i) {
    arglist.push("a"+i) // Actual data array
    arglist.push("t"+i) // Strides
    arglist.push("p"+i) // Offset in the array at which the data starts (also used for iterating over the data)
    
    for(var j=0; j<dimension; ++j) { // Unpack the strides into vars for looping
      vars.push(["t",i,"p",j,"=t",i,"[",loopBegin[i]+j,"]"].join(""))
    }
    
    for(var j=0; j<Math.abs(proc.arrayBlockIndices[i]); ++j) { // Unpack the strides into vars for block iteration
      vars.push(["t",i,"b",j,"=t",i,"[",blockBegin[i]+j,"]"].join(""))
    }
  }
  for(var i=0; i<proc.scalarArgs.length; ++i) {
    arglist.push("Y" + i)
  }
  if(proc.shapeArgs.length > 0) {
    vars.push("shape=SS.slice(0)") // Makes the shape over which we iterate available to the user defined functions (so you can use width/height for example)
  }
  if(proc.indexArgs.length > 0) {
    // Prepare an array to keep track of the (logical) indices, initialized to dimension zeroes.
    var zeros = new Array(dimension)
    for(var i=0; i<dimension; ++i) {
      zeros[i] = "0"
    }
    vars.push(["index=[", zeros.join(","), "]"].join(""))
  }
  for(var i=0; i<proc.offsetArgs.length; ++i) { // Offset arguments used for stencil operations
    var off_arg = proc.offsetArgs[i]
    var init_string = []
    for(var j=0; j<off_arg.offset.length; ++j) {
      if(off_arg.offset[j] === 0) {
        continue
      } else if(off_arg.offset[j] === 1) {
        init_string.push(["t", off_arg.array, "p", j].join(""))      
      } else {
        init_string.push([off_arg.offset[j], "*t", off_arg.array, "p", j].join(""))
      }
    }
    if(init_string.length === 0) {
      vars.push("q" + i + "=0")
    } else {
      vars.push(["q", i, "=", init_string.join("+")].join(""))
    }
  }

  //Prepare this variables
  var thisVars = uniq([].concat(proc.pre.thisVars)
                      .concat(proc.body.thisVars)
                      .concat(proc.post.thisVars))
  vars = vars.concat(thisVars)
  if (vars.length > 0) {
    code.push("var " + vars.join(","))
  }
  for(var i=0; i<proc.arrayArgs.length; ++i) {
    code.push("p"+i+"|=0")
  }
  
  //Inline prelude
  if(proc.pre.body.length > 3) {
    code.push(processBlock(proc.pre, proc, dtypes))
  }

  //Process body
  var body = processBlock(proc.body, proc, dtypes)
  var matched = countMatches(loopOrders)
  if(matched < dimension) {
    code.push(outerFill(matched, loopOrders[0], proc, body)) // TODO: Rather than passing loopOrders[0], it might be interesting to look at passing an order that represents the majority of the arguments for example.
  } else {
    code.push(innerFill(loopOrders[0], proc, body))
  }

  //Inline epilog
  if(proc.post.body.length > 3) {
    code.push(processBlock(proc.post, proc, dtypes))
  }
  
  if(proc.debug) {
    console.log("-----Generated cwise routine for ", typesig, ":\n" + code.join("\n") + "\n----------")
  }
  
  var loopName = [(proc.funcName||"unnamed"), "_cwise_loop_", orders[0].join("s"),"m",matched,typeSummary(dtypes)].join("")
  var f = new Function(["function ",loopName,"(", arglist.join(","),"){", code.join("\n"),"} return ", loopName].join(""))
  return f()
}
module.exports = generateCWiseOp

},{"uniq":17}],10:[function(require,module,exports){
"use strict"

// The function below is called when constructing a cwise function object, and does the following:
// A function object is constructed which accepts as argument a compilation function and returns another function.
// It is this other function that is eventually returned by createThunk, and this function is the one that actually
// checks whether a certain pattern of arguments has already been used before and compiles new loops as needed.
// The compilation passed to the first function object is used for compiling new functions.
// Once this function object is created, it is called with compile as argument, where the first argument of compile
// is bound to "proc" (essentially containing a preprocessed version of the user arguments to cwise).
// So createThunk roughly works like this:
// function createThunk(proc) {
//   var thunk = function(compileBound) {
//     var CACHED = {}
//     return function(arrays and scalars) {
//       if (dtype and order of arrays in CACHED) {
//         var func = CACHED[dtype and order of arrays]
//       } else {
//         var func = CACHED[dtype and order of arrays] = compileBound(dtype and order of arrays)
//       }
//       return func(arrays and scalars)
//     }
//   }
//   return thunk(compile.bind1(proc))
// }

var compile = require("./compile.js")

function createThunk(proc) {
  var code = ["'use strict'", "var CACHED={}"]
  var vars = []
  var thunkName = proc.funcName + "_cwise_thunk"
  
  //Build thunk
  code.push(["return function ", thunkName, "(", proc.shimArgs.join(","), "){"].join(""))
  var typesig = []
  var string_typesig = []
  var proc_args = [["array",proc.arrayArgs[0],".shape.slice(", // Slice shape so that we only retain the shape over which we iterate (which gets passed to the cwise operator as SS).
                    Math.max(0,proc.arrayBlockIndices[0]),proc.arrayBlockIndices[0]<0?(","+proc.arrayBlockIndices[0]+")"):")"].join("")]
  var shapeLengthConditions = [], shapeConditions = []
  // Process array arguments
  for(var i=0; i<proc.arrayArgs.length; ++i) {
    var j = proc.arrayArgs[i]
    vars.push(["t", j, "=array", j, ".dtype,",
               "r", j, "=array", j, ".order"].join(""))
    typesig.push("t" + j)
    typesig.push("r" + j)
    string_typesig.push("t"+j)
    string_typesig.push("r"+j+".join()")
    proc_args.push("array" + j + ".data")
    proc_args.push("array" + j + ".stride")
    proc_args.push("array" + j + ".offset|0")
    if (i>0) { // Gather conditions to check for shape equality (ignoring block indices)
      shapeLengthConditions.push("array" + proc.arrayArgs[0] + ".shape.length===array" + j + ".shape.length+" + (Math.abs(proc.arrayBlockIndices[0])-Math.abs(proc.arrayBlockIndices[i])))
      shapeConditions.push("array" + proc.arrayArgs[0] + ".shape[shapeIndex+" + Math.max(0,proc.arrayBlockIndices[0]) + "]===array" + j + ".shape[shapeIndex+" + Math.max(0,proc.arrayBlockIndices[i]) + "]")
    }
  }
  // Check for shape equality
  if (proc.arrayArgs.length > 1) {
    code.push("if (!(" + shapeLengthConditions.join(" && ") + ")) throw new Error('cwise: Arrays do not all have the same dimensionality!')")
    code.push("for(var shapeIndex=array" + proc.arrayArgs[0] + ".shape.length-" + Math.abs(proc.arrayBlockIndices[0]) + "; shapeIndex-->0;) {")
    code.push("if (!(" + shapeConditions.join(" && ") + ")) throw new Error('cwise: Arrays do not all have the same shape!')")
    code.push("}")
  }
  // Process scalar arguments
  for(var i=0; i<proc.scalarArgs.length; ++i) {
    proc_args.push("scalar" + proc.scalarArgs[i])
  }
  // Check for cached function (and if not present, generate it)
  vars.push(["type=[", string_typesig.join(","), "].join()"].join(""))
  vars.push("proc=CACHED[type]")
  code.push("var " + vars.join(","))
  
  code.push(["if(!proc){",
             "CACHED[type]=proc=compile([", typesig.join(","), "])}",
             "return proc(", proc_args.join(","), ")}"].join(""))

  if(proc.debug) {
    console.log("-----Generated thunk:\n" + code.join("\n") + "\n----------")
  }
  
  //Compile thunk
  var thunk = new Function("compile", code.join("\n"))
  return thunk(compile.bind(undefined, proc))
}

module.exports = createThunk

},{"./compile.js":9}],11:[function(require,module,exports){
(function (global){
"use strict"

var esprima = require("esprima")
var uniq = require("uniq")

var PREFIX_COUNTER = 0

function CompiledArgument(name, lvalue, rvalue) {
  this.name = name
  this.lvalue = lvalue
  this.rvalue = rvalue
  this.count = 0
}

function CompiledRoutine(body, args, thisVars, localVars) {
  this.body = body
  this.args = args
  this.thisVars = thisVars
  this.localVars = localVars
}

function isGlobal(identifier) {
  if(identifier === "eval") {
    throw new Error("cwise-parser: eval() not allowed")
  }
  if(typeof window !== "undefined") {
    return identifier in window
  } else if(typeof global !== "undefined") {
    return identifier in global
  } else if(typeof self !== "undefined") {
    return identifier in self
  } else {
    return false
  }
}

function getArgNames(ast) {
  var params = ast.body[0].expression.callee.params
  var names = new Array(params.length)
  for(var i=0; i<params.length; ++i) {
    names[i] = params[i].name
  }
  return names
}

function preprocess(func) {
  var src = ["(", func, ")()"].join("")
  var ast = esprima.parse(src, { range: true })
  
  //Compute new prefix
  var prefix = "_inline_" + (PREFIX_COUNTER++) + "_"
  
  //Parse out arguments
  var argNames = getArgNames(ast)
  var compiledArgs = new Array(argNames.length)
  for(var i=0; i<argNames.length; ++i) {
    compiledArgs[i] = new CompiledArgument([prefix, "arg", i, "_"].join(""), false, false)
  }
  
  //Create temporary data structure for source rewriting
  var exploded = new Array(src.length)
  for(var i=0, n=src.length; i<n; ++i) {
    exploded[i] = src.charAt(i)
  }
  
  //Local variables
  var localVars = []
  var thisVars = []
  var computedThis = false
  
  //Retrieves a local variable
  function createLocal(id) {
    var nstr = prefix + id.replace(/\_/g, "__")
    localVars.push(nstr)
    return nstr
  }
  
  //Creates a this variable
  function createThisVar(id) {
    var nstr = "this_" + id.replace(/\_/g, "__")
    thisVars.push(nstr)
    return nstr
  }
  
  //Rewrites an ast node
  function rewrite(node, nstr) {
    var lo = node.range[0], hi = node.range[1]
    for(var i=lo+1; i<hi; ++i) {
      exploded[i] = ""
    }
    exploded[lo] = nstr
  }
  
  //Remove any underscores
  function escapeString(str) {
    return "'"+(str.replace(/\_/g, "\\_").replace(/\'/g, "\'"))+"'"
  }
  
  //Returns the source of an identifier
  function source(node) {
    return exploded.slice(node.range[0], node.range[1]).join("")
  }
  
  //Computes the usage of a node
  var LVALUE = 1
  var RVALUE = 2
  function getUsage(node) {
    if(node.parent.type === "AssignmentExpression") {
      if(node.parent.left === node) {
        if(node.parent.operator === "=") {
          return LVALUE
        }
        return LVALUE|RVALUE
      }
    }
    if(node.parent.type === "UpdateExpression") {
      return LVALUE|RVALUE
    }
    return RVALUE
  }
  
  //Handle visiting a node
  (function visit(node, parent) {
    node.parent = parent
    if(node.type === "MemberExpression") {
      //Handle member expression
      if(node.computed) {
        visit(node.object, node)
        visit(node.property, node)
      } else if(node.object.type === "ThisExpression") {
        rewrite(node, createThisVar(node.property.name))
      } else {
        visit(node.object, node)
      }
    } else if(node.type === "ThisExpression") {
      throw new Error("cwise-parser: Computed this is not allowed")
    } else if(node.type === "Identifier") {
      //Handle identifier
      var name = node.name
      var argNo = argNames.indexOf(name)
      if(argNo >= 0) {
        var carg = compiledArgs[argNo]
        var usage = getUsage(node)
        if(usage & LVALUE) {
          carg.lvalue = true
        }
        if(usage & RVALUE) {
          carg.rvalue = true
        }
        ++carg.count
        rewrite(node, carg.name)
      } else if(isGlobal(name)) {
        //Don't rewrite globals
      } else {
        rewrite(node, createLocal(name))
      }
    } else if(node.type === "Literal") {
      if(typeof node.value === "string") {
        rewrite(node, escapeString(node.value))
      }
    } else if(node.type === "WithStatement") {
      throw new Error("cwise-parser: with() statements not allowed")
    } else {
      //Visit all children
      var keys = Object.keys(node)
      for(var i=0, n=keys.length; i<n; ++i) {
        if(keys[i] === "parent") {
          continue
        }
        var value = node[keys[i]]
        if(value) {
          if(value instanceof Array) {
            for(var j=0; j<value.length; ++j) {
              if(value[j] && typeof value[j].type === "string") {
                visit(value[j], node)
              }
            }
          } else if(typeof value.type === "string") {
            visit(value, node)
          }
        }
      }
    }
  })(ast.body[0].expression.callee.body, undefined)
  
  //Remove duplicate variables
  uniq(localVars)
  uniq(thisVars)
  
  //Return body
  var routine = new CompiledRoutine(source(ast.body[0].expression.callee.body), compiledArgs, thisVars, localVars)
  return routine
}

module.exports = preprocess
}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"esprima":13,"uniq":17}],12:[function(require,module,exports){
"use strict"

var parse   = require("cwise-parser")
var compile = require("cwise-compiler")

var REQUIRED_FIELDS = [ "args", "body" ]
var OPTIONAL_FIELDS = [ "pre", "post", "printCode", "funcName", "blockSize" ]

function createCWise(user_args) {
  //Check parameters
  for(var id in user_args) {
    if(REQUIRED_FIELDS.indexOf(id) < 0 &&
       OPTIONAL_FIELDS.indexOf(id) < 0) {
      console.warn("cwise: Unknown argument '"+id+"' passed to expression compiler")
    }
  }
  for(var i=0; i<REQUIRED_FIELDS.length; ++i) {
    if(!user_args[REQUIRED_FIELDS[i]]) {
      throw new Error("cwise: Missing argument: " + REQUIRED_FIELDS[i])
    }
  }
  
  //Parse blocks
  return compile({
    args:       user_args.args,
    pre:        parse(user_args.pre || function(){}),
    body:       parse(user_args.body),
    post:       parse(user_args.post || function(){}),
    debug:      !!user_args.printCode,
    funcName:   user_args.funcName || user_args.body.name || "cwise",
    blockSize:  user_args.blockSize || 64
  })
}

module.exports = createCWise

},{"cwise-compiler":8,"cwise-parser":11}],13:[function(require,module,exports){
/*
  Copyright (C) 2013 Ariya Hidayat <ariya.hidayat@gmail.com>
  Copyright (C) 2013 Thaddee Tyl <thaddee.tyl@gmail.com>
  Copyright (C) 2013 Mathias Bynens <mathias@qiwi.be>
  Copyright (C) 2012 Ariya Hidayat <ariya.hidayat@gmail.com>
  Copyright (C) 2012 Mathias Bynens <mathias@qiwi.be>
  Copyright (C) 2012 Joost-Wim Boekesteijn <joost-wim@boekesteijn.nl>
  Copyright (C) 2012 Kris Kowal <kris.kowal@cixar.com>
  Copyright (C) 2012 Yusuke Suzuki <utatane.tea@gmail.com>
  Copyright (C) 2012 Arpad Borsos <arpad.borsos@googlemail.com>
  Copyright (C) 2011 Ariya Hidayat <ariya.hidayat@gmail.com>

  Redistribution and use in source and binary forms, with or without
  modification, are permitted provided that the following conditions are met:

    * Redistributions of source code must retain the above copyright
      notice, this list of conditions and the following disclaimer.
    * Redistributions in binary form must reproduce the above copyright
      notice, this list of conditions and the following disclaimer in the
      documentation and/or other materials provided with the distribution.

  THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
  AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
  IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
  ARE DISCLAIMED. IN NO EVENT SHALL <COPYRIGHT HOLDER> BE LIABLE FOR ANY
  DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
  (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
  LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
  ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
  (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF
  THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/

/*jslint bitwise:true plusplus:true */
/*global esprima:true, define:true, exports:true, window: true,
throwErrorTolerant: true,
throwError: true, generateStatement: true, peek: true,
parseAssignmentExpression: true, parseBlock: true, parseExpression: true,
parseFunctionDeclaration: true, parseFunctionExpression: true,
parseFunctionSourceElements: true, parseVariableIdentifier: true,
parseLeftHandSideExpression: true,
parseUnaryExpression: true,
parseStatement: true, parseSourceElement: true */

(function (root, factory) {
    'use strict';

    // Universal Module Definition (UMD) to support AMD, CommonJS/Node.js,
    // Rhino, and plain browser loading.

    /* istanbul ignore next */
    if (typeof define === 'function' && define.amd) {
        define(['exports'], factory);
    } else if (typeof exports !== 'undefined') {
        factory(exports);
    } else {
        factory((root.esprima = {}));
    }
}(this, function (exports) {
    'use strict';

    var Token,
        TokenName,
        FnExprTokens,
        Syntax,
        PropertyKind,
        Messages,
        Regex,
        SyntaxTreeDelegate,
        source,
        strict,
        index,
        lineNumber,
        lineStart,
        length,
        delegate,
        lookahead,
        state,
        extra;

    Token = {
        BooleanLiteral: 1,
        EOF: 2,
        Identifier: 3,
        Keyword: 4,
        NullLiteral: 5,
        NumericLiteral: 6,
        Punctuator: 7,
        StringLiteral: 8,
        RegularExpression: 9
    };

    TokenName = {};
    TokenName[Token.BooleanLiteral] = 'Boolean';
    TokenName[Token.EOF] = '<end>';
    TokenName[Token.Identifier] = 'Identifier';
    TokenName[Token.Keyword] = 'Keyword';
    TokenName[Token.NullLiteral] = 'Null';
    TokenName[Token.NumericLiteral] = 'Numeric';
    TokenName[Token.Punctuator] = 'Punctuator';
    TokenName[Token.StringLiteral] = 'String';
    TokenName[Token.RegularExpression] = 'RegularExpression';

    // A function following one of those tokens is an expression.
    FnExprTokens = ['(', '{', '[', 'in', 'typeof', 'instanceof', 'new',
                    'return', 'case', 'delete', 'throw', 'void',
                    // assignment operators
                    '=', '+=', '-=', '*=', '/=', '%=', '<<=', '>>=', '>>>=',
                    '&=', '|=', '^=', ',',
                    // binary/unary operators
                    '+', '-', '*', '/', '%', '++', '--', '<<', '>>', '>>>', '&',
                    '|', '^', '!', '~', '&&', '||', '?', ':', '===', '==', '>=',
                    '<=', '<', '>', '!=', '!=='];

    Syntax = {
        AssignmentExpression: 'AssignmentExpression',
        ArrayExpression: 'ArrayExpression',
        BlockStatement: 'BlockStatement',
        BinaryExpression: 'BinaryExpression',
        BreakStatement: 'BreakStatement',
        CallExpression: 'CallExpression',
        CatchClause: 'CatchClause',
        ConditionalExpression: 'ConditionalExpression',
        ContinueStatement: 'ContinueStatement',
        DoWhileStatement: 'DoWhileStatement',
        DebuggerStatement: 'DebuggerStatement',
        EmptyStatement: 'EmptyStatement',
        ExpressionStatement: 'ExpressionStatement',
        ForStatement: 'ForStatement',
        ForInStatement: 'ForInStatement',
        FunctionDeclaration: 'FunctionDeclaration',
        FunctionExpression: 'FunctionExpression',
        Identifier: 'Identifier',
        IfStatement: 'IfStatement',
        Literal: 'Literal',
        LabeledStatement: 'LabeledStatement',
        LogicalExpression: 'LogicalExpression',
        MemberExpression: 'MemberExpression',
        NewExpression: 'NewExpression',
        ObjectExpression: 'ObjectExpression',
        Program: 'Program',
        Property: 'Property',
        ReturnStatement: 'ReturnStatement',
        SequenceExpression: 'SequenceExpression',
        SwitchStatement: 'SwitchStatement',
        SwitchCase: 'SwitchCase',
        ThisExpression: 'ThisExpression',
        ThrowStatement: 'ThrowStatement',
        TryStatement: 'TryStatement',
        UnaryExpression: 'UnaryExpression',
        UpdateExpression: 'UpdateExpression',
        VariableDeclaration: 'VariableDeclaration',
        VariableDeclarator: 'VariableDeclarator',
        WhileStatement: 'WhileStatement',
        WithStatement: 'WithStatement'
    };

    PropertyKind = {
        Data: 1,
        Get: 2,
        Set: 4
    };

    // Error messages should be identical to V8.
    Messages = {
        UnexpectedToken:  'Unexpected token %0',
        UnexpectedNumber:  'Unexpected number',
        UnexpectedString:  'Unexpected string',
        UnexpectedIdentifier:  'Unexpected identifier',
        UnexpectedReserved:  'Unexpected reserved word',
        UnexpectedEOS:  'Unexpected end of input',
        NewlineAfterThrow:  'Illegal newline after throw',
        InvalidRegExp: 'Invalid regular expression',
        UnterminatedRegExp:  'Invalid regular expression: missing /',
        InvalidLHSInAssignment:  'Invalid left-hand side in assignment',
        InvalidLHSInForIn:  'Invalid left-hand side in for-in',
        MultipleDefaultsInSwitch: 'More than one default clause in switch statement',
        NoCatchOrFinally:  'Missing catch or finally after try',
        UnknownLabel: 'Undefined label \'%0\'',
        Redeclaration: '%0 \'%1\' has already been declared',
        IllegalContinue: 'Illegal continue statement',
        IllegalBreak: 'Illegal break statement',
        IllegalReturn: 'Illegal return statement',
        StrictModeWith:  'Strict mode code may not include a with statement',
        StrictCatchVariable:  'Catch variable may not be eval or arguments in strict mode',
        StrictVarName:  'Variable name may not be eval or arguments in strict mode',
        StrictParamName:  'Parameter name eval or arguments is not allowed in strict mode',
        StrictParamDupe: 'Strict mode function may not have duplicate parameter names',
        StrictFunctionName:  'Function name may not be eval or arguments in strict mode',
        StrictOctalLiteral:  'Octal literals are not allowed in strict mode.',
        StrictDelete:  'Delete of an unqualified identifier in strict mode.',
        StrictDuplicateProperty:  'Duplicate data property in object literal not allowed in strict mode',
        AccessorDataProperty:  'Object literal may not have data and accessor property with the same name',
        AccessorGetSet:  'Object literal may not have multiple get/set accessors with the same name',
        StrictLHSAssignment:  'Assignment to eval or arguments is not allowed in strict mode',
        StrictLHSPostfix:  'Postfix increment/decrement may not have eval or arguments operand in strict mode',
        StrictLHSPrefix:  'Prefix increment/decrement may not have eval or arguments operand in strict mode',
        StrictReservedWord:  'Use of future reserved word in strict mode'
    };

    // See also tools/generate-unicode-regex.py.
    Regex = {
        NonAsciiIdentifierStart: new RegExp('[\xAA\xB5\xBA\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0370-\u0374\u0376\u0377\u037A-\u037D\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u048A-\u0527\u0531-\u0556\u0559\u0561-\u0587\u05D0-\u05EA\u05F0-\u05F2\u0620-\u064A\u066E\u066F\u0671-\u06D3\u06D5\u06E5\u06E6\u06EE\u06EF\u06FA-\u06FC\u06FF\u0710\u0712-\u072F\u074D-\u07A5\u07B1\u07CA-\u07EA\u07F4\u07F5\u07FA\u0800-\u0815\u081A\u0824\u0828\u0840-\u0858\u08A0\u08A2-\u08AC\u0904-\u0939\u093D\u0950\u0958-\u0961\u0971-\u0977\u0979-\u097F\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BD\u09CE\u09DC\u09DD\u09DF-\u09E1\u09F0\u09F1\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A59-\u0A5C\u0A5E\u0A72-\u0A74\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABD\u0AD0\u0AE0\u0AE1\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3D\u0B5C\u0B5D\u0B5F-\u0B61\u0B71\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BD0\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C33\u0C35-\u0C39\u0C3D\u0C58\u0C59\u0C60\u0C61\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBD\u0CDE\u0CE0\u0CE1\u0CF1\u0CF2\u0D05-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D\u0D4E\u0D60\u0D61\u0D7A-\u0D7F\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0E01-\u0E30\u0E32\u0E33\u0E40-\u0E46\u0E81\u0E82\u0E84\u0E87\u0E88\u0E8A\u0E8D\u0E94-\u0E97\u0E99-\u0E9F\u0EA1-\u0EA3\u0EA5\u0EA7\u0EAA\u0EAB\u0EAD-\u0EB0\u0EB2\u0EB3\u0EBD\u0EC0-\u0EC4\u0EC6\u0EDC-\u0EDF\u0F00\u0F40-\u0F47\u0F49-\u0F6C\u0F88-\u0F8C\u1000-\u102A\u103F\u1050-\u1055\u105A-\u105D\u1061\u1065\u1066\u106E-\u1070\u1075-\u1081\u108E\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u1380-\u138F\u13A0-\u13F4\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16EE-\u16F0\u1700-\u170C\u170E-\u1711\u1720-\u1731\u1740-\u1751\u1760-\u176C\u176E-\u1770\u1780-\u17B3\u17D7\u17DC\u1820-\u1877\u1880-\u18A8\u18AA\u18B0-\u18F5\u1900-\u191C\u1950-\u196D\u1970-\u1974\u1980-\u19AB\u19C1-\u19C7\u1A00-\u1A16\u1A20-\u1A54\u1AA7\u1B05-\u1B33\u1B45-\u1B4B\u1B83-\u1BA0\u1BAE\u1BAF\u1BBA-\u1BE5\u1C00-\u1C23\u1C4D-\u1C4F\u1C5A-\u1C7D\u1CE9-\u1CEC\u1CEE-\u1CF1\u1CF5\u1CF6\u1D00-\u1DBF\u1E00-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u2071\u207F\u2090-\u209C\u2102\u2107\u210A-\u2113\u2115\u2119-\u211D\u2124\u2126\u2128\u212A-\u212D\u212F-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2160-\u2188\u2C00-\u2C2E\u2C30-\u2C5E\u2C60-\u2CE4\u2CEB-\u2CEE\u2CF2\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D80-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2E2F\u3005-\u3007\u3021-\u3029\u3031-\u3035\u3038-\u303C\u3041-\u3096\u309D-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312D\u3131-\u318E\u31A0-\u31BA\u31F0-\u31FF\u3400-\u4DB5\u4E00-\u9FCC\uA000-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA61F\uA62A\uA62B\uA640-\uA66E\uA67F-\uA697\uA6A0-\uA6EF\uA717-\uA71F\uA722-\uA788\uA78B-\uA78E\uA790-\uA793\uA7A0-\uA7AA\uA7F8-\uA801\uA803-\uA805\uA807-\uA80A\uA80C-\uA822\uA840-\uA873\uA882-\uA8B3\uA8F2-\uA8F7\uA8FB\uA90A-\uA925\uA930-\uA946\uA960-\uA97C\uA984-\uA9B2\uA9CF\uAA00-\uAA28\uAA40-\uAA42\uAA44-\uAA4B\uAA60-\uAA76\uAA7A\uAA80-\uAAAF\uAAB1\uAAB5\uAAB6\uAAB9-\uAABD\uAAC0\uAAC2\uAADB-\uAADD\uAAE0-\uAAEA\uAAF2-\uAAF4\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uABC0-\uABE2\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D\uFB1F-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE70-\uFE74\uFE76-\uFEFC\uFF21-\uFF3A\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]'),
        NonAsciiIdentifierPart: new RegExp('[\xAA\xB5\xBA\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0300-\u0374\u0376\u0377\u037A-\u037D\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u0483-\u0487\u048A-\u0527\u0531-\u0556\u0559\u0561-\u0587\u0591-\u05BD\u05BF\u05C1\u05C2\u05C4\u05C5\u05C7\u05D0-\u05EA\u05F0-\u05F2\u0610-\u061A\u0620-\u0669\u066E-\u06D3\u06D5-\u06DC\u06DF-\u06E8\u06EA-\u06FC\u06FF\u0710-\u074A\u074D-\u07B1\u07C0-\u07F5\u07FA\u0800-\u082D\u0840-\u085B\u08A0\u08A2-\u08AC\u08E4-\u08FE\u0900-\u0963\u0966-\u096F\u0971-\u0977\u0979-\u097F\u0981-\u0983\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BC-\u09C4\u09C7\u09C8\u09CB-\u09CE\u09D7\u09DC\u09DD\u09DF-\u09E3\u09E6-\u09F1\u0A01-\u0A03\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A3C\u0A3E-\u0A42\u0A47\u0A48\u0A4B-\u0A4D\u0A51\u0A59-\u0A5C\u0A5E\u0A66-\u0A75\u0A81-\u0A83\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABC-\u0AC5\u0AC7-\u0AC9\u0ACB-\u0ACD\u0AD0\u0AE0-\u0AE3\u0AE6-\u0AEF\u0B01-\u0B03\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3C-\u0B44\u0B47\u0B48\u0B4B-\u0B4D\u0B56\u0B57\u0B5C\u0B5D\u0B5F-\u0B63\u0B66-\u0B6F\u0B71\u0B82\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BBE-\u0BC2\u0BC6-\u0BC8\u0BCA-\u0BCD\u0BD0\u0BD7\u0BE6-\u0BEF\u0C01-\u0C03\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C33\u0C35-\u0C39\u0C3D-\u0C44\u0C46-\u0C48\u0C4A-\u0C4D\u0C55\u0C56\u0C58\u0C59\u0C60-\u0C63\u0C66-\u0C6F\u0C82\u0C83\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBC-\u0CC4\u0CC6-\u0CC8\u0CCA-\u0CCD\u0CD5\u0CD6\u0CDE\u0CE0-\u0CE3\u0CE6-\u0CEF\u0CF1\u0CF2\u0D02\u0D03\u0D05-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D-\u0D44\u0D46-\u0D48\u0D4A-\u0D4E\u0D57\u0D60-\u0D63\u0D66-\u0D6F\u0D7A-\u0D7F\u0D82\u0D83\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0DCA\u0DCF-\u0DD4\u0DD6\u0DD8-\u0DDF\u0DF2\u0DF3\u0E01-\u0E3A\u0E40-\u0E4E\u0E50-\u0E59\u0E81\u0E82\u0E84\u0E87\u0E88\u0E8A\u0E8D\u0E94-\u0E97\u0E99-\u0E9F\u0EA1-\u0EA3\u0EA5\u0EA7\u0EAA\u0EAB\u0EAD-\u0EB9\u0EBB-\u0EBD\u0EC0-\u0EC4\u0EC6\u0EC8-\u0ECD\u0ED0-\u0ED9\u0EDC-\u0EDF\u0F00\u0F18\u0F19\u0F20-\u0F29\u0F35\u0F37\u0F39\u0F3E-\u0F47\u0F49-\u0F6C\u0F71-\u0F84\u0F86-\u0F97\u0F99-\u0FBC\u0FC6\u1000-\u1049\u1050-\u109D\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u135D-\u135F\u1380-\u138F\u13A0-\u13F4\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16EE-\u16F0\u1700-\u170C\u170E-\u1714\u1720-\u1734\u1740-\u1753\u1760-\u176C\u176E-\u1770\u1772\u1773\u1780-\u17D3\u17D7\u17DC\u17DD\u17E0-\u17E9\u180B-\u180D\u1810-\u1819\u1820-\u1877\u1880-\u18AA\u18B0-\u18F5\u1900-\u191C\u1920-\u192B\u1930-\u193B\u1946-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u19D0-\u19D9\u1A00-\u1A1B\u1A20-\u1A5E\u1A60-\u1A7C\u1A7F-\u1A89\u1A90-\u1A99\u1AA7\u1B00-\u1B4B\u1B50-\u1B59\u1B6B-\u1B73\u1B80-\u1BF3\u1C00-\u1C37\u1C40-\u1C49\u1C4D-\u1C7D\u1CD0-\u1CD2\u1CD4-\u1CF6\u1D00-\u1DE6\u1DFC-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u200C\u200D\u203F\u2040\u2054\u2071\u207F\u2090-\u209C\u20D0-\u20DC\u20E1\u20E5-\u20F0\u2102\u2107\u210A-\u2113\u2115\u2119-\u211D\u2124\u2126\u2128\u212A-\u212D\u212F-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2160-\u2188\u2C00-\u2C2E\u2C30-\u2C5E\u2C60-\u2CE4\u2CEB-\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D7F-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2DE0-\u2DFF\u2E2F\u3005-\u3007\u3021-\u302F\u3031-\u3035\u3038-\u303C\u3041-\u3096\u3099\u309A\u309D-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312D\u3131-\u318E\u31A0-\u31BA\u31F0-\u31FF\u3400-\u4DB5\u4E00-\u9FCC\uA000-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA62B\uA640-\uA66F\uA674-\uA67D\uA67F-\uA697\uA69F-\uA6F1\uA717-\uA71F\uA722-\uA788\uA78B-\uA78E\uA790-\uA793\uA7A0-\uA7AA\uA7F8-\uA827\uA840-\uA873\uA880-\uA8C4\uA8D0-\uA8D9\uA8E0-\uA8F7\uA8FB\uA900-\uA92D\uA930-\uA953\uA960-\uA97C\uA980-\uA9C0\uA9CF-\uA9D9\uAA00-\uAA36\uAA40-\uAA4D\uAA50-\uAA59\uAA60-\uAA76\uAA7A\uAA7B\uAA80-\uAAC2\uAADB-\uAADD\uAAE0-\uAAEF\uAAF2-\uAAF6\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uABC0-\uABEA\uABEC\uABED\uABF0-\uABF9\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE00-\uFE0F\uFE20-\uFE26\uFE33\uFE34\uFE4D-\uFE4F\uFE70-\uFE74\uFE76-\uFEFC\uFF10-\uFF19\uFF21-\uFF3A\uFF3F\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]')
    };

    // Ensure the condition is true, otherwise throw an error.
    // This is only to have a better contract semantic, i.e. another safety net
    // to catch a logic error. The condition shall be fulfilled in normal case.
    // Do NOT use this to enforce a certain condition on any user input.

    function assert(condition, message) {
        /* istanbul ignore if */
        if (!condition) {
            throw new Error('ASSERT: ' + message);
        }
    }

    function isDecimalDigit(ch) {
        return (ch >= 48 && ch <= 57);   // 0..9
    }

    function isHexDigit(ch) {
        return '0123456789abcdefABCDEF'.indexOf(ch) >= 0;
    }

    function isOctalDigit(ch) {
        return '01234567'.indexOf(ch) >= 0;
    }


    // 7.2 White Space

    function isWhiteSpace(ch) {
        return (ch === 0x20) || (ch === 0x09) || (ch === 0x0B) || (ch === 0x0C) || (ch === 0xA0) ||
            (ch >= 0x1680 && [0x1680, 0x180E, 0x2000, 0x2001, 0x2002, 0x2003, 0x2004, 0x2005, 0x2006, 0x2007, 0x2008, 0x2009, 0x200A, 0x202F, 0x205F, 0x3000, 0xFEFF].indexOf(ch) >= 0);
    }

    // 7.3 Line Terminators

    function isLineTerminator(ch) {
        return (ch === 0x0A) || (ch === 0x0D) || (ch === 0x2028) || (ch === 0x2029);
    }

    // 7.6 Identifier Names and Identifiers

    function isIdentifierStart(ch) {
        return (ch === 0x24) || (ch === 0x5F) ||  // $ (dollar) and _ (underscore)
            (ch >= 0x41 && ch <= 0x5A) ||         // A..Z
            (ch >= 0x61 && ch <= 0x7A) ||         // a..z
            (ch === 0x5C) ||                      // \ (backslash)
            ((ch >= 0x80) && Regex.NonAsciiIdentifierStart.test(String.fromCharCode(ch)));
    }

    function isIdentifierPart(ch) {
        return (ch === 0x24) || (ch === 0x5F) ||  // $ (dollar) and _ (underscore)
            (ch >= 0x41 && ch <= 0x5A) ||         // A..Z
            (ch >= 0x61 && ch <= 0x7A) ||         // a..z
            (ch >= 0x30 && ch <= 0x39) ||         // 0..9
            (ch === 0x5C) ||                      // \ (backslash)
            ((ch >= 0x80) && Regex.NonAsciiIdentifierPart.test(String.fromCharCode(ch)));
    }

    // 7.6.1.2 Future Reserved Words

    function isFutureReservedWord(id) {
        switch (id) {
        case 'class':
        case 'enum':
        case 'export':
        case 'extends':
        case 'import':
        case 'super':
            return true;
        default:
            return false;
        }
    }

    function isStrictModeReservedWord(id) {
        switch (id) {
        case 'implements':
        case 'interface':
        case 'package':
        case 'private':
        case 'protected':
        case 'public':
        case 'static':
        case 'yield':
        case 'let':
            return true;
        default:
            return false;
        }
    }

    function isRestrictedWord(id) {
        return id === 'eval' || id === 'arguments';
    }

    // 7.6.1.1 Keywords

    function isKeyword(id) {
        if (strict && isStrictModeReservedWord(id)) {
            return true;
        }

        // 'const' is specialized as Keyword in V8.
        // 'yield' and 'let' are for compatiblity with SpiderMonkey and ES.next.
        // Some others are from future reserved words.

        switch (id.length) {
        case 2:
            return (id === 'if') || (id === 'in') || (id === 'do');
        case 3:
            return (id === 'var') || (id === 'for') || (id === 'new') ||
                (id === 'try') || (id === 'let');
        case 4:
            return (id === 'this') || (id === 'else') || (id === 'case') ||
                (id === 'void') || (id === 'with') || (id === 'enum');
        case 5:
            return (id === 'while') || (id === 'break') || (id === 'catch') ||
                (id === 'throw') || (id === 'const') || (id === 'yield') ||
                (id === 'class') || (id === 'super');
        case 6:
            return (id === 'return') || (id === 'typeof') || (id === 'delete') ||
                (id === 'switch') || (id === 'export') || (id === 'import');
        case 7:
            return (id === 'default') || (id === 'finally') || (id === 'extends');
        case 8:
            return (id === 'function') || (id === 'continue') || (id === 'debugger');
        case 10:
            return (id === 'instanceof');
        default:
            return false;
        }
    }

    // 7.4 Comments

    function addComment(type, value, start, end, loc) {
        var comment, attacher;

        assert(typeof start === 'number', 'Comment must have valid position');

        // Because the way the actual token is scanned, often the comments
        // (if any) are skipped twice during the lexical analysis.
        // Thus, we need to skip adding a comment if the comment array already
        // handled it.
        if (state.lastCommentStart >= start) {
            return;
        }
        state.lastCommentStart = start;

        comment = {
            type: type,
            value: value
        };
        if (extra.range) {
            comment.range = [start, end];
        }
        if (extra.loc) {
            comment.loc = loc;
        }
        extra.comments.push(comment);
        if (extra.attachComment) {
            extra.leadingComments.push(comment);
            extra.trailingComments.push(comment);
        }
    }

    function skipSingleLineComment(offset) {
        var start, loc, ch, comment;

        start = index - offset;
        loc = {
            start: {
                line: lineNumber,
                column: index - lineStart - offset
            }
        };

        while (index < length) {
            ch = source.charCodeAt(index);
            ++index;
            if (isLineTerminator(ch)) {
                if (extra.comments) {
                    comment = source.slice(start + offset, index - 1);
                    loc.end = {
                        line: lineNumber,
                        column: index - lineStart - 1
                    };
                    addComment('Line', comment, start, index - 1, loc);
                }
                if (ch === 13 && source.charCodeAt(index) === 10) {
                    ++index;
                }
                ++lineNumber;
                lineStart = index;
                return;
            }
        }

        if (extra.comments) {
            comment = source.slice(start + offset, index);
            loc.end = {
                line: lineNumber,
                column: index - lineStart
            };
            addComment('Line', comment, start, index, loc);
        }
    }

    function skipMultiLineComment() {
        var start, loc, ch, comment;

        if (extra.comments) {
            start = index - 2;
            loc = {
                start: {
                    line: lineNumber,
                    column: index - lineStart - 2
                }
            };
        }

        while (index < length) {
            ch = source.charCodeAt(index);
            if (isLineTerminator(ch)) {
                if (ch === 0x0D && source.charCodeAt(index + 1) === 0x0A) {
                    ++index;
                }
                ++lineNumber;
                ++index;
                lineStart = index;
                if (index >= length) {
                    throwError({}, Messages.UnexpectedToken, 'ILLEGAL');
                }
            } else if (ch === 0x2A) {
                // Block comment ends with '*/'.
                if (source.charCodeAt(index + 1) === 0x2F) {
                    ++index;
                    ++index;
                    if (extra.comments) {
                        comment = source.slice(start + 2, index - 2);
                        loc.end = {
                            line: lineNumber,
                            column: index - lineStart
                        };
                        addComment('Block', comment, start, index, loc);
                    }
                    return;
                }
                ++index;
            } else {
                ++index;
            }
        }

        throwError({}, Messages.UnexpectedToken, 'ILLEGAL');
    }

    function skipComment() {
        var ch, start;

        start = (index === 0);
        while (index < length) {
            ch = source.charCodeAt(index);

            if (isWhiteSpace(ch)) {
                ++index;
            } else if (isLineTerminator(ch)) {
                ++index;
                if (ch === 0x0D && source.charCodeAt(index) === 0x0A) {
                    ++index;
                }
                ++lineNumber;
                lineStart = index;
                start = true;
            } else if (ch === 0x2F) { // U+002F is '/'
                ch = source.charCodeAt(index + 1);
                if (ch === 0x2F) {
                    ++index;
                    ++index;
                    skipSingleLineComment(2);
                    start = true;
                } else if (ch === 0x2A) {  // U+002A is '*'
                    ++index;
                    ++index;
                    skipMultiLineComment();
                } else {
                    break;
                }
            } else if (start && ch === 0x2D) { // U+002D is '-'
                // U+003E is '>'
                if ((source.charCodeAt(index + 1) === 0x2D) && (source.charCodeAt(index + 2) === 0x3E)) {
                    // '-->' is a single-line comment
                    index += 3;
                    skipSingleLineComment(3);
                } else {
                    break;
                }
            } else if (ch === 0x3C) { // U+003C is '<'
                if (source.slice(index + 1, index + 4) === '!--') {
                    ++index; // `<`
                    ++index; // `!`
                    ++index; // `-`
                    ++index; // `-`
                    skipSingleLineComment(4);
                } else {
                    break;
                }
            } else {
                break;
            }
        }
    }

    function scanHexEscape(prefix) {
        var i, len, ch, code = 0;

        len = (prefix === 'u') ? 4 : 2;
        for (i = 0; i < len; ++i) {
            if (index < length && isHexDigit(source[index])) {
                ch = source[index++];
                code = code * 16 + '0123456789abcdef'.indexOf(ch.toLowerCase());
            } else {
                return '';
            }
        }
        return String.fromCharCode(code);
    }

    function getEscapedIdentifier() {
        var ch, id;

        ch = source.charCodeAt(index++);
        id = String.fromCharCode(ch);

        // '\u' (U+005C, U+0075) denotes an escaped character.
        if (ch === 0x5C) {
            if (source.charCodeAt(index) !== 0x75) {
                throwError({}, Messages.UnexpectedToken, 'ILLEGAL');
            }
            ++index;
            ch = scanHexEscape('u');
            if (!ch || ch === '\\' || !isIdentifierStart(ch.charCodeAt(0))) {
                throwError({}, Messages.UnexpectedToken, 'ILLEGAL');
            }
            id = ch;
        }

        while (index < length) {
            ch = source.charCodeAt(index);
            if (!isIdentifierPart(ch)) {
                break;
            }
            ++index;
            id += String.fromCharCode(ch);

            // '\u' (U+005C, U+0075) denotes an escaped character.
            if (ch === 0x5C) {
                id = id.substr(0, id.length - 1);
                if (source.charCodeAt(index) !== 0x75) {
                    throwError({}, Messages.UnexpectedToken, 'ILLEGAL');
                }
                ++index;
                ch = scanHexEscape('u');
                if (!ch || ch === '\\' || !isIdentifierPart(ch.charCodeAt(0))) {
                    throwError({}, Messages.UnexpectedToken, 'ILLEGAL');
                }
                id += ch;
            }
        }

        return id;
    }

    function getIdentifier() {
        var start, ch;

        start = index++;
        while (index < length) {
            ch = source.charCodeAt(index);
            if (ch === 0x5C) {
                // Blackslash (U+005C) marks Unicode escape sequence.
                index = start;
                return getEscapedIdentifier();
            }
            if (isIdentifierPart(ch)) {
                ++index;
            } else {
                break;
            }
        }

        return source.slice(start, index);
    }

    function scanIdentifier() {
        var start, id, type;

        start = index;

        // Backslash (U+005C) starts an escaped character.
        id = (source.charCodeAt(index) === 0x5C) ? getEscapedIdentifier() : getIdentifier();

        // There is no keyword or literal with only one character.
        // Thus, it must be an identifier.
        if (id.length === 1) {
            type = Token.Identifier;
        } else if (isKeyword(id)) {
            type = Token.Keyword;
        } else if (id === 'null') {
            type = Token.NullLiteral;
        } else if (id === 'true' || id === 'false') {
            type = Token.BooleanLiteral;
        } else {
            type = Token.Identifier;
        }

        return {
            type: type,
            value: id,
            lineNumber: lineNumber,
            lineStart: lineStart,
            start: start,
            end: index
        };
    }


    // 7.7 Punctuators

    function scanPunctuator() {
        var start = index,
            code = source.charCodeAt(index),
            code2,
            ch1 = source[index],
            ch2,
            ch3,
            ch4;

        switch (code) {

        // Check for most common single-character punctuators.
        case 0x2E:  // . dot
        case 0x28:  // ( open bracket
        case 0x29:  // ) close bracket
        case 0x3B:  // ; semicolon
        case 0x2C:  // , comma
        case 0x7B:  // { open curly brace
        case 0x7D:  // } close curly brace
        case 0x5B:  // [
        case 0x5D:  // ]
        case 0x3A:  // :
        case 0x3F:  // ?
        case 0x7E:  // ~
            ++index;
            if (extra.tokenize) {
                if (code === 0x28) {
                    extra.openParenToken = extra.tokens.length;
                } else if (code === 0x7B) {
                    extra.openCurlyToken = extra.tokens.length;
                }
            }
            return {
                type: Token.Punctuator,
                value: String.fromCharCode(code),
                lineNumber: lineNumber,
                lineStart: lineStart,
                start: start,
                end: index
            };

        default:
            code2 = source.charCodeAt(index + 1);

            // '=' (U+003D) marks an assignment or comparison operator.
            if (code2 === 0x3D) {
                switch (code) {
                case 0x2B:  // +
                case 0x2D:  // -
                case 0x2F:  // /
                case 0x3C:  // <
                case 0x3E:  // >
                case 0x5E:  // ^
                case 0x7C:  // |
                case 0x25:  // %
                case 0x26:  // &
                case 0x2A:  // *
                    index += 2;
                    return {
                        type: Token.Punctuator,
                        value: String.fromCharCode(code) + String.fromCharCode(code2),
                        lineNumber: lineNumber,
                        lineStart: lineStart,
                        start: start,
                        end: index
                    };

                case 0x21: // !
                case 0x3D: // =
                    index += 2;

                    // !== and ===
                    if (source.charCodeAt(index) === 0x3D) {
                        ++index;
                    }
                    return {
                        type: Token.Punctuator,
                        value: source.slice(start, index),
                        lineNumber: lineNumber,
                        lineStart: lineStart,
                        start: start,
                        end: index
                    };
                }
            }
        }

        // 4-character punctuator: >>>=

        ch4 = source.substr(index, 4);

        if (ch4 === '>>>=') {
            index += 4;
            return {
                type: Token.Punctuator,
                value: ch4,
                lineNumber: lineNumber,
                lineStart: lineStart,
                start: start,
                end: index
            };
        }

        // 3-character punctuators: === !== >>> <<= >>=

        ch3 = ch4.substr(0, 3);

        if (ch3 === '>>>' || ch3 === '<<=' || ch3 === '>>=') {
            index += 3;
            return {
                type: Token.Punctuator,
                value: ch3,
                lineNumber: lineNumber,
                lineStart: lineStart,
                start: start,
                end: index
            };
        }

        // Other 2-character punctuators: ++ -- << >> && ||
        ch2 = ch3.substr(0, 2);

        if ((ch1 === ch2[1] && ('+-<>&|'.indexOf(ch1) >= 0)) || ch2 === '=>') {
            index += 2;
            return {
                type: Token.Punctuator,
                value: ch2,
                lineNumber: lineNumber,
                lineStart: lineStart,
                start: start,
                end: index
            };
        }

        // 1-character punctuators: < > = ! + - * % & | ^ /
        if ('<>=!+-*%&|^/'.indexOf(ch1) >= 0) {
            ++index;
            return {
                type: Token.Punctuator,
                value: ch1,
                lineNumber: lineNumber,
                lineStart: lineStart,
                start: start,
                end: index
            };
        }

        throwError({}, Messages.UnexpectedToken, 'ILLEGAL');
    }

    // 7.8.3 Numeric Literals

    function scanHexLiteral(start) {
        var number = '';

        while (index < length) {
            if (!isHexDigit(source[index])) {
                break;
            }
            number += source[index++];
        }

        if (number.length === 0) {
            throwError({}, Messages.UnexpectedToken, 'ILLEGAL');
        }

        if (isIdentifierStart(source.charCodeAt(index))) {
            throwError({}, Messages.UnexpectedToken, 'ILLEGAL');
        }

        return {
            type: Token.NumericLiteral,
            value: parseInt('0x' + number, 16),
            lineNumber: lineNumber,
            lineStart: lineStart,
            start: start,
            end: index
        };
    }

    function scanOctalLiteral(start) {
        var number = '0' + source[index++];
        while (index < length) {
            if (!isOctalDigit(source[index])) {
                break;
            }
            number += source[index++];
        }

        if (isIdentifierStart(source.charCodeAt(index)) || isDecimalDigit(source.charCodeAt(index))) {
            throwError({}, Messages.UnexpectedToken, 'ILLEGAL');
        }

        return {
            type: Token.NumericLiteral,
            value: parseInt(number, 8),
            octal: true,
            lineNumber: lineNumber,
            lineStart: lineStart,
            start: start,
            end: index
        };
    }

    function isImplicitOctalLiteral() {
        var i, ch;

        // Implicit octal, unless there is a non-octal digit.
        // (Annex B.1.1 on Numeric Literals)
        for (i = index + 1; i < length; ++i) {
            ch = source[i];
            if (ch === '8' || ch === '9') {
                return false;
            }
            if (!isOctalDigit(ch)) {
                return true;
            }
        }

        return true;
    }

    function scanNumericLiteral() {
        var number, start, ch;

        ch = source[index];
        assert(isDecimalDigit(ch.charCodeAt(0)) || (ch === '.'),
            'Numeric literal must start with a decimal digit or a decimal point');

        start = index;
        number = '';
        if (ch !== '.') {
            number = source[index++];
            ch = source[index];

            // Hex number starts with '0x'.
            // Octal number starts with '0'.
            if (number === '0') {
                if (ch === 'x' || ch === 'X') {
                    ++index;
                    return scanHexLiteral(start);
                }
                if (isOctalDigit(ch)) {
                    if (isImplicitOctalLiteral()) {
                        return scanOctalLiteral(start);
                    }
                }
            }

            while (isDecimalDigit(source.charCodeAt(index))) {
                number += source[index++];
            }
            ch = source[index];
        }

        if (ch === '.') {
            number += source[index++];
            while (isDecimalDigit(source.charCodeAt(index))) {
                number += source[index++];
            }
            ch = source[index];
        }

        if (ch === 'e' || ch === 'E') {
            number += source[index++];

            ch = source[index];
            if (ch === '+' || ch === '-') {
                number += source[index++];
            }
            if (isDecimalDigit(source.charCodeAt(index))) {
                while (isDecimalDigit(source.charCodeAt(index))) {
                    number += source[index++];
                }
            } else {
                throwError({}, Messages.UnexpectedToken, 'ILLEGAL');
            }
        }

        if (isIdentifierStart(source.charCodeAt(index))) {
            throwError({}, Messages.UnexpectedToken, 'ILLEGAL');
        }

        return {
            type: Token.NumericLiteral,
            value: parseFloat(number),
            lineNumber: lineNumber,
            lineStart: lineStart,
            start: start,
            end: index
        };
    }

    // 7.8.4 String Literals

    function scanStringLiteral() {
        var str = '', quote, start, ch, code, unescaped, restore, octal = false, startLineNumber, startLineStart;
        startLineNumber = lineNumber;
        startLineStart = lineStart;

        quote = source[index];
        assert((quote === '\'' || quote === '"'),
            'String literal must starts with a quote');

        start = index;
        ++index;

        while (index < length) {
            ch = source[index++];

            if (ch === quote) {
                quote = '';
                break;
            } else if (ch === '\\') {
                ch = source[index++];
                if (!ch || !isLineTerminator(ch.charCodeAt(0))) {
                    switch (ch) {
                    case 'u':
                    case 'x':
                        restore = index;
                        unescaped = scanHexEscape(ch);
                        if (unescaped) {
                            str += unescaped;
                        } else {
                            index = restore;
                            str += ch;
                        }
                        break;
                    case 'n':
                        str += '\n';
                        break;
                    case 'r':
                        str += '\r';
                        break;
                    case 't':
                        str += '\t';
                        break;
                    case 'b':
                        str += '\b';
                        break;
                    case 'f':
                        str += '\f';
                        break;
                    case 'v':
                        str += '\x0B';
                        break;

                    default:
                        if (isOctalDigit(ch)) {
                            code = '01234567'.indexOf(ch);

                            // \0 is not octal escape sequence
                            if (code !== 0) {
                                octal = true;
                            }

                            if (index < length && isOctalDigit(source[index])) {
                                octal = true;
                                code = code * 8 + '01234567'.indexOf(source[index++]);

                                // 3 digits are only allowed when string starts
                                // with 0, 1, 2, 3
                                if ('0123'.indexOf(ch) >= 0 &&
                                        index < length &&
                                        isOctalDigit(source[index])) {
                                    code = code * 8 + '01234567'.indexOf(source[index++]);
                                }
                            }
                            str += String.fromCharCode(code);
                        } else {
                            str += ch;
                        }
                        break;
                    }
                } else {
                    ++lineNumber;
                    if (ch ===  '\r' && source[index] === '\n') {
                        ++index;
                    }
                    lineStart = index;
                }
            } else if (isLineTerminator(ch.charCodeAt(0))) {
                break;
            } else {
                str += ch;
            }
        }

        if (quote !== '') {
            throwError({}, Messages.UnexpectedToken, 'ILLEGAL');
        }

        return {
            type: Token.StringLiteral,
            value: str,
            octal: octal,
            startLineNumber: startLineNumber,
            startLineStart: startLineStart,
            lineNumber: lineNumber,
            lineStart: lineStart,
            start: start,
            end: index
        };
    }

    function testRegExp(pattern, flags) {
        var value;
        try {
            value = new RegExp(pattern, flags);
        } catch (e) {
            throwError({}, Messages.InvalidRegExp);
        }
        return value;
    }

    function scanRegExpBody() {
        var ch, str, classMarker, terminated, body;

        ch = source[index];
        assert(ch === '/', 'Regular expression literal must start with a slash');
        str = source[index++];

        classMarker = false;
        terminated = false;
        while (index < length) {
            ch = source[index++];
            str += ch;
            if (ch === '\\') {
                ch = source[index++];
                // ECMA-262 7.8.5
                if (isLineTerminator(ch.charCodeAt(0))) {
                    throwError({}, Messages.UnterminatedRegExp);
                }
                str += ch;
            } else if (isLineTerminator(ch.charCodeAt(0))) {
                throwError({}, Messages.UnterminatedRegExp);
            } else if (classMarker) {
                if (ch === ']') {
                    classMarker = false;
                }
            } else {
                if (ch === '/') {
                    terminated = true;
                    break;
                } else if (ch === '[') {
                    classMarker = true;
                }
            }
        }

        if (!terminated) {
            throwError({}, Messages.UnterminatedRegExp);
        }

        // Exclude leading and trailing slash.
        body = str.substr(1, str.length - 2);
        return {
            value: body,
            literal: str
        };
    }

    function scanRegExpFlags() {
        var ch, str, flags, restore;

        str = '';
        flags = '';
        while (index < length) {
            ch = source[index];
            if (!isIdentifierPart(ch.charCodeAt(0))) {
                break;
            }

            ++index;
            if (ch === '\\' && index < length) {
                ch = source[index];
                if (ch === 'u') {
                    ++index;
                    restore = index;
                    ch = scanHexEscape('u');
                    if (ch) {
                        flags += ch;
                        for (str += '\\u'; restore < index; ++restore) {
                            str += source[restore];
                        }
                    } else {
                        index = restore;
                        flags += 'u';
                        str += '\\u';
                    }
                    throwErrorTolerant({}, Messages.UnexpectedToken, 'ILLEGAL');
                } else {
                    str += '\\';
                    throwErrorTolerant({}, Messages.UnexpectedToken, 'ILLEGAL');
                }
            } else {
                flags += ch;
                str += ch;
            }
        }

        return {
            value: flags,
            literal: str
        };
    }

    function scanRegExp() {
        var start, body, flags, pattern, value;

        lookahead = null;
        skipComment();
        start = index;

        body = scanRegExpBody();
        flags = scanRegExpFlags();
        value = testRegExp(body.value, flags.value);

        if (extra.tokenize) {
            return {
                type: Token.RegularExpression,
                value: value,
                lineNumber: lineNumber,
                lineStart: lineStart,
                start: start,
                end: index
            };
        }

        return {
            literal: body.literal + flags.literal,
            value: value,
            start: start,
            end: index
        };
    }

    function collectRegex() {
        var pos, loc, regex, token;

        skipComment();

        pos = index;
        loc = {
            start: {
                line: lineNumber,
                column: index - lineStart
            }
        };

        regex = scanRegExp();
        loc.end = {
            line: lineNumber,
            column: index - lineStart
        };

        /* istanbul ignore next */
        if (!extra.tokenize) {
            // Pop the previous token, which is likely '/' or '/='
            if (extra.tokens.length > 0) {
                token = extra.tokens[extra.tokens.length - 1];
                if (token.range[0] === pos && token.type === 'Punctuator') {
                    if (token.value === '/' || token.value === '/=') {
                        extra.tokens.pop();
                    }
                }
            }

            extra.tokens.push({
                type: 'RegularExpression',
                value: regex.literal,
                range: [pos, index],
                loc: loc
            });
        }

        return regex;
    }

    function isIdentifierName(token) {
        return token.type === Token.Identifier ||
            token.type === Token.Keyword ||
            token.type === Token.BooleanLiteral ||
            token.type === Token.NullLiteral;
    }

    function advanceSlash() {
        var prevToken,
            checkToken;
        // Using the following algorithm:
        // https://github.com/mozilla/sweet.js/wiki/design
        prevToken = extra.tokens[extra.tokens.length - 1];
        if (!prevToken) {
            // Nothing before that: it cannot be a division.
            return collectRegex();
        }
        if (prevToken.type === 'Punctuator') {
            if (prevToken.value === ']') {
                return scanPunctuator();
            }
            if (prevToken.value === ')') {
                checkToken = extra.tokens[extra.openParenToken - 1];
                if (checkToken &&
                        checkToken.type === 'Keyword' &&
                        (checkToken.value === 'if' ||
                         checkToken.value === 'while' ||
                         checkToken.value === 'for' ||
                         checkToken.value === 'with')) {
                    return collectRegex();
                }
                return scanPunctuator();
            }
            if (prevToken.value === '}') {
                // Dividing a function by anything makes little sense,
                // but we have to check for that.
                if (extra.tokens[extra.openCurlyToken - 3] &&
                        extra.tokens[extra.openCurlyToken - 3].type === 'Keyword') {
                    // Anonymous function.
                    checkToken = extra.tokens[extra.openCurlyToken - 4];
                    if (!checkToken) {
                        return scanPunctuator();
                    }
                } else if (extra.tokens[extra.openCurlyToken - 4] &&
                        extra.tokens[extra.openCurlyToken - 4].type === 'Keyword') {
                    // Named function.
                    checkToken = extra.tokens[extra.openCurlyToken - 5];
                    if (!checkToken) {
                        return collectRegex();
                    }
                } else {
                    return scanPunctuator();
                }
                // checkToken determines whether the function is
                // a declaration or an expression.
                if (FnExprTokens.indexOf(checkToken.value) >= 0) {
                    // It is an expression.
                    return scanPunctuator();
                }
                // It is a declaration.
                return collectRegex();
            }
            return collectRegex();
        }
        if (prevToken.type === 'Keyword' && prevToken.value !== 'this') {
            return collectRegex();
        }
        return scanPunctuator();
    }

    function advance() {
        var ch;

        skipComment();

        if (index >= length) {
            return {
                type: Token.EOF,
                lineNumber: lineNumber,
                lineStart: lineStart,
                start: index,
                end: index
            };
        }

        ch = source.charCodeAt(index);

        if (isIdentifierStart(ch)) {
            return scanIdentifier();
        }

        // Very common: ( and ) and ;
        if (ch === 0x28 || ch === 0x29 || ch === 0x3B) {
            return scanPunctuator();
        }

        // String literal starts with single quote (U+0027) or double quote (U+0022).
        if (ch === 0x27 || ch === 0x22) {
            return scanStringLiteral();
        }


        // Dot (.) U+002E can also start a floating-point number, hence the need
        // to check the next character.
        if (ch === 0x2E) {
            if (isDecimalDigit(source.charCodeAt(index + 1))) {
                return scanNumericLiteral();
            }
            return scanPunctuator();
        }

        if (isDecimalDigit(ch)) {
            return scanNumericLiteral();
        }

        // Slash (/) U+002F can also start a regex.
        if (extra.tokenize && ch === 0x2F) {
            return advanceSlash();
        }

        return scanPunctuator();
    }

    function collectToken() {
        var loc, token, range, value;

        skipComment();
        loc = {
            start: {
                line: lineNumber,
                column: index - lineStart
            }
        };

        token = advance();
        loc.end = {
            line: lineNumber,
            column: index - lineStart
        };

        if (token.type !== Token.EOF) {
            value = source.slice(token.start, token.end);
            extra.tokens.push({
                type: TokenName[token.type],
                value: value,
                range: [token.start, token.end],
                loc: loc
            });
        }

        return token;
    }

    function lex() {
        var token;

        token = lookahead;
        index = token.end;
        lineNumber = token.lineNumber;
        lineStart = token.lineStart;

        lookahead = (typeof extra.tokens !== 'undefined') ? collectToken() : advance();

        index = token.end;
        lineNumber = token.lineNumber;
        lineStart = token.lineStart;

        return token;
    }

    function peek() {
        var pos, line, start;

        pos = index;
        line = lineNumber;
        start = lineStart;
        lookahead = (typeof extra.tokens !== 'undefined') ? collectToken() : advance();
        index = pos;
        lineNumber = line;
        lineStart = start;
    }

    function Position(line, column) {
        this.line = line;
        this.column = column;
    }

    function SourceLocation(startLine, startColumn, line, column) {
        this.start = new Position(startLine, startColumn);
        this.end = new Position(line, column);
    }

    SyntaxTreeDelegate = {

        name: 'SyntaxTree',

        processComment: function (node) {
            var lastChild, trailingComments;

            if (node.type === Syntax.Program) {
                if (node.body.length > 0) {
                    return;
                }
            }

            if (extra.trailingComments.length > 0) {
                if (extra.trailingComments[0].range[0] >= node.range[1]) {
                    trailingComments = extra.trailingComments;
                    extra.trailingComments = [];
                } else {
                    extra.trailingComments.length = 0;
                }
            } else {
                if (extra.bottomRightStack.length > 0 &&
                        extra.bottomRightStack[extra.bottomRightStack.length - 1].trailingComments &&
                        extra.bottomRightStack[extra.bottomRightStack.length - 1].trailingComments[0].range[0] >= node.range[1]) {
                    trailingComments = extra.bottomRightStack[extra.bottomRightStack.length - 1].trailingComments;
                    delete extra.bottomRightStack[extra.bottomRightStack.length - 1].trailingComments;
                }
            }

            // Eating the stack.
            while (extra.bottomRightStack.length > 0 && extra.bottomRightStack[extra.bottomRightStack.length - 1].range[0] >= node.range[0]) {
                lastChild = extra.bottomRightStack.pop();
            }

            if (lastChild) {
                if (lastChild.leadingComments && lastChild.leadingComments[lastChild.leadingComments.length - 1].range[1] <= node.range[0]) {
                    node.leadingComments = lastChild.leadingComments;
                    delete lastChild.leadingComments;
                }
            } else if (extra.leadingComments.length > 0 && extra.leadingComments[extra.leadingComments.length - 1].range[1] <= node.range[0]) {
                node.leadingComments = extra.leadingComments;
                extra.leadingComments = [];
            }


            if (trailingComments) {
                node.trailingComments = trailingComments;
            }

            extra.bottomRightStack.push(node);
        },

        markEnd: function (node, startToken) {
            if (extra.range) {
                node.range = [startToken.start, index];
            }
            if (extra.loc) {
                node.loc = new SourceLocation(
                    startToken.startLineNumber === undefined ?  startToken.lineNumber : startToken.startLineNumber,
                    startToken.start - (startToken.startLineStart === undefined ?  startToken.lineStart : startToken.startLineStart),
                    lineNumber,
                    index - lineStart
                );
                this.postProcess(node);
            }

            if (extra.attachComment) {
                this.processComment(node);
            }
            return node;
        },

        postProcess: function (node) {
            if (extra.source) {
                node.loc.source = extra.source;
            }
            return node;
        },

        createArrayExpression: function (elements) {
            return {
                type: Syntax.ArrayExpression,
                elements: elements
            };
        },

        createAssignmentExpression: function (operator, left, right) {
            return {
                type: Syntax.AssignmentExpression,
                operator: operator,
                left: left,
                right: right
            };
        },

        createBinaryExpression: function (operator, left, right) {
            var type = (operator === '||' || operator === '&&') ? Syntax.LogicalExpression :
                        Syntax.BinaryExpression;
            return {
                type: type,
                operator: operator,
                left: left,
                right: right
            };
        },

        createBlockStatement: function (body) {
            return {
                type: Syntax.BlockStatement,
                body: body
            };
        },

        createBreakStatement: function (label) {
            return {
                type: Syntax.BreakStatement,
                label: label
            };
        },

        createCallExpression: function (callee, args) {
            return {
                type: Syntax.CallExpression,
                callee: callee,
                'arguments': args
            };
        },

        createCatchClause: function (param, body) {
            return {
                type: Syntax.CatchClause,
                param: param,
                body: body
            };
        },

        createConditionalExpression: function (test, consequent, alternate) {
            return {
                type: Syntax.ConditionalExpression,
                test: test,
                consequent: consequent,
                alternate: alternate
            };
        },

        createContinueStatement: function (label) {
            return {
                type: Syntax.ContinueStatement,
                label: label
            };
        },

        createDebuggerStatement: function () {
            return {
                type: Syntax.DebuggerStatement
            };
        },

        createDoWhileStatement: function (body, test) {
            return {
                type: Syntax.DoWhileStatement,
                body: body,
                test: test
            };
        },

        createEmptyStatement: function () {
            return {
                type: Syntax.EmptyStatement
            };
        },

        createExpressionStatement: function (expression) {
            return {
                type: Syntax.ExpressionStatement,
                expression: expression
            };
        },

        createForStatement: function (init, test, update, body) {
            return {
                type: Syntax.ForStatement,
                init: init,
                test: test,
                update: update,
                body: body
            };
        },

        createForInStatement: function (left, right, body) {
            return {
                type: Syntax.ForInStatement,
                left: left,
                right: right,
                body: body,
                each: false
            };
        },

        createFunctionDeclaration: function (id, params, defaults, body) {
            return {
                type: Syntax.FunctionDeclaration,
                id: id,
                params: params,
                defaults: defaults,
                body: body,
                rest: null,
                generator: false,
                expression: false
            };
        },

        createFunctionExpression: function (id, params, defaults, body) {
            return {
                type: Syntax.FunctionExpression,
                id: id,
                params: params,
                defaults: defaults,
                body: body,
                rest: null,
                generator: false,
                expression: false
            };
        },

        createIdentifier: function (name) {
            return {
                type: Syntax.Identifier,
                name: name
            };
        },

        createIfStatement: function (test, consequent, alternate) {
            return {
                type: Syntax.IfStatement,
                test: test,
                consequent: consequent,
                alternate: alternate
            };
        },

        createLabeledStatement: function (label, body) {
            return {
                type: Syntax.LabeledStatement,
                label: label,
                body: body
            };
        },

        createLiteral: function (token) {
            return {
                type: Syntax.Literal,
                value: token.value,
                raw: source.slice(token.start, token.end)
            };
        },

        createMemberExpression: function (accessor, object, property) {
            return {
                type: Syntax.MemberExpression,
                computed: accessor === '[',
                object: object,
                property: property
            };
        },

        createNewExpression: function (callee, args) {
            return {
                type: Syntax.NewExpression,
                callee: callee,
                'arguments': args
            };
        },

        createObjectExpression: function (properties) {
            return {
                type: Syntax.ObjectExpression,
                properties: properties
            };
        },

        createPostfixExpression: function (operator, argument) {
            return {
                type: Syntax.UpdateExpression,
                operator: operator,
                argument: argument,
                prefix: false
            };
        },

        createProgram: function (body) {
            return {
                type: Syntax.Program,
                body: body
            };
        },

        createProperty: function (kind, key, value) {
            return {
                type: Syntax.Property,
                key: key,
                value: value,
                kind: kind
            };
        },

        createReturnStatement: function (argument) {
            return {
                type: Syntax.ReturnStatement,
                argument: argument
            };
        },

        createSequenceExpression: function (expressions) {
            return {
                type: Syntax.SequenceExpression,
                expressions: expressions
            };
        },

        createSwitchCase: function (test, consequent) {
            return {
                type: Syntax.SwitchCase,
                test: test,
                consequent: consequent
            };
        },

        createSwitchStatement: function (discriminant, cases) {
            return {
                type: Syntax.SwitchStatement,
                discriminant: discriminant,
                cases: cases
            };
        },

        createThisExpression: function () {
            return {
                type: Syntax.ThisExpression
            };
        },

        createThrowStatement: function (argument) {
            return {
                type: Syntax.ThrowStatement,
                argument: argument
            };
        },

        createTryStatement: function (block, guardedHandlers, handlers, finalizer) {
            return {
                type: Syntax.TryStatement,
                block: block,
                guardedHandlers: guardedHandlers,
                handlers: handlers,
                finalizer: finalizer
            };
        },

        createUnaryExpression: function (operator, argument) {
            if (operator === '++' || operator === '--') {
                return {
                    type: Syntax.UpdateExpression,
                    operator: operator,
                    argument: argument,
                    prefix: true
                };
            }
            return {
                type: Syntax.UnaryExpression,
                operator: operator,
                argument: argument,
                prefix: true
            };
        },

        createVariableDeclaration: function (declarations, kind) {
            return {
                type: Syntax.VariableDeclaration,
                declarations: declarations,
                kind: kind
            };
        },

        createVariableDeclarator: function (id, init) {
            return {
                type: Syntax.VariableDeclarator,
                id: id,
                init: init
            };
        },

        createWhileStatement: function (test, body) {
            return {
                type: Syntax.WhileStatement,
                test: test,
                body: body
            };
        },

        createWithStatement: function (object, body) {
            return {
                type: Syntax.WithStatement,
                object: object,
                body: body
            };
        }
    };

    // Return true if there is a line terminator before the next token.

    function peekLineTerminator() {
        var pos, line, start, found;

        pos = index;
        line = lineNumber;
        start = lineStart;
        skipComment();
        found = lineNumber !== line;
        index = pos;
        lineNumber = line;
        lineStart = start;

        return found;
    }

    // Throw an exception

    function throwError(token, messageFormat) {
        var error,
            args = Array.prototype.slice.call(arguments, 2),
            msg = messageFormat.replace(
                /%(\d)/g,
                function (whole, index) {
                    assert(index < args.length, 'Message reference must be in range');
                    return args[index];
                }
            );

        if (typeof token.lineNumber === 'number') {
            error = new Error('Line ' + token.lineNumber + ': ' + msg);
            error.index = token.start;
            error.lineNumber = token.lineNumber;
            error.column = token.start - lineStart + 1;
        } else {
            error = new Error('Line ' + lineNumber + ': ' + msg);
            error.index = index;
            error.lineNumber = lineNumber;
            error.column = index - lineStart + 1;
        }

        error.description = msg;
        throw error;
    }

    function throwErrorTolerant() {
        try {
            throwError.apply(null, arguments);
        } catch (e) {
            if (extra.errors) {
                extra.errors.push(e);
            } else {
                throw e;
            }
        }
    }


    // Throw an exception because of the token.

    function throwUnexpected(token) {
        if (token.type === Token.EOF) {
            throwError(token, Messages.UnexpectedEOS);
        }

        if (token.type === Token.NumericLiteral) {
            throwError(token, Messages.UnexpectedNumber);
        }

        if (token.type === Token.StringLiteral) {
            throwError(token, Messages.UnexpectedString);
        }

        if (token.type === Token.Identifier) {
            throwError(token, Messages.UnexpectedIdentifier);
        }

        if (token.type === Token.Keyword) {
            if (isFutureReservedWord(token.value)) {
                throwError(token, Messages.UnexpectedReserved);
            } else if (strict && isStrictModeReservedWord(token.value)) {
                throwErrorTolerant(token, Messages.StrictReservedWord);
                return;
            }
            throwError(token, Messages.UnexpectedToken, token.value);
        }

        // BooleanLiteral, NullLiteral, or Punctuator.
        throwError(token, Messages.UnexpectedToken, token.value);
    }

    // Expect the next token to match the specified punctuator.
    // If not, an exception will be thrown.

    function expect(value) {
        var token = lex();
        if (token.type !== Token.Punctuator || token.value !== value) {
            throwUnexpected(token);
        }
    }

    // Expect the next token to match the specified keyword.
    // If not, an exception will be thrown.

    function expectKeyword(keyword) {
        var token = lex();
        if (token.type !== Token.Keyword || token.value !== keyword) {
            throwUnexpected(token);
        }
    }

    // Return true if the next token matches the specified punctuator.

    function match(value) {
        return lookahead.type === Token.Punctuator && lookahead.value === value;
    }

    // Return true if the next token matches the specified keyword

    function matchKeyword(keyword) {
        return lookahead.type === Token.Keyword && lookahead.value === keyword;
    }

    // Return true if the next token is an assignment operator

    function matchAssign() {
        var op;

        if (lookahead.type !== Token.Punctuator) {
            return false;
        }
        op = lookahead.value;
        return op === '=' ||
            op === '*=' ||
            op === '/=' ||
            op === '%=' ||
            op === '+=' ||
            op === '-=' ||
            op === '<<=' ||
            op === '>>=' ||
            op === '>>>=' ||
            op === '&=' ||
            op === '^=' ||
            op === '|=';
    }

    function consumeSemicolon() {
        var line, oldIndex = index, oldLineNumber = lineNumber,
            oldLineStart = lineStart, oldLookahead = lookahead;

        // Catch the very common case first: immediately a semicolon (U+003B).
        if (source.charCodeAt(index) === 0x3B || match(';')) {
            lex();
            return;
        }

        line = lineNumber;
        skipComment();
        if (lineNumber !== line) {
            index = oldIndex;
            lineNumber = oldLineNumber;
            lineStart = oldLineStart;
            lookahead = oldLookahead;
            return;
        }

        if (lookahead.type !== Token.EOF && !match('}')) {
            throwUnexpected(lookahead);
        }
    }

    // Return true if provided expression is LeftHandSideExpression

    function isLeftHandSide(expr) {
        return expr.type === Syntax.Identifier || expr.type === Syntax.MemberExpression;
    }

    // 11.1.4 Array Initialiser

    function parseArrayInitialiser() {
        var elements = [], startToken;

        startToken = lookahead;
        expect('[');

        while (!match(']')) {
            if (match(',')) {
                lex();
                elements.push(null);
            } else {
                elements.push(parseAssignmentExpression());

                if (!match(']')) {
                    expect(',');
                }
            }
        }

        lex();

        return delegate.markEnd(delegate.createArrayExpression(elements), startToken);
    }

    // 11.1.5 Object Initialiser

    function parsePropertyFunction(param, first) {
        var previousStrict, body, startToken;

        previousStrict = strict;
        startToken = lookahead;
        body = parseFunctionSourceElements();
        if (first && strict && isRestrictedWord(param[0].name)) {
            throwErrorTolerant(first, Messages.StrictParamName);
        }
        strict = previousStrict;
        return delegate.markEnd(delegate.createFunctionExpression(null, param, [], body), startToken);
    }

    function parseObjectPropertyKey() {
        var token, startToken;

        startToken = lookahead;
        token = lex();

        // Note: This function is called only from parseObjectProperty(), where
        // EOF and Punctuator tokens are already filtered out.

        if (token.type === Token.StringLiteral || token.type === Token.NumericLiteral) {
            if (strict && token.octal) {
                throwErrorTolerant(token, Messages.StrictOctalLiteral);
            }
            return delegate.markEnd(delegate.createLiteral(token), startToken);
        }

        return delegate.markEnd(delegate.createIdentifier(token.value), startToken);
    }

    function parseObjectProperty() {
        var token, key, id, value, param, startToken;

        token = lookahead;
        startToken = lookahead;

        if (token.type === Token.Identifier) {

            id = parseObjectPropertyKey();

            // Property Assignment: Getter and Setter.

            if (token.value === 'get' && !match(':')) {
                key = parseObjectPropertyKey();
                expect('(');
                expect(')');
                value = parsePropertyFunction([]);
                return delegate.markEnd(delegate.createProperty('get', key, value), startToken);
            }
            if (token.value === 'set' && !match(':')) {
                key = parseObjectPropertyKey();
                expect('(');
                token = lookahead;
                if (token.type !== Token.Identifier) {
                    expect(')');
                    throwErrorTolerant(token, Messages.UnexpectedToken, token.value);
                    value = parsePropertyFunction([]);
                } else {
                    param = [ parseVariableIdentifier() ];
                    expect(')');
                    value = parsePropertyFunction(param, token);
                }
                return delegate.markEnd(delegate.createProperty('set', key, value), startToken);
            }
            expect(':');
            value = parseAssignmentExpression();
            return delegate.markEnd(delegate.createProperty('init', id, value), startToken);
        }
        if (token.type === Token.EOF || token.type === Token.Punctuator) {
            throwUnexpected(token);
        } else {
            key = parseObjectPropertyKey();
            expect(':');
            value = parseAssignmentExpression();
            return delegate.markEnd(delegate.createProperty('init', key, value), startToken);
        }
    }

    function parseObjectInitialiser() {
        var properties = [], property, name, key, kind, map = {}, toString = String, startToken;

        startToken = lookahead;

        expect('{');

        while (!match('}')) {
            property = parseObjectProperty();

            if (property.key.type === Syntax.Identifier) {
                name = property.key.name;
            } else {
                name = toString(property.key.value);
            }
            kind = (property.kind === 'init') ? PropertyKind.Data : (property.kind === 'get') ? PropertyKind.Get : PropertyKind.Set;

            key = '$' + name;
            if (Object.prototype.hasOwnProperty.call(map, key)) {
                if (map[key] === PropertyKind.Data) {
                    if (strict && kind === PropertyKind.Data) {
                        throwErrorTolerant({}, Messages.StrictDuplicateProperty);
                    } else if (kind !== PropertyKind.Data) {
                        throwErrorTolerant({}, Messages.AccessorDataProperty);
                    }
                } else {
                    if (kind === PropertyKind.Data) {
                        throwErrorTolerant({}, Messages.AccessorDataProperty);
                    } else if (map[key] & kind) {
                        throwErrorTolerant({}, Messages.AccessorGetSet);
                    }
                }
                map[key] |= kind;
            } else {
                map[key] = kind;
            }

            properties.push(property);

            if (!match('}')) {
                expect(',');
            }
        }

        expect('}');

        return delegate.markEnd(delegate.createObjectExpression(properties), startToken);
    }

    // 11.1.6 The Grouping Operator

    function parseGroupExpression() {
        var expr;

        expect('(');

        expr = parseExpression();

        expect(')');

        return expr;
    }


    // 11.1 Primary Expressions

    function parsePrimaryExpression() {
        var type, token, expr, startToken;

        if (match('(')) {
            return parseGroupExpression();
        }

        if (match('[')) {
            return parseArrayInitialiser();
        }

        if (match('{')) {
            return parseObjectInitialiser();
        }

        type = lookahead.type;
        startToken = lookahead;

        if (type === Token.Identifier) {
            expr =  delegate.createIdentifier(lex().value);
        } else if (type === Token.StringLiteral || type === Token.NumericLiteral) {
            if (strict && lookahead.octal) {
                throwErrorTolerant(lookahead, Messages.StrictOctalLiteral);
            }
            expr = delegate.createLiteral(lex());
        } else if (type === Token.Keyword) {
            if (matchKeyword('function')) {
                return parseFunctionExpression();
            }
            if (matchKeyword('this')) {
                lex();
                expr = delegate.createThisExpression();
            } else {
                throwUnexpected(lex());
            }
        } else if (type === Token.BooleanLiteral) {
            token = lex();
            token.value = (token.value === 'true');
            expr = delegate.createLiteral(token);
        } else if (type === Token.NullLiteral) {
            token = lex();
            token.value = null;
            expr = delegate.createLiteral(token);
        } else if (match('/') || match('/=')) {
            if (typeof extra.tokens !== 'undefined') {
                expr = delegate.createLiteral(collectRegex());
            } else {
                expr = delegate.createLiteral(scanRegExp());
            }
            peek();
        } else {
            throwUnexpected(lex());
        }

        return delegate.markEnd(expr, startToken);
    }

    // 11.2 Left-Hand-Side Expressions

    function parseArguments() {
        var args = [];

        expect('(');

        if (!match(')')) {
            while (index < length) {
                args.push(parseAssignmentExpression());
                if (match(')')) {
                    break;
                }
                expect(',');
            }
        }

        expect(')');

        return args;
    }

    function parseNonComputedProperty() {
        var token, startToken;

        startToken = lookahead;
        token = lex();

        if (!isIdentifierName(token)) {
            throwUnexpected(token);
        }

        return delegate.markEnd(delegate.createIdentifier(token.value), startToken);
    }

    function parseNonComputedMember() {
        expect('.');

        return parseNonComputedProperty();
    }

    function parseComputedMember() {
        var expr;

        expect('[');

        expr = parseExpression();

        expect(']');

        return expr;
    }

    function parseNewExpression() {
        var callee, args, startToken;

        startToken = lookahead;
        expectKeyword('new');
        callee = parseLeftHandSideExpression();
        args = match('(') ? parseArguments() : [];

        return delegate.markEnd(delegate.createNewExpression(callee, args), startToken);
    }

    function parseLeftHandSideExpressionAllowCall() {
        var expr, args, property, startToken, previousAllowIn = state.allowIn;

        startToken = lookahead;
        state.allowIn = true;
        expr = matchKeyword('new') ? parseNewExpression() : parsePrimaryExpression();

        for (;;) {
            if (match('.')) {
                property = parseNonComputedMember();
                expr = delegate.createMemberExpression('.', expr, property);
            } else if (match('(')) {
                args = parseArguments();
                expr = delegate.createCallExpression(expr, args);
            } else if (match('[')) {
                property = parseComputedMember();
                expr = delegate.createMemberExpression('[', expr, property);
            } else {
                break;
            }
            delegate.markEnd(expr, startToken);
        }
        state.allowIn = previousAllowIn;

        return expr;
    }

    function parseLeftHandSideExpression() {
        var expr, property, startToken;
        assert(state.allowIn, 'callee of new expression always allow in keyword.');

        startToken = lookahead;

        expr = matchKeyword('new') ? parseNewExpression() : parsePrimaryExpression();

        while (match('.') || match('[')) {
            if (match('[')) {
                property = parseComputedMember();
                expr = delegate.createMemberExpression('[', expr, property);
            } else {
                property = parseNonComputedMember();
                expr = delegate.createMemberExpression('.', expr, property);
            }
            delegate.markEnd(expr, startToken);
        }
        return expr;
    }

    // 11.3 Postfix Expressions

    function parsePostfixExpression() {
        var expr, token, startToken = lookahead;

        expr = parseLeftHandSideExpressionAllowCall();

        if (lookahead.type === Token.Punctuator) {
            if ((match('++') || match('--')) && !peekLineTerminator()) {
                // 11.3.1, 11.3.2
                if (strict && expr.type === Syntax.Identifier && isRestrictedWord(expr.name)) {
                    throwErrorTolerant({}, Messages.StrictLHSPostfix);
                }

                if (!isLeftHandSide(expr)) {
                    throwErrorTolerant({}, Messages.InvalidLHSInAssignment);
                }

                token = lex();
                expr = delegate.markEnd(delegate.createPostfixExpression(token.value, expr), startToken);
            }
        }

        return expr;
    }

    // 11.4 Unary Operators

    function parseUnaryExpression() {
        var token, expr, startToken;

        if (lookahead.type !== Token.Punctuator && lookahead.type !== Token.Keyword) {
            expr = parsePostfixExpression();
        } else if (match('++') || match('--')) {
            startToken = lookahead;
            token = lex();
            expr = parseUnaryExpression();
            // 11.4.4, 11.4.5
            if (strict && expr.type === Syntax.Identifier && isRestrictedWord(expr.name)) {
                throwErrorTolerant({}, Messages.StrictLHSPrefix);
            }

            if (!isLeftHandSide(expr)) {
                throwErrorTolerant({}, Messages.InvalidLHSInAssignment);
            }

            expr = delegate.createUnaryExpression(token.value, expr);
            expr = delegate.markEnd(expr, startToken);
        } else if (match('+') || match('-') || match('~') || match('!')) {
            startToken = lookahead;
            token = lex();
            expr = parseUnaryExpression();
            expr = delegate.createUnaryExpression(token.value, expr);
            expr = delegate.markEnd(expr, startToken);
        } else if (matchKeyword('delete') || matchKeyword('void') || matchKeyword('typeof')) {
            startToken = lookahead;
            token = lex();
            expr = parseUnaryExpression();
            expr = delegate.createUnaryExpression(token.value, expr);
            expr = delegate.markEnd(expr, startToken);
            if (strict && expr.operator === 'delete' && expr.argument.type === Syntax.Identifier) {
                throwErrorTolerant({}, Messages.StrictDelete);
            }
        } else {
            expr = parsePostfixExpression();
        }

        return expr;
    }

    function binaryPrecedence(token, allowIn) {
        var prec = 0;

        if (token.type !== Token.Punctuator && token.type !== Token.Keyword) {
            return 0;
        }

        switch (token.value) {
        case '||':
            prec = 1;
            break;

        case '&&':
            prec = 2;
            break;

        case '|':
            prec = 3;
            break;

        case '^':
            prec = 4;
            break;

        case '&':
            prec = 5;
            break;

        case '==':
        case '!=':
        case '===':
        case '!==':
            prec = 6;
            break;

        case '<':
        case '>':
        case '<=':
        case '>=':
        case 'instanceof':
            prec = 7;
            break;

        case 'in':
            prec = allowIn ? 7 : 0;
            break;

        case '<<':
        case '>>':
        case '>>>':
            prec = 8;
            break;

        case '+':
        case '-':
            prec = 9;
            break;

        case '*':
        case '/':
        case '%':
            prec = 11;
            break;

        default:
            break;
        }

        return prec;
    }

    // 11.5 Multiplicative Operators
    // 11.6 Additive Operators
    // 11.7 Bitwise Shift Operators
    // 11.8 Relational Operators
    // 11.9 Equality Operators
    // 11.10 Binary Bitwise Operators
    // 11.11 Binary Logical Operators

    function parseBinaryExpression() {
        var marker, markers, expr, token, prec, stack, right, operator, left, i;

        marker = lookahead;
        left = parseUnaryExpression();

        token = lookahead;
        prec = binaryPrecedence(token, state.allowIn);
        if (prec === 0) {
            return left;
        }
        token.prec = prec;
        lex();

        markers = [marker, lookahead];
        right = parseUnaryExpression();

        stack = [left, token, right];

        while ((prec = binaryPrecedence(lookahead, state.allowIn)) > 0) {

            // Reduce: make a binary expression from the three topmost entries.
            while ((stack.length > 2) && (prec <= stack[stack.length - 2].prec)) {
                right = stack.pop();
                operator = stack.pop().value;
                left = stack.pop();
                expr = delegate.createBinaryExpression(operator, left, right);
                markers.pop();
                marker = markers[markers.length - 1];
                delegate.markEnd(expr, marker);
                stack.push(expr);
            }

            // Shift.
            token = lex();
            token.prec = prec;
            stack.push(token);
            markers.push(lookahead);
            expr = parseUnaryExpression();
            stack.push(expr);
        }

        // Final reduce to clean-up the stack.
        i = stack.length - 1;
        expr = stack[i];
        markers.pop();
        while (i > 1) {
            expr = delegate.createBinaryExpression(stack[i - 1].value, stack[i - 2], expr);
            i -= 2;
            marker = markers.pop();
            delegate.markEnd(expr, marker);
        }

        return expr;
    }


    // 11.12 Conditional Operator

    function parseConditionalExpression() {
        var expr, previousAllowIn, consequent, alternate, startToken;

        startToken = lookahead;

        expr = parseBinaryExpression();

        if (match('?')) {
            lex();
            previousAllowIn = state.allowIn;
            state.allowIn = true;
            consequent = parseAssignmentExpression();
            state.allowIn = previousAllowIn;
            expect(':');
            alternate = parseAssignmentExpression();

            expr = delegate.createConditionalExpression(expr, consequent, alternate);
            delegate.markEnd(expr, startToken);
        }

        return expr;
    }

    // 11.13 Assignment Operators

    function parseAssignmentExpression() {
        var token, left, right, node, startToken;

        token = lookahead;
        startToken = lookahead;

        node = left = parseConditionalExpression();

        if (matchAssign()) {
            // LeftHandSideExpression
            if (!isLeftHandSide(left)) {
                throwErrorTolerant({}, Messages.InvalidLHSInAssignment);
            }

            // 11.13.1
            if (strict && left.type === Syntax.Identifier && isRestrictedWord(left.name)) {
                throwErrorTolerant(token, Messages.StrictLHSAssignment);
            }

            token = lex();
            right = parseAssignmentExpression();
            node = delegate.markEnd(delegate.createAssignmentExpression(token.value, left, right), startToken);
        }

        return node;
    }

    // 11.14 Comma Operator

    function parseExpression() {
        var expr, startToken = lookahead;

        expr = parseAssignmentExpression();

        if (match(',')) {
            expr = delegate.createSequenceExpression([ expr ]);

            while (index < length) {
                if (!match(',')) {
                    break;
                }
                lex();
                expr.expressions.push(parseAssignmentExpression());
            }

            delegate.markEnd(expr, startToken);
        }

        return expr;
    }

    // 12.1 Block

    function parseStatementList() {
        var list = [],
            statement;

        while (index < length) {
            if (match('}')) {
                break;
            }
            statement = parseSourceElement();
            if (typeof statement === 'undefined') {
                break;
            }
            list.push(statement);
        }

        return list;
    }

    function parseBlock() {
        var block, startToken;

        startToken = lookahead;
        expect('{');

        block = parseStatementList();

        expect('}');

        return delegate.markEnd(delegate.createBlockStatement(block), startToken);
    }

    // 12.2 Variable Statement

    function parseVariableIdentifier() {
        var token, startToken;

        startToken = lookahead;
        token = lex();

        if (token.type !== Token.Identifier) {
            throwUnexpected(token);
        }

        return delegate.markEnd(delegate.createIdentifier(token.value), startToken);
    }

    function parseVariableDeclaration(kind) {
        var init = null, id, startToken;

        startToken = lookahead;
        id = parseVariableIdentifier();

        // 12.2.1
        if (strict && isRestrictedWord(id.name)) {
            throwErrorTolerant({}, Messages.StrictVarName);
        }

        if (kind === 'const') {
            expect('=');
            init = parseAssignmentExpression();
        } else if (match('=')) {
            lex();
            init = parseAssignmentExpression();
        }

        return delegate.markEnd(delegate.createVariableDeclarator(id, init), startToken);
    }

    function parseVariableDeclarationList(kind) {
        var list = [];

        do {
            list.push(parseVariableDeclaration(kind));
            if (!match(',')) {
                break;
            }
            lex();
        } while (index < length);

        return list;
    }

    function parseVariableStatement() {
        var declarations;

        expectKeyword('var');

        declarations = parseVariableDeclarationList();

        consumeSemicolon();

        return delegate.createVariableDeclaration(declarations, 'var');
    }

    // kind may be `const` or `let`
    // Both are experimental and not in the specification yet.
    // see http://wiki.ecmascript.org/doku.php?id=harmony:const
    // and http://wiki.ecmascript.org/doku.php?id=harmony:let
    function parseConstLetDeclaration(kind) {
        var declarations, startToken;

        startToken = lookahead;

        expectKeyword(kind);

        declarations = parseVariableDeclarationList(kind);

        consumeSemicolon();

        return delegate.markEnd(delegate.createVariableDeclaration(declarations, kind), startToken);
    }

    // 12.3 Empty Statement

    function parseEmptyStatement() {
        expect(';');
        return delegate.createEmptyStatement();
    }

    // 12.4 Expression Statement

    function parseExpressionStatement() {
        var expr = parseExpression();
        consumeSemicolon();
        return delegate.createExpressionStatement(expr);
    }

    // 12.5 If statement

    function parseIfStatement() {
        var test, consequent, alternate;

        expectKeyword('if');

        expect('(');

        test = parseExpression();

        expect(')');

        consequent = parseStatement();

        if (matchKeyword('else')) {
            lex();
            alternate = parseStatement();
        } else {
            alternate = null;
        }

        return delegate.createIfStatement(test, consequent, alternate);
    }

    // 12.6 Iteration Statements

    function parseDoWhileStatement() {
        var body, test, oldInIteration;

        expectKeyword('do');

        oldInIteration = state.inIteration;
        state.inIteration = true;

        body = parseStatement();

        state.inIteration = oldInIteration;

        expectKeyword('while');

        expect('(');

        test = parseExpression();

        expect(')');

        if (match(';')) {
            lex();
        }

        return delegate.createDoWhileStatement(body, test);
    }

    function parseWhileStatement() {
        var test, body, oldInIteration;

        expectKeyword('while');

        expect('(');

        test = parseExpression();

        expect(')');

        oldInIteration = state.inIteration;
        state.inIteration = true;

        body = parseStatement();

        state.inIteration = oldInIteration;

        return delegate.createWhileStatement(test, body);
    }

    function parseForVariableDeclaration() {
        var token, declarations, startToken;

        startToken = lookahead;
        token = lex();
        declarations = parseVariableDeclarationList();

        return delegate.markEnd(delegate.createVariableDeclaration(declarations, token.value), startToken);
    }

    function parseForStatement() {
        var init, test, update, left, right, body, oldInIteration, previousAllowIn = state.allowIn;

        init = test = update = null;

        expectKeyword('for');

        expect('(');

        if (match(';')) {
            lex();
        } else {
            if (matchKeyword('var') || matchKeyword('let')) {
                state.allowIn = false;
                init = parseForVariableDeclaration();
                state.allowIn = previousAllowIn;

                if (init.declarations.length === 1 && matchKeyword('in')) {
                    lex();
                    left = init;
                    right = parseExpression();
                    init = null;
                }
            } else {
                state.allowIn = false;
                init = parseExpression();
                state.allowIn = previousAllowIn;

                if (matchKeyword('in')) {
                    // LeftHandSideExpression
                    if (!isLeftHandSide(init)) {
                        throwErrorTolerant({}, Messages.InvalidLHSInForIn);
                    }

                    lex();
                    left = init;
                    right = parseExpression();
                    init = null;
                }
            }

            if (typeof left === 'undefined') {
                expect(';');
            }
        }

        if (typeof left === 'undefined') {

            if (!match(';')) {
                test = parseExpression();
            }
            expect(';');

            if (!match(')')) {
                update = parseExpression();
            }
        }

        expect(')');

        oldInIteration = state.inIteration;
        state.inIteration = true;

        body = parseStatement();

        state.inIteration = oldInIteration;

        return (typeof left === 'undefined') ?
                delegate.createForStatement(init, test, update, body) :
                delegate.createForInStatement(left, right, body);
    }

    // 12.7 The continue statement

    function parseContinueStatement() {
        var label = null, key;

        expectKeyword('continue');

        // Optimize the most common form: 'continue;'.
        if (source.charCodeAt(index) === 0x3B) {
            lex();

            if (!state.inIteration) {
                throwError({}, Messages.IllegalContinue);
            }

            return delegate.createContinueStatement(null);
        }

        if (peekLineTerminator()) {
            if (!state.inIteration) {
                throwError({}, Messages.IllegalContinue);
            }

            return delegate.createContinueStatement(null);
        }

        if (lookahead.type === Token.Identifier) {
            label = parseVariableIdentifier();

            key = '$' + label.name;
            if (!Object.prototype.hasOwnProperty.call(state.labelSet, key)) {
                throwError({}, Messages.UnknownLabel, label.name);
            }
        }

        consumeSemicolon();

        if (label === null && !state.inIteration) {
            throwError({}, Messages.IllegalContinue);
        }

        return delegate.createContinueStatement(label);
    }

    // 12.8 The break statement

    function parseBreakStatement() {
        var label = null, key;

        expectKeyword('break');

        // Catch the very common case first: immediately a semicolon (U+003B).
        if (source.charCodeAt(index) === 0x3B) {
            lex();

            if (!(state.inIteration || state.inSwitch)) {
                throwError({}, Messages.IllegalBreak);
            }

            return delegate.createBreakStatement(null);
        }

        if (peekLineTerminator()) {
            if (!(state.inIteration || state.inSwitch)) {
                throwError({}, Messages.IllegalBreak);
            }

            return delegate.createBreakStatement(null);
        }

        if (lookahead.type === Token.Identifier) {
            label = parseVariableIdentifier();

            key = '$' + label.name;
            if (!Object.prototype.hasOwnProperty.call(state.labelSet, key)) {
                throwError({}, Messages.UnknownLabel, label.name);
            }
        }

        consumeSemicolon();

        if (label === null && !(state.inIteration || state.inSwitch)) {
            throwError({}, Messages.IllegalBreak);
        }

        return delegate.createBreakStatement(label);
    }

    // 12.9 The return statement

    function parseReturnStatement() {
        var argument = null;

        expectKeyword('return');

        if (!state.inFunctionBody) {
            throwErrorTolerant({}, Messages.IllegalReturn);
        }

        // 'return' followed by a space and an identifier is very common.
        if (source.charCodeAt(index) === 0x20) {
            if (isIdentifierStart(source.charCodeAt(index + 1))) {
                argument = parseExpression();
                consumeSemicolon();
                return delegate.createReturnStatement(argument);
            }
        }

        if (peekLineTerminator()) {
            return delegate.createReturnStatement(null);
        }

        if (!match(';')) {
            if (!match('}') && lookahead.type !== Token.EOF) {
                argument = parseExpression();
            }
        }

        consumeSemicolon();

        return delegate.createReturnStatement(argument);
    }

    // 12.10 The with statement

    function parseWithStatement() {
        var object, body;

        if (strict) {
            // TODO(ikarienator): Should we update the test cases instead?
            skipComment();
            throwErrorTolerant({}, Messages.StrictModeWith);
        }

        expectKeyword('with');

        expect('(');

        object = parseExpression();

        expect(')');

        body = parseStatement();

        return delegate.createWithStatement(object, body);
    }

    // 12.10 The swith statement

    function parseSwitchCase() {
        var test, consequent = [], statement, startToken;

        startToken = lookahead;
        if (matchKeyword('default')) {
            lex();
            test = null;
        } else {
            expectKeyword('case');
            test = parseExpression();
        }
        expect(':');

        while (index < length) {
            if (match('}') || matchKeyword('default') || matchKeyword('case')) {
                break;
            }
            statement = parseStatement();
            consequent.push(statement);
        }

        return delegate.markEnd(delegate.createSwitchCase(test, consequent), startToken);
    }

    function parseSwitchStatement() {
        var discriminant, cases, clause, oldInSwitch, defaultFound;

        expectKeyword('switch');

        expect('(');

        discriminant = parseExpression();

        expect(')');

        expect('{');

        cases = [];

        if (match('}')) {
            lex();
            return delegate.createSwitchStatement(discriminant, cases);
        }

        oldInSwitch = state.inSwitch;
        state.inSwitch = true;
        defaultFound = false;

        while (index < length) {
            if (match('}')) {
                break;
            }
            clause = parseSwitchCase();
            if (clause.test === null) {
                if (defaultFound) {
                    throwError({}, Messages.MultipleDefaultsInSwitch);
                }
                defaultFound = true;
            }
            cases.push(clause);
        }

        state.inSwitch = oldInSwitch;

        expect('}');

        return delegate.createSwitchStatement(discriminant, cases);
    }

    // 12.13 The throw statement

    function parseThrowStatement() {
        var argument;

        expectKeyword('throw');

        if (peekLineTerminator()) {
            throwError({}, Messages.NewlineAfterThrow);
        }

        argument = parseExpression();

        consumeSemicolon();

        return delegate.createThrowStatement(argument);
    }

    // 12.14 The try statement

    function parseCatchClause() {
        var param, body, startToken;

        startToken = lookahead;
        expectKeyword('catch');

        expect('(');
        if (match(')')) {
            throwUnexpected(lookahead);
        }

        param = parseVariableIdentifier();
        // 12.14.1
        if (strict && isRestrictedWord(param.name)) {
            throwErrorTolerant({}, Messages.StrictCatchVariable);
        }

        expect(')');
        body = parseBlock();
        return delegate.markEnd(delegate.createCatchClause(param, body), startToken);
    }

    function parseTryStatement() {
        var block, handlers = [], finalizer = null;

        expectKeyword('try');

        block = parseBlock();

        if (matchKeyword('catch')) {
            handlers.push(parseCatchClause());
        }

        if (matchKeyword('finally')) {
            lex();
            finalizer = parseBlock();
        }

        if (handlers.length === 0 && !finalizer) {
            throwError({}, Messages.NoCatchOrFinally);
        }

        return delegate.createTryStatement(block, [], handlers, finalizer);
    }

    // 12.15 The debugger statement

    function parseDebuggerStatement() {
        expectKeyword('debugger');

        consumeSemicolon();

        return delegate.createDebuggerStatement();
    }

    // 12 Statements

    function parseStatement() {
        var type = lookahead.type,
            expr,
            labeledBody,
            key,
            startToken;

        if (type === Token.EOF) {
            throwUnexpected(lookahead);
        }

        if (type === Token.Punctuator && lookahead.value === '{') {
            return parseBlock();
        }

        startToken = lookahead;

        if (type === Token.Punctuator) {
            switch (lookahead.value) {
            case ';':
                return delegate.markEnd(parseEmptyStatement(), startToken);
            case '(':
                return delegate.markEnd(parseExpressionStatement(), startToken);
            default:
                break;
            }
        }

        if (type === Token.Keyword) {
            switch (lookahead.value) {
            case 'break':
                return delegate.markEnd(parseBreakStatement(), startToken);
            case 'continue':
                return delegate.markEnd(parseContinueStatement(), startToken);
            case 'debugger':
                return delegate.markEnd(parseDebuggerStatement(), startToken);
            case 'do':
                return delegate.markEnd(parseDoWhileStatement(), startToken);
            case 'for':
                return delegate.markEnd(parseForStatement(), startToken);
            case 'function':
                return delegate.markEnd(parseFunctionDeclaration(), startToken);
            case 'if':
                return delegate.markEnd(parseIfStatement(), startToken);
            case 'return':
                return delegate.markEnd(parseReturnStatement(), startToken);
            case 'switch':
                return delegate.markEnd(parseSwitchStatement(), startToken);
            case 'throw':
                return delegate.markEnd(parseThrowStatement(), startToken);
            case 'try':
                return delegate.markEnd(parseTryStatement(), startToken);
            case 'var':
                return delegate.markEnd(parseVariableStatement(), startToken);
            case 'while':
                return delegate.markEnd(parseWhileStatement(), startToken);
            case 'with':
                return delegate.markEnd(parseWithStatement(), startToken);
            default:
                break;
            }
        }

        expr = parseExpression();

        // 12.12 Labelled Statements
        if ((expr.type === Syntax.Identifier) && match(':')) {
            lex();

            key = '$' + expr.name;
            if (Object.prototype.hasOwnProperty.call(state.labelSet, key)) {
                throwError({}, Messages.Redeclaration, 'Label', expr.name);
            }

            state.labelSet[key] = true;
            labeledBody = parseStatement();
            delete state.labelSet[key];
            return delegate.markEnd(delegate.createLabeledStatement(expr, labeledBody), startToken);
        }

        consumeSemicolon();

        return delegate.markEnd(delegate.createExpressionStatement(expr), startToken);
    }

    // 13 Function Definition

    function parseFunctionSourceElements() {
        var sourceElement, sourceElements = [], token, directive, firstRestricted,
            oldLabelSet, oldInIteration, oldInSwitch, oldInFunctionBody, startToken;

        startToken = lookahead;
        expect('{');

        while (index < length) {
            if (lookahead.type !== Token.StringLiteral) {
                break;
            }
            token = lookahead;

            sourceElement = parseSourceElement();
            sourceElements.push(sourceElement);
            if (sourceElement.expression.type !== Syntax.Literal) {
                // this is not directive
                break;
            }
            directive = source.slice(token.start + 1, token.end - 1);
            if (directive === 'use strict') {
                strict = true;
                if (firstRestricted) {
                    throwErrorTolerant(firstRestricted, Messages.StrictOctalLiteral);
                }
            } else {
                if (!firstRestricted && token.octal) {
                    firstRestricted = token;
                }
            }
        }

        oldLabelSet = state.labelSet;
        oldInIteration = state.inIteration;
        oldInSwitch = state.inSwitch;
        oldInFunctionBody = state.inFunctionBody;

        state.labelSet = {};
        state.inIteration = false;
        state.inSwitch = false;
        state.inFunctionBody = true;

        while (index < length) {
            if (match('}')) {
                break;
            }
            sourceElement = parseSourceElement();
            if (typeof sourceElement === 'undefined') {
                break;
            }
            sourceElements.push(sourceElement);
        }

        expect('}');

        state.labelSet = oldLabelSet;
        state.inIteration = oldInIteration;
        state.inSwitch = oldInSwitch;
        state.inFunctionBody = oldInFunctionBody;

        return delegate.markEnd(delegate.createBlockStatement(sourceElements), startToken);
    }

    function parseParams(firstRestricted) {
        var param, params = [], token, stricted, paramSet, key, message;
        expect('(');

        if (!match(')')) {
            paramSet = {};
            while (index < length) {
                token = lookahead;
                param = parseVariableIdentifier();
                key = '$' + token.value;
                if (strict) {
                    if (isRestrictedWord(token.value)) {
                        stricted = token;
                        message = Messages.StrictParamName;
                    }
                    if (Object.prototype.hasOwnProperty.call(paramSet, key)) {
                        stricted = token;
                        message = Messages.StrictParamDupe;
                    }
                } else if (!firstRestricted) {
                    if (isRestrictedWord(token.value)) {
                        firstRestricted = token;
                        message = Messages.StrictParamName;
                    } else if (isStrictModeReservedWord(token.value)) {
                        firstRestricted = token;
                        message = Messages.StrictReservedWord;
                    } else if (Object.prototype.hasOwnProperty.call(paramSet, key)) {
                        firstRestricted = token;
                        message = Messages.StrictParamDupe;
                    }
                }
                params.push(param);
                paramSet[key] = true;
                if (match(')')) {
                    break;
                }
                expect(',');
            }
        }

        expect(')');

        return {
            params: params,
            stricted: stricted,
            firstRestricted: firstRestricted,
            message: message
        };
    }

    function parseFunctionDeclaration() {
        var id, params = [], body, token, stricted, tmp, firstRestricted, message, previousStrict, startToken;

        startToken = lookahead;

        expectKeyword('function');
        token = lookahead;
        id = parseVariableIdentifier();
        if (strict) {
            if (isRestrictedWord(token.value)) {
                throwErrorTolerant(token, Messages.StrictFunctionName);
            }
        } else {
            if (isRestrictedWord(token.value)) {
                firstRestricted = token;
                message = Messages.StrictFunctionName;
            } else if (isStrictModeReservedWord(token.value)) {
                firstRestricted = token;
                message = Messages.StrictReservedWord;
            }
        }

        tmp = parseParams(firstRestricted);
        params = tmp.params;
        stricted = tmp.stricted;
        firstRestricted = tmp.firstRestricted;
        if (tmp.message) {
            message = tmp.message;
        }

        previousStrict = strict;
        body = parseFunctionSourceElements();
        if (strict && firstRestricted) {
            throwError(firstRestricted, message);
        }
        if (strict && stricted) {
            throwErrorTolerant(stricted, message);
        }
        strict = previousStrict;

        return delegate.markEnd(delegate.createFunctionDeclaration(id, params, [], body), startToken);
    }

    function parseFunctionExpression() {
        var token, id = null, stricted, firstRestricted, message, tmp, params = [], body, previousStrict, startToken;

        startToken = lookahead;
        expectKeyword('function');

        if (!match('(')) {
            token = lookahead;
            id = parseVariableIdentifier();
            if (strict) {
                if (isRestrictedWord(token.value)) {
                    throwErrorTolerant(token, Messages.StrictFunctionName);
                }
            } else {
                if (isRestrictedWord(token.value)) {
                    firstRestricted = token;
                    message = Messages.StrictFunctionName;
                } else if (isStrictModeReservedWord(token.value)) {
                    firstRestricted = token;
                    message = Messages.StrictReservedWord;
                }
            }
        }

        tmp = parseParams(firstRestricted);
        params = tmp.params;
        stricted = tmp.stricted;
        firstRestricted = tmp.firstRestricted;
        if (tmp.message) {
            message = tmp.message;
        }

        previousStrict = strict;
        body = parseFunctionSourceElements();
        if (strict && firstRestricted) {
            throwError(firstRestricted, message);
        }
        if (strict && stricted) {
            throwErrorTolerant(stricted, message);
        }
        strict = previousStrict;

        return delegate.markEnd(delegate.createFunctionExpression(id, params, [], body), startToken);
    }

    // 14 Program

    function parseSourceElement() {
        if (lookahead.type === Token.Keyword) {
            switch (lookahead.value) {
            case 'const':
            case 'let':
                return parseConstLetDeclaration(lookahead.value);
            case 'function':
                return parseFunctionDeclaration();
            default:
                return parseStatement();
            }
        }

        if (lookahead.type !== Token.EOF) {
            return parseStatement();
        }
    }

    function parseSourceElements() {
        var sourceElement, sourceElements = [], token, directive, firstRestricted;

        while (index < length) {
            token = lookahead;
            if (token.type !== Token.StringLiteral) {
                break;
            }

            sourceElement = parseSourceElement();
            sourceElements.push(sourceElement);
            if (sourceElement.expression.type !== Syntax.Literal) {
                // this is not directive
                break;
            }
            directive = source.slice(token.start + 1, token.end - 1);
            if (directive === 'use strict') {
                strict = true;
                if (firstRestricted) {
                    throwErrorTolerant(firstRestricted, Messages.StrictOctalLiteral);
                }
            } else {
                if (!firstRestricted && token.octal) {
                    firstRestricted = token;
                }
            }
        }

        while (index < length) {
            sourceElement = parseSourceElement();
            /* istanbul ignore if */
            if (typeof sourceElement === 'undefined') {
                break;
            }
            sourceElements.push(sourceElement);
        }
        return sourceElements;
    }

    function parseProgram() {
        var body, startToken;

        skipComment();
        peek();
        startToken = lookahead;
        strict = false;

        body = parseSourceElements();
        return delegate.markEnd(delegate.createProgram(body), startToken);
    }

    function filterTokenLocation() {
        var i, entry, token, tokens = [];

        for (i = 0; i < extra.tokens.length; ++i) {
            entry = extra.tokens[i];
            token = {
                type: entry.type,
                value: entry.value
            };
            if (extra.range) {
                token.range = entry.range;
            }
            if (extra.loc) {
                token.loc = entry.loc;
            }
            tokens.push(token);
        }

        extra.tokens = tokens;
    }

    function tokenize(code, options) {
        var toString,
            token,
            tokens;

        toString = String;
        if (typeof code !== 'string' && !(code instanceof String)) {
            code = toString(code);
        }

        delegate = SyntaxTreeDelegate;
        source = code;
        index = 0;
        lineNumber = (source.length > 0) ? 1 : 0;
        lineStart = 0;
        length = source.length;
        lookahead = null;
        state = {
            allowIn: true,
            labelSet: {},
            inFunctionBody: false,
            inIteration: false,
            inSwitch: false,
            lastCommentStart: -1
        };

        extra = {};

        // Options matching.
        options = options || {};

        // Of course we collect tokens here.
        options.tokens = true;
        extra.tokens = [];
        extra.tokenize = true;
        // The following two fields are necessary to compute the Regex tokens.
        extra.openParenToken = -1;
        extra.openCurlyToken = -1;

        extra.range = (typeof options.range === 'boolean') && options.range;
        extra.loc = (typeof options.loc === 'boolean') && options.loc;

        if (typeof options.comment === 'boolean' && options.comment) {
            extra.comments = [];
        }
        if (typeof options.tolerant === 'boolean' && options.tolerant) {
            extra.errors = [];
        }

        try {
            peek();
            if (lookahead.type === Token.EOF) {
                return extra.tokens;
            }

            token = lex();
            while (lookahead.type !== Token.EOF) {
                try {
                    token = lex();
                } catch (lexError) {
                    token = lookahead;
                    if (extra.errors) {
                        extra.errors.push(lexError);
                        // We have to break on the first error
                        // to avoid infinite loops.
                        break;
                    } else {
                        throw lexError;
                    }
                }
            }

            filterTokenLocation();
            tokens = extra.tokens;
            if (typeof extra.comments !== 'undefined') {
                tokens.comments = extra.comments;
            }
            if (typeof extra.errors !== 'undefined') {
                tokens.errors = extra.errors;
            }
        } catch (e) {
            throw e;
        } finally {
            extra = {};
        }
        return tokens;
    }

    function parse(code, options) {
        var program, toString;

        toString = String;
        if (typeof code !== 'string' && !(code instanceof String)) {
            code = toString(code);
        }

        delegate = SyntaxTreeDelegate;
        source = code;
        index = 0;
        lineNumber = (source.length > 0) ? 1 : 0;
        lineStart = 0;
        length = source.length;
        lookahead = null;
        state = {
            allowIn: true,
            labelSet: {},
            inFunctionBody: false,
            inIteration: false,
            inSwitch: false,
            lastCommentStart: -1
        };

        extra = {};
        if (typeof options !== 'undefined') {
            extra.range = (typeof options.range === 'boolean') && options.range;
            extra.loc = (typeof options.loc === 'boolean') && options.loc;
            extra.attachComment = (typeof options.attachComment === 'boolean') && options.attachComment;

            if (extra.loc && options.source !== null && options.source !== undefined) {
                extra.source = toString(options.source);
            }

            if (typeof options.tokens === 'boolean' && options.tokens) {
                extra.tokens = [];
            }
            if (typeof options.comment === 'boolean' && options.comment) {
                extra.comments = [];
            }
            if (typeof options.tolerant === 'boolean' && options.tolerant) {
                extra.errors = [];
            }
            if (extra.attachComment) {
                extra.range = true;
                extra.comments = [];
                extra.bottomRightStack = [];
                extra.trailingComments = [];
                extra.leadingComments = [];
            }
        }

        try {
            program = parseProgram();
            if (typeof extra.comments !== 'undefined') {
                program.comments = extra.comments;
            }
            if (typeof extra.tokens !== 'undefined') {
                filterTokenLocation();
                program.tokens = extra.tokens;
            }
            if (typeof extra.errors !== 'undefined') {
                program.errors = extra.errors;
            }
        } catch (e) {
            throw e;
        } finally {
            extra = {};
        }

        return program;
    }

    // Sync with *.json manifests.
    exports.version = '1.2.5';

    exports.tokenize = tokenize;

    exports.parse = parse;

    // Deep copy.
   /* istanbul ignore next */
    exports.Syntax = (function () {
        var name, types = {};

        if (typeof Object.create === 'function') {
            types = Object.create(null);
        }

        for (name in Syntax) {
            if (Syntax.hasOwnProperty(name)) {
                types[name] = Syntax[name];
            }
        }

        if (typeof Object.freeze === 'function') {
            Object.freeze(types);
        }

        return types;
    }());

}));
/* vim: set sw=4 ts=4 et tw=80 : */

},{}],14:[function(require,module,exports){
"use strict"

function iota(n) {
  var result = new Array(n)
  for(var i=0; i<n; ++i) {
    result[i] = i
  }
  return result
}

module.exports = iota
},{}],15:[function(require,module,exports){
/*!
 * Determine if an object is a Buffer
 *
 * @author   Feross Aboukhadijeh <https://feross.org>
 * @license  MIT
 */

// The _isBuffer check is for Safari 5-7 support, because it's missing
// Object.prototype.constructor. Remove this eventually
module.exports = function (obj) {
  return obj != null && (isBuffer(obj) || isSlowBuffer(obj) || !!obj._isBuffer)
}

function isBuffer (obj) {
  return !!obj.constructor && typeof obj.constructor.isBuffer === 'function' && obj.constructor.isBuffer(obj)
}

// For Node v0.10 support. Remove this eventually.
function isSlowBuffer (obj) {
  return typeof obj.readFloatLE === 'function' && typeof obj.slice === 'function' && isBuffer(obj.slice(0, 0))
}

},{}],16:[function(require,module,exports){
var iota = require("iota-array")
var isBuffer = require("is-buffer")

var hasTypedArrays  = ((typeof Float64Array) !== "undefined")

function compare1st(a, b) {
  return a[0] - b[0]
}

function order() {
  var stride = this.stride
  var terms = new Array(stride.length)
  var i
  for(i=0; i<terms.length; ++i) {
    terms[i] = [Math.abs(stride[i]), i]
  }
  terms.sort(compare1st)
  var result = new Array(terms.length)
  for(i=0; i<result.length; ++i) {
    result[i] = terms[i][1]
  }
  return result
}

function compileConstructor(dtype, dimension) {
  var className = ["View", dimension, "d", dtype].join("")
  if(dimension < 0) {
    className = "View_Nil" + dtype
  }
  var useGetters = (dtype === "generic")

  if(dimension === -1) {
    //Special case for trivial arrays
    var code =
      "function "+className+"(a){this.data=a;};\
var proto="+className+".prototype;\
proto.dtype='"+dtype+"';\
proto.index=function(){return -1};\
proto.size=0;\
proto.dimension=-1;\
proto.shape=proto.stride=proto.order=[];\
proto.lo=proto.hi=proto.transpose=proto.step=\
function(){return new "+className+"(this.data);};\
proto.get=proto.set=function(){};\
proto.pick=function(){return null};\
return function construct_"+className+"(a){return new "+className+"(a);}"
    var procedure = new Function(code)
    return procedure()
  } else if(dimension === 0) {
    //Special case for 0d arrays
    var code =
      "function "+className+"(a,d) {\
this.data = a;\
this.offset = d\
};\
var proto="+className+".prototype;\
proto.dtype='"+dtype+"';\
proto.index=function(){return this.offset};\
proto.dimension=0;\
proto.size=1;\
proto.shape=\
proto.stride=\
proto.order=[];\
proto.lo=\
proto.hi=\
proto.transpose=\
proto.step=function "+className+"_copy() {\
return new "+className+"(this.data,this.offset)\
};\
proto.pick=function "+className+"_pick(){\
return TrivialArray(this.data);\
};\
proto.valueOf=proto.get=function "+className+"_get(){\
return "+(useGetters ? "this.data.get(this.offset)" : "this.data[this.offset]")+
"};\
proto.set=function "+className+"_set(v){\
return "+(useGetters ? "this.data.set(this.offset,v)" : "this.data[this.offset]=v")+"\
};\
return function construct_"+className+"(a,b,c,d){return new "+className+"(a,d)}"
    var procedure = new Function("TrivialArray", code)
    return procedure(CACHED_CONSTRUCTORS[dtype][0])
  }

  var code = ["'use strict'"]

  //Create constructor for view
  var indices = iota(dimension)
  var args = indices.map(function(i) { return "i"+i })
  var index_str = "this.offset+" + indices.map(function(i) {
        return "this.stride[" + i + "]*i" + i
      }).join("+")
  var shapeArg = indices.map(function(i) {
      return "b"+i
    }).join(",")
  var strideArg = indices.map(function(i) {
      return "c"+i
    }).join(",")
  code.push(
    "function "+className+"(a," + shapeArg + "," + strideArg + ",d){this.data=a",
      "this.shape=[" + shapeArg + "]",
      "this.stride=[" + strideArg + "]",
      "this.offset=d|0}",
    "var proto="+className+".prototype",
    "proto.dtype='"+dtype+"'",
    "proto.dimension="+dimension)

  //view.size:
  code.push("Object.defineProperty(proto,'size',{get:function "+className+"_size(){\
return "+indices.map(function(i) { return "this.shape["+i+"]" }).join("*"),
"}})")

  //view.order:
  if(dimension === 1) {
    code.push("proto.order=[0]")
  } else {
    code.push("Object.defineProperty(proto,'order',{get:")
    if(dimension < 4) {
      code.push("function "+className+"_order(){")
      if(dimension === 2) {
        code.push("return (Math.abs(this.stride[0])>Math.abs(this.stride[1]))?[1,0]:[0,1]}})")
      } else if(dimension === 3) {
        code.push(
"var s0=Math.abs(this.stride[0]),s1=Math.abs(this.stride[1]),s2=Math.abs(this.stride[2]);\
if(s0>s1){\
if(s1>s2){\
return [2,1,0];\
}else if(s0>s2){\
return [1,2,0];\
}else{\
return [1,0,2];\
}\
}else if(s0>s2){\
return [2,0,1];\
}else if(s2>s1){\
return [0,1,2];\
}else{\
return [0,2,1];\
}}})")
      }
    } else {
      code.push("ORDER})")
    }
  }

  //view.set(i0, ..., v):
  code.push(
"proto.set=function "+className+"_set("+args.join(",")+",v){")
  if(useGetters) {
    code.push("return this.data.set("+index_str+",v)}")
  } else {
    code.push("return this.data["+index_str+"]=v}")
  }

  //view.get(i0, ...):
  code.push("proto.get=function "+className+"_get("+args.join(",")+"){")
  if(useGetters) {
    code.push("return this.data.get("+index_str+")}")
  } else {
    code.push("return this.data["+index_str+"]}")
  }

  //view.index:
  code.push(
    "proto.index=function "+className+"_index(", args.join(), "){return "+index_str+"}")

  //view.hi():
  code.push("proto.hi=function "+className+"_hi("+args.join(",")+"){return new "+className+"(this.data,"+
    indices.map(function(i) {
      return ["(typeof i",i,"!=='number'||i",i,"<0)?this.shape[", i, "]:i", i,"|0"].join("")
    }).join(",")+","+
    indices.map(function(i) {
      return "this.stride["+i + "]"
    }).join(",")+",this.offset)}")

  //view.lo():
  var a_vars = indices.map(function(i) { return "a"+i+"=this.shape["+i+"]" })
  var c_vars = indices.map(function(i) { return "c"+i+"=this.stride["+i+"]" })
  code.push("proto.lo=function "+className+"_lo("+args.join(",")+"){var b=this.offset,d=0,"+a_vars.join(",")+","+c_vars.join(","))
  for(var i=0; i<dimension; ++i) {
    code.push(
"if(typeof i"+i+"==='number'&&i"+i+">=0){\
d=i"+i+"|0;\
b+=c"+i+"*d;\
a"+i+"-=d}")
  }
  code.push("return new "+className+"(this.data,"+
    indices.map(function(i) {
      return "a"+i
    }).join(",")+","+
    indices.map(function(i) {
      return "c"+i
    }).join(",")+",b)}")

  //view.step():
  code.push("proto.step=function "+className+"_step("+args.join(",")+"){var "+
    indices.map(function(i) {
      return "a"+i+"=this.shape["+i+"]"
    }).join(",")+","+
    indices.map(function(i) {
      return "b"+i+"=this.stride["+i+"]"
    }).join(",")+",c=this.offset,d=0,ceil=Math.ceil")
  for(var i=0; i<dimension; ++i) {
    code.push(
"if(typeof i"+i+"==='number'){\
d=i"+i+"|0;\
if(d<0){\
c+=b"+i+"*(a"+i+"-1);\
a"+i+"=ceil(-a"+i+"/d)\
}else{\
a"+i+"=ceil(a"+i+"/d)\
}\
b"+i+"*=d\
}")
  }
  code.push("return new "+className+"(this.data,"+
    indices.map(function(i) {
      return "a" + i
    }).join(",")+","+
    indices.map(function(i) {
      return "b" + i
    }).join(",")+",c)}")

  //view.transpose():
  var tShape = new Array(dimension)
  var tStride = new Array(dimension)
  for(var i=0; i<dimension; ++i) {
    tShape[i] = "a[i"+i+"]"
    tStride[i] = "b[i"+i+"]"
  }
  code.push("proto.transpose=function "+className+"_transpose("+args+"){"+
    args.map(function(n,idx) { return n + "=(" + n + "===undefined?" + idx + ":" + n + "|0)"}).join(";"),
    "var a=this.shape,b=this.stride;return new "+className+"(this.data,"+tShape.join(",")+","+tStride.join(",")+",this.offset)}")

  //view.pick():
  code.push("proto.pick=function "+className+"_pick("+args+"){var a=[],b=[],c=this.offset")
  for(var i=0; i<dimension; ++i) {
    code.push("if(typeof i"+i+"==='number'&&i"+i+">=0){c=(c+this.stride["+i+"]*i"+i+")|0}else{a.push(this.shape["+i+"]);b.push(this.stride["+i+"])}")
  }
  code.push("var ctor=CTOR_LIST[a.length+1];return ctor(this.data,a,b,c)}")

  //Add return statement
  code.push("return function construct_"+className+"(data,shape,stride,offset){return new "+className+"(data,"+
    indices.map(function(i) {
      return "shape["+i+"]"
    }).join(",")+","+
    indices.map(function(i) {
      return "stride["+i+"]"
    }).join(",")+",offset)}")

  //Compile procedure
  var procedure = new Function("CTOR_LIST", "ORDER", code.join("\n"))
  return procedure(CACHED_CONSTRUCTORS[dtype], order)
}

function arrayDType(data) {
  if(isBuffer(data)) {
    return "buffer"
  }
  if(hasTypedArrays) {
    switch(Object.prototype.toString.call(data)) {
      case "[object Float64Array]":
        return "float64"
      case "[object Float32Array]":
        return "float32"
      case "[object Int8Array]":
        return "int8"
      case "[object Int16Array]":
        return "int16"
      case "[object Int32Array]":
        return "int32"
      case "[object Uint8Array]":
        return "uint8"
      case "[object Uint16Array]":
        return "uint16"
      case "[object Uint32Array]":
        return "uint32"
      case "[object Uint8ClampedArray]":
        return "uint8_clamped"
    }
  }
  if(Array.isArray(data)) {
    return "array"
  }
  return "generic"
}

var CACHED_CONSTRUCTORS = {
  "float32":[],
  "float64":[],
  "int8":[],
  "int16":[],
  "int32":[],
  "uint8":[],
  "uint16":[],
  "uint32":[],
  "array":[],
  "uint8_clamped":[],
  "buffer":[],
  "generic":[]
}

;(function() {
  for(var id in CACHED_CONSTRUCTORS) {
    CACHED_CONSTRUCTORS[id].push(compileConstructor(id, -1))
  }
});

function wrappedNDArrayCtor(data, shape, stride, offset) {
  if(data === undefined) {
    var ctor = CACHED_CONSTRUCTORS.array[0]
    return ctor([])
  } else if(typeof data === "number") {
    data = [data]
  }
  if(shape === undefined) {
    shape = [ data.length ]
  }
  var d = shape.length
  if(stride === undefined) {
    stride = new Array(d)
    for(var i=d-1, sz=1; i>=0; --i) {
      stride[i] = sz
      sz *= shape[i]
    }
  }
  if(offset === undefined) {
    offset = 0
    for(var i=0; i<d; ++i) {
      if(stride[i] < 0) {
        offset -= (shape[i]-1)*stride[i]
      }
    }
  }
  var dtype = arrayDType(data)
  var ctor_list = CACHED_CONSTRUCTORS[dtype]
  while(ctor_list.length <= d+1) {
    ctor_list.push(compileConstructor(dtype, ctor_list.length-1))
  }
  var ctor = ctor_list[d+1]
  return ctor(data, shape, stride, offset)
}

module.exports = wrappedNDArrayCtor

},{"iota-array":14,"is-buffer":15}],17:[function(require,module,exports){
"use strict"

function unique_pred(list, compare) {
  var ptr = 1
    , len = list.length
    , a=list[0], b=list[0]
  for(var i=1; i<len; ++i) {
    b = a
    a = list[i]
    if(compare(a, b)) {
      if(i === ptr) {
        ptr++
        continue
      }
      list[ptr++] = a
    }
  }
  list.length = ptr
  return list
}

function unique_eq(list) {
  var ptr = 1
    , len = list.length
    , a=list[0], b = list[0]
  for(var i=1; i<len; ++i, b=a) {
    b = a
    a = list[i]
    if(a !== b) {
      if(i === ptr) {
        ptr++
        continue
      }
      list[ptr++] = a
    }
  }
  list.length = ptr
  return list
}

function unique(list, compare, sorted) {
  if(list.length === 0) {
    return list
  }
  if(compare) {
    if(!sorted) {
      list.sort(compare)
    }
    return unique_pred(list, compare)
  }
  if(!sorted) {
    list.sort()
  }
  return unique_eq(list)
}

module.exports = unique

},{}],18:[function(require,module,exports){
var utils = require('./utils.js');
var kdTree = require('./kd-tree-javascript/kdTree.js');

kd_tree_sample_points = [
	{x: -0.9425, y: -0.2041, z: -0.2648},
	{x: 0.5224, y: 0.7539, z: 0.3985},
	{x: 0.5528, y: 0.0429, z: -0.8322},
	{x: 0.6499, y: 0.0243, z: -0.7596},
	{x: 0.6986, y: 0.1199, z: -0.7054},
	{x: -0.0303, y: 0.9929, z: -0.1151},
	{x: 0.8482, y: 0.0839, z: -0.5230},
	{x: 0.9526, y: 0.0586, z: -0.2985},
	{x: -0.2253, y: -0.1544, z: -0.9620},
	{x: 0.9065, y: 0.0667, z: -0.4168},
	{x: 0.9313, y: -0.0364, z: -0.3625},
	{x: 0.9274, y: 0.2528, z: -0.2755},
	{x: 0.9601, y: 0.1575, z: -0.2311},
	{x: 0.9827, y: 0.0588, z: -0.1759},
	{x: 0.4552, y: 0.2145, z: 0.8641},
	{x: 0.0245, y: 0.6354, z: 0.7718},
	{x: 0.9838, y: 0.1794, z: 0.0003},
	{x: 0.9944, y: 0.0840, z: 0.0637},
	{x: 0.1522, y: 0.2044, z: -0.9670},
	{x: 0.9784, y: 0.1048, z: 0.1784},
	{x: 0.1846, y: 0.8742, z: -0.4490},
	{x: 0.9353, y: 0.0254, z: 0.3528},
	{x: 0.8863, y: 0.0396, z: 0.4613},
	{x: -0.4683, y: 0.2315, z: 0.8527},
	{x: 0.8514, y: -0.0566, z: 0.5215},
	{x: 0.8241, y: 0.0513, z: 0.5642},
	{x: 0.7803, y: -0.0439, z: 0.6238},
	{x: 0.0253, y: -0.0740, z: 0.9969},
	{x: 0.6571, y: 0.0871, z: 0.7487},
	{x: 0.5676, y: 0.1304, z: 0.8129},
	{x: 0.4011, y: 0.0242, z: 0.9157},
	{x: -0.1442, y: 0.9656, z: 0.2165},
	{x: 0.3730, y: -0.9271, z: -0.0358},
	{x: 0.3781, y: 0.2043, z: -0.9030},
	{x: 0.5067, y: 0.1507, z: -0.8489},
	{x: 0.6084, y: 0.1352, z: -0.7820},
	{x: 0.6523, y: 0.2322, z: -0.7215},
	{x: 0.7786, y: 0.1026, z: -0.6190},
	{x: 0.7782, y: 0.4864, z: -0.3974},
	{x: 0.8083, y: 0.1983, z: -0.5544},
	{x: 0.8251, y: 0.2929, z: -0.4831},
	{x: 0.9227, y: 0.1605, z: -0.3506},
	{x: -0.1930, y: -0.2652, z: -0.9447},
	{x: 0.2991, y: -0.7068, z: -0.6410},
	{x: 0.9420, y: 0.2887, z: -0.1714},
	{x: 0.9597, y: 0.2731, z: -0.0659},
	{x: 0.9245, y: 0.3775, z: -0.0524},
	{x: 0.9124, y: 0.4034, z: 0.0693},
	{x: 0.8871, y: 0.4228, z: 0.1851},
	{x: 0.9539, y: 0.2970, z: 0.0444},
	{x: 0.9485, y: 0.2208, z: 0.2270},
	{x: 0.9358, y: 0.3163, z: 0.1556},
	{x: 0.9052, y: 0.3318, z: 0.2656},
	{x: 0.9110, y: 0.2363, z: 0.3379},
	{x: 0.8596, y: 0.2498, z: 0.4457},
	{x: 0.8511, y: 0.1507, z: 0.5028},
	{x: 0.5268, y: -0.1617, z: -0.8345},
	{x: 0.4062, y: -0.8690, z: -0.2825},
	{x: 0.7849, y: 0.1609, z: 0.5984},
	{x: 0.6297, y: 0.2089, z: 0.7482},
	{x: -0.4992, y: -0.5457, z: 0.6731},
	{x: 0.4784, y: 0.1069, z: 0.8716},
	{x: 0.3721, y: 0.1418, z: 0.9173},
	{x: 0.2940, y: 0.0590, z: 0.9540},
	{x: 0.1776, y: 0.0098, z: -0.9841},
	{x: 0.4599, y: 0.2507, z: -0.8518},
	{x: 0.5606, y: 0.2450, z: -0.7910},
	{x: 0.8616, y: 0.3439, z: 0.3733},
	{x: 0.5910, y: 0.3426, z: -0.7303},
	{x: 0.6792, y: 0.3292, z: -0.6559},
	{x: 0.6980, y: 0.4219, z: -0.5786},
	{x: 0.7573, y: 0.3130, z: -0.5732},
	{x: 0.7092, y: 0.5082, z: -0.4887},
	{x: 0.8347, y: 0.3809, z: -0.3977},
	{x: 0.8390, y: 0.4548, z: -0.2988},
	{x: 0.7755, y: 0.5572, z: -0.2970},
	{x: 0.8357, y: 0.5103, z: -0.2028},
	{x: 0.8797, y: 0.4629, z: -0.1087},
	{x: 0.7105, y: 0.5858, z: -0.3899},
	{x: 0.8213, y: 0.5628, z: -0.0929},
	{x: 0.8731, y: 0.4875, z: 0.0001},
	{x: 0.8536, y: 0.5093, z: 0.1093},
	{x: 0.8232, y: 0.5241, z: 0.2183},
	{x: 0.7814, y: 0.5319, z: 0.3263},
	{x: 0.8495, y: 0.4357, z: 0.2975},
	{x: -0.2468, y: 0.1027, z: 0.9636},
	{x: 0.7977, y: 0.4449, z: 0.4071},
	{x: 0.1627, y: -0.2310, z: 0.9593},
	{x: 0.7389, y: 0.3623, z: 0.5681},
	{x: 0.7948, y: 0.2599, z: 0.5484},
	{x: 0.6632, y: 0.3722, z: 0.6494},
	{x: 0.5757, y: 0.4340, z: 0.6929},
	{x: 0.5132, y: 0.3740, z: 0.7725},
	{x: 0.5376, y: 0.2555, z: 0.8036},
	{x: 0.3492, y: 0.2587, z: 0.9006},
	{x: 0.2158, y: -0.0260, z: 0.9761},
	{x: 0.2310, y: 0.1126, z: -0.9664},
	{x: 0.2889, y: 0.3200, z: -0.9023},
	{x: 0.3872, y: 0.3360, z: -0.8586},
	{x: 0.4929, y: 0.3498, z: -0.7966},
	{x: 0.6143, y: 0.4353, z: -0.6581},
	{x: 0.4626, y: 0.6167, z: -0.6369},
	{x: -0.6389, y: 0.0488, z: -0.7677},
	{x: 0.6308, y: 0.5228, z: -0.5734},
	{x: 0.8405, y: -0.5070, z: 0.1908},
	{x: 0.6358, y: 0.6762, z: -0.3721},
	{x: 0.7049, y: 0.6511, z: -0.2813},
	{x: 0.2048, y: -0.4480, z: 0.8703},
	{x: 0.7686, y: 0.6112, z: -0.1887},
	{x: 0.6725, y: 0.7383, z: -0.0519},
	{x: 0.7523, y: 0.6547, z: -0.0744},
	{x: 0.8087, y: 0.5879, z: 0.0188},
	{x: 0.7329, y: 0.6792, z: 0.0388},
	{x: 0.7873, y: -0.6015, z: 0.1353},
	{x: 0.5690, y: 0.7715, z: 0.2847},
	{x: -0.1491, y: -0.2403, z: 0.9592},
	{x: 0.7501, y: 0.6177, z: 0.2361},
	{x: -0.7850, y: 0.5957, z: 0.1702},
	{x: 0.6162, y: 0.6969, z: 0.3670},
	{x: 0.7255, y: 0.5343, z: 0.4339},
	{x: 0.6520, y: 0.6136, z: 0.4454},
	{x: 0.7248, y: 0.4607, z: 0.5123},
	{x: 0.6498, y: 0.4717, z: 0.5960},
	{x: 0.4806, y: 0.4880, z: 0.7286},
	{x: -0.6173, y: 0.7753, z: 0.1334},
	{x: 0.4338, y: 0.3253, z: 0.8403},
	{x: 0.2405, y: 0.2983, z: 0.9237},
	{x: 0.2661, y: 0.1811, z: 0.9468},
	{x: 0.2703, y: 0.2162, z: -0.9382},
	{x: 0.4466, y: 0.8881, z: 0.1087},
	{x: 0.3099, y: 0.4290, z: -0.8485},
	{x: 0.3354, y: 0.5265, z: -0.7812},
	{x: 0.4417, y: 0.5321, z: -0.7223},
	{x: -0.7669, y: -0.1000, z: -0.6339},
	{x: 0.5554, y: 0.6141, z: -0.5607},
	{x: -0.7876, y: 0.4996, z: -0.3608},
	{x: 0.5594, y: 0.6906, z: -0.4585},
	{x: 0.6260, y: 0.7356, z: -0.2588},
	{x: 0.7031, y: 0.6952, z: 0.1496},
	{x: 0.4621, y: -0.1997, z: 0.8640},
	{x: 0.5381, y: 0.8103, z: -0.2322},
	{x: 0.6084, y: 0.7806, z: -0.1430},
	{x: 0.5820, y: 0.8127, z: -0.0279},
	{x: 0.6463, y: 0.7606, z: 0.0617},
	{x: 0.5501, y: 0.8307, z: 0.0855},
	{x: 0.5624, y: -0.2132, z: 0.7989},
	{x: 0.6640, y: 0.7017, z: 0.2585},
	{x: 0.7224, y: -0.6868, z: 0.0807},
	{x: -0.0298, y: 0.3762, z: -0.9261},
	{x: 0.5645, y: 0.6711, z: 0.4806},
	{x: 0.4687, y: 0.7228, z: 0.5077},
	{x: 0.6256, y: 0.5636, z: 0.5394},
	{x: 0.5548, y: 0.5351, z: 0.6371},
	{x: -0.4648, y: 0.8330, z: 0.3002},
	{x: 0.4522, y: 0.5876, z: 0.6709},
	{x: 0.3754, y: 0.5376, z: 0.7550},
	{x: 0.4077, y: 0.4334, z: 0.8037},
	{x: 0.0966, y: 0.4429, z: 0.8914},
	{x: -0.0566, y: -0.9558, z: 0.2885},
	{x: 0.1077, y: 0.0948, z: -0.9897},
	{x: 0.2017, y: 0.4148, z: -0.8873},
	{x: 0.5197, y: 0.4436, z: -0.7302},
	{x: 0.2489, y: 0.6064, z: -0.7552},
	{x: 0.2711, y: 0.6883, z: -0.6729},
	{x: 0.3592, y: 0.6144, z: -0.7025},
	{x: 0.3791, y: 0.6935, z: -0.6126},
	{x: 0.2903, y: 0.7607, z: -0.5805},
	{x: 0.3883, y: 0.7669, z: -0.5109},
	{x: 0.3818, y: 0.8329, z: -0.4007},
	{x: 0.3598, y: 0.8862, z: -0.2918},
	{x: 0.4628, y: 0.8271, z: -0.3188},
	{x: -0.1835, y: 0.3060, z: 0.9342},
	{x: 0.4391, y: 0.8744, z: -0.2065},
	{x: 0.5134, y: 0.8500, z: -0.1180},
	{x: 0.4820, y: 0.8762, z: -0.0044},
	{x: 0.4840, y: -0.3078, z: 0.8191},
	{x: 0.1280, y: 0.3348, z: 0.9335},
	{x: 0.5120, y: 0.8358, z: 0.1982},
	{x: 0.4699, y: 0.8258, z: 0.3118},
	{x: 0.3654, y: 0.8692, z: 0.3332},
	{x: 0.4230, y: 0.8014, z: 0.4230},
	{x: 0.5220, y: 0.6279, z: 0.5773},
	{x: 0.3662, y: 0.7653, z: 0.5294},
	{x: 0.2580, y: 0.7980, z: 0.5447},
	{x: 0.3434, y: 0.6325, z: 0.6943},
	{x: 0.4017, y: -0.7699, z: 0.4959},
	{x: 0.2640, y: 0.5758, z: 0.7738},
	{x: 0.2969, y: 0.4765, z: 0.8275},
	{x: 0.2130, y: 0.4087, z: 0.8875},
	{x: 0.1571, y: 0.2192, z: 0.9630},
	{x: 0.0338, y: 0.1872, z: -0.9817},
	{x: 0.1778, y: 0.3110, z: -0.9336},
	{x: 0.6041, y: -0.7333, z: -0.3119},
	{x: 0.1352, y: 0.5942, z: -0.7929},
	{x: -0.5395, y: -0.4109, z: -0.7349},
	{x: 0.1568, y: 0.6791, z: -0.7171},
	{x: 0.1087, y: -0.6415, z: -0.7594},
	{x: 0.1768, y: 0.7534, z: -0.6333},
	{x: 0.0925, y: -0.5496, z: -0.8303},
	{x: 0.2947, y: 0.8282, z: -0.4767},
	{x: -0.7825, y: 0.1475, z: -0.6049},
	{x: 0.2749, y: 0.8865, z: -0.3722},
	{x: 0.7211, y: -0.3034, z: -0.6228},
	{x: 0.3303, y: 0.9261, z: -0.1825},
	{x: 0.3376, y: 0.9323, z: 0.1298},
	{x: 0.2606, y: 0.9647, z: 0.0375},
	{x: 0.4078, y: 0.8857, z: 0.2218},
	{x: 0.2982, y: 0.9237, z: 0.2406},
	{x: -0.2396, y: 0.4107, z: -0.8797},
	{x: 0.8711, y: 0.1783, z: -0.4575},
	{x: 0.2562, y: 0.9013, z: 0.3492},
	{x: 0.2108, y: 0.8654, z: 0.4546},
	{x: 0.3189, y: 0.8386, z: 0.4417},
	{x: 0.1450, y: 0.8198, z: 0.5540},
	{x: 0.7000, y: -0.5315, z: 0.4770},
	{x: 0.3049, y: 0.7191, z: 0.6244},
	{x: 0.2295, y: 0.6664, z: 0.7094},
	{x: 0.1898, y: 0.7478, z: 0.6362},
	{x: 0.1472, y: 0.6066, z: 0.7813},
	{x: 0.0623, y: 0.5436, z: 0.8370},
	{x: 0.0763, y: 0.1349, z: 0.9879},
	{x: 0.0624, y: 0.2954, z: -0.9533},
	{x: 0.0871, y: 0.4001, z: -0.9123},
	{x: 0.3691, y: -0.8047, z: -0.4650},
	{x: -0.0480, y: 0.7293, z: -0.6825},
	{x: -0.6396, y: 0.7299, z: 0.2411},
	{x: 0.0646, y: 0.7522, z: -0.6557},
	{x: 0.8438, y: -0.4136, z: -0.3420},
	{x: 0.0872, y: 0.8233, z: -0.5609},
	{x: 0.0781, y: 0.8946, z: -0.4400},
	{x: 0.1588, y: 0.9243, z: -0.3471},
	{x: 0.0424, y: 0.9421, z: -0.3328},
	{x: 0.1262, y: 0.9618, z: -0.2430},
	{x: 0.2466, y: 0.9318, z: -0.2665},
	{x: 0.2133, y: 0.9639, z: -0.1597},
	{x: 0.0913, y: 0.9865, z: -0.1361},
	{x: 0.2965, y: 0.9523, z: -0.0727},
	{x: -0.0677, y: 0.9977, z: -0.0047},
	{x: 0.1780, y: 0.9827, z: -0.0517},
	{x: 0.7488, y: 0.0605, z: 0.6601},
	{x: 0.2231, y: 0.9636, z: 0.1471},
	{x: 0.1033, y: 0.9811, z: 0.1636},
	{x: 0.1427, y: 0.9218, z: 0.3604},
	{x: 0.0997, y: 0.8810, z: 0.4625},
	{x: 0.0641, y: 0.9612, z: 0.2682},
	{x: 0.0694, y: 0.7668, z: 0.6382},
	{x: -0.0169, y: 0.7166, z: 0.6972},
	{x: 0.1103, y: 0.6919, z: 0.7135},
	{x: -0.0998, y: 0.6557, z: 0.7484},
	{x: -0.0584, y: 0.5691, z: 0.8202},
	{x: -0.0211, y: 0.4718, z: 0.8815},
	{x: 0.0124, y: 0.3659, z: 0.9306},
	{x: 0.0450, y: 0.2541, z: 0.9661},
	{x: -0.0551, y: 0.2675, z: -0.9620},
	{x: -0.0040, y: 0.4795, z: -0.8775},
	{x: -0.0673, y: 0.6417, z: -0.7640},
	{x: -0.6821, y: 0.7297, z: 0.0471},
	{x: -0.1518, y: 0.7000, z: -0.6979},
	{x: -0.0348, y: 0.8001, z: -0.5989},
	{x: 0.6401, y: -0.2910, z: -0.7110},
	{x: -0.1488, y: 0.7913, z: -0.5930},
	{x: -0.1151, y: 0.8558, z: -0.5043},
	{x: -0.0421, y: 0.9104, z: -0.4115},
	{x: -0.1567, y: 0.9040, z: -0.3978},
	{x: -0.1948, y: 0.9369, z: -0.2904},
	{x: -0.1145, y: 0.9729, z: -0.2008},
	{x: -0.1515, y: 0.9843, z: -0.0910},
	{x: -0.4692, y: 0.0630, z: -0.8808},
	{x: 0.4747, y: 0.6953, z: -0.5396},
	{x: -0.1885, y: 0.9819, z: 0.0205},
	{x: -0.1057, y: 0.9887, z: 0.1060},
	{x: 0.0169, y: 0.9965, z: 0.0814},
	{x: -0.1837, y: 0.9266, z: 0.3282},
	{x: -0.0634, y: 0.9527, z: 0.2971},
	{x: -0.1039, y: 0.9096, z: 0.4023},
	{x: -0.0142, y: 0.8852, z: 0.4651},
	{x: 0.0264, y: 0.8309, z: 0.5557},
	{x: -0.1031, y: 0.8475, z: 0.5207},
	{x: 0.2068, y: -0.6779, z: -0.7054},
	{x: -0.0618, y: 0.7868, z: 0.6141},
	{x: -0.1801, y: 0.5848, z: 0.7909},
	{x: -0.1393, y: 0.4940, z: 0.8583},
	{x: -0.8438, y: -0.4630, z: 0.2714},
	{x: -0.0364, y: 0.1688, z: 0.9850},
	{x: -0.1683, y: 0.2374, z: -0.9567},
	{x: -0.1216, y: 0.4501, z: -0.8847},
	{x: -0.0947, y: 0.5487, z: -0.8306},
	{x: -0.1829, y: 0.6088, z: -0.7720},
	{x: -0.2701, y: 0.6536, z: -0.7070},
	{x: -0.2340, y: 0.7372, z: -0.6338},
	{x: -0.2850, y: 0.7855, z: -0.5493},
	{x: -0.2225, y: 0.8469, z: -0.4830},
	{x: -0.3395, y: 0.8249, z: -0.4521},
	{x: -0.2707, y: 0.8862, z: -0.3760},
	{x: -0.3087, y: 0.9128, z: -0.2675},
	{x: -0.2318, y: 0.9559, z: -0.1801},
	{x: -0.3451, y: 0.9257, z: -0.1548},
	{x: 0.7136, y: 0.2696, z: 0.6466},
	{x: -0.2687, y: 0.9609, z: -0.0675},
	{x: -0.3047, y: 0.9513, z: 0.0460},
	{x: -0.4148, y: 0.9067, z: 0.0758},
	{x: -0.2251, y: 0.9653, z: 0.1326},
	{x: -0.2586, y: 0.9338, z: 0.2473},
	{x: -0.3581, y: 0.8912, z: 0.2785},
	{x: -0.1636, y: -0.1226, z: 0.9789},
	{x: -0.1991, y: 0.8678, z: 0.4554},
	{x: -0.2778, y: 0.8831, z: 0.3781},
	{x: 0.4746, y: 0.7669, z: -0.4320},
	{x: -0.2832, y: 0.8148, z: 0.5058},
	{x: -0.1437, y: 0.7314, z: 0.6667},
	{x: 0.9489, y: 0.1232, z: 0.2906},
	{x: -0.2233, y: 0.6642, z: 0.7134},
	{x: 0.9079, y: -0.0710, z: 0.4131},
	{x: -0.1030, y: 0.3920, z: 0.9142},
	{x: -0.2626, y: 0.2148, z: 0.9407},
	{x: -0.0787, y: 0.1501, z: -0.9855},
	{x: -0.1468, y: 0.3464, z: -0.9265},
	{x: -0.2126, y: 0.5126, z: -0.8319},
	{x: -0.3017, y: 0.5626, z: -0.7697},
	{x: 0.7844, y: 0.6069, z: 0.1284},
	{x: -0.9995, y: 0.0320, z: 0.0087},
	{x: -0.3459, y: 0.7023, z: -0.6222},
	{x: -0.4518, y: 0.6594, z: -0.6009},
	{x: -0.3995, y: 0.7489, z: -0.5287},
	{x: -0.6044, y: 0.6423, z: -0.4713},
	{x: -0.3851, y: 0.8548, z: -0.3480},
	{x: -0.4935, y: 0.8081, z: -0.3216},
	{x: -0.5209, y: 0.8268, z: -0.2124},
	{x: -0.4186, y: 0.8759, z: -0.2399},
	{x: -0.4534, y: 0.8824, z: -0.1258},
	{x: -0.3813, y: 0.9236, z: -0.0401},
	{x: 0.8824, y: 0.2712, z: -0.3845},
	{x: -0.4876, y: 0.8730, z: -0.0091},
	{x: -0.5171, y: 0.8490, z: 0.1084},
	{x: -0.3372, y: 0.9276, z: 0.1607},
	{x: -0.0030, y: 0.8608, z: -0.5089},
	{x: -0.4804, y: 0.7781, z: 0.4048},
	{x: -0.3848, y: 0.7901, z: 0.4771},
	{x: -0.3625, y: 0.7348, z: 0.5733},
	{x: -0.9911, y: -0.0428, z: 0.1264},
	{x: -0.2609, y: 0.7375, z: 0.6229},
	{x: -0.8758, y: 0.0725, z: 0.4772},
	{x: -0.3400, y: 0.6627, z: 0.6673},
	{x: -0.2590, y: 0.5067, z: 0.8223},
	{x: -0.2188, y: 0.4123, z: 0.8844},
	{x: -0.4272, y: 0.0449, z: 0.9030},
	{x: -0.1884, y: 0.1246, z: -0.9742},
	{x: -0.2628, y: 0.3033, z: -0.9159},
	{x: -0.3299, y: 0.4643, z: -0.8220},
	{x: -0.4140, y: 0.5157, z: -0.7501},
	{x: -0.5188, y: 0.4615, z: -0.7196},
	{x: -0.4888, y: 0.5637, z: -0.6658},
	{x: -0.5520, y: 0.6068, z: -0.5719},
	{x: -0.5055, y: 0.7006, z: -0.5036},
	{x: -0.5509, y: 0.7323, z: -0.4002},
	{x: -0.5957, y: 0.7486, z: -0.2910},
	{x: -0.6453, y: 0.6707, z: -0.3657},
	{x: -0.8289, y: -0.0099, z: 0.5594},
	{x: -0.6927, y: 0.6750, z: -0.2543},
	{x: -0.6143, y: 0.7677, z: -0.1827},
	{x: -0.7910, y: 0.5591, z: -0.2484},
	{x: -0.5542, y: 0.8269, z: -0.0952},
	{x: -0.5859, y: 0.8100, z: 0.0240},
	{x: -0.4533, y: -0.0577, z: -0.8895},
	{x: 0.6376, y: 0.6041, z: -0.4781},
	{x: -0.7078, y: 0.6893, z: 0.1545},
	{x: -0.5447, y: 0.8099, z: 0.2176},
	{x: -0.5635, y: 0.7597, z: 0.3244},
	{x: -0.6487, y: 0.6762, z: 0.3492},
	{x: -0.4726, y: 0.7186, z: 0.5102},
	{x: -0.5540, y: 0.6387, z: 0.5340},
	{x: -0.3829, y: 0.6125, z: -0.6916},
	{x: -0.4975, y: 0.4979, z: 0.7104},
	{x: -0.4209, y: 0.5839, z: 0.6942},
	{x: -0.3816, y: 0.5073, z: 0.7727},
	{x: -0.3364, y: 0.4241, z: 0.8408},
	{x: -0.2959, y: 0.3258, z: 0.8979},
	{x: 0.1060, y: 0.0120, z: 0.9943},
	{x: -0.2818, y: 0.1905, z: -0.9404},
	{x: 0.7198, y: -0.5001, z: -0.4814},
	{x: -0.3544, y: 0.3592, z: -0.8634},
	{x: -0.4612, y: 0.3020, z: -0.8343},
	{x: -0.1872, y: 0.7990, z: 0.5714},
	{x: 0.0066, y: 0.9744, z: -0.2246},
	{x: -0.5881, y: 0.5058, z: -0.6311},
	{x: -0.6458, y: 0.5454, z: -0.5344},
	{x: -0.7332, y: 0.4808, z: -0.4809},
	{x: -0.6967, y: 0.5739, z: -0.4305},
	{x: -0.6806, y: 0.4421, z: -0.5843},
	{x: -0.7701, y: 0.6184, z: -0.1565},
	{x: -0.7310, y: 0.5983, z: -0.3281},
	{x: -0.6972, y: 0.7015, z: -0.1480},
	{x: -0.8101, y: 0.5847, z: -0.0434},
	{x: -0.7372, y: 0.6743, z: -0.0438},
	{x: -0.3344, y: -0.1017, z: -0.9369},
	{x: -0.7666, y: 0.6391, z: 0.0624},
	{x: -0.7412, y: -0.5639, z: -0.3643},
	{x: -0.7217, y: 0.6405, z: 0.2625},
	{x: -0.7238, y: 0.5834, z: 0.3684},
	{x: -0.9242, y: 0.3810, z: -0.0272},
	{x: -0.6450, y: 0.6148, z: 0.4538},
	{x: -0.6281, y: 0.5486, z: 0.5519},
	{x: 0.2056, y: -0.0969, z: -0.9738},
	{x: 0.6931, y: 0.7010, z: -0.1678},
	{x: -0.5647, y: 0.4003, z: 0.7217},
	{x: -0.4563, y: 0.4197, z: 0.7846},
	{x: -0.4489, y: 0.7844, z: -0.4280},
	{x: -0.4093, y: 0.3354, z: 0.8485},
	{x: -0.1534, y: 0.1925, z: 0.9692},
	{x: 0.9774, y: 0.1726, z: -0.1217},
	{x: -0.3738, y: 0.2477, z: -0.8938},
	{x: -0.5558, y: 0.2381, z: -0.7965},
	{x: -0.4485, y: 0.6571, z: 0.6059},
	{x: -0.5422, y: 0.3535, z: -0.7623},
	{x: -0.6160, y: 0.4004, z: -0.6784},
	{x: -0.7147, y: 0.2203, z: -0.6638},
	{x: -0.7610, y: 0.3699, z: -0.5329},
	{x: -0.8039, y: 0.4078, z: -0.4329},
	{x: -0.8970, y: 0.2891, z: -0.3343},
	{x: -0.9045, y: 0.3564, z: -0.2344},
	{x: -0.8549, y: 0.3924, z: -0.3395},
	{x: -0.2367, y: -0.5384, z: -0.8088},
	{x: -0.8956, y: 0.4231, z: -0.1376},
	{x: 0.4088, y: 0.9077, z: -0.0944},
	{x: -0.8734, y: 0.4859, z: -0.0326},
	{x: -0.8937, y: 0.4420, z: 0.0773},
	{x: -0.8359, y: 0.5446, z: 0.0684},
	{x: -0.9010, y: 0.3919, z: 0.1862},
	{x: -0.8491, y: 0.4971, z: 0.1785},
	{x: -0.8404, y: 0.3770, z: 0.3894},
	{x: -0.7924, y: 0.5433, z: 0.2773},
	{x: -0.8509, y: 0.4406, z: 0.2861},
	{x: -0.7880, y: 0.4832, z: 0.3816},
	{x: -0.7722, y: 0.4150, z: 0.4811},
	{x: -0.7451, y: 0.3405, z: 0.5736},
	{x: -0.6923, y: 0.4484, z: 0.5653},
	{x: -0.6191, y: 0.2914, z: 0.7292},
	{x: 0.7103, y: 0.1674, z: 0.6838},
	{x: 0.2117, y: -0.8454, z: 0.4905},
	{x: 0.3399, y: -0.8830, z: 0.3237},
	{x: -0.0055, y: 0.0495, z: 0.9988},
	{x: -0.1348, y: 0.0302, z: -0.9904},
	{x: -0.2808, y: 0.0672, z: -0.9574},
	{x: -0.4711, y: 0.1843, z: -0.8626},
	{x: -0.6328, y: 0.2882, z: -0.7187},
	{x: -0.6413, y: 0.1710, z: -0.7480},
	{x: -0.7022, y: 0.3322, z: -0.6297},
	{x: -0.7815, y: 0.2631, z: -0.5657},
	{x: 0.1412, y: 0.9884, z: 0.0565},
	{x: -0.8376, y: 0.3025, z: -0.4548},
	{x: -0.8880, y: 0.2086, z: -0.4098},
	{x: -0.2688, y: -0.9286, z: 0.2560},
	{x: -0.9349, y: 0.1658, z: -0.3137},
	{x: -0.9410, y: 0.3133, z: -0.1283},
	{x: -0.9628, y: 0.2694, z: -0.0203},
	{x: -0.1435, y: -0.4813, z: -0.8647},
	{x: -0.9390, y: 0.3339, z: 0.0824},
	{x: -0.9716, y: 0.2199, z: 0.0875},
	{x: -0.9058, y: 0.0963, z: -0.4125},
	{x: -0.9403, y: 0.2819, z: 0.1905},
	{x: -0.8970, y: 0.3316, z: 0.2922},
	{x: -0.7140, y: 0.5188, z: 0.4702},
	{x: -0.8804, y: 0.2655, z: 0.3930},
	{x: -0.8184, y: 0.3052, z: 0.4868},
	{x: -0.8528, y: 0.1904, z: 0.4863},
	{x: -0.7856, y: 0.2265, z: 0.5757},
	{x: -0.7483, y: -0.2219, z: -0.6251},
	{x: -0.6596, y: 0.1761, z: 0.7307},
	{x: -0.5678, y: 0.2059, z: 0.7970},
	{x: -0.4902, y: 0.1264, z: 0.8624},
	{x: -0.3696, y: 0.2330, z: 0.8995},
	{x: -0.6277, y: -0.7784, z: 0.0020},
	{x: 0.0688, y: -0.9925, z: -0.1015},
	{x: -0.3692, y: 0.0059, z: -0.9293},
	{x: -0.5520, y: -0.0031, z: -0.8338},
	{x: -0.7153, y: 0.0994, z: -0.6917},
	{x: 0.0547, y: 0.9981, z: -0.0277},
	{x: -0.7807, y: 0.0274, z: -0.6243},
	{x: -0.8422, y: 0.1859, z: -0.5060},
	{x: -0.8438, y: 0.0767, z: -0.5312},
	{x: -0.9700, y: -0.1392, z: 0.1994},
	{x: 0.0243, y: 0.9292, z: 0.3687},
	{x: 0.3428, y: 0.1021, z: -0.9338},
	{x: -0.9698, y: 0.1217, z: -0.2112},
	{x: -0.9796, y: 0.0023, z: -0.2008},
	{x: -0.9726, y: 0.1985, z: -0.1212},
	{x: -0.9426, y: 0.2438, z: -0.2284},
	{x: -0.9881, y: 0.1531, z: -0.0128},
	{x: -0.9906, y: 0.0993, z: 0.0943},
	{x: -0.9668, y: 0.1671, z: 0.1932},
	{x: -0.9525, y: 0.0954, z: 0.2891},
	{x: 0.1838, y: 0.9493, z: 0.2551},
	{x: -0.0779, y: 0.9482, z: -0.3079},
	{x: -0.9266, y: 0.0310, z: 0.3748},
	{x: -0.8141, y: 0.1087, z: 0.5705},
	{x: -0.7419, y: 0.1432, z: 0.6551},
	{x: -0.6837, y: 0.0592, z: 0.7274},
	{x: -0.5944, y: 0.0936, z: 0.7987},
	{x: -0.5288, y: 0.0106, z: 0.8487},
	{x: 0.1947, y: 0.8177, z: -0.5418},
	{x: -0.1203, y: 0.0842, z: 0.9892},
	{x: -0.2392, y: -0.0348, z: -0.9703},
	{x: -0.5331, y: -0.1214, z: -0.8373},
	{x: -0.6274, y: -0.0729, z: -0.7752},
	{x: -0.7094, y: -0.0238, z: -0.7044},
	{x: -0.2971, y: -0.8401, z: 0.4539},
	{x: -0.6603, y: 0.3729, z: 0.6519},
	{x: -0.8314, y: -0.0490, z: -0.5535},
	{x: -0.8868, y: -0.0000, z: -0.4622},
	{x: -0.8782, y: -0.1168, z: -0.4637},
	{x: 0.2250, y: 0.5151, z: -0.8271},
	{x: -0.9284, y: -0.0423, z: -0.3691},
	{x: -0.9590, y: -0.0857, z: -0.2702},
	{x: -0.9849, y: -0.1664, z: -0.0485},
	{x: -0.9949, y: -0.0415, z: -0.0921},
	{x: -0.9967, y: -0.0784, z: 0.0190},
	{x: 0.9727, y: 0.2020, z: 0.1144},
	{x: -0.9371, y: -0.1745, z: 0.3022},
	{x: -0.9805, y: 0.0459, z: 0.1910},
	{x: -0.9204, y: -0.2783, z: 0.2745},
	{x: -0.9306, y: -0.0793, z: 0.3573},
	{x: -0.9648, y: -0.0392, z: 0.2600},
	{x: -0.8851, y: -0.0446, z: 0.4633},
	{x: -0.8366, y: -0.1300, z: 0.5322},
	{x: -0.7741, y: -0.0963, z: 0.6257},
	{x: -0.7063, y: -0.1805, z: 0.6845},
	{x: -0.7017, y: -0.0616, z: 0.7098},
	{x: -0.6282, y: -0.1448, z: 0.7645},
	{x: -0.6198, y: -0.0262, z: 0.7843},
	{x: -0.3585, y: 0.1286, z: 0.9247},
	{x: -0.3286, y: 0.0095, z: 0.9444},
	{x: 0.8513, y: -0.5228, z: -0.0450},
	{x: -0.4221, y: -0.1687, z: -0.8907},
	{x: -0.5033, y: -0.2328, z: -0.8322},
	{x: -0.6043, y: -0.1916, z: -0.7734},
	{x: -0.6916, y: -0.1479, z: -0.7070},
	{x: -0.6676, y: -0.2657, z: -0.6955},
	{x: -0.8182, y: -0.1718, z: -0.5486},
	{x: -0.7756, y: -0.6312, z: 0.0074},
	{x: -0.6004, y: 0.4779, z: 0.6413},
	{x: -0.8319, y: -0.3501, z: -0.4305},
	{x: -0.3776, y: 0.8432, z: 0.3827},
	{x: -0.8932, y: -0.2817, z: -0.3505},
	{x: -0.9782, y: -0.1271, z: -0.1639},
	{x: -0.9244, y: -0.3568, z: -0.1348},
	{x: -0.9602, y: -0.2740, z: -0.0540},
	{x: -0.9615, y: -0.2691, z: 0.0556},
	{x: -0.9266, y: -0.3759, z: -0.0130},
	{x: -0.9027, y: -0.3726, z: 0.2154},
	{x: 0.2015, y: -0.9477, z: -0.2474},
	{x: 0.1105, y: -0.9386, z: -0.3268},
	{x: -0.8668, y: -0.3693, z: 0.3352},
	{x: -0.8844, y: -0.2638, z: 0.3851},
	{x: -0.8896, y: -0.1607, z: 0.4275},
	{x: -0.8336, y: -0.2439, z: 0.4956},
	{x: 0.5379, y: -0.1063, z: 0.8363},
	{x: -0.7747, y: -0.2142, z: 0.5950},
	{x: -0.7018, y: -0.2963, z: 0.6478},
	{x: -0.6280, y: -0.2618, z: 0.7329},
	{x: -0.4426, y: -0.0642, z: 0.8944},
	{x: 0.6113, y: 0.7722, z: 0.1734},
	{x: -0.1982, y: 0.0016, z: 0.9802},
	{x: -0.1339, y: -0.0907, z: -0.9868},
	{x: -0.3793, y: 0.1278, z: -0.9164},
	{x: -0.1804, y: -0.8800, z: 0.4394},
	{x: -0.5759, y: -0.3033, z: -0.7592},
	{x: 0.7352, y: 0.2167, z: -0.6424},
	{x: -0.6361, y: -0.3771, z: -0.6732},
	{x: -0.7958, y: -0.2903, z: -0.5314},
	{x: -0.7210, y: -0.3377, z: -0.6051},
	{x: -0.9307, y: 0.2172, z: 0.2944},
	{x: -0.7612, y: -0.4045, z: -0.5069},
	{x: -0.8583, y: -0.3969, z: -0.3252},
	{x: -0.9143, y: -0.3224, z: -0.2452},
	{x: -0.8131, y: -0.5043, z: -0.2908},
	{x: -0.8751, y: -0.4339, z: -0.2143},
	{x: -0.8841, y: -0.4579, z: -0.0937},
	{x: -0.8714, y: -0.4668, z: 0.1507},
	{x: -0.3026, y: 0.5880, z: 0.7501},
	{x: -0.7077, y: -0.7044, z: -0.0539},
	{x: -0.3130, y: -0.2184, z: -0.9243},
	{x: -0.8266, y: -0.5567, z: 0.0824},
	{x: -0.7736, y: -0.5440, z: 0.3250},
	{x: -0.8018, y: -0.4522, z: 0.3907},
	{x: -0.6672, y: -0.5077, z: 0.5451},
	{x: -0.8229, y: -0.3505, z: 0.4473},
	{x: -0.7503, y: -0.4324, z: 0.5001},
	{x: -0.7666, y: -0.3271, z: 0.5525},
	{x: -0.6882, y: -0.4058, z: 0.6014},
	{x: -0.6170, y: -0.3734, z: 0.6928},
	{x: -0.5370, y: -0.3379, z: 0.7730},
	{x: -0.5454, y: -0.2249, z: 0.8074},
	{x: -0.3614, y: -0.1311, z: 0.9231},
	{x: 0.1862, y: 0.0975, z: 0.9777},
	{x: 0.8099, y: -0.5151, z: -0.2805},
	{x: -0.2807, y: -0.3295, z: -0.9015},
	{x: -0.4734, y: -0.3426, z: -0.8115},
	{x: -0.3602, y: -0.3954, z: -0.8449},
	{x: -0.4335, y: -0.4484, z: -0.7816},
	{x: -0.5851, y: -0.4816, z: -0.6524},
	{x: -0.6810, y: -0.4477, z: -0.5795},
	{x: -0.6209, y: -0.5448, z: -0.5637},
	{x: -0.7157, y: -0.5108, z: -0.4762},
	{x: -0.7912, y: -0.4614, z: -0.4015},
	{x: -0.6655, y: -0.6451, z: -0.3753},
	{x: -0.7621, y: -0.5995, z: -0.2445},
	{x: -0.8287, y: -0.5328, z: -0.1714},
	{x: -0.7750, y: -0.6207, z: -0.1193},
	{x: -0.8350, y: -0.5484, z: -0.0452},
	{x: -0.8828, y: -0.4686, z: 0.0328},
	{x: -0.7045, y: -0.7067, z: 0.0651},
	{x: -0.8401, y: 0.5232, z: -0.1429},
	{x: -0.8082, y: -0.5522, z: 0.2048},
	{x: -0.7595, y: -0.6360, z: 0.1368},
	{x: -0.7332, y: -0.6300, z: 0.2561},
	{x: -0.7251, y: -0.5308, z: 0.4387},
	{x: -0.6918, y: -0.6209, z: 0.3687},
	{x: -0.6386, y: -0.6019, z: 0.4795},
	{x: 0.1816, y: 0.5116, z: 0.8398},
	{x: -0.5742, y: -0.5752, z: 0.5825},
	{x: -0.5987, y: -0.4782, z: 0.6425},
	{x: -0.4409, y: 0.8767, z: 0.1926},
	{x: -0.4493, y: -0.2979, z: 0.8423},
	{x: -0.3440, y: -0.3610, z: 0.8668},
	{x: -0.4554, y: -0.1837, z: 0.8711},
	{x: 0.7060, y: 0.6205, z: 0.3414},
	{x: -0.6464, y: 0.7605, z: -0.0609},
	{x: -0.4609, y: -0.8136, z: 0.3545},
	{x: -0.3483, y: -0.5175, z: -0.7816},
	{x: -0.4801, y: -0.5154, z: -0.7098},
	{x: 0.3855, y: -0.7280, z: -0.5670},
	{x: -0.4433, y: -0.6686, z: -0.5970},
	{x: -0.5190, y: -0.5817, z: -0.6263},
	{x: -0.5484, y: -0.6422, z: -0.5355},
	{x: -0.5706, y: -0.6948, z: -0.4377},
	{x: -0.5131, y: -0.8117, z: -0.2790},
	{x: -0.5910, y: -0.7350, z: -0.3325},
	{x: -0.6851, y: -0.6748, z: -0.2745},
	{x: -0.6104, y: -0.7600, z: -0.2233},
	{x: -0.6443, y: -0.7063, z: 0.2932},
	{x: -0.7009, y: -0.6934, z: -0.1673},
	{x: -0.5393, y: -0.8408, z: -0.0467},
	{x: -0.6223, y: -0.7738, z: 0.1186},
	{x: -0.5425, y: -0.8367, z: 0.0749},
	{x: 0.7420, y: -0.5628, z: 0.3643},
	{x: -0.6775, y: -0.7108, z: 0.1891},
	{x: -0.5568, y: -0.7671, z: 0.3186},
	{x: -0.5666, y: 0.7014, z: 0.4324},
	{x: -0.8503, y: 0.4630, z: -0.2501},
	{x: -0.5432, y: -0.6640, z: 0.5138},
	{x: -0.4163, y: -0.5091, z: 0.7533},
	{x: -0.3917, y: -0.6049, z: 0.6933},
	{x: -0.3268, y: -0.4665, z: 0.8219},
	{x: -0.2322, y: -0.4163, z: 0.8791},
	{x: -0.3562, y: -0.2496, z: 0.9005},
	{x: -0.2583, y: -0.1983, z: 0.9455},
	{x: -0.0369, y: -0.0324, z: -0.9988},
	{x: -0.1693, y: -0.3769, z: -0.9106},
	{x: -0.2599, y: -0.4420, z: -0.8585},
	{x: -0.4085, y: -0.5972, z: -0.6903},
	{x: -0.3053, y: -0.6128, z: -0.7289},
	{x: -0.3658, y: -0.7533, z: -0.5466},
	{x: -0.9087, y: 0.1493, z: 0.3898},
	{x: -0.4702, y: -0.7288, z: -0.4977},
	{x: -0.3903, y: -0.8069, z: -0.4434},
	{x: 0.7702, y: -0.5864, z: 0.2510},
	{x: -0.4928, y: -0.7773, z: -0.3912},
	{x: -0.4120, y: -0.8481, z: -0.3331},
	{x: -0.5297, y: -0.8322, z: -0.1641},
	{x: -0.4403, y: 0.4121, z: -0.7977},
	{x: -0.4436, y: -0.8906, z: -0.1009},
	{x: -0.5405, y: -0.1069, z: 0.8345},
	{x: -0.4518, y: -0.8919, z: 0.0188},
	{x: -0.4301, y: -0.8760, z: -0.2182},
	{x: -0.4708, y: -0.8469, z: 0.2473},
	{x: -0.3706, y: -0.9051, z: 0.2085},
	{x: -0.3700, y: -0.8702, z: 0.3252},
	{x: -0.5663, y: -0.7973, z: 0.2086},
	{x: -0.5071, y: -0.7436, z: 0.4359},
	{x: 0.7099, y: -0.6764, z: 0.1961},
	{x: -0.4382, y: -0.7243, z: 0.5323},
	{x: -0.4713, y: -0.6390, z: 0.6079},
	{x: -0.3625, y: -0.6928, z: 0.6234},
	{x: -0.2775, y: -0.6581, z: 0.6999},
	{x: -0.3046, y: -0.5659, z: 0.7661},
	{x: -0.2131, y: -0.5183, z: 0.8282},
	{x: -0.2473, y: -0.3094, z: 0.9182},
	{x: -0.0222, y: 0.9815, z: 0.1900},
	{x: -0.0758, y: -0.3089, z: -0.9481},
	{x: 0.5416, y: 0.5314, z: -0.6514},
	{x: -0.9916, y: 0.0770, z: -0.1040},
	{x: -0.1140, y: -0.5796, z: -0.8069},
	{x: -0.1952, y: -0.6296, z: -0.7520},
	{x: -0.2553, y: -0.7698, z: -0.5850},
	{x: 0.1120, y: 0.5000, z: -0.8588},
	{x: -0.1665, y: -0.8309, z: -0.5310},
	{x: -0.2817, y: -0.8264, z: -0.4875},
	{x: -0.2164, y: -0.9231, z: -0.3178},
	{x: -0.3056, y: -0.8724, z: -0.3815},
	{x: -0.3258, y: -0.9064, z: -0.2689},
	{x: -0.1397, y: -0.9814, z: -0.1314},
	{x: -0.3417, y: -0.9274, z: -0.1519},
	{x: 0.3688, y: -0.9256, z: 0.0851},
	{x: -0.3534, y: -0.9349, z: -0.0320},
	{x: -0.7076, y: 0.2605, z: 0.6568},
	{x: -0.2484, y: -0.9649, z: -0.0853},
	{x: -0.2651, y: -0.9531, z: 0.1462},
	{x: -0.3643, y: -0.9269, z: 0.0900},
	{x: -0.2692, y: -0.8925, z: 0.3620},
	{x: -0.3948, y: -0.2837, z: -0.8738},
	{x: -0.9503, y: 0.0483, z: -0.3074},
	{x: -0.3290, y: -0.7715, z: 0.5445},
	{x: -0.2137, y: -0.8165, z: 0.5362},
	{x: -0.2461, y: -0.7419, z: 0.6237},
	{x: 0.9062, y: 0.1385, z: 0.3996},
	{x: -0.1889, y: -0.6144, z: 0.7661},
	{x: -0.0981, y: -0.5588, z: 0.8235},
	{x: -0.1183, y: -0.4584, z: 0.8808},
	{x: -0.1353, y: -0.3521, z: 0.9261},
	{x: 0.0475, y: -0.3508, z: -0.9352},
	{x: -0.0508, y: -0.4132, z: -0.9092},
	{x: -0.0245, y: -0.5115, z: -0.8589},
	{x: -0.9516, y: -0.2559, z: 0.1704},
	{x: -0.1051, y: -0.6875, z: -0.7185},
	{x: -0.2257, y: -0.7038, z: -0.6736},
	{x: -0.1380, y: -0.7662, z: -0.6276},
	{x: -0.0767, y: -0.8832, z: -0.4627},
	{x: 0.0175, y: -0.9175, z: -0.3974},
	{x: -0.1933, y: -0.8830, z: -0.4278},
	{x: -0.1029, y: -0.9276, z: -0.3592},
	{x: -0.0098, y: -0.9567, z: -0.2909},
	{x: -0.0292, y: -0.9840, z: -0.1756},
	{x: 0.8777, y: -0.0262, z: -0.4785},
	{x: -0.2347, y: -0.9507, z: -0.2029},
	{x: -0.1501, y: -0.9886, z: -0.0139},
	{x: 0.1662, y: -0.8336, z: -0.5267},
	{x: -0.0405, y: -0.9975, z: -0.0578},
	{x: -0.0508, y: -0.9834, z: 0.1740},
	{x: 0.0519, y: -0.9679, z: 0.2459},
	{x: -0.1557, y: -0.9826, z: 0.1017},
	{x: 0.0371, y: -0.9317, z: 0.3613},
	{x: -0.0723, y: -0.9124, z: 0.4028},
	{x: 0.0139, y: -0.8808, z: 0.4734},
	{x: -0.0967, y: -0.8531, z: 0.5127},
	{x: -0.0126, y: -0.8151, z: 0.5792},
	{x: -0.1289, y: -0.7833, z: 0.6082},
	{x: -0.0434, y: -0.7389, z: 0.6724},
	{x: -0.0726, y: -0.6528, z: 0.7541},
	{x: 0.0163, y: -0.5916, z: 0.8061},
	{x: -0.0223, y: -0.3890, z: 0.9209},
	{x: -0.0388, y: -0.2781, z: 0.9598},
	{x: -0.0018, y: -0.1375, z: -0.9905},
	{x: -0.0077, y: -0.6069, z: -0.7947},
	{x: 0.0061, y: -0.6891, z: -0.7246},
	{x: -0.0237, y: -0.7624, z: -0.6466},
	{x: -0.0498, y: -0.8280, z: -0.5586},
	{x: 0.0725, y: -0.8041, z: -0.5900},
	{x: 0.0220, y: 0.5772, z: -0.8163},
	{x: -0.1002, y: -0.1994, z: -0.9748},
	{x: 0.0457, y: -0.8667, z: -0.4967},
	{x: 0.1397, y: -0.8925, z: -0.4288},
	{x: 0.2301, y: -0.9080, z: -0.3500},
	{x: 0.0824, y: -0.9724, z: -0.2184},
	{x: 0.1784, y: -0.9732, z: -0.1449},
	{x: 0.0652, y: -0.9978, z: 0.0141},
	{x: -0.1635, y: -0.9306, z: 0.3275},
	{x: 0.1691, y: -0.9823, z: 0.0811},
	{x: 0.0590, y: -0.9898, z: 0.1300},
	{x: 0.1603, y: -0.9671, z: 0.1976},
	{x: -0.8609, y: -0.2341, z: -0.4517},
	{x: 0.1467, y: -0.9377, z: 0.3149},
	{x: 0.1258, y: -0.8945, z: 0.4290},
	{x: -0.5201, y: 0.3190, z: 0.7923},
	{x: 0.0987, y: -0.8378, z: 0.5370},
	{x: 0.1813, y: -0.7840, z: 0.5937},
	{x: 0.0708, y: -0.7659, z: 0.6390},
	{x: 0.1533, y: -0.7060, z: 0.6914},
	{x: 0.0418, y: -0.6832, z: 0.7290},
	{x: -0.0040, y: -0.4935, z: 0.8697},
	{x: 0.1100, y: -0.5226, z: 0.8455},
	{x: -0.0854, y: -0.0362, z: 0.9957},
	{x: -0.9573, y: -0.2404, z: -0.1603},
	{x: 0.0732, y: -0.4517, z: -0.8892},
	{x: 0.1894, y: -0.4854, z: -0.8535},
	{x: 0.2057, y: -0.5827, z: -0.7862},
	{x: 0.1020, y: -0.7311, z: -0.6746},
	{x: 0.1950, y: -0.7634, z: -0.6158},
	{x: 0.2848, y: -0.7876, z: -0.5464},
	{x: 0.9667, y: -0.2206, z: 0.1300},
	{x: 0.2556, y: -0.8537, z: -0.4537},
	{x: 0.3069, y: -0.9196, z: -0.2455},
	{x: -0.4356, y: -0.4065, z: 0.8032},
	{x: -0.9165, y: -0.1621, z: -0.3658},
	{x: 0.2811, y: -0.9530, z: -0.1128},
	{x: 0.2758, y: -0.9611, z: 0.0160},
	{x: -0.9243, y: -0.3671, z: 0.1047},
	{x: 0.1762, y: -0.9838, z: -0.0338},
	{x: 0.2670, y: -0.9536, z: 0.1392},
	{x: 0.2534, y: -0.9316, z: 0.2604},
	{x: 0.3572, y: -0.9113, z: 0.2049},
	{x: 0.2336, y: -0.2057, z: -0.9503},
	{x: -0.0703, y: 0.2818, z: 0.9569},
	{x: 0.2356, y: -0.8949, z: 0.3791},
	{x: 0.3205, y: -0.8390, z: 0.4397},
	{x: 0.2950, y: -0.7839, z: 0.5463},
	{x: 0.6090, y: 0.3156, z: 0.7276},
	{x: 0.2617, y: -0.7197, z: 0.6431},
	{x: 0.2373, y: -0.6364, z: 0.7340},
	{x: 0.3336, y: -0.5625, z: 0.7565},
	{x: 0.1285, y: -0.6175, z: 0.7760},
	{x: 0.0913, y: -0.4211, z: 0.9024},
	{x: -0.9823, y: -0.1656, z: 0.0874},
	{x: 0.1409, y: -0.2755, z: -0.9509},
	{x: 0.1674, y: -0.3825, z: -0.9087},
	{x: 0.2825, y: -0.4170, z: -0.8639},
	{x: 0.3002, y: -0.5178, z: -0.8011},
	{x: 0.3053, y: -0.6157, z: -0.7264},
	{x: 0.4160, y: 0.4393, z: -0.7962},
	{x: 0.3978, y: -0.6410, z: -0.6564},
	{x: 0.4836, y: -0.6581, z: -0.5771},
	{x: 0.3357, y: -0.8673, z: -0.3675},
	{x: 0.4483, y: -0.8108, z: -0.3764},
	{x: 0.3766, y: -0.9131, z: -0.1564},
	{x: 0.5231, y: -0.8049, z: -0.2802},
	{x: 0.4717, y: -0.8599, z: -0.1952},
	{x: 0.4709, y: -0.8785, z: -0.0807},
	{x: 0.5626, y: -0.8263, z: -0.0268},
	{x: 0.4680, y: -0.8831, z: 0.0342},
	{x: -0.2701, y: -0.0820, z: 0.9593},
	{x: 0.6463, y: -0.7581, z: -0.0868},
	{x: 0.4592, y: -0.8755, z: 0.1505},
	{x: 0.9705, y: 0.0071, z: 0.2409},
	{x: 0.4429, y: -0.8560, z: 0.2666},
	{x: 0.4218, y: -0.8223, z: 0.3820},
	{x: 0.6836, y: -0.0874, z: -0.7246},
	{x: 0.5943, y: -0.7131, z: 0.3719},
	{x: 0.4158, y: 0.6789, z: 0.6051},
	{x: 0.4723, y: -0.6849, z: 0.5548},
	{x: 0.3433, y: -0.6455, z: 0.6823},
	{x: 0.4402, y: -0.6000, z: 0.6679},
	{x: -0.4640, y: -0.8747, z: 0.1404},
	{x: 0.2225, y: -0.5455, z: 0.8080},
	{x: 0.1846, y: -0.3431, z: 0.9210},
	{x: 0.0725, y: -0.3126, z: 0.9471},
	{x: 0.1134, y: -0.1624, z: -0.9802},
	{x: 0.2599, y: -0.3125, z: -0.9137},
	{x: 0.3893, y: -0.4438, z: -0.8072},
	{x: 0.3995, y: -0.5460, z: -0.7364},
	{x: 0.4907, y: -0.5678, z: -0.6610},
	{x: 0.5750, y: -0.5816, z: -0.5754},
	{x: 0.5633, y: -0.6654, z: -0.4898},
	{x: 0.4649, y: -0.7401, z: -0.4860},
	{x: 0.6381, y: -0.6607, z: -0.3954},
	{x: 0.5379, y: -0.7421, z: -0.4001},
	{x: 0.6284, y: -0.7501, z: -0.2060},
	{x: -0.0006, y: 0.0683, z: -0.9977},
	{x: 0.5603, y: -0.8152, z: -0.1468},
	{x: 0.7129, y: -0.6832, z: -0.1581},
	{x: 0.7250, y: -0.6877, z: -0.0371},
	{x: 0.5569, y: -0.8256, z: 0.0907},
	{x: 0.6465, y: -0.7623, z: 0.0301},
	{x: -0.6025, y: -0.6878, z: 0.4049},
	{x: 0.6377, y: -0.7564, z: 0.1456},
	{x: 0.5437, y: -0.8134, z: 0.2069},
	{x: 0.5226, y: -0.7896, z: 0.3217},
	{x: 0.6883, y: -0.6565, z: 0.3087},
	{x: 0.4963, y: -0.7508, z: 0.4358},
	{x: 0.5605, y: -0.6724, z: 0.4834},
	{x: 0.6172, y: -0.5855, z: 0.5256},
	{x: 0.5299, y: -0.5994, z: 0.5999},
	{x: 0.4262, y: -0.5026, z: 0.7521},
	{x: 0.3171, y: -0.4712, z: 0.8230},
	{x: 0.2960, y: -0.3699, z: 0.8806},
	{x: 0.3254, y: 0.3706, z: 0.8700},
	{x: 0.2734, y: -0.2613, z: 0.9257},
	{x: 0.0227, y: -0.2456, z: -0.9691},
	{x: 0.3466, y: -0.2298, z: -0.9094},
	{x: 0.3707, y: -0.3385, z: -0.8648},
	{x: 0.4852, y: -0.4675, z: -0.7389},
	{x: 0.5656, y: -0.3816, z: -0.7310},
	{x: 0.5722, y: -0.4854, z: -0.6611},
	{x: 0.6507, y: -0.4961, z: -0.5748},
	{x: -0.6469, y: -0.5997, z: -0.4710},
	{x: 0.6536, y: -0.5861, z: -0.4788},
	{x: 0.7227, y: -0.5897, z: -0.3604},
	{x: 0.6922, y: -0.6657, z: -0.2786},
	{x: 0.5536, y: 0.7568, z: -0.3475},
	{x: 0.7668, y: -0.6005, z: -0.2270},
	{x: -0.3374, y: -0.6887, z: -0.6418},
	{x: 0.7870, y: -0.6081, z: -0.1043},
	{x: 0.7939, y: -0.6078, z: 0.0170},
	{x: 0.8520, y: -0.5182, z: 0.0741},
	{x: -0.0560, y: -0.1604, z: 0.9855},
	{x: 0.6203, y: -0.7401, z: 0.2597},
	{x: -0.5210, y: -0.4451, z: 0.7283},
	{x: -0.3986, y: -0.8014, z: 0.4459},
	{x: -0.6233, y: -0.7740, z: -0.1118},
	{x: 0.6569, y: -0.6272, z: 0.4184},
	{x: 0.6161, y: -0.5079, z: 0.6020},
	{x: 0.8124, y: -0.0097, z: -0.5830},
	{x: 0.8995, y: -0.3259, z: -0.2910},
	{x: 0.5899, y: -0.4194, z: 0.6900},
	{x: 0.4033, y: -0.3977, z: 0.8241},
	{x: 0.3820, y: -0.2891, z: 0.8778},
	{x: 0.3559, y: -0.1772, z: 0.9176},
	{x: 0.0528, y: -0.1969, z: 0.9790},
	{x: 0.3185, y: -0.1174, z: -0.9406},
	{x: 0.4526, y: -0.2528, z: -0.8551},
	{x: 0.4730, y: -0.3616, z: -0.8034},
	{x: 0.7257, y: -0.4040, z: -0.5570},
	{x: 0.5507, y: -0.2732, z: -0.7887},
	{x: 0.6498, y: -0.3962, z: -0.6487},
	{x: -0.5597, y: 0.1185, z: -0.8202},
	{x: 0.8513, y: -0.2198, z: -0.4765},
	{x: 0.5208, y: -0.5129, z: 0.6824},
	{x: 0.7924, y: -0.4048, z: -0.4563},
	{x: 0.0445, y: 0.6696, z: -0.7414},
	{x: 0.7757, y: -0.4992, z: -0.3861},
	{x: 0.8755, y: -0.4266, z: -0.2268},
	{x: -0.1600, y: -0.7031, z: 0.6929},
	{x: 0.8962, y: -0.4305, z: -0.1073},
	{x: 0.8379, y: -0.5206, z: -0.1639},
	{x: 0.9033, y: -0.4288, z: 0.0128},
	{x: 0.3760, y: -0.7087, z: 0.5969},
	{x: 0.8979, y: -0.4199, z: 0.1319},
	{x: 0.8503, y: -0.3829, z: 0.3610},
	{x: 0.8178, y: -0.4883, z: 0.3046},
	{x: 0.5998, y: 0.0042, z: 0.8001},
	{x: 0.7826, y: -0.4640, z: 0.4151},
	{x: 0.7314, y: -0.4393, z: 0.5217},
	{x: 0.7479, y: -0.3310, z: 0.5753},
	{x: 0.6734, y: -0.4159, z: 0.6112},
	{x: 0.6680, y: -0.3180, z: 0.6728},
	{x: 0.5797, y: -0.3178, z: 0.7503},
	{x: 0.4998, y: -0.4132, z: 0.7612},
	{x: -0.5288, y: 0.5726, z: 0.6265},
	{x: 0.4338, y: -0.0891, z: 0.8966},
	{x: 0.2458, y: -0.1465, z: 0.9582},
	{x: 0.0798, y: -0.0428, z: -0.9959},
	{x: 0.4256, y: -0.1407, z: -0.8939},
	{x: 0.9894, y: -0.1356, z: -0.0516},
	{x: 0.3743, y: 0.9271, z: 0.0177},
	{x: 0.6213, y: -0.1816, z: -0.7622},
	{x: 0.7071, y: -0.1975, z: -0.6790},
	{x: 0.7839, y: -0.2094, z: -0.5845},
	{x: 0.7935, y: -0.3097, z: -0.5239},
	{x: 0.8974, y: -0.1292, z: -0.4220},
	{x: 0.9054, y: -0.2280, z: -0.3581},
	{x: 0.8548, y: -0.3171, z: -0.4108},
	{x: 0.9433, y: -0.2341, z: -0.2352},
	{x: 0.9269, y: -0.3341, z: -0.1711},
	{x: 0.9649, y: -0.2374, z: -0.1122},
	{x: 0.8805, y: -0.4041, z: 0.2479},
	{x: 0.9725, y: -0.2328, z: 0.0104},
	{x: 0.9411, y: -0.3345, z: -0.0494},
	{x: 0.9899, y: -0.1241, z: 0.0687},
	{x: 0.9419, y: -0.3281, z: 0.0716},
	{x: 0.4439, y: 0.0755, z: -0.8929},
	{x: 0.9302, y: -0.3143, z: 0.1898},
	{x: -0.2588, y: -0.9654, z: 0.0323},
	{x: 0.9053, y: -0.2956, z: 0.3051},
	{x: 0.8057, y: -0.3593, z: 0.4710},
	{x: 0.8132, y: -0.2509, z: 0.5251},
	{x: 0.7396, y: -0.2305, z: 0.6324},
	{x: 0.7213, y: -0.1275, z: 0.6807},
	{x: 0.6542, y: -0.2159, z: 0.7249},
	{x: -0.7617, y: 0.0246, z: 0.6475},
	{x: 0.5081, y: 0.0016, z: 0.8613},
	{x: 0.9005, y: 0.3921, z: -0.1881},
	{x: 0.2894, y: -0.0006, z: -0.9572},
	{x: 0.3935, y: -0.0238, z: -0.9190},
	{x: 0.4940, y: -0.0464, z: -0.8682},
	{x: 0.5929, y: -0.0697, z: -0.8023},
	{x: 0.7363, y: 0.0076, z: -0.6766},
	{x: 0.7649, y: -0.1030, z: -0.6358},
	{x: 0.8366, y: -0.1180, z: -0.5349},
	{x: 0.7713, y: 0.4042, z: -0.4916},
	{x: 0.8043, y: 0.3558, z: 0.4760},
	{x: -0.1240, y: -0.9609, z: -0.2477},
	{x: 0.9440, y: -0.1359, z: -0.3007},
	{x: 0.9701, y: -0.0408, z: -0.2393},
	{x: 0.9747, y: -0.1385, z: -0.1756},
	{x: 0.9928, y: -0.0379, z: -0.1140},
	{x: 0.9996, y: -0.0261, z: 0.0061},
	{x: 0.9957, y: 0.0727, z: -0.0575},
	{x: -0.1601, y: -0.9633, z: 0.2154},
	{x: 0.9919, y: -0.0126, z: 0.1261},
	{x: 0.9762, y: -0.1091, z: 0.1874},
	{x: 0.9473, y: -0.2038, z: 0.2472},
	{x: 0.9144, y: -0.1837, z: 0.3607},
	{x: 0.9491, y: -0.0894, z: 0.3019},
	{x: 0.8665, y: -0.2742, z: 0.4171},
	{x: 0.8670, y: -0.1637, z: 0.4707},
	{x: 0.8020, y: -0.1479, z: 0.5787},
	{x: 0.8877, y: 0.3550, z: -0.2931},
	{x: 0.6933, y: -0.0221, z: 0.7203},
	{x: 0.6313, y: -0.1092, z: 0.7678},
	{x: -0.0455, y: -0.9973, z: 0.0585},
	{x: 0.3250, y: -0.0616, z: 0.9437},
	{x: 0.1355, y: -0.1114, z: 0.9845}
]

kd_tree_points_with_index = kd_tree_sample_points.map((point, idx) => {
	point.index = idx;
	return point;
});

module.exports = new kdTree.kdTree(
	kd_tree_points_with_index,
	utils.euclideanDist,
	['x', 'y', 'z']
);
	
},{"./kd-tree-javascript/kdTree.js":5,"./utils.js":20}],19:[function(require,module,exports){
var ndarray = require('ndarray');
var cwise = require('cwise');
var hazeTree = require('./sample_1000.js');

transmittanceMap = function(canvas, airLight) {
	var context = canvas.getContext('2d');
	var picWidth = canvas.width,
		picHeight = canvas.height,
		pixCount = picWidth*picHeight,
		picDim = [picHeight, picWidth];
	var colorArray = ndarray(context.getImageData(0, 0, picWidth, picHeight).data,
	                 [picHeight, picWidth, 4]);
	var ballPointCount = window.kd_tree_points_with_index.length;
	/*var hazeTree = new window.kdTree(
		window.kd_tree_points_with_index, window.euclideanDist, ['x', 'y', 'z']
	);*/
	var nearestQuery = ndarray(new Uint16Array(pixCount), picDim);
	var furthestDist = ndarray(new Float32Array(ballPointCount), [ballPointCount]);
	var colorNorm = ndarray(new Float32Array(pixCount), picDim);
	for(var i = 0; i < picHeight; ++i) {
		for(var j = 0; j < picWidth; ++j) {
			var cc = [
				colorArray.get(i, j, 0)/255 - airLight[0],
				colorArray.get(i, j, 1)/255 - airLight[1],
				colorArray.get(i, j, 2)/255 - airLight[2]
			];
			var cN = Math.sqrt(cc[0]*cc[0] + cc[1]*cc[1] + cc[2]*cc[2]);
			colorNorm.set(i, j, cN); 
			var cND = { x:cc[0]/cN, y:cc[1]/cN, z:cc[2]/cN };
			var nQ = hazeTree.nearest(cND, 1, 0.1)[0][0].index;
			nearestQuery.set(i, j, nQ);
			furthestDist.set(nQ, Math.max(furthestDist.get(nQ), cN));
		}
	}
	var transmittanceRaw = ndarray(new Float32Array(pixCount), picDim);
	var maxTrans = cwise({
		args: [{blockIndices: -1}],
		pre: function() {
			this.res = [256, 256, 256];
		},
		body: function(c) {
			this.res = [
				Math.min(this.res[0], c[0]),
				Math.min(this.res[1], c[1]),
				Math.min(this.res[2], c[2])
			];
		},
		post: function() {
			return this.res;
		}
	})(colorArray).reduce((a, b, i) => {
		return Math.min(a, 1 - b/(airLight[i]*255));
	}, 1.0);
	var transmittanceRaw = ndarray(new Float32Array(pixCount), picDim);
	for(var i = 0; i < picHeight; ++i) {
		for(var j = 0; j < picWidth; ++j) {
			var t = maxTrans*colorNorm.get(i, j)
						 /furthestDist.get(nearestQuery.get(i, j));
			var lbRatio = [
				colorArray.get(i, j, 0)/255/airLight[0],
				colorArray.get(i, j, 1)/255/airLight[1],
				colorArray.get(i, j, 2)/255/airLight[2]
			].reduce((a, b) => Math.min(a, b));
			transmittanceRaw.set(i, j, Math.max(t, 1-lbRatio));
		}
	}
	var sum =    ndarray(new Float32Array(ballPointCount), [ballPointCount]),
			sum2 =   ndarray(new Float32Array(ballPointCount), [ballPointCount]),
			pCount = ndarray(new Uint32Array(ballPointCount), [ballPointCount]);
	transmittanceRaw.data.forEach((t, i) => {
		var p = nearestQuery.data[i];
		sum.set(p, sum.get(p)+t);
		sum2.set(p, sum2.get(p)+t*t);
		pCount.set(p, pCount.get(p)+1);
	});
	var one_var = ndarray(new Float32Array(ballPointCount), [ballPointCount]);
	cwise({
		args: ['array', 'array', 'array', 'array'],
		body: function(o, s, s2, c) {
			var avg = s/c, v = (s2/c - avg*avg);
			o = (v !== 0)? 1/v: 0;
		}
	})(one_var, sum, sum2, pCount);
	var lambda = 0.5;
	var epsilon = 1e-6;
	var coeffs = ndarray(new Float32Array(pixCount*5), picDim.concat(5));
	var one_varPix = ndarray(new Float32Array(pixCount), picDim);
	for(var i = 0; i < picHeight; ++i) {
		for(var j = 0; j < picWidth; ++j) {
			var c = one_var.get(nearestQuery.get(i, j));
			one_varPix.set(i, j, c);
			coeffs.set(i, j, 4, c);
		}
	}
	function laplacianCoeff(i, j, o) {
		var cN = [
			(colorArray.get(i + o[0], j + o[1], 0) - colorArray.get(i, j, 0))/255,
			(colorArray.get(i + o[0], j + o[1], 1) - colorArray.get(i, j, 1))/255,
			(colorArray.get(i + o[0], j + o[1], 2) - colorArray.get(i, j, 2))/255,
		].reduce((a, b) => a + b*b, 0) + epsilon;
		var coeff = lambda*2/cN;
		return coeff;
	}
	for(var i = 0; i < picHeight; ++i) {
		for(var j = 0; j < picWidth; ++j) {
			if(i > 0) {
				var c = laplacianCoeff(i, j, [-1, 0]);
				coeffs.set(i, j, 0, -c);
				coeffs.set(i, j, 4, coeffs.get(i, j, 4)+c);
			}
			if(j > 0) {
				var c = laplacianCoeff(i, j, [0, -1]);
				coeffs.set(i, j, 1, -c);
				coeffs.set(i, j, 4, coeffs.get(i, j, 4)+c);
			}
			if(j < picWidth - 1) {
				var c = laplacianCoeff(i, j, [0,1]);
				coeffs.set(i, j, 2, -c);
				coeffs.set(i, j, 4, coeffs.get(i, j, 4)+c);
			}
			if(i < picHeight-1) {
				var c = laplacianCoeff(i, j, [1,0]);
				coeffs.set(i, j, 3, -c);
				coeffs.set(i, j, 4, coeffs.get(i, j, 4)+c);
			}
		}
	}
	var RHS = ndarray(new Float32Array(pixCount), picDim);
	var mprod = cwise({
		args: ['array', 'array', 'array'],
		body: function(c, a, b) {c = a*b;}
	});
	mprod(RHS, one_varPix, transmittanceRaw);
	
	//Conjugate gradients
	smoothTransmittance(coeffs, RHS, transmittanceRaw, 75);
	
	return transmittanceRaw.data;
}

function smoothTransmittance(A, rhs, x, max_iter) {
	var M = ndarray(new Float32Array(rhs.data.length), rhs.shape);
	var mprod = cwise({
		args: ['array', 'array', 'array'],
		body: function(c, a, b) {c = a*b;}
	});
	var iprod = cwise({
		args: ['array', 'array'],
		pre: function(){this.prod = 0;},
		body: function(a, b) {this.prod += a*b;},
		post: function(){return this.prod;}
	});
	var msub = cwise({
		args: ['array', 'array', 'array'],
		body: function(c, a, b) {c = a-b;}
	});
	var apply = cwise({
		args: ['array', 'array', {blockIndices: -1},
		 {offset:[-1, 0], array: 1},
		 {offset:[0, -1], array: 1},
		 {offset:[0, 1], array: 1},
		 {offset:[1, 0], array: 1}
		],
		pre: function() {
			this.log = true;
		},
		body: function(o, x, a, u, l, r, b) {
			if(u === undefined) u = 0;
			if(l === undefined) l = 0;
			if(r === undefined) r = 0;
			if(b === undefined) b = 0;
			o = u*a[0] + l*a[1] + r*a[2] + b*a[3] + x*a[4];
		}
	});
	var incVec = cwise({
		args: ['scalar', 'array', 'scalar', 'array'],
		body: function(a, am, b, bm) { am = a*am + b*bm; }
	});

	cwise({
		args: ['array', {blockIndices: -1}],
		body: function(m, a) {m = (Math.abs(a[4]) > 1e-5)?1/a[4]:1;}
	})(M, A);

	var R = ndarray(new Float32Array(rhs.data.length), rhs.shape);
	var Z = ndarray(new Float32Array(rhs.data.length), rhs.shape);
	var P = ndarray(new Float32Array(rhs.data.length), rhs.shape);
	var Ax = ndarray(new Float32Array(rhs.data.length), rhs.shape);
	var Ap = ndarray(new Float32Array(rhs.data.length), rhs.shape);
	var zTr = 0, zTrOld = 0;
	apply(Ax, x, A);
	msub(R, rhs, Ax);
	mprod(Z, R, M);
	P.data = Z.data.slice(0);
	zTrOld = iprod(Z, R);
	

	for(var k = 0; k < max_iter; ++k) {
		apply(Ap, P, A);
		var alpha = zTr/iprod(Ap, P);
		incVec(1, x, alpha, P);
		incVec(1, R, -alpha, Ap);
		var rmax = R.data.reduce((a, b) => Math.max(Math.abs(b), a));
		mprod(Z, M, R);
		zTr = iprod(Z, R);
		var beta = zTr/zTrOld;
		incVec(beta, P, 1, Z);
		zTrOld = zTr;
	}
}

module.exports = transmittanceMap;
},{"./sample_1000.js":18,"cwise":12,"ndarray":16}],20:[function(require,module,exports){
function makeColorArray(canvas, normalize = false) {
	var context = canvas.getContext('2d');
	var colorArrayFlat = Array.from(context.getImageData(
			0, 0, canvas.width, canvas.height).data);
	if(normalize) {
		colorArrayFlat.map(d => d/255);
	}
	var retArray = Array(Math.ceil(colorArrayFlat.length/4)).fill();
	for(var i = 0; i < retArray.length; ++i) {
		retArray[i] = [
			colorArrayFlat[4*i], colorArrayFlat[4*i+1], colorArrayFlat[4*i+2]
		];
	}
	return retArray;
}

function arange(start, step, end) {
	var nnums = Math.floor((end - start) / step) + 1;
	return Array(nnums).fill().map((_, idx) => start + idx*step);
}

function linRange(start, elems, end) {
	var step = (end - start)/(elems-1);
	return Array(elems).fill().map((_, idx) => start + idx*step);
}

function cartesian(A, B) {
	return [].concat(...A.map(d => B.map(e => [d, e])));
}

function range(size) {
	return [...Array(size).keys()];
}

function range(start, end) {
	var size = end - start;
	return [...Array(size).keys()].map(d => d + start);
}

function list2dict3D(array) {
	var ret = array.map(data => {
		return { x: data[0], y: data[1], z: data[2] };
	});
	return ret;
}

function dict2list3D(dict) {
	return dict.map(entry => [entry.x, entry.y, entry.z]);
}

function euclideanDist(a, b) {
	var diff = {
		x: a.x - b.x,
		y: a.y - b.y,
		z: a.z - b.z
	};
	return Math.sqrt(diff.x*diff.x + diff.y*diff.y + diff.z*diff.z);
}

function angleDist(a, b) {
	var innerProd = a.x*b.x + a.y*b.y + a.z*b.z;
	innerProd = Math.max(-1.0, Math.min(innerProd, 1.0));
	return Math.acos(innerProd) / Math.PI * 2;
}

flatten = function(arr, result = []) {
  for (let i = 0, length = arr.length; i < length; i++) {
    const value = arr[i];
    if (Array.isArray(value)) {
      flatten(value, result);
    } else {
      result.push(value);
    }
  }
  return result;
};

function cloneCanvas(oldCanvas) {
	var newCanvas = document.createElement('canvas');
	var context = newCanvas.getContext('2d');

	newCanvas.width = oldCanvas.width;
	newCanvas.height = oldCanvas.height;

	context.drawImage(oldCanvas, 0, 0);
	return newCanvas;
}
 module.exports.makeColorArray = makeColorArray;
 module.exports.arange = arange;
 module.exports.linRange = linRange;
 module.exports.cartesian = cartesian;
 module.exports.range = range;
 module.exports.list2dict3D = list2dict3D;
 module.exports.dict2list3D = dict2list3D;
 module.exports.euclideanDist = euclideanDist;
 module.exports.angleDist = angleDist;
 module.exports.flatten = flatten;
 module.exports.cloneCanvas = cloneCanvas;
 
},{}]},{},[6]);
