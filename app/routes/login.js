module.exports = function (app) {
    app.get('/login', function (req, res) {
        res.render('login');
    });

    app.post('/login', function (req, res) {
        var Users = global.dbHelper.getModel('users'),
            username = req.body.username,
            password = req.body.password;

        console.log('login user...');

        Users.findOne({name: username}, function (err, docs) {
            if (err) {
                res.status(404).send('uses is not existed..');
            } else {
                if (docs) {
                    if (docs.password == password) {
                        req.session.user = docs;
                        res.status(200).send(docs);
                    } else {
                        res.status(404).send('password is wrong.');
                    }
                } else {
                    res.status(404).send('uses is not existed.');
                }
            }
        });

    });
};