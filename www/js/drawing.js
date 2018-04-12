/*---------------------
Kokeillaan estettä
---------------------*/
function drawObstacle() {
	ctx.fillStyle = "black";
	//context.rect(x, y, width, height);
    ctx.beginPath();
	ctx.rect(obstacle.x, obstacle.y, obstacle.w, obstacle.h);
	ctx.fillStyle = '#8ED6FF';
	ctx.fill();
	ctx.lineWidth = 1;
	ctx.strokeStyle = 'black';
	ctx.stroke();

	// TÖRMÄYS
	/*if (player.x + player.dw + player.speed > obstacle.x && player.x - player.speed < obstacle.x + obstacle.w) {
		if (player.y + player.dh + player.speed > obstacle.y && player.y - player.speed < obstacle.y + obstacle.h) {
			if (player.x + player.dw + player.speed > obstacle.x && player.x - player.speed < obstacle.x + obstacle.w) {
				player.speed = player.speed * -1;
			}
			if (player.y + player.dh + player.speed > obstacle.y && player.y - player.speed < obstacle.y + obstacle.h) {
				player.speed = player.speed * -1;
			}
		}
	}*/
	if (ax != 0 || ay != 0) {
		ok = true;
	} else {
		ok = false;
	}
	/*
	Kentän reunat
	*/
	if (ok && player.x + ax <= 0 || player.x + player.dw + ax >= canvasWidth) {
		ok = false;
	}
	if (ok && player.y + ay <= 0 || player.y + player.dh + ay >= canvasHeight) {
		ok = false;
	}
	/*
	Este
	*/
	if (ok && player.x + player.dw + ax >= obstacle.x && player.x + ax <= obstacle.x + obstacle.w && player.y + player.dh + ay >= obstacle.y && player.y + ay <= obstacle.y + obstacle.h) {
		ok = false;
	}
}
/*---------------------
Pelaaja ja kentän rajat
----------------------*/
function drawPlayer() {
	//console.log('socketData: ' + socketData + ', ax: ' + ax + ', ay: ' + ay);
	playerWallCollision();

	if (left) {
		player.x = player.x - player.speed;
	}
	if (right) {
		player.x = player.x + player.speed;
	}
	if (up) {
		player.y = player.y - player.speed;
	}
	if (down) {
		player.y = player.y + player.speed;
	}

	// if tilt
	if (ok) {
		if (curPoints >= 0 && curPoints < 50) {
			player.x = player.x + ax;
			player.y = player.y + ay;
		} /*else if (curPoints >= 10 && curPoints < 50) {
			if (ax > 0) 
				ax = ax + 1;
			if (ax < 0)
				ax = ax - 1;
			if (ay > 0)
				ay = ay + 1;
			if (ay < 0)
				ay = ay - 1;
			player.x = player.x + ax;
			player.y = player.y + ay;
		}*/ else if (curPoints >= 50 && curPoints < 100) {
			if (ax != 0) 
				ax = ax * 1.1;
			if (ay != 0)
				ay = ay * 1.1;
			player.x = player.x + ax;
			player.y = player.y + ay;
		} else if (curPoints >= 100 && curPoints < 150) {
			if (ax != 0) 
				ax = ax * 1.1;
			if (ay != 0)
				ay = ay * 1.1;
			player.x = player.x + ax;
			player.y = player.y + ay;
		} else if (curPoints >= 150 && curPoints < 200) {
			if (ax != 0) 
				ax = ax * 1.1;
			if (ay != 0)
				ay = ay * 1.1;
			player.x = player.x + ax;
			player.y = player.y + ay;
		} else if (curPoints >= 200) {
			if (ax != 0) 
				ax = ax * 1.1;
			if (ay != 0)
				ay = ay * 1.1;
			player.x = player.x + ax;
			player.y = player.y + ay;
		} 
	}
	
	playerDrawingDelay();
	ctx.drawImage(playerImg, player.srcX, player.srcY, player.w, player.h, player.x, player.y, player.dw, player.dh);
	/*ctx.fillStyle="#FF0000";
	ctx.beginPath();
	ctx.arc(player.x, player.y, player.r, 0, Math.PI*2, true);
	ctx.closePath();
	ctx.fill();*/
}
function playerWallCollision() {
	if (player.x - player.speed <= 0) {
		player.x = player.x + player.speed;
	}
	if (player.x + player.dw + player.speed >= canvasWidth) {
		player.x = canvasWidth - player.speed - player.dw;
	}
	if (player.y - player.speed <= 0) {
		player.y = player.y + player.speed;
	}
	if (player.y + player.dh + player.speed >= canvasHeight) {
		player.y = canvasHeight - player.speed - player.dh;
	}
	//console.log(player.y);
}
/*-----------------------------------------------
Vastustajan piirtäminen ja ärsyttäväksi tekeminen
------------------------------------------------*/
function drawEnemy(enemy) {
	//console.log(enemy.x + ", " + enemy.y);
	/*if (okE && enemy.x < player.x) {
		enemy.x = enemy.x + enemy.speed;
	} else if (okE && enemy.x > player.x) {
		enemy.x = enemy.x - enemy.speed;
	} else if(okE) {
		enemy.x = enemy.x;
	}
	if (okE && enemy.y < player.y) {
		enemy.y = enemy.y + enemy.speed;
	} else if (okE && enemy.y > player.y) {
		enemy.y = enemy.y - enemy.speed;
	} else if (okE) {
		enemy.y = enemy.y;
	}*/

	/* Tarkastetaan mistä vihollisesta on kyse */
	if (enemy.enemy == 1) {
		//console.log("1");
		enemyDrawingDelay();
		ctx.drawImage(enemyImg, enemy.srcX, enemy.srcY, enemy.w, enemy.h, enemy.x, enemy.y, enemy.dw, enemy.dh);
	} else if (enemy.enemy == 2) {
		//console.log("2");
		enemyDrawingDelay2();
		ctx.drawImage(enemyImg, enemy.srcX, enemy.srcY, enemy.w, enemy.h, enemy.x, enemy.y, enemy.dw, enemy.dh);
	} else if (enemy.enemy == 3) {
		//console.log("2");
		enemyDrawingDelay3();
		ctx.drawImage(enemyImg, enemy.srcX, enemy.srcY, enemy.w, enemy.h, enemy.x, enemy.y, enemy.dw, enemy.dh);
	}
	// TÖRMÄYS
	/*okE = true;
	if (okE && enemy.x + enemy.dw + enemy.speed >= obstacle.x && enemy.x - enemy.speed <= obstacle.x + obstacle.w && enemy.y + enemy.dh + enemy.speed >= obstacle.y && enemy.y - enemy.speed <= obstacle.y + obstacle.h) {
		okE = false;
	}
	if (enemy.x + enemy.dw > player.x && enemy.x < player.x + player.dw) {
		if (enemy.y + enemy.dh > player.y && enemy.y < player.y + player.dh) {
			//console.log("osuu viholliseen");
			gameIsOn = false;
		}
	}*/
}
/*---------------------------------
Animoitu juusto ja sen kerääminen
---------------------------------*/
function drawCheese() {
	cheeseDrawingDelay();
	ctx.drawImage(cheeseImg, cheese.srcX, cheese.srcY, cheese.w, cheese.h, cheese.x, cheese.y, cheese.dw, cheese.dh);
	checkCheeseCollision();
}
function cheeseLocation() {
	testCheeseX = Math.floor(Math.random() * cheesePointX);
	testCheeseY = Math.floor(Math.random() * cheesePointY);
	cheeseOk = true;
	console.log(testCheeseX+" x "+canvasWidth+"    "+testCheeseY+" y "+canvasHeight);
	// if (testCheeseX <= 0 || testCheeseX + cheese.dw >= canvasWidth || testCheeseX <= obstacle.x + obstacle.w && testCheeseX + cheese.dw >= obstacle.x && testCheeseY + cheese.dh >= obstacle.y && testCheeseY <= obstacle.y + obstacle.h || testCheeseY <= 0 || testCheeseY + cheese.dh >= canvasHeight) {
	if (testCheeseX <= 0 || testCheeseX + cheese.dw >= canvasWidth || testCheeseX <= obstacle.x + obstacle.w && testCheeseX + cheese.dw >= obstacle.x || testCheeseY <= 0 || testCheeseY + cheese.dh >= canvasHeight) {
		cheeseOk = false;
		console.log('juusto väärässä paikassa');	
	}
	
	return cheeseOk;
}
function checkCheeseCollision() {
	if (player.x + player.dw > cheese.x && player.x < cheese.x + cheese.dw) {
		if (player.y + player.dh > cheese.y && player.y < cheese.y + cheese.dh) {
			//console.log('osut juustoon');
			// TODO juuston paikka
			
			cheeseLocation();
			while (!cheeseOk) {
				cheeseLocation();	
			}
			if (cheeseOk) {
				cheese.x = testCheeseX;
				cheese.y = testCheeseY;
			}
			//cheese.x = Math.floor(Math.random() * cheesePointX);
			//cheese.y = Math.floor(Math.random() * cheesePointY);
			
			curPoints = curPoints + 10;
			totalSeconds += addedSeconds;
			points.innerHTML = curPoints;
			if (curPoints == 50) {
				player.speed = player.speed + 1;
			}
			if (curPoints == 100) {
				player.speed = player.speed + 1;
				//enemy.speed = enemy.speed + 1;
				enemy.speed = enemy.speed * 1.2;
			}
			if (curPoints == 150) {
				player.speed = player.speed + 1;
				//enemy.speed = enemy.speed + 1;
				//enemy2.speed = enemy2.speed + 1;
				enemy.speed = enemy.speed * 1.2;
				enemy2.speed = enemy2.speed * 1.2;
			}
			if (curPoints == 200) {
				player.speed = player.speed + 1;
				//enemy.speed = enemy.speed + 1;
				//enemy2.speed = enemy2.speed + 1;
				//enemy3.speed = enemy3.speed + 1;
				enemy.speed = enemy.speed * 1.2;
				enemy2.speed = enemy2.speed * 1.2;
				enemy3.speed = enemy3.speed * 1.2;
			}
			if (curPoints == 250) {
				player.speed = player.speed + 1;
				enemy.speed = enemy.speed * 1.2;
				enemy2.speed = enemy2.speed * 1.2;
				enemy3.speed = enemy3.speed * 1.2;
			}
			if (curPoints == 300) {
				player.speed = player.speed + 1;
				enemy.speed = enemy.speed * 1.2;
				enemy2.speed = enemy2.speed * 1.2;
				enemy3.speed = enemy3.speed * 1.2;
			}
			if (curPoints == 350) {
				player.speed = player.speed + 1;
				enemy.speed = enemy.speed * 1.2;
				enemy2.speed = enemy2.speed * 1.2;
				enemy3.speed = enemy3.speed * 1.2;
			}if (curPoints == 400) {
				player.speed = player.speed + 1;
				enemy.speed = enemy.speed * 1.2;
				enemy2.speed = enemy2.speed * 1.2;
				enemy3.speed = enemy3.speed * 1.2;
			}
		}
	}
}