var transmittanceMap = require('../functions/transmittance.js');

module.exports = function(self) {
	onmessage = function(e) {
		var data = e.data;
		var colorArray = data.colorArray,
				picWidth = data.picWidth,
				picHeight = data.picHeight,
				airLight = data.airLight;
		var transmittance = transmittanceMap(colorArray, picWidth, picHeight, airLight);
		self.postMessage({signal:"finish", transmittance: transmittance}, [transmittance.buffer]);
		self.close();
	}
}