require('dotenv').config();
const bodyParser = require('body-parser');
const express = require('express');
const app = express();

// console.log( "Hello World" );

// app.get("/", function(req, res)
// {
// 	res.send("Hello Express");
// });

app.use(bodyParser.urlencoded({extended: false}));

app.route("/name").get(function(req, res) {
	res.json( { name : `${req.query.first} ${req.query.last}` });
}).post(function(req, res) {
	// console.log(req.body);
	res.json( { name : `${req.body.first} ${req.body.last}` });
});

app.get('/:word/echo', function(req, res) {
	res.json( {echo : req.params.word} );
});

app.use( "/public", express.static( __dirname + "/public" ) );

app.use( "/", function(req, res, next ) {
	console.log(req.method + " " + req.path + " - " + req.ip);
	next();
});

app.get( '/now', function(req, res, next ) {
	req.time = new Date().toString();
	console.log('time: ' + req.time);
	next();
}, function (req, res) {
	res.json( {'time' : req.time} );
});

app.get( "/", function( req, res ) {
	res.sendFile( __dirname + "/views/index.html" );
} );

app.get( "/json", function( req, res ) {
	if (process.env.MESSAGE_STYLE == 'uppercase')
		res.json( {"message" : "HELLO JSON"} );
	else
		res.json( {"message" : "Hello json"} );
} );






























 module.exports = app;
