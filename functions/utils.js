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
 