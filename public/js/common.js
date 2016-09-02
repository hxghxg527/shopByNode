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
        checkboxItem = $('.checkbox-item');

    cartSelectAll.on('click', function () {
        var checkedValue = $(this).attr('checked');

        console.log(checkedValue);
        if (checkedValue == 'checked') {
            $(this).attr('checked', false);
            checkboxItem.attr('checked', false);
        } else {
            $(this).attr('checked', true);
            checkboxItem.attr('checked', true);
        }
    });
})();