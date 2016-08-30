'use strict';

var express = require('express'),
    app = express(),
    ejs = require('ejs'),
    path = require('path'),
    session = require('express-session'),
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

// only use this middleware, in request param, it will has session key.
app.use(session({
    resave: true, // don't save session if unmodified
    saveUninitialized: false, // don't create session until something stored
    secret: 'secret',
    cookie: {
        maxAge: 1000 * 60 * 30
    }
}));

app.use(function (req, res, next) {
    res.locals.user = req.session.user;
    var error = req.session.error;
    res.locals.message = '';

    if (error) {
        res.locals.message = "<div class='error-message'>" + error + "</div>";
    }

    next();
});

require('./routes')(app);

app.listen('8080', '127.0.0.1', function () {
    console.log('监听 8080 端口成功...');
});
