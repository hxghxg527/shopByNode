function register() {
    var registerContainer = $('.register-container'),
        uname = registerContainer.find('.uname').val().trim(),
        upwd = registerContainer.find('.upwd').val().trim(),
        upwdConfirm = registerContainer.find('.upwd-confirm').val().trim();

    if (uname == '' || upwd == '' || upwd != upwdConfirm) {
        $('.wrong-message').show();
        return;
    }

    if (!(/^[a-z0-9]*$/gi.test(uname))) {
        $('.wrong-message').show();
        return;
    }

    var data = {
        "username": uname,
        "password": upwd
    };

    $.ajax({
        type: "POST",
        url: "/register",
        header: {
            "Content-Type": "application/json"
        },
        data: data
    }).then(function (data) {
        console.log('register user success:');
        console.log(data);
        location.href = 'login';
    }, function (err) {
        location.href = 'register';
    });
}

function login() {
    var loginContainer = $('.login-container'),
        uname = loginContainer.find('.uname').val().trim(),
        upwd = loginContainer.find('.upwd').val().trim();

    if (uname == '' || upwd == '') {
        $('.wrong-message').show();
        return;
    }

    var data = {
        "username": uname,
        "password": upwd
    };

    $.ajax({
        type: "POST",
        url: "/login",
        header: {
            "Content-Type": "application/json"
        },
        data: data
    }).then(function (data) {
        console.log('login user success:');
        console.log(data);
        location.href = 'home';
    }, function (err) {
        location.href = 'login';
    });
}

function addCommodity() {
    var loginContainer = $('.add-commodity-container'),
        commodityName = loginContainer.find('.commodity-name').val().trim(),
        commodityPrice = loginContainer.find('.commodity-price').val().trim();

    if (commodityName == '' || commodityPrice == '') {
        $('.wrong-message').show();
        return;
    }

    var data = {
        "commodityName": commodityName,
        "commodityPrice": commodityPrice
    };

    $.ajax({
        type: "POST",
        url: "/addCommodity",
        header: {
            "Content-Type": "application/json"
        },
        data: data
    }).then(function (data) {
        console.log('add commodity success:');
        console.log(data);
        alert('add commodity success...');
    }, function (err) {
        alert('add commodity failed...');
        location.href = 'addCommodity';
    });
}

(function () {
    var cartSelectAll = $('.cart-select-all'),
        checkboxItem = $('.checkbox-item'),
        cartAddQuantity = $('.cart-add-quantity'),
        cartMinusQuantity = $('.cart-minus-quantity');

    cartSelectAll.on('click', function () {
        checkboxItem.prop('checked', $(this).is(':checked'));
        calculateTotalPrice();
    });

    checkboxItem.on('click', function () {
        var isCheckedAll = $('.checkbox-item:not(:checked)').length == 0 ? true : false;

        cartSelectAll.prop('checked', isCheckedAll);
        calculateTotalPrice();
    });

    function calculateTotalPrice() {
        var selectedTr = $('.checkbox-item:checked').parents('.cart-tr-item'),
            totalPrice = 0;

        $.each(selectedTr, function (idx) {
            var _price = $(this).find('.cart-td-price').text(),
                _quantity = $(this).find('.cart-td-quantity').val();

            totalPrice += _price * _quantity;
        });

        if (/(\.[0-9]{1})$/g.test(totalPrice)) {
            totalPrice += '0';
        } else if (!/(\.[0-9]{2})$/g.test(totalPrice)) {
            totalPrice += '.00';
        }

        $('.cart-result-total-price').text(totalPrice);
    }

    var updateQuantityTimerObj = {};

    cartAddQuantity.on('click', function () {
        var cartTdQuantity = $(this).siblings('.cart-td-quantity');
        var newQuantity = parseInt(cartTdQuantity.val(), 10) + 1;
        var cartId = cartTdQuantity.attr('data-cart-id');
        var cartIndex = cartTdQuantity.attr('data-cart-index');

        cartTdQuantity.val(newQuantity);

        if (updateQuantityTimerObj[cartIndex]) {
            clearTimeout(updateQuantityTimerObj[cartIndex]);
            updateQuantityTimerObj[cartIndex] = null;
        }

        updateQuantityTimerObj[cartIndex] = setTimeout(function () {
            $.ajax({
                type: "POST",
                url: "/cart/updateCartQuantity",
                header: {
                    "Content-Type": "application/json"
                },
                data: {
                    cartId: cartId,
                    quantity: newQuantity
                }
            }).then(function (data) {
                calculateTotalPrice();
            }, function () {
                alert('add cart quantity failed...');
            });
        }, 1000);
    });

    cartMinusQuantity.on('click', function () {
        var cartTdQuantity = $(this).siblings('.cart-td-quantity');
        var newQuantity = 0;
        var oldQuantity = parseInt(cartTdQuantity.val(), 10);
        var cartId = cartTdQuantity.attr('data-cart-id');
        var cartIndex = cartTdQuantity.attr('data-cart-index');

        if (oldQuantity > 0) {
            if (updateQuantityTimerObj[cartIndex]) {
                clearTimeout(updateQuantityTimerObj[cartIndex]);
                updateQuantityTimerObj[cartIndex] = null;
            }

            newQuantity = oldQuantity - 1;

            cartTdQuantity.val(newQuantity);

            updateQuantityTimerObj[cartIndex] = setTimeout(function () {
                $.ajax({
                    type: "POST",
                    url: "/cart/updateCartQuantity",
                    header: {
                        "Content-Type": "application/json"
                    },
                    data: {
                        cartId: cartId,
                        quantity: newQuantity
                    }
                }).then(function (data) {
                    calculateTotalPrice();
                }, function () {
                    alert('add cart quantity failed...');
                });
            }, 1000);
        }
    });
})();



















