module.exports = function (app) {
    app.get('/cart', function (req, res) {
        res.render('cart');
    });

    app.get('/addToCart/:id', function (req, res) {
        var Cart = global.dbHelper.getModel('cart'),
            Commodity = global.dbHelper.getModel('commodity'),
            cid = req.params.id,
            uid = req.session.user._id;

        if (!req.session.user) {
            res.redirect('/');
            return;
        }

        Cart.findOne({
            uId: uid,
            cId: cid
        }, function (err, docs) {
            if (docs) {
                Cart.update({
                    uId: uid,
                    cId: cid
                }, {
                    $set: {
                        cQuantity: docs.cQuantity + 1
                    }
                }, function (err, docs) {
                    if (docs) {
                        res.redirect('/home');
                    } else {
                        res.status(404).send('add commodity to cart failed...');
                    }
                });
            } else {
                Commodity.findOne({
                    _id: cid
                }, function (err, docs) {
                    if (docs) {
                        Cart.create({
                            uId: uid,
                            cId: cid,
                            cName: docs.name,
                            cPrice: docs.price,
                            cImgSrc: docs.imgSrc,
                            cQuantity: 1
                        }, function (err, docs) {
                            if (docs) {
                                res.redirect('/home');
                            } else {
                                res.status(404).send('add commodity to cart failed...');
                            }
                        });
                    } else {
                        res.status(404).send('add commodity to cart failed...');
                    }
                });
            }
        });
    });

};