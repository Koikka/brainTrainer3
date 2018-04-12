function startScreen() {
	// getResult();
	var appendOption;
	for (i = 5; i <= 40; i+=5) {
		appendOption += "<option value='"+i+"'>"+i+"</option>";
	}
	var tempContainer = "<div id='startScreenContainer'>" +
							"<div id='startScreen'>" +
								"<div id='radioButtons'>" +
									"<input type='radio' id='radio-2-1' class='regular-radio big-radio' name='r' value='numbers' checked='checked' /><label for='radio-2-1'></label><span class='menu_text'> Use only numbers</span><br />" +
									"<input type='radio' id='radio-2-2' class='regular-radio big-radio' name='r' value='alphaNumbers' /><label for='radio-2-2'></label> <span class='menu_text'>Use numbers and alphabeths</span><br /><br />" +
									"Select level:" +
									"<div class='styled'><select id='getNumbers'>"+appendOption+"</select></div>" +
								"</div>" +
								"<button id='startGame'>Start</button>" +
								"<button id='menu'>Menu</button>" +
								//"<button id='otherPlayer'>Read other NFC</button>" +
								//"<button id='stopGame' style='color: black;'>Exit</button>" +
							"</div>" +
							"<div id='pervResult'>" +
								"<div><i>Last played: </i><b id='pervDate'></b></div>" +
								"<div><i>Last gametype: </i><b id='pervAB'></b></div>" +
								"<div><i>Last bubbles: </i><b id='pervLvl'></b></div>" +
								"<div><i>Last time: </i><b id='pervTime'></b></div>" +
								"<div><i>Last score: </i><b id='pervScore'></b></div>" +
								"<div><i>Last errors: </i><b id='pervErrors'></b></div>" +
							"</div>" +
						"</div>";
	$('#container').append(tempContainer);

	// Bind event to button
	$('#startGame').bind('click', function(event){
		createBubbles();
		$('#startScreenContainer').remove();
		setTimeout(function(){
			timer();
		}, 300);
	});
	$('#stopGame').bind('click', function(event){
		//exitFromApp();
		navigator.app.exitApp();
	});
	$('#otherPlayer').bind('click', function(event){
		document.location.href = "index.html";
	});
	$('#menu').bind('click', function(event){
		document.location.href = "index.html";
	});
	getResult();
}

function exitFromApp() {
	navigator.app.exitApp();
}
function saveResults(aika) {
	// if (typeof current_bubble_number == 'undefined') {
	// 	current_bubble_number = numberOfBubbles;
	// } else {
	// 	current_bubble_number = current_bubble_number.split('clickable');
	// 	current_bubble_number = current_bubble_number[1];
	// }
	//console.log(current_bubble_number);
	//alert("Save " + localStorage.getItem(0) + "'s results ");
	//alert('time was:'+time+ ', errorClicks: '+errorClicks +', '+numberOfBubbles+', '+numbOrAlpha+', '+localStorage.getItem(1));
	/* SET SCORE TO DB */
	if (numbOrAlpha == 'numbers') {
		numbOrAlpha = 'A';
	} else {
		numbOrAlpha = 'B';
	}
	explainTxt = $.trim(explainTxt);
	if (explainTxt.length < 0) {
		explainTxt = '';
	}
	//alert(aika);

	//alert('saveResults: ' + explainTxt);
	var server_to_use = "http://gamer.tp.samk.fi/getData.php";
	var jsondata = {'key' : 'setScore', 'Id' : localStorage.getItem(1), 'testAB' : numbOrAlpha, 'errors' : errorClicks, 'level' : numberOfBubbles, 'notes' : explainTxt, 'time' : aika, 'score' : current_bubble_number};
	$.ajax({
        url: server_to_use,
        type: 'post',
        dataType: 'json',
        data: jsondata,
        success: function (data) {
            //console.log('kaikki ok');
        }
    });
    //console.log(jsondata);
	/*var request = $.ajax({
		type: "POST",
		url: server_to_use,
		data: jsondata,
		dataType: 'json'
	});
	request.done(function(msg) {
		console.log('Save done');
	});
	request.fail(function(jqXHR, textStatus) {
		alert( "SAVE Request failed: " + textStatus );
	});*/

	/* GET SCORE FROM DB */
	/*var server_to_use = "http://gamer.tp.samk.fi/getData.php";
	var jsondata = {'key' : 'getScore', 'Id' : localStorage.getItem(1)};
	//alert(user_id + ', makeAjaxCall');
	var request = $.ajax({
		type: "POST",
		url: server_to_use,
		data: jsondata,
		dataType: 'json'
	});
	request.done(function(msg) {
		$.each(msg, function(i,item) {
			alert(item.testAB + ', ' + item.date + ', ' + item.score + ', ' + item.level);

		});
	});
	request.fail(function(jqXHR, textStatus) {
		alert( "RECIEVE Request failed: " + textStatus );
	});*/

}

function getResult() {
	/* GET SCORE FROM DB */
	var el = JSON.parse(localStorage.getItem(localStorage.getItem("uname")));
	var item = {};
	if (typeof localStorage.getItem(localStorage.getItem("uname")) == "string") {
		for (var i = 0; i < el.length; i++) {
			if (el[i].key == 'trailmaking') {
				console.log(el[i]);
				item = el[i];
			}
		}
	}
	console.log(item);
	if (item.key.length > 0) {
		console.log(item);
		console.log(item.level+", "+item.errors+", "+item.testAB+", "+item.time+", "+item.datetime+", "+item.score);
		//alert(item.testAB + ', ' + item.date + ', ' + item.score + ', ' + item.level);
		$('#pervLvl').text(item.level);
		$('#pervErrors').text(item.errors);
		if (item.testAB == 'alphaNumbers') {
			$('#pervAB').text('B');
		} else {
			$('#pervAB').text('A');
		}
		$('#pervTime').text(item.time+'s');
		$('#pervDate').text(item.datetime);
		$('#pervScore').text(item.score);


		if (item.testAB == 'alphaNumbers') {
			$('#radio-2-1').prop('checked',false);
			$('#radio-2-2').prop('checked',true);

			//$('#radio-2-2').prop('checked',false);
		}
		// if (item.level > 0) {
			$('#getNumbers').val(item.level);
		// }

		oldScore = item.errors;
	} else {
		$('#pervLvl').text('No record');
		$('#pervErrors').text('No record');
		$('#pervAB').text('No record');
		$('#pervTime').text('No record');
		$('#pervDate').text('No record');
		$('#pervScore').text('No record');
	}
	// var server_to_use = "http://gamer.tp.samk.fi/getData.php";
	// var jsondata = {'key' : 'getScore', 'Id' : localStorage.getItem(1)};
	// //alert(user_id + ', makeAjaxCall');
	// var request = $.ajax({
	// 	type: "POST",
	// 	url: server_to_use,
	// 	data: jsondata,
	// 	dataType: 'json'
	// });
	// request.done(function(msg) {
	// 	if (msg.length > 0) {
	// 		$.each(msg, function(i,item) {
	// 			//alert(item.testAB + ', ' + item.date + ', ' + item.score + ', ' + item.level);
	// 			$('#pervLvl').text(item.level);
	// 			$('#pervErrors').text(item.errors);
	// 			$('#pervAB').text(item.testAB);
	// 			$('#pervTime').text(item.aika+'s');
	// 			$('#pervDate').text(item.date);
	// 			$('#pervNotes').text(item.notes);
	// 			$('#pervScore').text(item.score);


	// 			if (item.testAB == 'B') {
	// 				$('#radio-2-1').prop('checked',false);
	// 				$('#radio-2-2').prop('checked',true);

	// 				//$('#radio-2-2').prop('checked',false);
	// 			}
	// 			if (item.level > 0) {
	// 				$('#getNumbers').val(item.level);
	// 			}

	// 			oldScore = item.errors;
	// 		});
	// 	} else {
	// 		$('#pervLvl').text('No record');
	// 		$('#pervErrors').text('No record');
	// 		$('#pervAB').text('No record');
	// 		$('#pervTime').text('No record');
	// 		$('#pervDate').text('No record');
	// 		$('#pervNotes').text('No record');
	// 		$('#pervScore').text('No record');
	// 	}
	// });
	// request.fail(function(jqXHR, textStatus) {
	// 	alert( "RECIEVE Request failed: " + textStatus );
	// });
}


