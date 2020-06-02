var socket = io();

window.addEventListener("load", function(){

	var spacePressed = false;
	var rightPressed = false;
	var leftPressed = false;
	var upPressed = false;
	var downPressed = false;

	function keyDownHandler(e){
		if(e.key == " "){
			spacePressed = true;
			socket.emit("space", spacePressed);
			console.log(spacePressed);
		}
		else if(e.key == "Right" || e.key == "ArrowRight"){
			rightPressed = true;
			socket.emit("right", rightPressed);
		}
		else if(e.key == "Left" || e.key == "ArrowLeft"){
			leftPressed = true;
			socket.emit("left", leftPressed);
		}
		else if(e.key == "Up" || e.key == "ArrowUp"){
			upPressed = true;
			socket.emit("up", upPressed);
		}
		else if (e.key == "Down" || e.key == "ArrowDown"){
			downPressed = true;
			socket.emit("down", downPressed);
		}
	}

	function keyUpHandler(e){
		if(e.key == " "){
			spacePressed = false;
			socket.emit("space", spacePressed);
			console.log(spacePressed);
		}
		else if(e.key == "Right" || e.key == "ArrowRight"){
			rightPressed = false;
			socket.emit("right", rightPressed);
		}
		else if(e.key == "Left" || e.key == "ArrowLeft"){
			leftPressed = false;
			socket.emit("left", leftPressed);
		}
		else if(e.key == "Up" || e.key == "ArrowUp"){
			upPressed = false;
			socket.emit("up", upPressed);
		}
		else if(e.key == "Down" || e.key == "ArrowDown"){
			downPressed = false;
			socket.emit("down", downPressed);
		}
	}

	document.addEventListener("keydown", keyDownHandler, false);
	document.addEventListener("keyup", keyUpHandler, false);
});
