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
			//console.log(pq.length)
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
		//Array.prototype.splice.apply(
		//	colorArray, [front.startIdx, partition.length].concat(partition));

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
	//var colorArray = makeColorArray(canvas);
	return colorArray.map(data => this.lookupID(data));
}