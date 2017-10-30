var header = $('.header');
var sidebar = $('.sidebar');
var body = $('body');
var windowWidth = $(window).outerWidth();
var places;
$.ajax({
    url: "json/places.json"
}).done(function(data) {
    places = data.places;
    initMap(places);
});
