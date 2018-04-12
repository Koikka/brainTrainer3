/* http://www.html5rocks.com/en/tutorials/device/orientation/ */
var socket = io.connect('http://localhost');

socket.on('connection', function (data) {
	console.log(data);
//	msg = JSON.parse(data);
//	console.log(msg);
	var msg = JSON.stringify(data);
	console.log(msg);
	socket.emit('control', msg);
});
var ax = "antti";
var ay;
function orientation() {
	if (orientationData) {
    	/* iOS */
		if (window.DeviceMotionEvent != undefined) {
			window.ondevicemotion = function(e) {
				ay = e.accelerationIncludingGravity.x;
				ax = e.accelerationIncludingGravity.y;
				
			}
		} else if (window.DeviceOrientationEvent) {
			window.addEventListener('deviceorientation', function(eventData) {
				// gamma is the left-to-right tilt in degrees, where right is positive
				ax = eventData.gamma;
	
				// beta is the front-to-back tilt in degrees, where front is positive
				ay = eventData.beta;
	
				// alpha is the compass direction the device is facing in degrees
				//var dir = eventData.alpha
	
				// deviceorientation does not provide this data
				//var motUD = null;
	
				// call our orientation event handler
				
			}, false);
	
		}
}
