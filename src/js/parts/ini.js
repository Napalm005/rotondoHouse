$(function() {
    //wow
    var wow = new WOW({
        offset: 100 // distance to the element when triggering the animation (default is 0)
    });
    wow.init();


    // $(".layout__room").each(function(){
    //    $(this).fancybox({
    //        href : $(this).data('href'),
    //        type        : 'div',
    //        openEffect  : 'none',
    //        closeEffect : 'none'
    //    });
    // });
    $(".layout__room").fancybox();


    initCarousel();

    function initCarousel() {
        if (window.matchMedia("(min-width: 999px)").matches) {
            $("#carousel").featureCarousel({
                trackerIndividual: false,
                trackerSummation: false,
                largeFeatureHeight: 416,
                largeFeatureWidth: 687,
                smallFeatureHeight: 321,
                smallFeatureWidth: 530,
                smallFeatureOffset: 70
            });
        } else if (window.matchMedia("(min-width: 767px)").matches) {
            $("#carousel").featureCarousel({
                trackerIndividual: false,
                trackerSummation: false,
                largeFeatureHeight: 291,
                largeFeatureWidth: 481,
                smallFeatureHeight: 225,
                smallFeatureWidth: 371,
                smallFeatureOffset: 45
            });
        } else {
            $("#carousel").featureCarousel({
                trackerIndividual: false,
                trackerSummation: false,
                largeFeatureHeight: 180,
                largeFeatureWidth: 320,
                smallFeatureHeight: 139,
                smallFeatureWidth: 230,
                smallFeatureOffset: 35
            });
        }
        $("#but_prev").click(function() {
            carousel.prev();
        });
        $("#but_next").click(function() {
            carousel.next();
        });
    }




    $(".gallery__list").on('click', '.gallery__list-item', function() {
        $(this).addClass('gallery__list-item--active').siblings().removeClass('gallery__list-item--active');
        var monthNumber = $(this).index() + 1;
        openPortfolioIner(monthNumber);
    })

    function openPortfolioIner(monthNumber) {
        $.get(location.pathname + "sliders.html")
            .done(function(data) {
                console.log(data);
                var content = $(data).find('#carousel-' + monthNumber).html();
                $('#carousel').html(content);
                initCarousel();
            })
            .fail(pull404Page);

        function pull404Page() {
            location.pathname = '/ananas/404.html';
        }
    }












    var layoutScheme = $(".layout__scheme");
    var verticalSlider = document.getElementById('slider-vertical');

    noUiSlider.create(verticalSlider, {
        start: 1,
        orientation: 'vertical',
        range: {
            'min': 1,
            'max': 8
        },
        tooltips: true,
        step: 1,
        direction: 'rtl',
        format: wNumb({
            decimals: 0
        }),
        pips: {
            mode: 'values',
            values: [1, 8],
            density: 14,
            stepped: true
        },
        animate: true,
        animationDuration: 300,
        behaviour: "tap-drag"

        // .layout__scheme
    });
    verticalSlider.noUiSlider.on('update', function(value) {
        layoutScheme.css({
            "background-image": "url(../img/layout/scheme-" + value + ".jpg)"
        })
        $('.layout__left-mask').removeClass('layout__left-mask--active').css({
            opacity: '0'
        });
        $('.layout__left-mask--' + value + '').addClass('layout__left-mask--active');
    });

    function updateSlider(floor) {
        verticalSlider.noUiSlider.set(floor);
    };








    var layoutLeft = $('.layout__left');
    layoutLeft.on('mouseenter', '.layout__section', function() {
        var dataFloor = $(this).data('floor');
        indicateFloor(dataFloor);
    }).on('mouseleave', '.layout__section', function() {
        var dataFloor = $(this).data('floor');
        unindicateFloor(dataFloor);
    });

    layoutLeft.on('click', '.layout__section', function() {
        var dataFloor = $(this).data('floor');
        switch (dataFloor) {
            case 1:
                setFloor(dataFloor);
                break;
            case 2:
                setFloor(dataFloor);
                break;
            case 3:
                setFloor(dataFloor);
                break;
            case 4:
                setFloor(dataFloor);
                break;
            case 5:
                setFloor(dataFloor);
                break;
            case 6:
                setFloor(dataFloor);
                break;
            case 7:
                setFloor(dataFloor);
                break;
            case 8:
                setFloor(dataFloor);
                break;
            default:
                return;
                break;
        }
    });

    function indicateFloor(floorNumber) {
        $('.layout__left-mask--' + floorNumber + '').css({
            opacity: '1'
        })
    }
    function unindicateFloor(floorNumber) {
        $('.layout__left-mask--' + floorNumber + '').css({
            opacity: '0'
        })
    }

    function setFloor(floorNumber) {
        $('.layout__left-mask').removeClass('layout__left-mask--active');
        $('.layout__left-mask--' + floorNumber + '').addClass('layout__left-mask--active');
        updateSlider(floorNumber);
        layoutScheme.css({
            "background-image": "url(../img/layout/scheme-" + floorNumber + ".jpg)"
        })
    }
})