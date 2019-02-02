var QuantKDTree = require('../functions/min-variance-quantization.js');
var estimateAirLight = require('../functions/airlight.js');
var transmittanceMap = require('../functions/transmittance.js');

module.exports = function(self) {
	onmessage = function(e) {
		var data = e.data;
		var clusters = data.clusters;
		var imageflat = data.image;
		var minEst = data.minEst;
		var maxEst = data.maxEst;
		var picWidth = data.picWidth;
		var picHeight = data.picHeight;

		var startTime = new Date();
		self.postMessage({signal: "Finding air light…"});
		var quantStruct = new QuantKDTree(imageflat.slice(0), clusters);
		var endTime = new Date();
		console.log("Finished quantization in " + (endTime - startTime)/1000 + " secs.");

		var airLight = estimateAirLight(imageflat, quantStruct, minEst, maxEst);
		endTime = new Date();
		console.log("Finished air light in " + (endTime - startTime)/1000 + " secs.");

		self.postMessage({signal: "Finding transmittance map…"});
		var transmittance = transmittanceMap(imageflat, picWidth, picHeight, airLight);
		self.postMessage({
			signal: "finish",
			airLight: airLight,
			transmittance:transmittance}, [transmittance.buffer]);
		self.close();
	}
}