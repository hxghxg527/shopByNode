module.exports = function (app) {
    app.get('/register', function (req, res) {
        res.render('register');
    });

    // add user.
    app.post('/register', function (req, res) {
        var Users = global.dbHelper.getModel('users'),
            username = req.body.username,
            password = req.body.password;

        console.log('register user...');

        Users.findOne({name: username}, function (err, docs) {
            if (err) {
                req.session.error = "network exception.";
                res.status(500).send('network exception.');
            } else if (docs) {
                req.session.error = "user is exist.";
                res.status(403).send('user is exist.');
            } else {
                Users.create({
                    name: username,
                    password: password
                }, function (err) {
                    if (err) {
                        req.session.error = "user was created failed.";
                        res.status(500).send('user was created failed.');
                    } else {
                        req.session.error = "user was created success.";
                        res.status(200).send('user was created success.');
                    }
                });
            }
        });
    });
};