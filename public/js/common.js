function register() {
    var registerContainer = $('.register-container');
    var uname = registerContainer.find('.uname').val();
    var upwd = registerContainer.find('.upwd').val();
    var upwdConfirm = registerContainer.find('.upwd-confirm').val();

    if (upwd != upwdConfirm) {
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
    }, function () {
        alert('注册失败!');
    });
}