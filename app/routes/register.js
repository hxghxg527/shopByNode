module.exports = function (app) {
    app.get('/register', function (req, res) {
        res.render('register');
    });

    app.post('/register', function (req, res) {
        var Users = global.dbHelper.getModel('users');

        var username = req.body.username,
            password = req.body.password;

        Users.findOne({name: username}, function (err, user) {
            if (user) {
                res.sendStatus(403);
            } else {
                Users.create({
                    name: username,
                    password: password
                }, function (err) {
                    if (err) {
                        res.sendStatus(500);
                    } else {
                        res.status(200).send('success!!');
                    }
                });
            }
        });
    });
};