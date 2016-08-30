module.exports = function (app) {
    app.get('/register', function (req, res) {
        res.render('register');
    });

    // add user.
    app.post('/register', function (req, res) {
        var Users = global.dbHelper.getModel('users'),
            username = req.body.username,
            password = req.body.password;

        Users.findOne({name: username}, function (err, user) {
            if (err) {
                req.session.error = "network exception.";
                res.sendStatus(500);
            } else if (user) {
                req.session.error = "user is exist.";
                res.sendStatus(403);
            } else {
                Users.create({
                    name: username,
                    password: password
                }, function (err) {
                    if (err) {
                        req.session.error = "user is created failed.";
                        res.sendStatus(500);
                    } else {
                        req.session.error = "user is created success.";
                        res.status(200).send('success!!');
                    }
                });
            }
        });
    });
};