//anchors
$(function() {
    $('.nav').on('click', '.nav__link', function() {
        var anchorID = $(this).attr('href');
        switch (anchorID) {
            case '#layout':
                scrollToBlock($('#layoutBlock'));
                break;
            case '#pay':
                scrollToBlock($('#payBlock'));
                break;
            case '#contacts':
                scrollToBlock($('#contactsBlock'));
                break;
            case '#more':
                scrollToBlock($('#more'));
                break;
            default:
                return;
                break;
        }
    });


    $('.first-screen__button').on('click', function() {
        $('body, html').animate({ scrollTop: $('#moreBlock').offset().top - $(window).outerHeight() / 2 + $('#moreBlock').outerHeight() / 2 }, 500);
    });


    function scrollToBlock(el) {
        $('body, html').animate({ scrollTop: el.offset().top }, 500);
        body.removeClass('no-scroll');
        nav.removeClass('visible');
        $('#gamburger').removeClass('open');
        if (window.matchMedia("(max-width: 767px)").matches) {
            nav.slideUp();
        }

    }
})