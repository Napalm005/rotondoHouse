// Open sidebar
var nav = $('.nav');
var navButton = $('#gamburger');
var body = $('body');
navButton.click(function(e) {
    if (nav.hasClass('visible')) {
        nav.removeClass('visible');
        $(this).removeClass('open');
        nav.slideUp();

        setTimeout(function() {
            body.removeClass('no-scroll');
        }, 300);
    } else {
        nav.addClass('visible');
        nav.slideDown();
        $(this).addClass('open');
        setTimeout(function() {
            body.addClass('no-scroll');
        }, 300);
    }
})


