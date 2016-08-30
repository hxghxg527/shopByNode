'use strict';

var express = require('express'),
    app = express(),
    ejs = require('ejs'),
    path = require('path'),
    bodyParser = require('body-parser'),
    multer = require('multer');

require('./db/dbConnection')();

global.dbHelper = require('./db/dbHelper');

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({extended: false})); // for parsing application/x-www-form-urlencoded
//app.use(multer()); // for parsing multipart/form-data

app.set('view engine', 'html');
app.engine('.html', ejs.__express);
app.set('views', path.join(__dirname, 'views'));

// use static files.
app.use(express.static(path.join(__dirname, '../public')));

// app.get('/', function (req, res) {
//     res.render('register');
// });

require('./routes/register')(app);

app.listen('8080', '127.0.0.1', function () {
    console.log('监听 8080 端口成功...');
});
