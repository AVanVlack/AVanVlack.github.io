$(".menu").css("display", "none");


$(function () {
    $('.hamburger').click(function () {
        event.preventDefault();
        $(this).toggleClass('x');
        $("nav").fadeToggle(300);
    });
});

$(document).scroll(function () {
    if ($(this).scrollTop() > 300) {
        $("header .menubar").css("top", 0);
    } else {
        $("header .menubar").css("top", -50);
    }
});