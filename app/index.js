'use strict';

var express = require('express'),
    app = express(),
    ejs = require('ejs'),
    path = require('path');

require('./db/dbConnection')();

global.dbHelper = require('./db/dbHelper');

app.set('view engine', 'html');
app.engine('.html', ejs.__express);
app.set('views', path.join(__dirname, 'views'));

// use static files.
app.use(express.static(path.join(__dirname, '../public')));

app.get('/register', function (req, res) {
    res.render('register');
});

app.listen('8080', '127.0.0.1', function () {
    console.log('监听 8080 端口成功...');
});
