module.exports = function (app) {
    app.get('/addCommodity', function (req, res) {
        res.render('addCommodity');
    });

    app.post('/addCommodity', function (req, res) {
        var Commodity = global.dbHelper.getModel('commodity'),
            commodityName = req.body.commodityName,
            commodityPrice = req.body.commodityPrice;

        console.log('add commodity...');

        Commodity.create({
            name: commodityName,
            price: commodityPrice,
            imgSrc: "commodityImg.png"
        }, function (err, docs) {
            if (err) {
                res.status(404).send('add commodity failed');
            } else {
                res.sendStatus(200);
            }
        })

    });
};