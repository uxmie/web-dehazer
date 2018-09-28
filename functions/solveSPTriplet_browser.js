(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict"

var abs = Math.abs
  , min = Math.min

function almostEqual(a, b, absoluteError, relativeError) {
  var d = abs(a - b)
  
  if (absoluteError == null) absoluteError = almostEqual.DBL_EPSILON;
  if (relativeError == null) relativeError = absoluteError;
  
  if(d <= absoluteError) {
    return true
  }
  if(d <= relativeError * min(abs(a), abs(b))) {
    return true
  }
  return a === b
}

almostEqual.FLT_EPSILON = 1.19209290e-7
almostEqual.DBL_EPSILON = 2.2204460492503131e-16

module.exports = almostEqual

},{}],2:[function(require,module,exports){
/**
 * Bit twiddling hacks for JavaScript.
 *
 * Author: Mikola Lysenko
 *
 * Ported from Stanford bit twiddling hack library:
 *    http://graphics.stanford.edu/~seander/bithacks.html
 */

"use strict"; "use restrict";

//Number of bits in an integer
var INT_BITS = 32;

//Constants
exports.INT_BITS  = INT_BITS;
exports.INT_MAX   =  0x7fffffff;
exports.INT_MIN   = -1<<(INT_BITS-1);

//Returns -1, 0, +1 depending on sign of x
exports.sign = function(v) {
  return (v > 0) - (v < 0);
}

//Computes absolute value of integer
exports.abs = function(v) {
  var mask = v >> (INT_BITS-1);
  return (v ^ mask) - mask;
}

//Computes minimum of integers x and y
exports.min = function(x, y) {
  return y ^ ((x ^ y) & -(x < y));
}

//Computes maximum of integers x and y
exports.max = function(x, y) {
  return x ^ ((x ^ y) & -(x < y));
}

//Checks if a number is a power of two
exports.isPow2 = function(v) {
  return !(v & (v-1)) && (!!v);
}

//Computes log base 2 of v
exports.log2 = function(v) {
  var r, shift;
  r =     (v > 0xFFFF) << 4; v >>>= r;
  shift = (v > 0xFF  ) << 3; v >>>= shift; r |= shift;
  shift = (v > 0xF   ) << 2; v >>>= shift; r |= shift;
  shift = (v > 0x3   ) << 1; v >>>= shift; r |= shift;
  return r | (v >> 1);
}

//Computes log base 10 of v
exports.log10 = function(v) {
  return  (v >= 1000000000) ? 9 : (v >= 100000000) ? 8 : (v >= 10000000) ? 7 :
          (v >= 1000000) ? 6 : (v >= 100000) ? 5 : (v >= 10000) ? 4 :
          (v >= 1000) ? 3 : (v >= 100) ? 2 : (v >= 10) ? 1 : 0;
}

//Counts number of bits
exports.popCount = function(v) {
  v = v - ((v >>> 1) & 0x55555555);
  v = (v & 0x33333333) + ((v >>> 2) & 0x33333333);
  return ((v + (v >>> 4) & 0xF0F0F0F) * 0x1010101) >>> 24;
}

//Counts number of trailing zeros
function countTrailingZeros(v) {
  var c = 32;
  v &= -v;
  if (v) c--;
  if (v & 0x0000FFFF) c -= 16;
  if (v & 0x00FF00FF) c -= 8;
  if (v & 0x0F0F0F0F) c -= 4;
  if (v & 0x33333333) c -= 2;
  if (v & 0x55555555) c -= 1;
  return c;
}
exports.countTrailingZeros = countTrailingZeros;

//Rounds to next power of 2
exports.nextPow2 = function(v) {
  v += v === 0;
  --v;
  v |= v >>> 1;
  v |= v >>> 2;
  v |= v >>> 4;
  v |= v >>> 8;
  v |= v >>> 16;
  return v + 1;
}

//Rounds down to previous power of 2
exports.prevPow2 = function(v) {
  v |= v >>> 1;
  v |= v >>> 2;
  v |= v >>> 4;
  v |= v >>> 8;
  v |= v >>> 16;
  return v - (v>>>1);
}

//Computes parity of word
exports.parity = function(v) {
  v ^= v >>> 16;
  v ^= v >>> 8;
  v ^= v >>> 4;
  v &= 0xf;
  return (0x6996 >>> v) & 1;
}

var REVERSE_TABLE = new Array(256);

(function(tab) {
  for(var i=0; i<256; ++i) {
    var v = i, r = i, s = 7;
    for (v >>>= 1; v; v >>>= 1) {
      r <<= 1;
      r |= v & 1;
      --s;
    }
    tab[i] = (r << s) & 0xff;
  }
})(REVERSE_TABLE);

//Reverse bits in a 32 bit word
exports.reverse = function(v) {
  return  (REVERSE_TABLE[ v         & 0xff] << 24) |
          (REVERSE_TABLE[(v >>> 8)  & 0xff] << 16) |
          (REVERSE_TABLE[(v >>> 16) & 0xff] << 8)  |
           REVERSE_TABLE[(v >>> 24) & 0xff];
}

//Interleave bits of 2 coordinates with 16 bits.  Useful for fast quadtree codes
exports.interleave2 = function(x, y) {
  x &= 0xFFFF;
  x = (x | (x << 8)) & 0x00FF00FF;
  x = (x | (x << 4)) & 0x0F0F0F0F;
  x = (x | (x << 2)) & 0x33333333;
  x = (x | (x << 1)) & 0x55555555;

  y &= 0xFFFF;
  y = (y | (y << 8)) & 0x00FF00FF;
  y = (y | (y << 4)) & 0x0F0F0F0F;
  y = (y | (y << 2)) & 0x33333333;
  y = (y | (y << 1)) & 0x55555555;

  return x | (y << 1);
}

//Extracts the nth interleaved component
exports.deinterleave2 = function(v, n) {
  v = (v >>> n) & 0x55555555;
  v = (v | (v >>> 1))  & 0x33333333;
  v = (v | (v >>> 2))  & 0x0F0F0F0F;
  v = (v | (v >>> 4))  & 0x00FF00FF;
  v = (v | (v >>> 16)) & 0x000FFFF;
  return (v << 16) >> 16;
}


//Interleave bits of 3 coordinates, each with 10 bits.  Useful for fast octree codes
exports.interleave3 = function(x, y, z) {
  x &= 0x3FF;
  x  = (x | (x<<16)) & 4278190335;
  x  = (x | (x<<8))  & 251719695;
  x  = (x | (x<<4))  & 3272356035;
  x  = (x | (x<<2))  & 1227133513;

  y &= 0x3FF;
  y  = (y | (y<<16)) & 4278190335;
  y  = (y | (y<<8))  & 251719695;
  y  = (y | (y<<4))  & 3272356035;
  y  = (y | (y<<2))  & 1227133513;
  x |= (y << 1);
  
  z &= 0x3FF;
  z  = (z | (z<<16)) & 4278190335;
  z  = (z | (z<<8))  & 251719695;
  z  = (z | (z<<4))  & 3272356035;
  z  = (z | (z<<2))  & 1227133513;
  
  return x | (z << 2);
}

//Extracts nth interleaved component of a 3-tuple
exports.deinterleave3 = function(v, n) {
  v = (v >>> n)       & 1227133513;
  v = (v | (v>>>2))   & 3272356035;
  v = (v | (v>>>4))   & 251719695;
  v = (v | (v>>>8))   & 4278190335;
  v = (v | (v>>>16))  & 0x3FF;
  return (v<<22)>>22;
}

//Computes next combination in colexicographic order (this is mistakenly called nextPermutation on the bit twiddling hacks page)
exports.nextCombination = function(v) {
  var t = v | (v - 1);
  return (t + 1) | (((~t & -~t) - 1) >>> (countTrailingZeros(v) + 1));
}


},{}],3:[function(require,module,exports){
"use strict"

var abs = Math.abs
  , min = Math.min

function almostEqual(a, b, absoluteError, relativeError) {
  var d = abs(a - b)
  if(d <= absoluteError) {
    return true
  }
  if(d <= relativeError * min(abs(a), abs(b))) {
    return true
  }
  return a === b
}

almostEqual.FLT_EPSILON = 1.19209290e-7
almostEqual.DBL_EPSILON = 2.2204460492503131e-16

module.exports = almostEqual

},{}],4:[function(require,module,exports){
"use strict"

var bits = require("bit-twiddle")
  , almostEqual = require("almost-equal")

var R = new Float64Array(1024)
var P = new Float64Array(1024)
var D = new Float64Array(1024)
var Z = new Float64Array(1024)

function reserve(n) {
  if(n < R.length) {
    return
  }
  var nsize = bits.nextPow2(n)
  R = new Float64Array(nsize)
  P = new Float64Array(nsize)
  Z = new Float64Array(nsize)
  D = new Float64Array(nsize)
}

function conjugateGradient(A, b, x, tolerance, max_iter) {
  var abs = Math.abs
    , max = Math.max
    , EPSILON = almostEqual.FLT_EPSILON
    , n = A.rowCount
    , i, j, k
    , alpha_n, alpha_d, alpha, beta, rnorm, s
  if(!tolerance) {
    tolerance = 1e-5
  }
  if(!max_iter) {
    max_iter = Math.min(n, 20)
  }
  if(!x) {
    if(b.buffer) {
      x = new b.constructor(b.buffer.slice(0))
    } else {
      x = b.slice(0)
    }
  }
  reserve(n)
  //Compute preconditioner
  for(i=0; i<n; ++i) {
    /*s = A.get(i, i)
    if(abs(s) > EPSILON) {
      D[i] = 1.0 / s
    } else {*/
      D[i] = 1.0
    //}
  }
  var Alist = A.toList();
  Alist.forEach(entry => {
  	if (entry[0] === entry[1] && abs(entry[2]) > EPSILON) {
      D[entry[0]] = 1.0/entry[2];
    }
  });
  //Initialize 
  A.apply(x, R)
  for(i=0; i<n; ++i) {
    R[i] = b[i] - R[i]
    Z[i] = D[i] * R[i]
    P[i] = Z[i]
  }
  //Iterate
  for(k=0; k<max_iter; ++k) {
    alpha_n = 0.0
    for(i=0; i<n; ++i) {
      alpha_n += R[i] * Z[i]
    }
    A.apply(P, Z)
    alpha_d = 0.0
    for(i=0; i<n; ++i) {
      alpha_d +=  P[i] * Z[i]
    }
    alpha = alpha_n / alpha_d
    beta = 0.0
    rnorm = 0.0
    for(i=0; i<n; ++i) {
      x[i] += alpha * P[i]
      R[i] -= alpha * Z[i]
      Z[i]  = D[i] * R[i]
      beta += R[i] * Z[i]
      rnorm = max(rnorm, abs(R[i]))
    }
    if(rnorm < tolerance) {
      break
    }
    beta /= alpha_n
    for(i=0; i<n; ++i) {
      P[i] = Z[i] + beta * P[i]
    }
  }
  return x
}

module.exports = conjugateGradient

},{"almost-equal":3,"bit-twiddle":2}],5:[function(require,module,exports){
"use strict"

var almostEqual = require('almost-equal')
var dup         = require('dup')

module.exports = {
  fromList:       fromList,
  fromDictionary: fromDictionary,
  fromDense:      fromDense,
  fromNDArray:    fromNDArray
}

var EPSILON = almostEqual.DBL_EPSILON

function CSRMatrix(rows, row_ptrs, columns, column_ptrs, data) {
  this.rows = rows
  this.row_ptrs = row_ptrs
  this.columns = columns
  this.column_ptrs = column_ptrs
  this.data = data
}

var proto = CSRMatrix.prototype

Object.defineProperty(proto, "rowCount", {
  get: function() {
    return this.rows[this.rows.length-1]
  }
})

Object.defineProperty(proto, "columnCount", {
  get: function() {
    return this.columns[this.columns.length-1]
  }
})

function applyImpl(rows, row_ptrs, columns, column_ptrs, data, vector, result) {
  var cptr = 0, dptr = 0, last_r = 0
  for(var i=0, rlen=rows.length-1; i<rlen; ++i) {
    var r = rows[i]
    var next_c = row_ptrs[i+1]
    var s = 0.0
    while(++last_r < r) {
      result[last_r] = 0.0
    }
    while(cptr < next_c) {
      var c = columns[cptr]
      var next_d = column_ptrs[++cptr]
      while(dptr < next_d) {
        s += data[dptr++] * vector[c++]
      }
    }
    result[r] = s
  }
  var len = result.length
  while(++last_r < len) {
    result[last_r] = 0.0
  }
}

proto.apply = function(vector, result) {
  applyImpl(
    this.rows,
    this.row_ptrs,
    this.columns,
    this.column_ptrs,
    this.data,
    vector,
    result)
  return result
}

proto.transpose = function() {
  var items = this.toList()
  for(var i=0; i<items.length; ++i) {
    var it = items[i]
    var tmp = it[0]
    it[0] = it[1]
    it[1] = tmp
  }
  return fromList(items, this.columnCount, this.rowCount)
}

proto.toList = function() {
  var result = []
  for(var i=0, ilen=this.rows.length-1; i<ilen; ++i) {
    var r = this.rows[i];
    for(var j=this.row_ptrs[i], jlen=this.row_ptrs[i+1]; j<jlen; ++j) {
      var c = this.columns[j]
      for(var k=this.column_ptrs[j], klen=this.column_ptrs[j+1]; k<klen; ++k) {
        var d = this.data[k]
        result.push([r, c++, d])
      }
    }
  }
  return result
}

proto.toDictionary = function() {
  var result = {}
  for(var i=0, ilen=this.rows.length-1; i<ilen; ++i) {
    var r = this.rows[i];
    for(var j=this.row_ptrs[i], jlen=this.row_ptrs[i+1]; j<jlen; ++j) {
      var c = this.columns[j]
      for(var k=this.column_ptrs[j], klen=this.column_ptrs[j+1]; k<klen; ++k) {
        var d = this.data[k]
        result[[r, c++]] = d
      }
    }
  }
  return result
}

proto.toDense = function() {
  var result = dup([this.rowCount, this.columnCount], 0.0)
  for(var i=0, ilen=this.rows.length-1; i<ilen; ++i) {
    var r = this.rows[i];
    for(var j=this.row_ptrs[i], jlen=this.row_ptrs[i+1]; j<jlen; ++j) {
      var c = this.columns[j]
      for(var k=this.column_ptrs[j], klen=this.column_ptrs[j+1]; k<klen; ++k) {
        var d = this.data[k]
        result[r][c++] = d
      }
    }
  }
  return result
}

CSRMatrix.prototype.toNDArray = function(result) {
  for(var i=0, ilen=this.rows.length-1; i<ilen; ++i) {
    var r = this.rows[i];
    for(var j=this.row_ptrs[i], jlen=this.row_ptrs[i+1]; j<jlen; ++j) {
      var c = this.columns[j]
      for(var k=this.column_ptrs[j], klen=this.column_ptrs[j+1]; k<klen; ++k) {
        var d = this.data[k]
        result.set(r, c++, d)
      }
    }
  }
  return result
}

function compareKey(a, b) {
  return (a[0]-b[0]) || (a[1]-b[1])
}

function removeDuplicates(items, nrows, ncols) {
  var i=0, ptr=0
  items.sort(compareKey)
  while(i < items.length) {
    var it = items[i++]
    if(it[0] >= nrows || it[1] >= ncols) {
      continue
    }
    while(i < items.length && compareKey(items[i], it) === 0) {
      it[2] += items[i++][2]
    }
    if(Math.abs(it[2]) > EPSILON) {
      items[ptr++] = it
    }
  }
  items.length = ptr
  return items
}

function fromList(items, nrows, ncols) {
  items = removeDuplicates(items, nrows || Infinity, ncols || Infinity)
  var rows = []
    , row_ptrs = []
    , cols = []
    , col_ptrs = []
    , data = new Float64Array(items.length)
  nrows = nrows || 0
  ncols = ncols || 0
  for(var i=0; i<items.length; ++i) {
    var item = items[i]
    if(i === 0 || item[0] !== items[i-1][0]) {
      rows.push(item[0])
      row_ptrs.push(cols.length)
      cols.push(item[1])
      col_ptrs.push(i)
    } else if(item[1] !== items[i-1][1]+1) {
      cols.push(item[1])
      col_ptrs.push(i)
    }
    nrows = Math.max(nrows, item[0]+1)
    ncols = Math.max(ncols, item[1]+1)
    data[i] = item[2]
  }
  rows.push(nrows)
  row_ptrs.push(cols.length)
  cols.push(ncols)
  col_ptrs.push(data.length)
  return new CSRMatrix(
    new Uint32Array(rows),
    new Uint32Array(row_ptrs),
    new Uint32Array(cols),
    new Uint32Array(col_ptrs),
    data)
}

function fromDictionary(dict, rows, cols) {
  return fromList(Object.keys(dict).map(function(item) {
    var parts = item.split(',')
    return [parts[0]|0, parts[1]|0, dict[item]]
  }), rows, cols)
}

function fromDense(matrix) {
  var list = []
  var rows = matrix.length
  if(rows === 0) {
    return fromList([], 0, 0)
  }
  var cols = matrix[0].length
  for(var i=0; i<rows; ++i) {
    var row = matrix[i]
    for(var j=0; j<cols; ++j) {
      var v = row[j]
      if(Math.abs(v) > EPSILON) {
        list.push([i,j,v])
      }
    }
  }
  return fromList(list, rows, cols)
}

function fromNDArray(array) {
  var list = []
  var rows = array.shape[0]
  var cols = array.shape[1]
  if(array.stride[1] > array.stride[0]) {
    for(var j=0; j<cols; ++j) {
      for(var i=0; i<rows; ++i) {
        list.push([i, j, array.get(i,j)])
      }
    }
  } else {
    for(var i=0; i<rows; ++i) {
      for(var j=0; j<cols; ++j) {
        list.push([i, j, array.get(i,j)])
      }
    }
  }
  return fromList(list, rows, cols)
}

},{"almost-equal":1,"dup":6}],6:[function(require,module,exports){
"use strict"

function dupe_array(count, value, i) {
  var c = count[i]|0
  if(c <= 0) {
    return []
  }
  var result = new Array(c), j
  if(i === count.length-1) {
    for(j=0; j<c; ++j) {
      result[j] = value
    }
  } else {
    for(j=0; j<c; ++j) {
      result[j] = dupe_array(count, value, i+1)
    }
  }
  return result
}

function dupe_number(count, value) {
  var result, i
  result = new Array(count)
  for(i=0; i<count; ++i) {
    result[i] = value
  }
  return result
}

function dupe(count, value) {
  if(typeof value === "undefined") {
    value = 0
  }
  switch(typeof count) {
    case "number":
      if(count > 0) {
        return dupe_number(count|0, value)
      }
    break
    case "object":
      if(typeof (count.length) === "number") {
        return dupe_array(count, value, 0)
      }
    break
  }
  return []
}

module.exports = dupe
},{}],7:[function(require,module,exports){
window.solveSPTriplet = function(n, triplets, RHS, guess, maxit) {
	var CSRMatrix = require("csr-matrix"),
			pcg = require("conjugate-gradient");
	var A = CSRMatrix.fromList(triplets, n, n);
	var b = new Float64Array(RHS);

	return pcg(A,b,guess,1e-3,maxit);
}

},{"conjugate-gradient":4,"csr-matrix":5}]},{},[7]);
