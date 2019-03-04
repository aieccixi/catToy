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
}

io.sockets.on('connection', function (socket) {// WebSocket Connection
  var lightvalue = 0; //static variable for current status
  socket.on('spaceBar', function(data) { //get light switch status from client
    lightvalue = data;
	console.log('This is server side');
	console.log(lightvalue);
    if (lightvalue) { //only change LED if status has changed
		console.log('Server thinks True!');
		led = 1;
      //LED.writeSync(lightvalue); //turn LED on or off
    }
  });
});

process.on('SIGINT', function () { //on ctrl+c
  //LED.writeSync(0); // Turn LED off
  //LED.unexport(); // Unexport LED GPIO to free resources
  //pushButton.unexport(); // Unexport Button GPIO to free resources
  process.exit(); //exit completely
});