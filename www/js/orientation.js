/* http://www.html5rocks.com/en/tutorials/device/orientation/ */
function orientation() {
	if (orientationData) {
    	/* iOS */
		if (window.DeviceMotionEvent !== undefined) {
			window.ondevicemotion = function(e) {
				ay = e.accelerationIncludingGravity.x;
				ax = e.accelerationIncludingGravity.y;
				//az = e.accelerationIncludingGravity.z;
	
				/*if ( e.rotationRate ) {
					document.getElementById("rotationAlpha").innerHTML = e.rotationRate.alpha;
					document.getElementById("rotationBeta").innerHTML = e.rotationRate.beta;
					document.getElementById("rotationGamma").innerHTML = e.rotationRate.gamma;
				}*/		
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
				/*deviceOrientationHandler(tiltLR, tiltFB, dir, motUD);
				log.innerHTML = "tiltLR: " + tiltLR + ", tiltFB: " + tiltFB + ", dir: " + dir;*/
			}, false);
	
		} else if (window.OrientationEvent) {
			//document.getElementById("doEvent").innerHTML = "MozOrientation";
			window.addEventListener('MozOrientation', function(eventData) {
				// x is the left-to-right tilt from -1 to +1, so we need to convert to degrees
				ax = eventData.x * 90;
	
				// y is the front-to-back tilt from -1 to +1, so we need to convert to degrees
				// We also need to invert the value so tilting the device towards us (forward) 
				// results in a positive value. 
				ay = eventData.y * -90;
	
				// MozOrientation does not provide this data
				//var dir = null;
	
				// z is the vertical acceleration of the device
				//var motUD = eventData.z;
	
				// call our orientation event handler
				//deviceOrientationHandler(tiltLR, tiltFB, dir, motUD);
			}, false);
		} else {
			alert("Orientation not supported on your device or browser.");
		}
	}
}