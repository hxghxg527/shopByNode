'use strict';

var express = require('express'),
    app = express(),
    ejs = require('ejs'),
    path = require('path'),
    session = require('express-session'),
    bodyParser = require('body-parser'),
    multer = require('multer');

// operate database.
require('./db/dbConnection')();
global.dbHelper = require('./db/dbHelper');

// for params formatted.
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

// save session message to response locals.
app.use(function (req, res, next) {
    console.log('use middleware...');
    res.locals.user = req.session.user;

    if (req.session.error) {
        res.locals.message = "<div class='error-message'>" + req.session.error + "</div>";
    } else {
        res.locals.message = '';
    }

    next();
});

// init routes.
require('./routes')(app);

// start server.
app.listen('8080', '127.0.0.1', function () {
    console.log('监听 8080 端口成功...');
});
