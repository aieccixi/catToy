/*
TODO:

Figure out how to handle two keyDownHandlers

*/

var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var ballRadius = 5;
var x = canvas.width/2;
var y = canvas.height/2;
var rightPressed = false;
var leftPressed = false;
var upPressed = false;
var downPressed = false;
var spacePressed = false

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

// key Down
function keyDownHandler(e) {
	if(e.key == " ") {
		console.log('Space Pressed');
		spacePressed = true;
	}
    if(e.key == "Right" || e.key == "ArrowRight") {
        rightPressed = true;
    }
    else if(e.key == "Left" || e.key == "ArrowLeft") {
        leftPressed = true;
    }
	else if(e.key == "Up" || e.key == "ArrowUp") {
        upPressed = true;
    }
	else if(e.key == "Down" || e.key == "ArrowDown") {
        downPressed = true;
    }
}

//key up
function keyUpHandler(e) {
	if(e.key == " ") {
		spacePressed = false;
	}
    if(e.key == "Right" || e.key == "ArrowRight") {
        rightPressed = false;
    }
    else if(e.key == "Left" || e.key == "ArrowLeft") {
        leftPressed = false;
    }
	else if(e.key == "Up" || e.key == "ArrowUp") {
        upPressed = false;
    }
	else if(e.key == "Down" || e.key == "ArrowDown") {
        downPressed = false;
    }
}

function drawBall() {
	ctx.beginPath();
	ctx.arc(x, y, ballRadius, 0, Math.PI*2);
	ctx.fillStyle = "#FF0000";
	ctx.fill();
	ctx.closePath();
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBall();

	if(rightPressed && x < canvas.width-ballRadius) {
		x += 5;
	}
	else if((leftPressed && x > 0) && x > 0+ballRadius){
		x -= 5;
	}
	else if((upPressed && y > 0) && y > 0+ballRadius){
		y -= 5;
	}
	else if(downPressed && y < canvas.height-ballRadius){
		y += 5;
	}
}

setInterval(draw, 10);
