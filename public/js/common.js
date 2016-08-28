"use strict";

var onFailSoHard = function () {
    alert('设备拒绝访问');
};

$(document).ready(function () {
    return;
    var canvas = $("#mainCanvas");
    var ctx = canvas.get(0).getContext("2d");

    var video = document.getElementById('video');
    var localMediaSteam = null;

    window.URL = window.URL || window.webkitURL;
    navigator.getUserMedia = navigator.getUserMedia ||
        navigator.webkitGetUserMedia ||
        navigator.mozGetUserMedia ||
        navigator.msGetUserMedia;

    if (navigator.getUserMedia) {
        navigator.getUserMedia({video: true}, function (stream) {
            video.src = window.URL.createObjectURL(stream);
            localMediaSteam = stream;
            //请注意:当使用getUserMedia方法时,在Chrome浏览器中不触发onloadedmetadata事件
            // video.onloadedmetadata = function (e) {
            //     //后续代码略
            // };
        }, onFailSoHard);
    } else {
        alert('您的浏览器不支持getUserMedia方法');
    }

    video.addEventListener('click', drawCanvas, false);

    function drawCanvas() {
        if (localMediaSteam) {
            ctx.drawImage(video, 0, 0, 200, 100);
            document.getElementById('img').src = canvas.toDataURL('image/png');
        }
    }
});

