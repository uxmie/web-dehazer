function estimateAirLight(colorArray, quantStruct) {
	step = 0.05;
	var quantWithIds = quantStruct.quantizeID(colorArray);
	var weights = Array(quantStruct.centroids.length).fill(0);
	quantWithIds.forEach(element => {
		weights[element]++;
	});
	var weightsum = weights.reduce((a, b) => a+b);
	weights = weights.map(d => d/weightsum);

	var colors = quantStruct.centroids.map(d => d.map(e => e / 255));
	var colorsR = colors.map(data => data[0]);
	var colorsG = colors.map(data => data[1]);
	var colorsB = colors.map(data => data[2]);

	var AvalsR = arange(0.2, 0.05, 1.0);
	var AvalsG = arange(0.25, 0.05, 1.0);
	var AvalsB = arange(0.3, 0.05, 1.0);

	var directions = linRange(0, 15, Math.PI/2);
	var dirTrig = directions.map((d) => [Math.cos(d), Math.sin(d)]);

	/* Vote for each two channels */
	var VotesRG = vote2D(colors, 0, 1, AvalsR, AvalsG, dirTrig, weights);
	var VotesGB = vote2D(colors, 1, 2, AvalsG, AvalsB, dirTrig, weights);
	var VotesRB = vote2D(colors, 0, 2, AvalsR, AvalsB, dirTrig, weights);

	var vote3D = Array(AvalsR.length*AvalsG.length*AvalsB.length).fill()
			.map(function(_, idx) {
				var Ri = Math.floor(idx / (AvalsG.length*AvalsB.length));
				var Gi = Math.floor(idx / AvalsB.length) % AvalsG.length;
				var Bi = idx % AvalsB.length;
				var RGi = Ri*AvalsG.length + Gi;
				var GBi = Gi*AvalsB.length + Bi;
				var RBi = Ri*AvalsB.length + Bi;
				return VotesRG[RGi]*VotesGB[GBi]*VotesRB[RBi];
			});
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
	//var retColor = [AvalsR[Ri], AvalsG[Gi], AvalsB[Bi]];
	console.log(retColor.map(d => d*255));
	return retColor;
}

function vote2D(colors, ch1, ch2, A1, A2, dirTrig, weights) {
	var colorNo = colors.length;
	var nBins = dirTrig.length;
	var thresh = 0.01;
	var votesTotal = [];

	colors.forEach(color => {
		var A1start = A1.findIndex(p => p > color[ch1]);
		var A2start = A2.findIndex(p => p > color[ch2]);

		if (A1start < 0 || A2start < 0) return;

		var Aranges = cartesian(A1.slice(A1start), A2.slice(A2start));
		var Aidxs = cartesian(range(A1start, A1.length), range(A2start, A2.length))
								.map(d => d[0]*A2.length + d[1]);
		var votes = Array(A1.length*A2.length*nBins).fill(0);
		Aranges.forEach((Ac, idx) => {
			//Get Angle
			var xcomp = Ac[0] - color[ch1],
					ycomp = Ac[1] - color[ch2],
					dist = Math.sqrt(xcomp*xcomp + ycomp*ycomp),
					xn = xcomp / dist,
					yn = ycomp / dist,
					angle = Math.acos(xn),
					bin = Math.round(angle/Math.PI*2 * nBins);
			if(bin == nBins) {bin--;}
			
			var voteIdx = Aidxs[idx]*nBins + bin;
			votes[voteIdx] = 1;
			var lineDist = Array(nBins).fill().map(function(_, idx2) {
				return Math.abs(
					(Ac[0] - color[ch1])*dirTrig[idx2][0]
						- (Ac[1] - color[ch2])*dirTrig[idx2][1]);
			});
			var tempVotes = Array(nBins).fill().map(function(_, idx2) {
				return (lineDist[idx2] < 2*thresh*(dist*Math.SQRT1_2 + 1))?1:0;
			});
			tempVotes.forEach((data, idx2) => {
				var voteIdx = Aidxs[idx]*nBins + idx2;
				votes[voteIdx] = data;
			});
		});
		votesTotal.push(votes);
	});

	var varCount = votesTotal.reduce((a, b) => 
		a.map((d, i) => d + b[i])  
	);
	var candFlag = varCount.map(d => d >= 2);
	var candIdx = [];
	var ind = -1;
	while((ind = candFlag.indexOf(true, ind + 1)) != -1) {
		candIdx.push(ind);
	}
	var candDecode = candIdx.map(d => [
		Math.floor(d / (A2.length*nBins)),
		Math.floor(d / nBins) % A2.length,
		d % nBins
	]);

	/* Cast vote. */
	var finalVote = Array(A1.length*A2.length*nBins).fill(0);
	var Aranges = cartesian(A1, A2);
	candIdx.forEach((param, idx) => {
		var Aidx = Math.floor(param / nBins),
				Ac = Aranges[Aidx];
		colors.forEach((color, coloridx) => {
			var xcomp = Ac[0] - color[ch1],
					ycomp = Ac[1] - color[ch2],
					dist = Math.sqrt(xcomp*xcomp + ycomp*ycomp),
					distweight = weights[coloridx]*Math.exp(5*-dist + 1);
			finalVote[param] += distweight;
		});
	});

	var returnMat = Array(A1.length*A2.length).fill()
		.map((_, idx) => finalVote.slice(idx*nBins, idx*nBins + nBins))
		.map(data => data.reduce((a, b) => a+b));
	
	var y = (returnMat.indexOf(Math.max(...returnMat)));
	return returnMat;
}