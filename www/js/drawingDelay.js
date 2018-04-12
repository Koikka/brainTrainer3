/*function coinDrawingDelay () {
	if (time == 4) {
		//itse kolikon animointi, joka viidennen loopin jälkeen siirrytään 100pixeliä oikealle kuvatiedostossa ja otetaan siit 100x90 alue ja piirretään se
		if (delay == 0) {
			coin.srcX = 0;
		} else if (delay == 1) {
			coin.srcX = 100;
		} else if (delay == 2) {
			coin.srcX = 200;
		} else if (delay == 3) {
			coin.srcX = 300;
		} else if (delay == 4) {
			coin.srcX = 400;
		} else if (delay == 5) {
			coin.srcX = 500;
		} else if (delay == 6) {
			coin.srcX = 600;
		} else if (delay == 7) {
			coin.srcX = 700;
		} else if (delay == 8) {
			coin.srcX = 800;
		} else if (delay == 9) {
			coin.srcX = 900;
		} else if (delay == 10) {
			coin.srcX = 1000;
		} else if (delay == 11) {
			coin.srcX = 1100;
			delay = 0;
		}
		time = 0;
		delay++;
	}
	time++;
}*/
/*
Pelaajan animointi - koko: mouse 440 x 110 - kuvia: 4
*/
function playerDrawingDelay () {
	if (timeP == 6) {
		//itse kolikon animointi, joka viidennen loopin jälkeen siirrytään 100pixeliä oikealle kuvatiedostossa ja otetaan siit 100x90 alue ja piirretään se
		if (delayP == 1) {
			player.srcX = 0;
		} else if (delayP == 2) {
			player.srcX = 110;
		} else if (delayP == 3) {
			player.srcX = 220;
		} else if (delayP == 4) {
			player.srcX = 330;
			delayP = 0;
		} 
		timeP = 0;
		delayP++;
	}
	timeP++;
}
/*
Juuston animointi - koko: cheese 260 x 130 - kuvia: 2
*/
function cheeseDrawingDelay () {
	if (timeC == 10) {
		if (delayC == 1) {
			cheese.srcX = 0;
			//console.log("1");
		} else if (delayC == 2) {
			cheese.srcX = 130;
			delayC = 0;
			//console.log("2");
		} 
		timeC = 0;
		delayC++;
		//console.log(delayC);
	}
	timeC++;
}
/*
Vihollisten animonti - koko: cat 440 x 110 - kuvia: 4
*/
function enemyDrawingDelay () {
	if (timeE == 6) {
		//itse kolikon animointi, joka viidennen loopin jälkeen siirrytään 100pixeliä oikealle kuvatiedostossa ja otetaan siit 100x90 alue ja piirretään se
		if (delayE == 1) {
			enemy.srcX = 0;
		} else if (delayE == 2) {
			enemy.srcX = 110;
		} else if (delayE == 3) {
			enemy.srcX = 220;
		} else if (delayE == 4) {
			enemy.srcX = 330;
			delayE = 0;
		} 
		timeE = 0;
		delayE++;
	}
	timeE++;

	okE = true;
	if (okE && enemy.x + enemy.dw + enemy.speed >= obstacle.x && enemy.x - enemy.speed <= obstacle.x + obstacle.w && enemy.y + enemy.dh + enemy.speed >= obstacle.y && enemy.y - enemy.speed <= obstacle.y + obstacle.h) {
		okE = false;
	}
	if (enemy.x + enemy.dw > player.x && enemy.x < player.x + player.dw) {
		if (enemy.y + enemy.dh > player.y && enemy.y < player.y + player.dh) {
			//console.log("osuu viholliseen");
			playerHitsEnemy = true;
			gameIsOn = false;
			stopButtonPressed();
		}
	}

	if (okE && enemy.x < player.x) {
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
	}

	/*
	Jumituksen poisto
	*/
	if (!okE && enemy.x - enemy.speed <= obstacle.x + obstacle.w && enemy.x > obstacle.x) {
		// right side
		enemy.x = enemy.x + enemy.speed;
		//leftJ = false;
	} if (!okE && enemy.x + enemy.dw + enemy.speed >= obstacle.x && enemy.x + enemy.dw < obstacle.x + obstacle.w) {
		// left side
		enemy.x = enemy.x - enemy.speed;
		//leftJ = true;
	}
	if (!okE && enemy.y + enemy.dh + enemy.speed >= obstacle.y && enemy.y + enemy.dh < obstacle.y + obstacle.h) {
		// up side
		enemy.y = enemy.y - enemy.speed;
	} if (!okE && enemy.y - enemy.speed <= obstacle.y + obstacle.h && enemy.y > obstacle.y) {
		// bottom side
		enemy.y = enemy.y + enemy.speed;
	}
}
function enemyDrawingDelay2 () {
	if (timeE2 == 6) {
		//itse kolikon animointi, joka viidennen loopin jälkeen siirrytään 100pixeliä oikealle kuvatiedostossa ja otetaan siit 100x90 alue ja piirretään se
		if (delayE2 == 1) {
			enemy2.srcX = 0;
		} else if (delayE2 == 2) {
			enemy2.srcX = 110;
		} else if (delayE2 == 3) {
			enemy2.srcX = 220;
		} else if (delayE2 == 4) {
			enemy2.srcX = 330;
			delayE2 = 0;
		} 
		timeE2 = 0;
		delayE2++;
	}
	timeE2++;

	okE2 = true;
	if (okE2 && enemy2.x + enemy2.dw + enemy2.speed >= obstacle.x && enemy2.x - enemy2.speed <= obstacle.x + obstacle.w && enemy2.y + enemy2.dh + enemy2.speed >= obstacle.y && enemy2.y - enemy2.speed <= obstacle.y + obstacle.h) {
		okE2 = false;
	}
	if (enemy2.x + enemy2.dw > player.x && enemy2.x < player.x + player.dw) {
		if (enemy2.y + enemy2.dh > player.y && enemy2.y < player.y + player.dh) {
			//console.log("osuu viholliseen");
			playerHitsEnemy = true;
			gameIsOn = false;
			stopButtonPressed();
		}
	}

	if (okE2 && enemy2.x < player.x) {
		enemy2.x = enemy2.x + enemy2.speed;
	} else if (okE2 && enemy2.x > player.x) {
		enemy2.x = enemy2.x - enemy2.speed;
	} else if(okE2) {
		enemy2.x = enemy2.x;
	}
	if (okE2 && enemy2.y < player.y) {
		enemy2.y = enemy2.y + enemy2.speed;
	} else if (okE2 && enemy2.y > player.y) {
		enemy2.y = enemy2.y - enemy2.speed;
	} else if (okE2) {
		enemy2.y = enemy2.y;
	}
	/*
	Jumituksen poisto
	*/
	if (!okE2 && enemy2.x - enemy2.speed <= obstacle.x + obstacle.w && enemy2.x > obstacle.x) {
		enemy2.x = enemy2.x + enemy2.speed;
	} if (!okE2 && enemy2.x + enemy2.dw + enemy2.speed >= obstacle.x && enemy2.x + enemy2.dw < obstacle.x + obstacle.w) {
		enemy2.x = enemy2.x - enemy2.speed;
	}
	if (!okE2 && enemy2.y + enemy2.dh + enemy2.speed >= obstacle.y && enemy2.y + enemy2.dh < obstacle.y + obstacle.h) {
		enemy2.y = enemy2.y - enemy2.speed;
	} if (!okE2 && enemy2.y - enemy2.speed <= obstacle.y + obstacle.h && enemy2.y > obstacle.y) {
		enemy2.y = enemy2.y + enemy2.speed;
	}
}
function enemyDrawingDelay3 () {
	if (timeE3 == 6) {
		//itse kolikon animointi, joka viidennen loopin jälkeen siirrytään 100pixeliä oikealle kuvatiedostossa ja otetaan siit 100x90 alue ja piirretään se
		if (delayE3 == 1) {
			enemy3.srcX = 0;
		} else if (delayE3 == 2) {
			enemy3.srcX = 110;
		} else if (delayE3 == 3) {
			enemy3.srcX = 220;
		} else if (delayE3 == 4) {
			enemy3.srcX = 330;
			delayE3 = 0;
		} 
		timeE3 = 0;
		delayE3++;
	}
	timeE3++;

	okE3 = true;
	if (okE3 && enemy3.x + enemy3.dw + enemy3.speed >= obstacle.x && enemy3.x - enemy3.speed <= obstacle.x + obstacle.w && enemy3.y + enemy3.dh + enemy3.speed >= obstacle.y && enemy3.y - enemy3.speed <= obstacle.y + obstacle.h) {
		okE3 = false;
	}
	if (enemy3.x + enemy3.dw > player.x && enemy3.x < player.x + player.dw) {
		if (enemy3.y + enemy3.dh > player.y && enemy3.y < player.y + player.dh) {
			//console.log("osuu viholliseen");
			playerHitsEnemy = true;
			gameIsOn = false;
			stopButtonPressed();
		}
	}

	if (okE3 && enemy3.x < player.x) {
		enemy3.x = enemy3.x + enemy3.speed;
	} else if (okE3 && enemy3.x > player.x) {
		enemy3.x = enemy3.x - enemy3.speed;
	} else if(okE3) {
		enemy3.x = enemy3.x;
	}
	if (okE3 && enemy3.y < player.y) {
		enemy3.y = enemy3.y + enemy3.speed;
	} else if (okE3 && enemy3.y > player.y) {
		enemy3.y = enemy3.y - enemy3.speed;
	} else if (okE3) {
		enemy3.y = enemy3.y;
	}
	/*
	Jumituksen poisto
	*/
	if (!okE3 && enemy3.x - enemy3.speed <= obstacle.x + obstacle.w && enemy3.x > obstacle.x) {
		enemy3.x = enemy3.x + enemy3.speed;
	} if (!okE3 && enemy3.x + enemy3.dw + enemy3.speed >= obstacle.x && enemy3.x + enemy3.dw < obstacle.x + obstacle.w) {
		enemy3.x = enemy3.x - enemy3.speed;
	}
	if (!okE3 && enemy3.y + enemy3.dh + enemy3.speed >= obstacle.y && enemy3.y + enemy3.dh < obstacle.y + obstacle.h) {
		enemy3.y = enemy3.y - enemy3.speed;
	} if (!okE3 && enemy3.y - enemy3.speed <= obstacle.y + obstacle.h && enemy3.y > obstacle.y) {
		enemy3.y = enemy3.y + enemy3.speed;
	}
}