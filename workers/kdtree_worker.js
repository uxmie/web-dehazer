var QuantKDTree = require('../functions/min-variance-quantization');
var estimateAirLight = require('../functions/airlight.js');

module.exports = function(self) {
	onmessage = function(e) {
		var data = e.data;
		var clusters = data.clusters;
		var imageflat = data.image;
		var minEst = data.minEst;
		var maxEst = data.maxEst;

		var startTime = new Date();
		var image = Array(Math.ceil(imageflat.length/4)).fill();
		for(var i = 0; i < image.length; ++i) {
			image[i] = [
				imageflat[4*i], imageflat[4*i+1], imageflat[4*i+2]
			];
		}
		var quantStruct = new QuantKDTree(image.slice(0), clusters);
		var endTime = new Date();
		console.log("Finished quantization in " + (endTime - startTime)/1000 + " secs.");

		var airLight = estimateAirLight(image, quantStruct, minEst, maxEst);
		endTime = new Date();
		console.log("Finished air light in " + (endTime - startTime)/1000 + " secs.");
		self.postMessage(airLight);

		self.close();
	}
}