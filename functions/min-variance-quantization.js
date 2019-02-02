var PriorityQueue = require('./js-priority-queue/priority-queue.js');

// Now use the nd_array

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
		var histo = new Uint32Array(256).fill(0);
		for(var j = this.startIdx; j < this.endIdx; ++j) {
			histo[colorArray[4*j + i]]++;
		}
		/*colorArray.slice(this.startIdx, this.endIdx).forEach(element => {
			histo[element[i]]++;
		});8?

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
		colorArray, 0, colorArray.length/4,//colorArray.size[0],
		[0, 0, 0], [255, 255, 252],
		-1)
	);
	console.log("ha");

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

		var left_idx = front.startIdx-1, right_idx = front.startIdx;
		for (var right_idx = front.startIdx; right_idx < front.endIdx; ++right_idx) {
			if(colorArray[4*right_idx + sc] < st) {
				left_idx++;
				var left_real = left_idx*4;
				var right_real = right_idx*4;
				for(var j = 0; j < 4; ++j) {
					var t = colorArray[right_real + j];
					colorArray[right_real + j] = colorArray[left_real + j]
					colorArray[left_real + j] = t;
				}
			}
		}
		var pivot = left_idx + 1;
		if(pivot == front.startIdx || pivot == front.endIdx) {
			idx++;
			currLeaves++;
			continue;
		}
		
		// Split colorArray
		/*var colorslice = colorArray.slice(front.startIdx, front.endIdx);
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
		});*/

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
	this.centroids = new Uint8ClampedArray(clusters*3);
	this.n_clusters = clusters;
	for(var i = 0; i < idx; ++i) {
		if(this.kdtree[i].isLeaf) {
			this.kdtree[i].index = leafindex;

			//Calculate centroid
			var leaf = this.kdtree[i];
			var colorsum = [0, 0, 0];
			for(var j = leaf.startIdx*4; j < leaf.endIdx*4; j = j+4) {
				colorsum[0] += colorArray[j];
				colorsum[1] += colorArray[j + 1];
				colorsum[2] += colorArray[j + 2];
			}
			var elems = leaf.endIdx - leaf.startIdx;
			this.centroids[leafindex*3] = Math.round(colorsum[0]/elems);
			this.centroids[leafindex*3 + 1] = Math.round(colorsum[1]/elems);
			this.centroids[leafindex*3 + 2] = Math.round(colorsum[2]/elems);
			leaf.centroid = this.centroids.slice(leafindex*3, leafindex*3 + 3);
			leafindex++;
		}
	}
	/*for(var i = 0; i < idx; ++i) {
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
	}*/
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

/*QuantKDTree.prototype.quantizeImage = function(canvas, destCanvas) {
	var colorArray = makeColorArray(canvas);

	var destColorArray = colorArray.map(data => this.lookupColor(data).concat(255));
	var destFlat = new Uint8ClampedArray([].concat.apply([], destColorArray));
	
	destCanvas.width = canvas.width;
	destCanvas.height = canvas.height;
	var dContext = destCanvas.getContext("2d");
	var imageData = dContext.createImageData(canvas.width, canvas.height);
	imageData.data.set(destFlat);
	dContext.putImageData(imageData, 0, 0);
}*/

QuantKDTree.prototype.quantizeID = function(colorArray) {
	var ids = new Uint16Array(colorArray.length / 4);
	for(i = 0; i < colorArray.length/4; i++) {
		ids[i] = this.lookupID(colorArray.slice(i*4, i*4+3));
	}
	return ids;
}

module.exports = QuantKDTree;