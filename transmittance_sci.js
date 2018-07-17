var ndarray = require('ndarray');
var cwise = require('cwise');

window.transmittanceMap = function(canvas, airLight) {
	var context = canvas.getContext('2d');
	var picWidth = canvas.width,
		picHeight = canvas.height,
		pixCount = picWidth*picHeight,
		picDim = [picHeight, picWidth];
	var colorArray = ndarray(context.getImageData(0, 0, picWidth, picHeight).data,
	                 [picHeight, picWidth, 4]);
	var ballPointCount = window.kd_tree_points_with_index.length;
	var hazeTree = new window.kdTree(
		window.kd_tree_points_with_index, window.euclideanDist, ['x', 'y', 'z']
	);
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
	var lambda = 5;
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
	smoothTransmittance(coeffs, RHS, transmittanceRaw, 150);
	
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