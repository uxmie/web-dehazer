function transmittanceMap(canvas, airLight) {
	var colorArray = makeColorArray(canvas);
	var picWidth = canvas.width;
	var picHeight = canvas.height;
	var ballPointCount = kd_tree_points_with_index.length;
	var hazeTree = new kdTree(kd_tree_points_with_index, euclideanDist, ['x', 'y', 'z']);
	var colorNorm = new Float32Array(colorArray.length);
	var nearestQuery = new Uint16Array(colorArray.length);
	var furthestDist = new Float32Array(ballPointCount).fill(0);
	colorArray.forEach((color, i) => {
		var cc = [
			color[0]/255 - airLight[0],
			color[1]/255 - airLight[1],
			color[2]/255 - airLight[2],
		];
		var cN = Math.sqrt(
			cc[0]*cc[0] + cc[1]*cc[1] + cc[2]*cc[2]
		);
		colorNorm[i] = cN;
		var cND = {
			x: cc[0]/cN, y: cc[1]/cN, z: cc[2]/cN
		};
		var qidx = hazeTree.nearest(cND, 1, 0.1)[0][0].index;
		nearestQuery[i] = qidx;
		furthestDist[qidx] = Math.max(furthestDist[qidx], colorNorm[i]);
	});
	var maxTrans = colorArray.reduce((a, b) => {
		return [
			Math.min(a[0], b[0]), Math.min(a[1], b[1]), Math.min(a[2], b[2])
		];
	}, [256, 256, 256]).reduce((a, b, i) => {
		return Math.min(a, 1 - b/(airLight[i]*255));
	}, 1.0);
	var transmittanceRaw = new Float32Array(colorArray.length).fill()
	transmittanceRaw.forEach((_, idx) => {
		var t = maxTrans * colorNorm[idx] / furthestDist[nearestQuery[idx]];
		var lbRatio = colorArray[idx]
		              .map((val, ch) => (val/255) / airLight[ch])
									.reduce((a, b) => Math.min(a, b));
		transmittanceRaw[idx] = Math.max(t, 1-lbRatio);
	});
	// Normalize Transmittance
	// Standard deviation of each pixel
	var sum = Array(ballPointCount).fill(0);
	var sum2 = Array(ballPointCount).fill(0);
	var pCount = Array(ballPointCount).fill(0);
	transmittanceRaw.forEach((t,idx) => {
		var pointIdx = nearestQuery[idx];
		sum[pointIdx] += t;
		sum2[pointIdx] += t*t;
		pCount[pointIdx]++;
	});
	var varPoints = Array(ballPointCount).fill().map((_, idx) => {
		var avg = sum[idx]/pCount[idx];
		return (sum2[idx]/(pCount[idx]) - avg*avg);
	});
	console.log('stop');

	// Solve sparse system to smooth transmittance map.
	var spMatTriplet = []
	var spRHS = new Float32Array(colorArray.length).fill(0);
	var lambda = 0.5;
	var epsilon = 0.000001;

	function laplacianCoeff(idx, nIdx) {
		var colorNorm = colorArray[idx].map((ch, j) =>
			(ch - colorArray[nIdx][j])/255
		).reduce((a, b) => a + b*b, 0) + epsilon;
		var coeff = lambda*2/colorNorm;
		return coeff;
	}

	transmittanceRaw.forEach((t, idx) => {
		// Decode to width and height
		var x = idx % picWidth;
		var y = Math.floor(idx /picWidth);
		var varPix = varPoints[nearestQuery[idx]];
		var one_varPix = 1/varPix;
		if(varPix === 0) one_varPix = 0;
		var idxSum = one_varPix;

		if (x > 0) {
			var leftIdx = y*picWidth + x - 1;
			var coeff = laplacianCoeff(idx, leftIdx);
			spMatTriplet.push([idx, leftIdx, -coeff]);
			idxSum += coeff;
		}
		if (y > 0) {
			var upIdx = (y-1)*picWidth + x;
			var coeff = laplacianCoeff(idx, upIdx);
			spMatTriplet.push([idx, upIdx, -coeff]);
			idxSum += coeff;
		}
		if (x < picWidth - 1) {
			var rightIdx = y*picWidth + x + 1;
			var coeff = laplacianCoeff(idx, rightIdx);
			spMatTriplet.push([idx, rightIdx, -coeff]);
			idxSum += coeff;
		}
		if (y < picHeight - 1) {
			var downIdx = (y+1)*picWidth + x;
			var coeff = laplacianCoeff(idx, downIdx);
			spMatTriplet.push([idx, downIdx, -coeff]);
			idxSum += coeff;
		}

		//Diagonal elements
		spMatTriplet.push([idx, idx, idxSum]);
		spRHS[idx] = one_varPix*t;
	});

	console.log("Solving pcg");
	var ans = solveSPTriplet(
		colorArray.length,
		spMatTriplet,
		spRHS,
		transmittanceRaw.slice(0), 50);
	return ans;
}