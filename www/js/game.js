/*------------------------------------
Luodaan canvas näytön koosta riippuen
-------------------------------------*/
var canvasWidth = window.innerWidth - 20;//screen.width - 20;
var canvasHeight = window.innerHeight - 120;
if (canvasWidth < 300)
	canvasWidth = 300
if (canvasHeight < 150)
	canvasHeight = 150


var gameLength = 20;
var configGameLength = 10;
var totalSeconds = gameLength;
var defaultLength = 60;
var configDefaultLength = 10;
var addedSeconds = 2;
var useAddedTime = false;
var configUseAddedTime = false;
var savedata = true;
var savedrawingdata = true;
var isConfigured = localStorage.getItem("config");
var configX = 0;
var configY = 0;
var configIsOnGoing = false;
var device = null;
/*
ax = acceleration.y*(1);
ay = acceleration.x;
 */
var lr = "acceleration.x";
var tb = "acceleration.y";
if (isConfigured == "true") {
	lr = localStorage.getItem("lr");
	tb = localStorage.getItem("tb");
} else {
	document.getElementById('forceConfig').style.display = 'block';
	setTimeout(function(){
		alert("config");
		// watchID = navigator.accelerometer.watchAcceleration(onSuccess, onError, options);
		forceConfig();
	}, 500);
}
function forceConfig() {
	localStorage.setItem("tb", tb);
	localStorage.setItem("lr", lr);
	totalSeconds = configGameLength;
	configDefaultLength = defaultLength;
	defaultLength = 10;
	configUseAddedTime = useAddedTime;
	useAddedTime = false;
	configIsOnGoing = true;
	var upDown = "<div id='cofigdialog'><h2>tilt down and press </h2><button onclick='downPress()'>ok</button><h2 id='wait'></h2></div>";
	setTimeout(function() { $('body').append(upDown); }, 500);
}
function downPress() {
	var testxD = 0;
	var testyD = 0;
	// navigator.accelerometer.getCurrentAcceleration(function (acceleration) {
		// testxD = acceleration.x;
		// testyD = acceleration.y;
		var x = 0;
		$("#wait").append("Wait");
		while (x < 10) {
			sleepFor(20);
			testxD = parseInt(configX,10);
			testyD = parseInt(configY,10);
			console.log(testxD+", "+testyD);
			x++;
		}
		$('#cofigdialog').empty();
		var leftRight = "<div id='cofigdialog'><h2>tilt left (<--) and press </h2><button onclick='leftPress()'>ok</button><h2 id='wait'></h2></div>";
		setTimeout(function() { $('#cofigdialog').append(leftRight); }, 500);
		if (testxD < 0) {
			xD = testxD*(-1);
		} else {
			xD = testxD;
		}
		if (testyD < 0) {
			yD = testxD*(-1);
		} else {
			yD = testyD;
		}
		if (xD > yD) {
			// acceleration.x
			if (testxD > 0) {
				tb = "acceleration.x";
				localStorage.setItem("tb", tb);
				// tb = eval(tb);
			} else {
				tb = "acceleration.x * (-1)";
				localStorage.setItem("tb", tb);
				// tb = eval(tb);
			}
		} else {
			// acceleration.y
			if (testyD > 0) {
				tb = "acceleration.y";
				localStorage.setItem("tb", tb);
				// tb = eval(tb);
			} else {
				tb = "acceleration.y * (-1)";
				localStorage.setItem("tb", tb);
				// tb = eval(tb);
			}
		}
		// alert(testxD + " || " + testyD);
	// }, function () {
	// 	console.log("accelerometerError");
	// });

}
function leftPress() {
	var testxD = 0;
	var testyD = 0;
	// navigator.accelerometer.getCurrentAcceleration(function (acceleration) {
		// testxD = acceleration.x;
		// testyD = acceleration.y;
		var x = 0;
		$("#wait").append("Wait");
		while (x < 10) {
			sleepFor(20);
			testxD = parseInt(configX,10);
			testyD = parseInt(configY,10);
			console.log(testxD+", "+testyD);
			x++;
		}

		if (testxD < 0) {
			xD = testxD*(-1);
		} else {
			xD = testxD;
		}
		if (testyD < 0) {
			yD = testxD*(-1);
		} else {
			yD = testyD;
		}

		if (xD > yD) {
			// acceleration.x
			if (testxD > 0) {
				lr = "acceleration.x * (-1)";
				localStorage.setItem("lr", lr);
				// lr = eval(lr);
			} else {
				lr = "acceleration.x";
				localStorage.setItem("lr", lr);
				// lr = eval(lr);
			}
			localStorage.setItem("config", "true");
		} else {
			// acceleration.y
			if (testyD > 0) {
				lr = "acceleration.y * (-1)";
				localStorage.setItem("lr", lr);
				// lr = eval(lr);
			} else {
				lr = "acceleration.y";
				localStorage.setItem("lr", lr);
				// lr = eval(lr);
			}
			// localStorage.setItem("config", "true");
		}
		$('#cofigdialog').remove();
		startButtonPressed();
		// alert(testxD + " || " + testyD);
	// }, function () {
	// 	console.log("accelerometerError");
	// });

}
function sleepFor( sleepDuration ){
    var now = new Date().getTime();
    while(new Date().getTime() < now + sleepDuration){ /* do nothing */ }
}


var game = document.getElementById('game');
game.innerHTML = '<canvas id="canvas" width="' + canvasWidth + '" height="' + canvasHeight + '" style="border: solid black 1px;"></canvas>';

var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

var log = document.getElementById('log');
//log.innerHTML = "width: " + canvasWidth + ", height: " + canvasHeight;

/*------
Pisteet
------*/
var points = document.getElementById('points');
points.innerHTML = '0';
var curPoints = 0;
var isThisFirstPlayingTime = true;
var playerHitsEnemy = false;

/*-----
Socket
------*/
var socketData = false;
var ok = true;
var okE = true;
var okE2 = true;
var okE3 = true;
/*-----------------------------
Jos peliä ohjataan näppäimillä
-----------------------------*/
document.addEventListener('keydown', keyDown, false);
document.addEventListener('keyup', keyUp, false);
var left = false, right = false, up = false, down = false;
// tai kallistelemalla
var orientationData = false;
var ax = 0, ay = 0, threshold = 0;
/* Key movement */
function keyDown(e) {
	//console.log('alhaalla');
	if (e.keyCode == 37) {
		left = true;
	} else if (e.keyCode == 38) {
		up = true;
	} else if (e.keyCode == 39) {
		right = true;
	} else if (e.keyCode == 40) {
		down = true;
	}
}
function keyUp(e) {
	//console.log('ylhäällä');
	if (e.keyCode == 37) {
		left = false;
	} else if (e.keyCode == 38) {
		up = false;
	} else if (e.keyCode == 39) {
		right = false;
	} else if (e.keyCode == 40) {
		down = false;
	}
}

/*-----------------------------
Pelaaja, vastustaja ja pisteet
------------------------------*/
// Player
//var playerPointX = canvasWidth - 90;
//var playerPointY = canvasHeight - 90;
var playerImg = new Image();
playerImg.src = './img/mouse.png';
var delayP = 0;
var timeP = 0;
var player = {
	srcX: 0,
	srcY: 0,
	w: 110,
	h: 110,
	dw: 40,
	dh: 40,
	x: 25,//Math.floor(Math.random() * playerPointX),
	y: 25,//Math.floor(Math.random() * playerPointY)
	speed: 4
};
// Cheese - cheese 260 x 130
var cheeseOk = true;
var testCheeseX, testCheeseY;
var cheesePointX = canvasWidth;// - 90;
var cheesePointY = canvasHeight;// - 90;
var cheeseImg = new Image();
cheeseImg.src = './img/cheese.png';
var delayC = 0;
var timeC = 0;
var cheese = {
	srcX: 0,
	srcY: 0,
	w: 130,
	h: 130,
	dw: 30,
	dh: 30,
	x: Math.floor(Math.random() * cheesePointX),
	y: Math.floor(Math.random() * cheesePointY)
};
// Enemy - cat 440 x 110
var enemyImg = new Image();
enemyImg.src = './img/cat.png';
var delayE = 0;
var timeE = 0;
var enemy = {
	enemy: 1,
	srcX: 0,
	srcY: 0,
	w: 110,
	h: 110,
	dw: 40,
	dh: 40,
	x: canvasWidth - 0,
	y: canvasHeight - 0,
	speed: 1
};
// Level2
var enemy2Img = new Image();
enemy2Img.src = './img/cat.png';
var delayE2 = 0;
var timeE2 = 0;
var enemy2 = {
	enemy: 2,
	srcX: 0,
	srcY: 0,
	w: 110,
	h: 110,
	dw: 40,
	dh: 40,
	x: canvasWidth - 0,
	y: canvasHeight - 0,
	speed: 1
};
// Level3
var enemy3Img = new Image();
enemy3Img.src = './img/cat.png';
var delayE3 = 0;
var timeE3 = 0;
var enemy3 = {
	enemy: 3,
	srcX: 0,
	srcY: 0,
	w: 110,
	h: 110,
	dw: 40,
	dh: 40,
	x: canvasWidth - 0,
	y: canvasHeight - 0,
	speed: 1
};
// Obstacle
var obstacle = {
	x: canvasWidth/2,
	y: 90,
	w: 20,
	h: canvasHeight - 180
};

/*---------------------------------
Pelin aloittaminen ja lopettaminen
---------------------------------*/
var gameIsOn = false;
function startButtonPressed() {
	if (watchID) {
		navigator.accelerometer.clearWatch(watchID);
		watchID = null;
	}
	console.log(device);
    console.log(navigator.accelerometer);
    // navigator.accelerometer.getCurrentAcceleration(onSuccess, onError);
    watchID = navigator.accelerometer.watchAcceleration(onSuccess, onError, options);
	restartButtonPressed();
	gameIsOn = true;
	$('#catMouseGameOption').remove();
	$('#startButtonTime').css({'display': 'none'});
	startOrientation();
}
stopButtonPressed();
function saveScore() {
	if (watchID) {
		navigator.accelerometer.clearWatch(watchID);
		watchID = null;
	}
	if (!isThisFirstPlayingTime) {
		var gameEnded;
		if (playerHitsEnemy) {
			gameEnded = 'Enemy_Hit';
			playerHitsEnemy = false;
		} else {
			gameEnded = 'Timeout';
		}
		var notes = "";
		// var notes = $('#explainTxtCM').val();
		// if (notes.length < 1) {
		// 	notes = '-';
		// }
		var score = $('#points').text();
		//console.log(localStorage.getItem(1) + ', ' + score);
		var server_to_use = "http://koikka.work/portugal/portugal.php";
		// var jsondata = {'key' : 'setScoreCatMouse', 'Id' : localStorage.getItem(1), 'score' : score, 'gameEnded' : gameEnded, 'notes' : notes};
		var user_id = "";
		for(var i=0, len=localStorage.length; i<len; i++) {
			var key = localStorage.key(i);
			var value = localStorage[key];
			if(value == localStorage.getItem("uname") && key != 'uname')
				user_id = key;
		}
		var jsondata = {'key' : 'catvsmouse', 'user_name' : localStorage.getItem("uname"), 'user_id' : user_id, 'score' : score, 'reason' : gameEnded, 'time': getDateTime()};
		var data = localStorage.getItem(localStorage.getItem("uname"));
		if (typeof localStorage.getItem(localStorage.getItem("uname")) == "string") {
			data = JSON.parse(data);
			data[data.length] = jsondata;
			data = JSON.stringify(data);
		} else {
			data = '['+JSON.stringify(jsondata)+']';
		}
		localStorage.setItem(localStorage.getItem("uname"), data);
		console.log(jsondata);
		if (savedrawingdata) {
			$.ajax({
				method: "POST",
				url: server_to_use,
				data: jsondata,
				dataType: 'json',
				timeout: 3000
			}).done(function( msg ) {
				console.log("Data Saved: " + msg);
			});
		}
		// $.ajax({
	 //        url: server_to_use,
	 //        type: 'post',
	 //        dataType: 'json',

	 //        success: function (data) {
	 //            //console.log('kaikki ok');
	 //        },
	 //        data: jsondata
	 //    });
	}
	isThisFirstPlayingTime = false;
}
function getDateTime() {
    var now     = new Date();
    var year    = now.getFullYear();
    var month   = now.getMonth()+1;
    var day     = now.getDate();
    var hour    = now.getHours();
    var minute  = now.getMinutes();
    var second  = now.getSeconds();
    if(month.toString().length == 1) {
        var month = '0'+month;
    }
    if(day.toString().length == 1) {
        var day = '0'+day;
    }
    if(hour.toString().length == 1) {
        var hour = '0'+hour;
    }
    if(minute.toString().length == 1) {
        var minute = '0'+minute;
    }
    if(second.toString().length == 1) {
        var second = '0'+second;
    }
    var dateTime = year+'/'+month+'/'+day+' '+hour+':'+minute+':'+second;
     return dateTime;
}
function showScore() {
	var server_to_use = "http://gamer.tp.samk.fi/getData.php";
	var jsondata = {'key' : 'getScoreCatMouse', 'Id' : localStorage.getItem(1)};
	//alert(user_id + ', makeAjaxCall');
	var request = $.ajax({
		type: "POST",
		url: server_to_use,
		data: jsondata,
		dataType: 'json',
		timeout: 3000
	});
	request.done(function(msg) {
		if (msg.length > 0) {
			$.each(msg, function(i,item) {
				//alert(item.date + ', ' + item.score);
				$('#pervScore').text(item.score);
				$('#pervDate').text(item.date);
				$('#pervEnded').text(item.ended);
				$('#pervNotes').text(item.notes);

			});
		} else {
			$('#pervScore').text('No record');
			$('#pervDate').text('No record');
			$('#pervEnded').text('No record');
			$('#pervNotes').text('No record');
		}
	});
	request.fail(function(jqXHR, textStatus) {
		alert( "RECIEVE Request failed: " + textStatus );
	});
}
function notesCatVsMouse() {
	var tempAppend = '<div id="tempNotes" style="width: ' + canvasWidth + 'px; height:' + canvasHeight + 'px; position: absolute; top: 0px; left: 0px; z-index: 2000; background-color: white; margin: 12px; background-image: url(./img/ricepaper.png);">' +
						'<div style="padding: 20px; text-align: center;">' +
							'<p>Notes:</p>' +
							'<div id="notesCatMouse"><textarea id="explainTxtCM" rows="8" cols="30"></textarea></div>' +
							'<button id="continueFromNotes">Continue</button>' +
						'</div>' +
					'</div>';
	setTimeout($('#game').append(tempAppend), 500);
	$('#continueFromNotes').bind('touchend', function(event){
		saveScore();
		$('#tempNotes').remove();
		showScore();
	});
}
function stopButtonPressed() {
	if (savedata)
		saveScore();
	// if ($('#stopwatch').text() != '00:00:00:00') {
		//console.log('save score');
		// saveScore();
		// notesCatVsMouse();
		// showScore();
	// } else {
		//console.log('show score');
		// showScore();
	// }
	$('#startButtonTime').css({'display': 'block'});
	gameIsOn = false;
	var temp_index_menu = "index.html";
	var temp_menu_append = '<div id="catMouseGameOption" style="width: ' + canvasWidth + 'px; height:' + canvasHeight + 'px; position: absolute; top: 0px; left: 0px; z-index: 1000; background-color: white; margin: 12px; background-image: url(./img/ricepaper.png);">' +
								'<div style="padding: 20px; text-align: center;">' +
									'<div>' +
										//'Press start button to start new game. Or return to the ' +
										'<button id="toMenu" onclick="navigator.accelerometer.clearWatch(watchID); toMenu();">Menu</button> ' +
										//'<button onclick="document.location.href=index.html">read other NFC</button><br />' +
										// '<button id="stopGame" style="color: black;">Exit</button>' +
									'</div>' +
								'</div>' +
							'</div>';
	setTimeout(function() { $('#game').append(temp_menu_append); }, 500);
	$('#stopGame').bind('click', function(event){
		//exitFromApp();
		navigator.app.exitApp();
	});
	// do the config again
	if (configIsOnGoing) {
		var r = confirm("Did the mouse move correctly?");
		if (r == true) {
			document.getElementById('forceConfig').style.display = 'none';
			configIsOnGoing = false;
			useAddedTime = configUseAddedTime;
			totalSeconds = gameLength;
			defaultLength = configDefaultLength;
			localStorage.setItem("config", "true");
			window.location.reload();
		} else {
		    forceConfig();
		}
	}
}
function toMenu() {
	document.location.href='index.html';
}
function restartButtonPressed() {
	// for player
	player.x = 25;
	player.y = 25;
	player.speed = 2;

	// enemy 1
	enemy.x = canvasWidth - 20;
	enemy.y = canvasHeight - 20;
	enemy.speed = 1;

	// enemy 2
	enemy2.x = canvasWidth - 20;
	enemy2.y = canvasHeight - 20;
	enemy2.speed = 1;

	// enemy 3
	enemy3.x = canvasWidth - 20;
	enemy3.y = canvasHeight - 20;
	enemy3.speed = 1;

	points.innerHTML = '0';
	curPoints = 0;

	// Kello
	var v = null;

	milliseconds = 0;
	seconds = 0;
	minutes = 0;
	hours = 0;
	startTime = 0;

	var element = document.getElementById('stopwatch');
	element.innerHTML = "0" + hours + ":" + "0" + minutes + ":" + "0" + seconds + ":" + "0" + ("" + milliseconds).substring(0,2);
}
function startSocket() {
	socketData = true;
}
setInterval('startGame()', 30);

function startGame() {
	if (gameIsOn) {
		updateStopWatch();
		clearScreen();
		drawPlayer();
		drawCheese();
		drawObstacle();
		if (curPoints >= 100) {
			level1();
		}
		if (curPoints >= 200) {
			level2();
		}
		if (curPoints >= 300) {
			level3();
		}
		if (orientationData) {
			//orientation();
			// REPLACED TO INCREASE FRAMERATE
		}
	} else {
		clearScreen();
		/*ctx.fillStyle = '#f00';
		ctx.font = 'bold 30px Arial';
		ctx.textBaseline = 'middle';
		ctx.fillText('Game Over!', canvasWidth/2-90, canvasHeight/3);
		ctx.font = 'bold 16px Arial';
		ctx.textBaseline = 'middle';
		ctx.fillText('Press start to continue.', canvasWidth/2-90, canvasHeight/3+25);*/
	}
}
var watchID;
var options = { frequency: 10 };  // Update every 3 seconds
document.addEventListener("deviceready", onDeviceReady, false);
setTimeout(function() {
	if(!device) {
		window.setTimeout(function() {
		    var e = document.createEvent('Events');
		    e.initEvent("deviceready", true, false);
		    document.dispatchEvent(e);
		    console.log(device);
		}, 50);
	}
}, 1000);
function onDeviceReady() {
	// var success = function(status) {
 //        alert('Message: ' + status);
 //    }

 //    var error = function(status) {
 //        alert('Error: ' + status);
 //    }

 //    window.cache.clear( success, error );
	if (watchID) {
		navigator.accelerometer.clearWatch(watchID);
		watchID = null;
	}
	console.log(device);
    console.log(navigator.accelerometer);
    // navigator.accelerometer.getCurrentAcceleration(onSuccess, onError);
    watchID = navigator.accelerometer.watchAcceleration(onSuccess, onError, options);
}

function onSuccess(acceleration) {
    // ax = acceleration.x*(-1);
    // ay = acceleration.y;
 //    ax = eval(lr);
	// ay = eval(tb);
	if (lr=="acceleration.x") {
		ax = acceleration.x;
	} else if (lr=="acceleration.x * (-1)"){
		ax = acceleration.x * (-1);
	} else if (lr=="acceleration.y") {
		ax = acceleration.y;
	} else {
		ax = acceleration.y * (-1)
	}
	if (tb=="acceleration.x") {
		ay = acceleration.x;
	} else if (tb=="acceleration.x * (-1)"){
		ay = acceleration.x * (-1);
	} else if (tb=="acceleration.y") {
		ay = acceleration.y;
	} else {
		ay = acceleration.y * (-1)
	}
    // ax = acceleration.y*(1);
    // ay = acceleration.x;
    // console.log(acceleration.x + " - " + acceleration.y);
    configX = acceleration.x;
	configY = acceleration.y;
}
function onError() {
    console.log('onError!');
}


//
function startOrientation() {
	orientationData = true;
}
/*-------------------------------------
Näytön puhdistaminen ennen piirtämistä
--------------------------------------*/
function clearScreen() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
}

/*---------------------------
Kello ja sen päivittäminen
---------------------------*/
// Kellon paikka
var el = document.getElementById('stopwatch');
el.style.left = canvasWidth - 200 + "px";
el.style.top = canvasHeight + 16 + "px";


var v = null;

var milliseconds = 0;
var seconds = 0;
var minutes = 0;
var hours = 0;
var startTime = 0;


function updateStopWatch() {

	if (startTime == 0)
		startTime = new Date().getTime();
	milliseconds = new Date().getTime() - startTime

	seconds = Math.floor(milliseconds / 1000);
	if (seconds == totalSeconds && useAddedTime) {
		clearInterval(v);
		gameIsOn = false;
		totalSeconds = gameLength;

		var element = document.getElementById('startButtonTime');
		element.innerHTML = "Start";
		milliseconds = "00";
		stopButtonPressed();
	} else if (seconds == defaultLength && !useAddedTime) {
		clearInterval(v);
		gameIsOn = false;
		totalSeconds = gameLength;

		var element = document.getElementById('startButtonTime');
		element.innerHTML = "Start";
		milliseconds = "00";
		stopButtonPressed();
	}
	milliseconds = milliseconds % 1000;

	minutes = Math.floor(seconds/60);
	seconds = seconds % 60;

	hours = Math.floor(minutes/60);
	minutes = minutes % 60;

	if (milliseconds < 10)
		milliseconds = "0" + milliseconds
	if (seconds < 10)
		seconds = "0" + seconds;
	if (minutes < 10)
		minutes = "0" + minutes;
	if (hours < 10)
		hours = "0" + hours;




	// if (parseInt(minutes) == 1) {

	// 	clearInterval(v);
	// 	gameIsOn = false;
	// 	//startStopWatch();
	// 	//alert("Peli päättyi. Sait " + score + " pistettä.")
	// 	//score = 0;
	// 	//startTime = 0;

	// 	var element = document.getElementById('startButtonTime');
	// 	// element.disabled = false;
	// 	element.innerHTML = "Start";
	// 	milliseconds = "00";
	// 	stopButtonPressed();

	// }

	var element = document.getElementById('stopwatch');
	element.innerHTML = hours + ":" + minutes + ":" + seconds + ":" + ("" + milliseconds).substring(0,2);
}

function startStopStopWatch() {
	var element = document.getElementById('startButtonTime');
	if (v == null) {
		v = setInterval("updateStopWatch()", 10);
		element.innerHTML = "Lopeta";
		score = 0;
		startTime = 0;
		gameIsOn = true;
	}
	else {
		gameIsOn = false;
		clearInterval(v);
		v = null;
		element.disabled = false;
		element.innerHTML = "Start";
	}
}

/**
* Frame rate
*/
var fps = {
	startTime : 0,
	frameNumber : 0,
	getFPS : function(){
		this.frameNumber++;
		var d = new Date().getTime(),
		currentTime = ( d - this.startTime ) / 1000,
		result = Math.floor( ( this.frameNumber / currentTime ) );
		if( currentTime > 1 ){
			this.startTime = new Date().getTime();
			this.frameNumber = 0;
		}
		return result;
	}
};
// var f = document.querySelector("#fps");
var f = document.getElementById('fps');
function gameLoop(){
	setTimeout( gameLoop,1000 / 60 );
	f.innerHTML = fps.getFPS();
}
// window.onload = gameLoop;

// var fps = 0, now, lastUpdate = (new Date)*1 - 1;

// The higher this value, the less the FPS will be affected by quick changes
// Setting this to 1 will show you the FPS of the last sampled frame only
// var fpsFilter = 50;

// function drawFrame(){
//   // ... draw the frame ...
//   //frameRate
//   //console.log(fps+','+now);
//   // var thisFrameFPS = 1000 / ((now=new Date) - lastUpdate);
//   // fps += (thisFrameFPS - fps) / fpsFilter;
//   // lastUpdate = now;

//   setTimeout( drawFrame, 50 );
// }
// drawFrame();
gameLoop();
// var fpsOut = document.getElementById('fps');
// setInterval(function(){
//   fpsOut.innerHTML = fps.toFixed(1) + "fps";
// }, 1000);