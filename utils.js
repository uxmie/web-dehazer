function makeColorArray(canvas, normalize = false) {
	var context = canvas.getContext('2d');
	var colorArrayFlat = Array.from(context.getImageData(
			0, 0, canvas.width, canvas.height).data);
	if(normalize) {
		colorArrayFlat.map(d => d/255);
	}
	return Array(Math.ceil(colorArrayFlat.length/4)).fill()
			.map((_,idx) => colorArrayFlat.slice(idx*4, idx*4 + 4))
			.map(data => data.slice(0, 3));
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