module.exports = function (app) {
    app.get('/home', function (req, res) {
        if (req.session.user) {
            var Commodity = global.dbHelper.getModel('commodity');

            Commodity.find({}, function (err, docs) {
                res.render('home', {commodity: docs});
            });
        } else {
            res.redirect('login');
        }
    });
};