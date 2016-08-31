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
        //alert('注册成功!');
        console.log(data);
    }, function (err) {
        if (err.status == 403) {
            alert('该用户已经被注册!');
        } else {
            alert('注册用户失败!');
        }

    });
}