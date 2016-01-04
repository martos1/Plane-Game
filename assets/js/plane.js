/**
 * 
 */

var planeLeft = 0;
var planeBottom = 0;
var speed = 7;
var boom = false;
var mPosX;
var mPosY;
var bullet = 100;
var rocketX;
var rocketY;
var rightMove = true;
var point = 0;

var movement = {
	left: false,
	right: false,
	top: false,
	bottom: false
};

window.addEventListener('load', function() {
	var plane = document.getElementById('plane');
	var width = window.innerWidth;
	var height = window.innerHeight;
	var enemy = document.getElementById('enemy');
	var planeHeight = 75;
	var planeWidth = 101;
	var enemyPos = 0;
	var availHeight = height - planeHeight;
	var availWidth = width - planeWidth;
	var result = document.getElementById('result');
	
	document.addEventListener('keydown', function(event) {
		handleKeyEvent(event.keyCode, true)
	}, false);
	
	document.addEventListener('keyup', function(event) {
		handleKeyEvent(event.keyCode, false)
	}, false);
	
	document.addEventListener('click', function(event) {
		boom(bullet--,planeLeft, planeBottom )
	}, false);
	/*document.addEventListener('mousemove', function(event) {
		mousemove(event)
	}, false);*/
	
	
	function mousemove(move){
		mPosX = move.clientX;
		mPosX -= 50;
		mPosY = height - move.clientY;
		mPosY -= 27;
	}
	

	function boom(id, x, y) {
		rocketX = x + 25;
		rocketY = y + 70;
		var rocket = '<span id="'+id +'" style="left:'+rocketX +'px; bottom:'+ rocketY +'px; "></span>';
		document.getElementById('game').innerHTML += rocket;
		
		
		
	}
	function rocketMove() {
		var r = document.getElementsByTagName('span');
		var s = 0;
		for(i = 0; i < r.length; i+=1){
			
			s = parseInt(r[i].style.bottom);
			if(s > height - 170 && s < height - 100 && 
					rocketX > enemyPos && rocketX < enemyPos + 100){
				point++;
				r[i].style.display = 'none';
				r[i].style.bottom = 1500   +'px';
				
			} else if(s > height){
				r[i].style.display = 'none';
				r[i].style.bottom = 1500   +'px';
			} else {
				r[i].style.bottom = s + speed   +'px';
			}
				
		}
		
	}
	
	function resultat() {
		result.innerHTML = '<div>Bullet - '+ bullet + '</div><div>Points - '+ point + '</div> ';
		if(point == 70){
			confirm('YOU WIN');
			document.location.href = "index.html";
		} else if(point < 70 && bullet <= 0) {
			confirm('YOU LOSE');
			document.location.href = "index.html";
			
		}
		
	}
	
	function enemyMove() {
		if(enemyPos > availWidth || enemyPos == 0 ){
			rightMove = !rightMove;
		}
		if(enemyPos < availWidth && rightMove ){
			enemy.style.left = enemyPos + 4 +'px';
			enemyPos = parseInt(enemy.style.left);
		} else if (enemyPos > 0 && !rightMove){
			enemy.style.left = enemyPos - 4 +'px';
			enemyPos = parseInt(enemy.style.left);
		}
		
	}
	
	
	function handleKeyEvent(keyCode, pressed) {
		
		if (keyCode == 38) {
			movement.top = pressed;
		}
		
		if (keyCode == 40) {
			movement.bottom = pressed;
		}
		
		if (keyCode == 37) {
			movement.left = pressed;
		}
		
		if (keyCode == 39) {
			movement.right = pressed;
		}
		
		if (keyCode == 32 && pressed == true) {
			boom(bullet--,planeLeft, planeBottom );
		}
		
	}
	
	function updatePlanePosition() {
		var initialBottom = planeBottom;
		var initialLeft = planeLeft;
		
		
		
		if ((movement.top || planeBottom < mPosY) &&  planeBottom < availHeight) {
			planeBottom += speed;
			
		}
		
		if ((movement.bottom || planeBottom > mPosY) && planeBottom > 0) {
			planeBottom -= speed;
			
		}
		
		if ((movement.left || planeLeft > mPosX) && planeLeft > 0) {
			planeLeft -= speed;
			
		}
		
		if ((movement.right || planeLeft < mPosX) && planeLeft < availWidth) {
			planeLeft += speed;
		}
		
		if (initialLeft != planeLeft) {
			plane.style.left = planeLeft + 'px';			
		}
		
		if (initialBottom != planeBottom) {
			plane.style.bottom = planeBottom + 'px';			
		}
		
	}
	
	
	function updateState() {
		
		resultat();
		enemyMove();
		updatePlanePosition();
		rocketMove();
		
		requestAnimationFrame(updateState);
		
	}
	updateState();
	
}, false)