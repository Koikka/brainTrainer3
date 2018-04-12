//var socket = io.connect('http://localhost');
var server = window.location.protocol + '//' + window.location.host;
var socket = io.connect(server);
socket.on('control', function (data) {
	// Get object and stringify it
	var msg = JSON.stringify(data);
	// Split data into two parts
	var data = msg.split(";");
	// Get power
	voima1 = data[0];
	voima2 = data[1];
	voima1 = parseInt(voima1.replace('"',''));
	voima2 = parseInt(voima2.replace('"',''));

	if (!gameIsOn) {
		ax = 0;
		ay = 0;
	} else if(socketData) {
		if (isNaN(voima1) || isNaN(voima2)) {
			voima1 = 0;
			voima2 = 0;
		} else {
			voima1 = parseInt(voima1);
			voima2 = parseInt(voima2);
			// CONFIG SPEED
			ax = voima1 * 1;
			ay = voima2 * -1;
			//console.log("ax: " + ax + ", ay: " + ay);
		}
	}
	if (msg.length > 0) {
		//orientationData = false;
	} else {
		//console.log(msg + '<br />');
		//$('#log').prepend(msg + '<br />');
	}
});
