var canvasWidth2 = window.innerWidth - 20;//screen.width - 20;
var canvasHeight2 = window.innerHeight - 80;

var sketchSurface = document.getElementById('sketchSurface');
sketchSurface.innerHTML = '<canvas id="sketch" width="' + canvasWidth2 + '" height="' + canvasHeight2 + '" style="border: solid black 1px;"></canvas>';

var sketch = document.getElementById('sketch');
var context = sketch.getContext('2d');


function clearSketch() {
	//ctx2.clearRect(0, 0, simple_sketch.width, simple_sketch.height);
}