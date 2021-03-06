var http = require('http').createServer(handler); //require http server, and create server with function handler()
var fs = require('fs'); //require filesystem module
var io = require('socket.io')(http); //require socket.io module and pass the http object (server)
//var Gpio = require('onoff').Gpio; //include onoff to interact with the GPIO
//var LED = new Gpio(4, 'out'); //use GPIO pin 4 as output
var led = 0;

http.listen(8080); //listen to port 8080

function handler (req, res) { //create server
	fs.readFile(__dirname + '/public/index2.html', function(err, data) { //read file index.html in public folder
		if (err) {
			res.writeHead(404, {'Content-Type': 'text/html'}); //display 404 on error
			return res.end("404 Not Found");
		}
		res.writeHead(200, {'Content-Type': 'text/html'}); //write HTML
		res.write(data); //write data from index.html
		return res.end();
	});
};

/*
NEEDS WORK!!!!!

spacebar needs to be detected first and then right gets detected
then right and space send twice maybe something to do with keyDown/UpHandlers


*/
io.sockets.on('connection', function (socket) {// WebSocket Connection
	var spacePressed = false;
	var rightPressed = false;
	var leftPressed = false;
	var upPressed = false;
	var downPressed = false;

	socket.on('spaceBar', function(data) {
		spacePressed = data;
		console.log('spacePressed');
		/*if (spacePressed) {
			led = 1;
			//LED.writeSync(lightvalue); //turn LED on or off
		};*/
	});

	socket.on('right', function(data) {
		rightPressed = data;
		console.log('rightPressed');
	});

	socket.on('left', function(data) {
		leftPressed = data;
		console.log('leftPressed');
	});

	socket.on('up', function(data) {
		upPressed = data;
		console.log('upPressed');
	});

	socket.on('down', function(data) {
		downPressed = data;
		console.log('downPressed');
	});
});
process.on('SIGINT', function () { //on ctrl+c
	//LED.writeSync(0); // Turn LED off
	//LED.unexport(); // Unexport LED GPIO to free resources
	//pushButton.unexport(); // Unexport Button GPIO to free resources
	process.exit(); //exit completely
});
