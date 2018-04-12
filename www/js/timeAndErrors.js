//errorClicks

function timer(stop) {
	start = new Date;
	timeInterval = setInterval(function() {
		time = parseInt((new Date - start) / 1000);
	    $('#log').html(time + " sec <span id='errors'>" + errorClicks + " errors</span>");
	    if (time == 240) {
	    	window.clearInterval(timeInterval);
	    	var aika = time;
	    	/*if (typeof current_bubble_number == 'undefined') {
				current_bubble_number = numberOfBubbles;
			} else {
				current_bubble_number = current_bubble_number.split('clickable');
				current_bubble_number = current_bubble_number[1];
			}*/
			$('#container').empty();
			//if (oldScore < errorClicks) {
				$('#container').append('<div id="trialEnd"><div id="resultTrial"><b class="showmidscore">Your time was: '+time+' sec, your score was: '+current_bubble_number+' and you had '+errorClicks+' errors.</b><br /><button id="yesButton">Continue</button></div></div>');
			// } else {
			// 	$('#container').append('<div id="trialEnd">Your time was: '+time+' sec and you had '+errorClicks+' errors.<br /><button id="yesButton">Continue</button></div>');
			// }
			//$('#container').append('<div>Your time was: '+time+' sec and you had '+errorClicks+' errors.<br />Want to play again?<button id="yesButton">Yes</button><button id="noButton">No</button>');
			var user_id = "";
			for(var i=0, len=localStorage.length; i<len; i++) {
				var key = localStorage.key(i);
				var value = localStorage[key];
				if(value == localStorage.getItem("uname") && key != 'uname')
					user_id = key;
			}
			var jsondata = {'key' : 'trailmaking', 'user_name' : localStorage.getItem("uname"), 'user_id' : user_id, 'testAB' : numbOrAlpha, 'errors' : errorClicks, 'level' : numberOfBubbles, 'time' : aika, 'score' : current_bubble_number, 'datetime': getDateTime()};
			// var jsondata = {'key' : 'trailmaking', 'Id' : localStorage.getItem("uname"), 'testAB' : numbOrAlpha, 'errors' : errorClicks, 'level' : numberOfBubbles, 'time' : aika, 'score' : current_bubble_number, 'datetime': getDateTime()};
			// var jsondata = {'key' : 'trailmaking', 'Id' : localStorage.getItem("uname"), 'time' : time, 'bubblesClicked' : current_bubble_number, 'errors': errorClicks};
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
			var server_to_use = "http://koikka.work/china/china.php";
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
			$('#yesButton').bind('touchend', function(event){
				explainTxt = $('#explainTxt').val();
				$('#container').empty();
				//saveResults(aika);
				startScreen();
			});

			/*$('#noButton').bind('vclick', function(event){
				explainTxt = $('#explainTxt').val();
				saveResults();
				window.location.href = 'menu.html';
			});*/
		}
	}, 1000);
	if (stop == 'stop') {
		window.clearInterval(timeInterval);
	}
}