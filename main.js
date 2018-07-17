window.onload = function() {
	var fileInput = document.getElementById('fileInput');
	var fileDisplayArea = document.getElementById('fileDisplayArea');

	fileInput.addEventListener('change', function(e) {
		var file = fileInput.files[0];
		var imageType = /image.*/;

		if (file.type.match(imageType)) {
			var reader = new FileReader();
			reader.readAsDataURL(file);	
			reader.onload = function(e) {
				fileDisplayArea.innerHTML = "";

				var img = new Image();
				img.src = reader.result;
				img.onload = function() {
					processImage(img);
				};
			}
		} else {
			fileDisplayArea.innerHTML = "File not supported!"
		}
	});

	var gammaSlide = document.getElementById('gammaSlide'),
			gammaVal = document.getElementById('gammaVal');
	gammaSlide.addEventListener('input', function(e){
		sliderChange(this, gammaVal);
		var canvas = document.getElementById('originalPic');
		changeGamma(window.origCanvas, canvas, new Number(this.value))
	});
	gammaVal.innerHTML = gammaSlide.value;

	var minAirSlide = document.getElementById('minAirSlide'),
			minAirVal = document.getElementById('minAirVal'),
			maxAirSlide = document.getElementById('maxAirSlide'),
			maxAirVal = document.getElementById('maxAirVal');
	minAirSlide.addEventListener('input', function(e){
		if(maxAirSlide.value - 0.05 < this.value) {
			this.value = maxAirSlide.value - 0.05;
		}
		sliderChange(this, minAirVal);
	});
	minAirVal.innerHTML = minAirSlide.value;
	maxAirSlide.addEventListener('input', function(e){
		if(minAirSlide.value > this.value - 0.05) {
			this.value = new Number(minAirSlide.value) + 0.05;
		}
		sliderChange(this, maxAirVal);
	});
	maxAirVal.innerHTML = maxAirSlide.value;

	var airLightButton = document.getElementById('airLightButton');
	airLightButton.addEventListener('click', function(e){
		findAirLight();
	});
	var transmittanceButton = document.getElementById('transmittanceButton');
	transmittanceButton.addEventListener('click', function(e){
		findAndDrawResults();
	});

	var distSlide = document.getElementById('distSlide'),
	    distVal = document.getElementById('distVal'),
	    hazeAmountSlide = document.getElementById('hazeAmountSlide'),
	    hazeAmountVal = document.getElementById('hazeAmountVal'),
	    gammaOutSlide = document.getElementById('gammaOutSlide'),
			gammaOutVal = document.getElementById('gammaOutVal');

	distSlide.addEventListener('input', function(e){
		oninput=sliderChange(this, distVal);
		var canvas = document.getElementById('originalPic');
		var destCanvas = document.getElementById('dehazeResult');
		drawDehazed(canvas, destCanvas, window.transmittance, window.airLight);
	});
	distVal.innerHTML = distSlide.value;
	hazeAmountSlide.addEventListener('input', function(e){
		sliderChange(this, hazeAmountVal);
		var canvas = window.origCanvas;
		mixHaze(window.dehazeFlat, canvas.width, canvas.height,
						window.dehazedCanvas, window.transmittance, window.airLight,
						new Number(this.value));
		var gammaVal = new Number(document.getElementById('gammaOutSlide').value);
		canvas = document.getElementById('dehazeResult');
		changeGamma(window.dehazedCanvas, canvas, 1/gammaVal)
	});
	hazeAmountVal.innerHTML = hazeAmountSlide.value;
	gammaOutSlide.addEventListener('input', function(e){
		sliderChange(this, gammaOutVal);
		var canvas = document.getElementById('dehazeResult');
		changeGamma(window.dehazedCanvas, canvas, 1/new Number(this.value))
	});
	gammaOutVal.innerHTML = gammaOutSlide.value;

	var originalButton = document.getElementById("originalButton");
	originalButton.addEventListener('click', function(e){
		calculateOriginal();
	});
	
}
