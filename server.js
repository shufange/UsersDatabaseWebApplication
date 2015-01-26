var http = require('http');
var express = require('express');
var path = require('path');  // a module contains utilities for handling and transforming file paths
var app = express();
var mysql = require('mysql');
var connection = require('express-myconnection');
var bodyParser = require('body-parser');


var userService = require('./service/userService.js');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

app.use(express.static(path.join(__dirname, '/www')))
/* path.join([path1], [path2], [...]) */
// Join all arguments together and normalize the resulting path.

/* express.static(root, [options]) */
// express.static is based on serve-static, and is responsible for serving the static
// assets of an Express application.

/* app.use() */
// Mount the middleware function(s) at the path. If path is not specified, it defaults to "/".


app.use(connection(mysql, {
	host : 'dev1.valiantica.com',
	user : 'dev1',
	password: 'valianticano1'
}, 'pool'));


app.get('/', function(req, res) {
	res.sendFile(path.join(__dirname, '/www/views/index.html'));
});


app.use('/service/user/', userService);

// A route for /say-hello
// get method in this url



app.set('port', process.env.PORT || 3000);
//start the server
app.listen(app.get('port'));
console.log("server started on port "+app.get('port'));



/*
var testfunc = function(req, res) {
	res.send('this is a test');
	//res.render('index');
}

app.get('/test', testfunc);
*/

