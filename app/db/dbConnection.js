module.exports = function () {
    var mongoose = require("mongoose"),
        db = mongoose.connect('mongodb://127.0.0.1:27017/shopByNode');

    db.connection.on('error', function (error) {
        console.log("mongodb connect failed: " + error);
    });

    db.connection.once('open', function () {
        console.log('mongodb connect success....');
    });
};