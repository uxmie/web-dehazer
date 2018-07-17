window.solveSPTriplet = function(n, triplets, RHS, guess, maxit) {
	var CSRMatrix = require("csr-matrix"),
			pcg = require("conjugate-gradient");
	var A = CSRMatrix.fromList(triplets, n, n);
	var b = new Float64Array(RHS);

	return pcg(A,b,guess,1e-3,maxit);
}
