var hazeTreeLib = require('./sample_642.js');
var hazeTree = hazeTreeLib.tree;

transmittanceMap = function(colorArrayFlat, picWidth, picHeight, airLight) {
	var	pixCount = picWidth*picHeight;
	var colorArray = colorArrayFlat;
	var ballPointCount = hazeTreeLib.length;
	var nearestQuery = new Uint16Array(pixCount);
	var nextNearestQuery = new Uint16Array(pixCount);
	var furthestDist = new Float32Array(ballPointCount);
	var colorNorm = new Float32Array(pixCount);
	var dists = new Float32Array(pixCount*2);

	self.postMessage({signal: "Clustering points…"});

	var ff = 0.0;
	for(var i = 0; i < pixCount; ++i) {
		var cc = [
			colorArray[4*i]/255 - airLight[0],
			colorArray[4*i + 1]/255 - airLight[1],
			colorArray[4*i + 2]/255 - airLight[2]
		];
		var cN = Math.sqrt(cc[0]*cc[0] + cc[1]*cc[1] + cc[2]*cc[2]);
		colorNorm[i] = cN; 
		var cND = { x:cc[0]/cN, y:cc[1]/cN, z:cc[2]/cN };
		var kdquery = hazeTree.nearest(cND, 2, 0.4);
		var nQ = kdquery[1][0].index;
		var nnQ = kdquery[0][0].index;
		nearestQuery[i] = nQ;

		ff = Math.max(kdquery[0][1], ff);

		furthestDist[nQ] = Math.max(furthestDist[nQ], cN);

		if(kdquery[0][1] - kdquery[1][1] < 1e-2 || furthestDist[nnQ] == 0) {
			furthestDist[nnQ] = Math.max(furthestDist[nnQ], cN);
		}
		/*if(furthestDist[nnQ] == 0) {
			furthestDist[nnQ] = cN;
		}*/
		
		nextNearestQuery[i] = kdquery[0][0].index;
		dists[i*2] = kdquery[1][1];
		dists[i*2 + 1] = kdquery[0][1];

	}

	
	self.postMessage({signal: "Calculating raw transmittance…"});
	var maxColor = [255, 255, 255];
	for(var i = 0; i < pixCount*4; i += 4) {
		maxColor[0] = Math.min(maxColor[0], colorArray[i]);
		maxColor[1] = Math.min(maxColor[1], colorArray[i+1]);
		maxColor[2] = Math.min(maxColor[2], colorArray[i+2]);
	}
	var maxTrans = 1.0;
	for(var i = 0; i < 3; ++i) {
		maxTrans = Math.min(maxTrans, 1 - maxColor[i]/(airLight[i]*255));
	}
	var transmittance = new Float32Array(pixCount);
	for(var i = 0, idx = 0; i < picHeight; ++i) {
		for(var j = 0; j < picWidth; ++j, ++idx) {
			var t1 = maxTrans*colorNorm[idx]
						 /furthestDist[nearestQuery[idx]];
			var t2 = maxTrans*colorNorm[idx]
						 /furthestDist[nextNearestQuery[idx]];
			var weightsum = dists[idx*2] + dists[idx*2 + 1];
			var t = t1*dists[idx*2 + 1] + t2*dists[idx*2];
			t /= weightsum;
			var lbRatio = Math.min(
				colorArray[idx*4 + 0]/255/airLight[0],
				colorArray[idx*4 + 1]/255/airLight[1],
				colorArray[idx*4 + 2]/255/airLight[2]
			);
			transmittance[idx] = Math.max(t, 1 - lbRatio);
		}
	}
	if(transmittance.length > 2e6) {
		var partHeight = Math.floor(3e5 / picWidth);
		var parts = Math.ceil(picHeight/partHeight);
		var partPixCount = partHeight * picWidth;
		for(var o = 0, i = 1; o < pixCount; o += partPixCount, ++i) {
			self.postMessage({signal: "Dehazing image: block: " + i + " / " + parts});
			var len = (o + partPixCount < picHeight*picWidth)? partPixCount: picHeight*picWidth - o;
			var tp = new Float32Array(transmittance.buffer, o*4, len);
			var cp = new Uint8ClampedArray(colorArray.buffer, o*4, len*4);
			var np = new Uint16Array(nearestQuery.buffer, o*2, len);
			smoothTransmittance(tp, cp, np,
								ballPointCount, len/picWidth, picWidth);
		}
	}
	self.postMessage({signal: "Finalizing transmittance map…"});
    smoothTransmittance(transmittance, colorArray, nearestQuery, ballPointCount, picHeight, picWidth);
	return transmittance;
}

function smoothTransmittance(
	transmittance, colorArray, nearestQuery,
	ballPointCount, picHeight, picWidth) {

	var pixCount = picHeight*picWidth;
	var sum =    new Float32Array(ballPointCount)
		sum2 =   new Float32Array(ballPointCount),
		pCount = new Uint32Array(ballPointCount);
	for(var i = 0; i < pixCount; ++i) {
		var p = nearestQuery[i];
		var t = transmittance[i];
		sum[p] += t;
		sum2[p] += t*t;
		pCount[p]++;
	}
	var one_var = new Float32Array(ballPointCount);
	for(var i = 0; i < ballPointCount; ++i) {
		var avg = sum[i]/pCount[i], v = (sum2[i]/pCount[i] - avg*avg);
		one_var[i] = (v !== 0)? 1/v: 0;
	}
	var lambda = 0.1;
	var epsilon = 1e-6;
	var coeffs = new Float32Array(pixCount*5);
	var one_varPix = new Float32Array(pixCount);
	for(var i = 0, idx = 0; i < picHeight; ++i) {
		for(var j = 0; j < picWidth; ++j, ++idx) {
			var c = one_var[nearestQuery[idx]];
			one_varPix[idx] = c;
			coeffs[idx*5 + 4] = c;
		}
	}
	function laplacianCoeff(i, j, o0, o1) {
		var idx = (i + o0)*picWidth + (j + o1);
		var idxij = i*picWidth + j;
		var cN = [
			(colorArray[idx*4 + 0] - colorArray[idxij*4 + 0])/255,
			(colorArray[idx*4 + 1] - colorArray[idxij*4 + 1])/255,
			(colorArray[idx*4 + 2] - colorArray[idxij*4 + 2])/255,
		].reduce((a, b) => a + b*b, 0) + epsilon;
		var coeff = lambda*2/cN;
		return coeff;
	}
	for(var i = 1, idx = picWidth; i < picHeight; ++i) {
		for(var j = 0; j < picWidth; ++j, ++idx) {
			var c = laplacianCoeff(i, j, -1, 0);
			coeffs[idx*5] = -c;
			coeffs[idx*5 + 4] += c;
		}
	}
	for(var i = 0, idx = 1; i < picHeight; ++i, ++idx) {
		for(var j = 1; j < picWidth; ++j, ++idx) {
			var c = laplacianCoeff(i, j, 0, -1);
			coeffs[idx*5 + 1] = -c;
			coeffs[idx*5 + 4] += c;
		}
	}
	for(var i = 0, idx = 0; i < picHeight; ++i, ++idx) {
		for(var j = 0; j < picWidth-1; ++j, ++idx) {
			var c = laplacianCoeff(i, j, 0, 1);
			coeffs[idx*5 + 2] = -c;
			coeffs[idx*5 + 4] += c;
		}
	}
	for(var i = 0, idx = 0; i < picHeight-1; ++i) {
		for(var j = 0; j < picWidth; ++j, ++idx) {
			var c = laplacianCoeff(i, j, 1, 0);
			coeffs[idx*5 + 3] = -c;
			coeffs[idx*5 + 4] += c;
		}
	}
	var maxC = 0;
	var s1 = 0, s2 = 0;
	for(var i = 0; i < coeffs.length; ++i) {
		s1 += coeffs[i];
		s2 += coeffs[i]*coeffs[i];
		maxC = Math.max(maxC, Math.abs(coeffs[i]));
	}
	//console.log(coeffs);
	s1 /= coeffs.length;
	maxC = Math.sqrt(s2/coeffs.length - s1*s1)/Math.SQRT1_2;
	var oMaxC = 1;//maxC;
	for(var i = 0; i < coeffs.length; ++i) {
		coeffs[i] *= oMaxC;
	}
	var RHS = new Float32Array(pixCount);
	//console.log(pixCount);
	for(var i = 0; i < pixCount; ++i) {
		RHS[i] = one_varPix[i]*transmittance[i]*oMaxC;
	}
	
	//Conjugate gradients
	solveLinear(coeffs, RHS, transmittance, 300, picHeight, picWidth);
	
	return transmittance;
}

function solveLinear(A, rhs, x, max_iter, height, width) {
	/*var avg = 0;
	for(var i = 0; i < x.length; ++i) {
		if(!(i % width) && i) {
			for(var j = -width; j < 0; ++j) {
				x[i + j] = avg;
			}
			avg = 0;
		}
		avg += x[i]/width;
	}*/
	/*if(x.length > 1e6) {
		var eta = 1e-4;
		AdaM(A, x, rhs, eta, max_iter, height, width);
	}*/
	//if(x.length == 3e5) {
		/*var avg = 0;
		for(var i = 0; i < x.length; ++i) {
			avg += x[i]/x.length;
		}
		x.fill(avg);
		console.log("PCG", avg);*/
	//}
	var ICF = VMICF(A, width);
	/*if(useAdam) {
		var Ax = new Float32Array(rhs.length);
		var R = new Float32Array(rhs.length);
		var irhs = new Float32Array(rhs.length);
		var PAx = new Float32Array(rhs.length);
		apply(Ax, x, A, height, width);
		ICP(PAx, ICF, Ax, width);
		ICP(irhs, ICF, rhs, width);
		msub(R, PAx, irhs);
		var rnorm = iprod(R, R)/R.length;
		console.log(rnorm);
		if(rnorm > 1e-3) {
			AdaM(A, x, rhs, ICF, 1e-4, max_iter, height, width);
		}
		else PCG(A, x, rhs, ICF, max_iter, height, width);
	}
	else*/ PCG(A, x, rhs, ICF, max_iter, height, width);
	/*}*/
}

function AdaM(A, x, rhs, ICF, eta, max_iter, height, width) {
	//var ICF = VMICF(A, width);
	var irhs = new Float32Array(rhs.length);
	var R = new Float32Array(rhs.length);
	var Mt = new Float32Array(rhs.length);
	var Vt = new Float32Array(rhs.length);
	var Ax = new Float32Array(rhs.length);
	var PAx = new Float32Array(rhs.length);
	var etaFac = Math.sqrt(0.1);

	ICP(irhs, ICF, rhs, width);

	var normPrev = 1e9;
	for(var k = 0; k < max_iter; ++k) {
		apply(Ax, x, A, height, width);
		ICP(PAx, ICF, Ax, width);
		//msub(R, Ax, rhs);
		//msub(R, rhs, Ax);
		msub(R, PAx, irhs);
		var rnorm = iprod(R, R)/R.length;
		if(normPrev/rnorm < 0.5) eta /= 10;

		self.postMessage({signal: "Smoothing with AdaM.  Error: " + rnorm});
		if(rnorm < 2e-4) break;
		if(k%10 == 49) {
			eta *= 0.97;
		}
		
		//apply(Vt, R, A, height, width);
		//ICP(Mt, ICF, Vt, width);
		//var e = rnorm/iprod(R, Mt);

		for(var i = 0; i < x.length; ++i) {
			Mt[i] = 0.9*Mt[i] + 0.1*R[i];
			Vt[i] = 0.999*Vt[i] + 0.001*R[i]*R[i];
			x[i] -= eta*etaFac*Mt[i]/(Math.sqrt(Vt[i]) + 1e-8);
			if(x[i] < 0) {
				x[i] = 0;
			} else if(x[i] > 1) {
				x[i] = 1;
			}
			//x[i] += e*R[i];
		}
	}
}

function PCG(A, x, rhs, ICF, max_iter, height, width) {
	//ICF = A.slice(0);
	//var ICF = VMICF(A, width);
	var R = new Float32Array(rhs.length);
	var Z = new Float32Array(rhs.length);
	var P = new Float32Array(rhs.length);
	var Ax = new Float32Array(rhs.length);
	var Ap = new Float32Array(rhs.length);
	var zTr = 0, zTrOld = 0;

	apply(Ax, x, A, height, width);
	msub(R, rhs, Ax);
	//mprod(Z, R, M);
	//SSOR(Z, A, R, 1, width);
	ICP(Z, ICF, R, width);
	P = Z.slice(0);
	zTrOld = iprod(Z, R);
	zTr = zTrOld;

	var prhs = new Float32Array(rhs.length);
	ICP(prhs, ICF, rhs, width);
	//ICP(x, ICF, rhs, width);
	var bnorm = iprod(prhs, prhs);

	var startTime = new Date();
	for(var k = 0; k < max_iter; ++k) {
		apply(Ap, P, A, height, width);
		var alpha = 0.9*zTr/iprod(Ap, P);
		incVec(1, x, alpha, P);
		incVec(1, R, -alpha, Ap);
		var rnorm = iprod(R, R)/R.length;
		/*if(k % 10 == 9) {
			self.postMessage({signal: "Smoothing with PCG.  Error: " + rnorm});
		}*/
		var endTime = new Date();
		if(endTime - startTime > 1000) {
			self.postMessage({signal: "Smoothing with PCG.  Error: " + rnorm});
			startTime = endTime;
		}


		if(rnorm < 2e-1) break;
		//if(k >= 70 && rnorm > 1e-4) break;
		//mprod(Z, M, R);
		//SSOR(Z, A, R, 1, width);
		ICP(Z, ICF, R, width);
		zTr = iprod(Z, R);
		var beta = zTr/zTrOld;
		incVec(beta, P, 1, Z);
		zTrOld = zTr;
	}
}

function VMICF(A, width) {
	var ICF = A.slice(0);
	var n = A.length/5;
	
	for(var i = 0; i < n - width; ++i) {
		var i5 = i*5;
		var d = 1/ICF[i5 + 4];
		var d1 = ICF[i5 + 2]*d;
		var d2 = ICF[i5 + 3]*d;
		
		ICF[i5 + 9] -= d1*ICF[i5 + 2];
		var t = Math.abs(d2*ICF[i5 + 2]);
		ICF[i5 + 9] += t;
		ICF[i5 + width*5 + 4] += t;
		ICF[i5 + width*5 + 4] -= d2*ICF[i5 + 3];
	}
	for(var i = n - width; i < n-1; ++i) {
		var i5 = i*5;
		var d = 1/ICF[i5 + 4];
		var d1 = ICF[i5 + 2]*d;
		
		ICF[i5 + 9] -= d1*ICF[i5 + 2];
	}
	for(var i = 1; i < n; ++i) {
		ICF[i*5 + 1] = ICF[i*5 - 3];
	}
	for(var i = width; i < n; ++i) {
		ICF[i*5] = ICF[(i-width)*5 + 3];
	}
	return ICF;
}

function MICF(A, width) {
	var ICF = A.slice(0);
	var n = A.length/5;
	
	for(var i = 0; i < width; ++i) {
		var i5 = i*5;
		ICF[i5 + 4] -= ICF[i5 - 3]*ICF[i5 - 3]/ICF[i5 - 1];
		var d = Math.abs(ICF[i5 - 3]*ICF[i5 - 2]/ICF[i5 - 1]);
		ICF[i5 + 4] += d;
		ICF[i5 + width*5 - 1] += d;
	}
	for(var i = width; i < n - width + 1; ++i) {
		var i5 = i*5;
		ICF[i5 + 4] -= ICF[i5 - 3]*ICF[i5 - 3]/ICF[i5 - 1];
		var d = Math.abs(ICF[i5 - 3]*ICF[i5 - 2]/ICF[i5 - 1]);
		ICF[i5 + 4] += d;
		ICF[i5 + width*5 - 1] += d;
		ICF[i5 + 4] -= ICF[i5 - width*5 + 3]*ICF[i5 - width*5 + 3]/ICF[i5 - width*5 + 4];
	}
	for(var i = n - width + 1; i < n; ++i) {
		var i5 = i*5;
		ICF[i5 + 4] -= ICF[i5 - 3]*ICF[i5 - 3]/ICF[i5 - 1];
		ICF[i5 + 4] -= ICF[i5 - width*5 + 3]*ICF[i5 - width*5 + 3]/ICF[i5 - width*5 + 4];
	}
	for(var i = 1; i < n; ++i) {
		ICF[i*5 + 1] = ICF[i*5 - 3];
	}
	for(var i = width; i < n; ++i) {
		ICF[i*5] = ICF[(i-width)*5 + 3];
	}
	return ICF;
}

function ICP(Z, ICF, R, width) {
	var n = Z.length;
	//var Z1 = new Float64Array(Z);
	Z[0] = R[0] / ICF[4];
	for(var i = 1; i < width; ++i) {
		Z[i] = (R[i] - ICF[i*5 + 1]*Z[i-1]) / ICF[i*5 + 4];
	}
	for(var i = width; i < n; ++i) {
		Z[i] = (R[i] - ICF[i*5]*Z[i - width] - ICF[i*5 + 1]*Z[i - 1])/ICF[i*5 + 4];
	}

	for(var i = 0; i < n; ++i) {
		Z[i] *= ICF[i*5 + 4]
	}

	Z[n - 1] /= ICF[n*5 - 1];
	for(var i = n-2; i > n - 1 - width; --i) {
		Z[i] = (Z[i] - ICF[i*5 + 2]*Z[i+1])/ICF[i*5 + 4];
	}
	for(var i = n-1-width; i >=0; --i) {
		Z[i] = (Z[i] - ICF[i*5 + 3]*Z[i + width] - ICF[i*5 + 2]*Z[i+1]) / ICF[i*5 + 4];
	}
	return;
}

function SSOR(Z, A, R, w, width) {
	var w2 = (2-w)/w;
	var n = Z.length;
	for(var i = 0; i < n; ++i){
		Z[i] = R[i]*w2;
	}
	Z[0] *= w;
	for(var i = 1; i < width; ++i) {
		Z[i] = w*(Z[i] - A[i*5 + 1]*Z[i-1]);
	}
	for(var i = width; i < n; ++i) {
		Z[i] = w*(Z[i] - A[i*5]*Z[i - width] - A[i*5 + 1]*Z[i-1]);
	}
	Z[n - 1] *= w/A[n*5 - 1];
	for(var i = n-2; i > n - 1 - width; --i) {
		Z[i] = w/A[i*5 + 4]*(Z[i] - A[i*5 + 2]*Z[i+1]);
	}
	for(var i = n-1-width; i >=0; --i) {
		Z[i] = w/A[i*5 + 4]*(Z[i] - A[i*5 + 3]*Z[i+width] - A[i*5 + 2]*Z[i+1]);
	}
	return;
}

function apply(Ax, x, A, height, width) {
	Ax.fill(0);
	for(var i = 0, j = width; i < x.length - width; ++i, ++j) {
		Ax[j] += A[j*5]*x[i];
	}
	for(var i = 0, idx = 0; i < height; ++i, ++idx) {
		for(var j = 0; j < width-1; ++j, ++idx) {
			Ax[idx + 1] += A[idx*5 + 5 + 1]*x[idx];
		}
	}
	for(var i = 0, idx = 1; i < height; ++i, ++idx) {
		for(var j = 1; j < width; ++j, ++idx) {
			Ax[idx - 1] += A[idx*5 - 5 + 2]*x[idx];
		}
	}
	for(var i = width, j = 0; i < x.length; ++i, ++j) {
		Ax[j] += A[j*5 + 3]*x[i];
	}
	for(var i = 0; i < x.length; ++i) {
		Ax[i] += A[i*5 + 4]*x[i];
	}
}

function msub(diff, a, b) {
	for(var i = 0; i < a.length; ++i) {
		diff[i] = a[i] - b[i];
	}
}

function mprod(prod, a, b) {
	for(var i = 0; i < prod.length; ++i) {
		prod[i] = a[i]*b[i];
	}
}

function iprod(a, b) {
	var dot = 0;
	for(var i = 0; i < a.length; ++i) {
		dot += a[i]*b[i];
	}
	return dot;
}

function incVec(a, am, b, bm) {
	for(var i = 0; i < am.length; ++i) {
		am[i] = a*am[i] + b*bm[i];
	}
}

module.exports = transmittanceMap;