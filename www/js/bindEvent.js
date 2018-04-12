var errorClicks = 0;
var current_bubble_number = 0;
function bindEvent(element) {
	$('#'+element).bind('touchend', function(event){
		//console.log("( " + event.pageX + ", " + event.pageY + " )");
		//console.log("Clicked element: " + element + ", should have clicked: " + clickableElements[0] + ", " + errorClicks);//clickableElements[clickableElements.length-1]);
		if (clickableElements[0] == element) {
			//$('#'+element).css({'background-color' : 'green'});
			$('#'+element).addClass('selected');
			clickableElements.shift();
			$('#'+element).unbind('touchend');
		} else {
			for (var i = 0; i < 6; i++) {
				if (i%2 == 0) {
					$('#'+element).animate({
						backgroundColor: 'red'
					}, { duration: 300});
					/*$('body').animate({
						backgroundColor: '#F6CECE'
					}, 300);*/
				} else {
					$('#'+element).animate({
						backgroundColor: '#A9BCF5'
					}, { duration: 300});
					/*$('body').animate({
						backgroundColor: '#FFFFFF'
					}, 300);*/
				}
			}
			//navigator.notification.beep(1);
			//navigator.notification.vibrate(500);
			errorClicks = errorClicks + 1;
		}
		current_bubble_number = clickableElements[0]
		var tempNum = element.split('clickable');
		//console.log(tempNum);
		if (errorClicks == 4 || tempNum[1] == numberOfBubbles-1 && clickableElements.length == 0) {
			if (typeof current_bubble_number == 'undefined') {
				current_bubble_number = numberOfBubbles;
			} else {
				current_bubble_number = current_bubble_number.split('clickable');
				current_bubble_number = current_bubble_number[1];
			}
			timer('stop');
			$('#container').empty();
			var aika = time;
			// if (oldScore < errorClicks || errorClicks == 4) {
			// 	$('#container').append('<div id="trialEnd"><div id="resultTrial"><b class="showmidscore">Your time was: '+time+' sec, your score was: '+current_bubble_number+' and you had '+errorClicks+' errors.</b><br /><button id="yesButton">Continue</button></div><div id="textareaTrial">Why such result?<br /><textarea id="explainTxt" rows="8" cols="30"></textarea></div></div>');
			// 	//$('#container').append('<div id="trialEnd"><div id="resultTrial">Your time was: '+time+' sec and you had '+errorClicks+' errors.<br /><button id="yesButton">Continue</button><button id="noButton">No</button></div><div id="textareaTrial">Why such result?<br /><textarea id="explainTxt" rows="10" cols="40"></textarea></div></div>');
			// } else {
				$('#container').append('<div id="trialEnd"><b class="showmidscore">Your time was: '+time+' sec, your score was: '+current_bubble_number+' and you had '+errorClicks+' errors.</b><br /><button id="yesButton">Continue</button></div>');
			// }
			var user_id = "";
			for(var i=0, len=localStorage.length; i<len; i++) {
				var key = localStorage.key(i);
				var value = localStorage[key];
				if(value == localStorage.getItem("uname") && key != 'uname')
					user_id = key;
			}
			var jsondata = {'key' : 'trailmaking', 'user_name' : localStorage.getItem("uname"), 'user_id' : user_id, 'testAB' : numbOrAlpha, 'errors' : errorClicks, 'level' : numberOfBubbles, 'time' : aika, 'score' : current_bubble_number, 'datetime': getDateTime()};
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
			if (savedrawingdata) {
				var server_to_use = "http://koikka.work/china/china.php";
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
			window.clearInterval(timeInterval);
			$('#yesButton').bind('touchend', function(event){
				explainTxt = $('#explainTxt').val();
				//alert(explainTxt);
				//saveResults();
				$('#container').empty();
				//saveResults(aika);
				startScreen();
			});

			/*$('#noButton').bind('touchend', function(event){
				explainTxt = $('#explainTxt').val();
				//alert(explainTxt);
				saveResults();
				//window.location.href = 'menu.html';
			});*/
			//alert('Game over, your time: ' + time + " errors " + errorClicks);
		}

	});
	/*$('#'+element).bind('mouseover', function(event){
		//$('#log').html('left: '+parseInt($('#'+element).position().left)+', top: '+parseInt($('#'+element).position().top));
	});*/
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
