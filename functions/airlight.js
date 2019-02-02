var utils = require('./utils.js');
var arange = utils.arange,
		linRange = utils.linRange,
		cartesian = utils.cartesian,
		range = utils.range;

function estimateAirLight(colorArray, quantStruct, minEst, maxEst) {
	var diff = maxEst - minEst;
	var step = 0;
	if(diff > 0.6) {step = 0.05;}
	else if (diff > 0.2) {step = 0.03;}
	else {step = 0.02;}
	var quantWithIds = quantStruct.quantizeID(colorArray);
	var weights = new Float32Array(quantStruct.n_clusters).fill(0);
	for(var i = 0; i < quantWithIds.length; ++i) {
		weights[quantWithIds[i]]++;
	}
	var weightsum = weights.reduce((a, b) => a+b);
	weights = weights.map(d => d/weightsum);

	//var colors = quantStruct.centroids.map(d => d.map(e => e / 255));
	var colors = new Float32Array(quantStruct.centroids.slice(0));
	for(var i = 0; i < colors.length; ++i) {
		colors[i] /= 255;
	}

	var AvalsR = arange(minEst, step, maxEst);
	var AvalsG = arange(minEst, step, maxEst);
	var AvalsB = arange(minEst, step, maxEst);

	var directions = linRange(0, 25, Math.PI/2);
	var dirTrig = new Float32Array(25*2);
	for(var i = 0; i < 25; i++) {
		dirTrig[2*i] = Math.sin(directions[i]);
		dirTrig[2*i + 1] = Math.cos(directions[i]);
	}

	/* Vote for each two channels */
	var VotesRG = vote2D(colors, 0, 1, AvalsR, AvalsG, dirTrig, weights);
	var VotesGB = vote2D(colors, 1, 2, AvalsG, AvalsB, dirTrig, weights);
	var VotesRB = vote2D(colors, 0, 2, AvalsR, AvalsB, dirTrig, weights);

	var vote3D = new Float32Array(AvalsR.length*AvalsG.length*AvalsB.length);
	for(var i = 0; i < AvalsR.length; ++i) {
		for(var j = 0; j < AvalsG.length; ++j) {
			for(var k = 0; k < AvalsB.length; ++k) {
				var id = i*(AvalsG.length*AvalsB.length) + j*(AvalsB.length) + k;
				var RGi = i*AvalsG.length + j;
				var GBi = j*AvalsB.length + k;
				var RBi = i*AvalsB.length + k;
				vote3D[id] = VotesRG[RGi]*VotesGB[GBi]*VotesRB[RBi];
			}
		}
	}
	var idx = (vote3D.indexOf(Math.max(...vote3D)));
	var Ri = Math.floor(idx / (AvalsG.length*AvalsB.length));
	var Gi = Math.floor(idx / AvalsB.length) % AvalsG.length;
	var Bi = idx % AvalsB.length;

	var retColor = Array(3).fill(0);
	var normWeight = 0;
	for(var i = Math.max(Ri-1, 0); i < Math.min(Ri+2, AvalsR.length); ++i) {
		for(var j = Math.max(Gi-1, 0); j < Math.min(Gi+2, AvalsG.length); ++j) {
			for(var k = Math.max(Bi-1, 0); k < Math.min(Bi+2, AvalsB.length); ++k) {
				var idx = i*AvalsG.length*AvalsB.length + j*AvalsB.length + k;
				var w = vote3D[idx];
				normWeight += w;
				retColor[0] += AvalsR[i]*w;
				retColor[1] += AvalsG[j]*w;
				retColor[2] += AvalsB[k]*w;
			}
		}
	}
	retColor = retColor.map(d => d/normWeight);
	return retColor;
}

function vote2D(colors, ch1, ch2, A1, A2, dirTrig, weights) {
	var nBins = dirTrig.length;
	var thresh = 0.05;
	var varCount = new Uint32Array(A1.length*A2.length*nBins).fill(0);
	var votes = new Uint8ClampedArray(A1.length*A2.length*nBins).fill(0);

	for(var c = 0; c < colors.length; c += 3) {
		var A1start = A1.findIndex(p => p > colors[c + ch1]);
		var A2start = A2.findIndex(p => p > colors[c + ch2]);
		if (A1start < 0 || A2start < 0) continue;

		votes.fill(0);
		for(var i = A1start; i < A1.length; ++i) {
			for(var j = A2start; j < A2.length; ++j) {
				//Get Angle
				var Ac1 = A1[i], Ac2 = A2[j];
				var xcomp = Ac1 - colors[c + ch1],
					ycomp = Ac2 - colors[c + ch2],
					dist = Math.sqrt(xcomp*xcomp + ycomp*ycomp),
					xn = xcomp / dist,
					angle = Math.acos(xn),
					bin = Math.round(angle/Math.PI*2 * nBins);
				if(bin == nBins) {bin--;}

				var voteIdx = (i*A2.length + j)*nBins + bin;
				votes[voteIdx] = 1;

				for(var k = 0; k < nBins; ++k) {
					var lineDist = Math.abs(
						(Ac1 - colors[c + ch1])*dirTrig[2*k]
						- (Ac2 - colors[c + ch2])*dirTrig[2*k + 1]
					);
					var tempVote = (lineDist < 2*thresh*(dist*Math.SQRT1_2 + 1))?1:0;
					var voteIdx = (i*A2.length + j)*nBins + k;
					votes[voteIdx] = tempVote;
				}
			}
		}
		for(i = 0; i < varCount.length; ++i) {
			varCount[i] += votes[i];
		}
	}

	var finalVote = new Float32Array(A1.length*A2.length*nBins).fill(0);
	for(var i = 0; i < varCount.length; ++i) {
		if(varCount[i] <= 1) continue;

		var Aidx = Math.floor(i / nBins),
			Ac1 = A1[Math.floor(Aidx / A2.length)],
			Ac2 = A2[Aidx % A2.length];
		for(var j = 0; j < colors.length; j += 3) {
			var xcomp = Ac1 - colors[j + ch1],
				ycomp = Ac2 - colors[j + ch2],
				dist = Math.sqrt(xcomp*xcomp + ycomp*ycomp),
				distweight = weights[j/3]*Math.exp(5*-dist + 1);
			finalVote[i] += distweight;
		}
	}

	var returnMat = new Float32Array(A1.length*A2.length).fill(0);
	for(var i = 0; i < returnMat.length; ++i) {
		for(var j = 0; j < nBins; ++j) {
			returnMat[i] += finalVote[i*nBins + j];
		}
	}
	return returnMat;
}

module.exports = estimateAirLight;