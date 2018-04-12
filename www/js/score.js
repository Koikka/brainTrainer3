// pisteiden tallentaminen
function topList() {
	/* SavePoints */
    savePoints = document.getElementById('points').innerHTML;
    saveName = document.getElementById('playerName').value;
   	
   	document.getElementById('playerName').value = "";
   	
   	localStorage.setItem(saveName, savePoints);
   	showPoints();
}
// Tulosten näyttäminen
function showPoints() {
	var info;
	var indeksi;
	var testi = new Array();
	var temp = new Array();
	
	var addHTML = document.getElementById('tulokset');
	for (var i=0; i<localStorage.length; i++) {
		indeksi = localStorage.key(i);
		info = localStorage.getItem(indeksi);
		info = parseInt(info);
		//console.log(typeof(info));
		testi[i] = [info, indeksi];
		
	}
	//arr.sort(); // normal sort
	testi = testi.sort(sortMultiDimensional); // sort using our custom function
	
	//addHTML.innerHTML = "<tr><th>Name</th><th>Points</th></tr>";
	for (var k = 0; k < testi.length; k++) {
		//console.log("0: " + testi[k][0] + ", 1: " + testi[k][1]);
		if (testi[k][1] == "lastActivePanel") {
			continue;
		}
		if (testi[k][1] == "resource-history") {
			continue;
		}
		if (testi[k][1] == "resourcesFramesExpanded") {
			continue;
		}
		if (testi[k][1] == "resourcesLastSelectedItem") {
			continue;
		}
		if (k%2 == 0) {
			addHTML.innerHTML += "<tr class='one'><td onclick='doRemoveItem(this)'>" + testi[k][1] + "</td><td>" + testi[k][0] + "</td></tr>";
		} else {
			addHTML.innerHTML += "<tr class='two'><td onclick='doRemoveItem(this)'>" + testi[k][1] + "</td><td>" + testi[k][0] + "</td></tr>";
		}
	}
	
	

}
function sortMultiDimensional(a,b) {
	a = a[0];
	b = b[0];
	return a == b ? 0 : (a < b ? 1 : -1);
	// http://www.grumelo.com/2009/02/12/sorting-multi-dimensional-javascript-arrays/
	//return a == b ? 0 : (a < b ? -1 : 1);
		// this sorts the array using the second element    
	//return ((a[1] < b[1]) ? -1 : ((a[1] > b[1]) ? 1 : 0));
}
// kaikkien arvojen poisto
function doClear() {
	localStorage.clear();
	showPoints();
}
// yksittäisen arvon poisto
function doRemoveItem(x) {
	var y = x.innerText;
	localStorage.removeItem(y);
	showPoints();
}