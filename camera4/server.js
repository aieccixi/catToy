const express = require('express');
const raspividStream = require('raspivid-stream');

const app = express();
const wss = require('express-ws')(app);

var http = require('http').createServer(app);
var io = require('socket.io')(http);

const makePwm = require("adafruit-pca9685");
const pwm = makePwm();

//start handling server
app.use(express.static('public'))

app.get('/', (req, res) => res.sendFile(__dirname + 'public/index.html'));

io.on('connection', function(socket){
	var spacePressed = false;
	var rightPressed = false;
	var leftPressed = false;
	var upPressed = false;
	var downPressed = false;

	var step = 20;
	var xMin = 700;
	var xMax = 2000;
	var xNow = 1500;
	var yMin = 700;
	var yMax = 2000;
	var yNow = 1500;

	var makePwm = require("adafruit-pca9685");
	var pwm = makePwm();

	// servo default
	pwm.setPulse(0, xNow)
	pwm.setPulse(1, 1500)

	socket.on('space', function(data){
		spacePressed = data;
		console.log('Space pressed = ', spacePressed);
	});
	socket.on('right', function(data) {
		rightPressed = data;
		if (rightPressed && xNow <= xMax){
			xNow += step;
			pwm.setPulse(0, xNow);
			console.log(xNow);
		};
		console.log('rightPressed');
		console.log(xNow);
		console.log(rightPressed);
	});

	socket.on('left', function(data) {
		leftPressed = data;
		if (leftPressed && xNow >= xMin){
			xNow -= step;
			pwm.setPulse(0, xNow);
		};
		console.log('leftPressed');
	});

	socket.on('up', function(data) {
		upPressed = data;
		if (upPressed && yNow >= yMin){
			yNow -= step;
			pwm.setPulse(1, yNow);
		};
		console.log('upPressed');
	});

	socket.on('down', function(data) {
		downPressed = data;
		if (downPressed && yNow <= yMax){
			yNow += step;
			pwm.setPulse(1, yNow);
		};
		console.log('downPressed');
	});
});

app.ws('/video-stream', (ws, req) => {
	console.log('client connected');

	ws.send(JSON.stringify({
		action: 'init',
		width: '960',
		height:'540'
	}));

	ws.on('data', function(data){
		console.log(data);
	});

	var videoStream = raspividStream({ rotation: 0});

	videoStream.on('data', (data) => {
		ws.send(data, { binary: true }, (error) => {if (error) console.error(error); });
	});

	ws.on('close', () => {
		console.log('Client left');
		videoStream.removeAllListeners('data');
	});
});

app.use(function (err, req, res, next) {
	console.error(err);
	next(err);
});

app.listen(80, () => console.log('WSS started on 80'));

http.listen(8080, function(){
	console.log('Server listening on *:8080');
});
