var express = require('express');
var app = express();
var PORT = 3000;

app.get('/', (req, res) => {
	res.sendFile(__dirname + '/index.html');
});

var listener  = app.listen(PORT, function(err){
	if (err) console.log("Error in server setup")
	console.log("Server listening on Port", PORT);
});