var leftPos;
var topPos;
var bubbleSize = 70;
var bubbleRadius = bubbleSize/2;
var check = false;
var numberOfBubbles = 1;
var determinePosition = new Array();
var start = new Date;
var time = "";
var numberOfRounds = 0;
var numbOrAlpha = "";
var clickableElements = [];

var explainTxt = "";

// Create bubbles
function createBubbles() {
	errorClicks = 0;
	determinePosition = [];
	clickableElements = [];
	explainTxt = "";
	time = 0;

	var k = 1;
	var n = 0;
	numberOfBubbles = $('#getNumbers').val();
	numbOrAlpha = $("input:radio[name='r']:checked").val();
	var alphabeths = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T'];
	for (var i = 0; i < numberOfBubbles; i++) {
		getPosition();		
		if (numbOrAlpha == 'numbers') {
			$('#container').append("<div class='bubble' id='clickable"+i+"' style='width: "+bubbleSize+"px; height: "+bubbleSize+"px; border-radius: "+bubbleRadius+"px; position: absolute; top: "+topPos+"px; left: "+leftPos+"px;'><div class='bubbleNum'>"+k+"</div></div>");
			k++;
		} else if (numbOrAlpha == 'alphaNumbers') {
			if (i%2 == 0) {
				$('#container').append("<div class='bubble' id='clickable"+i+"' style='width: "+bubbleSize+"px; height: "+bubbleSize+"px; border-radius: "+bubbleRadius+"px; position: absolute; top: "+topPos+"px; left: "+leftPos+"px;'><div class='bubbleNum'>"+k+"</div></div>");
				k++;
			} else if (i%2 == 1) {
				var alphabeth = alphabeths[n];
				$('#container').append("<div class='bubble' id='clickable"+i+"' style='width: "+bubbleSize+"px; height: "+bubbleSize+"px; border-radius: "+bubbleRadius+"px; position: absolute; top: "+topPos+"px; left: "+leftPos+"px;'><div class='bubbleNum'>"+alphabeth+"</div></div>");
				n++;
			}
		}
		bindEvent('clickable'+i+'');
		clickableElements.push('clickable'+i+'');
		topPos = "";
		leftPos = "";
	}
	//console.log(determinePosition);
	$('#container').append("<div id='logContainer'><div id='log'></div></div>");
	timer();
	numberOfRounds = 0;
}
// Get bubble positions
function getPosition() {
	check = false;
	while (!check) {
		check = checkPositionAvailability();
	}
	//console.log(leftPos+", "+topPos);
	determinePosition.push(leftPos + ";" +topPos);
}
// Call for determinate new position for bubble
function checkPositionAvailability() {
	// Check is bubble on screen
	leftPos = Math.floor(Math.random()*window.innerWidth); /* Pick random number between 1 and window width */
	topPos = Math.floor(Math.random()*window.innerHeight); /* Pick random number between 1 and window height */
	bubbleSize = parseInt(bubbleSize);
	if (leftPos > window.innerWidth - bubbleSize || topPos > window.innerHeight - bubbleSize) {
		check = false;
		//console.log("New Position, over screen");
	} else {
		check = true;
	}
	//console.log(numberOfRounds);
	if (numberOfRounds > 1000) {
		//console.log('jottai pitäs tehä');
		determinePosition = [];
		$('#container').empty();
		createBubbles();
		//window.location.href = 'index.html';
	}
	checkOverlap();
	return check;
}
function checkOverlap() {
	numberOfRounds++;
	if (determinePosition.length > 0) {
		for (var i = 0; i < determinePosition.length; i++) {
			/* For safety force to int */
			leftPos = parseInt(leftPos);
			topPos = parseInt(topPos);
			var tempComparison = determinePosition[i].split(";");
			var xPos = parseInt(tempComparison[0]);
			var yPos = parseInt(tempComparison[1])
			var tempLeftMax = xPos + bubbleSize;
			var tempTopMax = yPos + bubbleSize;
			var curMaxLeft = leftPos + bubbleSize;
			var curMaxTop = topPos + bubbleSize;
			
			//console.log("Bubble coords: " + leftPos + ", OldX " + xPos + ", OldMaxX " + tempLeftMax + ", BubbleMaxX " + curMaxLeft);
			// Check if something is already there
			if (leftPos <= tempLeftMax && leftPos >= xPos || curMaxLeft <= tempLeftMax && curMaxLeft >= xPos) {
				if (topPos <= tempTopMax && topPos >= yPos || curMaxTop <= tempTopMax && curMaxTop >= yPos) {
					//console.log("Over other balloon");
					checkPositionAvailability();
				}
			}
		}
	}
	if (topPos <= 70 && leftPos <= 220) {
		checkPositionAvailability();
		//console.log("osuu left: " +leftPos+", top: " +topPos);
	}
}