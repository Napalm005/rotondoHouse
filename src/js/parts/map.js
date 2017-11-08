// This function will iterate over markersData array
// creating markers with createMarker function
function displayMarkers(places) {
    var bounds = new google.maps.LatLngBounds();

    // For loop that runs through the info on markersData making it possible to createMarker function to create the markers
    for (var i = 0; i < places.length; i++) {

        var latlng = new google.maps.LatLng(places[i].coordinates);
        var title = places[i].title;
        var icon = places[i].icon;
        var iconSize1 = places[i].iconSize1;
        var iconSize2 = places[i].iconSize2;
        var img = places[i].img;

        createMarker(latlng, title, icon, iconSize1, iconSize2, img);

        // Marker’s Lat. and Lng. values are added to bounds variable
        bounds.extend(latlng);
    }

    // Finally the bounds variable is used to set the map bounds
    // with API’s fitBounds() function
    map.fitBounds(bounds);

    // this variable sets the map bounds and zoom level according to markers position
}

// This function creates each marker and sets their Info Window content
function createMarker(latlng, title, icon, iconSize1, iconSize2, img) {
    var image = {
        url: icon,
        scaledSize: new google.maps.Size(iconSize1, iconSize2),
    }
    var marker = new google.maps.Marker({
        icon: image,
        map: map,
        position: latlng,
        title: name,
        optimized: false
    });

    // This event expects a click on a marker
    // When this event is fired the infowindow content is created
    // and the infowindow is opened
    google.maps.event.addListener(marker, 'click', function() {

        // Variable to define the HTML content to be inserted in the infowindow
        var iwContent = '<div class="position__baloon">\
                            <img src="'+ img +'" alt="">\
                            <h4>'+ title +'</h4>\
                         </div>';

        // including content to the infowindow
        infoWindow.setContent(iwContent);

        // opening the infowindow in the current map and at the current marker location
        infoWindow.open(map, marker);
    });
}

function initMap(places) {
    var mapOptions = {
        center: new google.maps.LatLng(45.02021957458174, 38.98373049999997),
        zoom: 8,
        disableDefaultUI: true,
        zoomControl: true
    };

    map = new google.maps.Map(document.getElementById('map'), mapOptions);

    // a new Info Window is created
    infoWindow = new google.maps.InfoWindow();

    // Event that closes the InfoWindow with a click on the map
    google.maps.event.addListener(map, 'click', function() {
        infoWindow.close();
    });

    // Finally displayMarkers() function is called to begin the markers creation
    displayMarkers(places);

    google.maps.event.addDomListener(window, "resize", function() {
        var center = map.getCenter();
        google.maps.event.trigger(map, "resize");
        map.setCenter(center);
    });


    google.maps.event.addListener(infoWindow, 'domready', function() {
        // Reference to the DIV which receives the contents of the infowindow using jQuery
        var iwOuter = $('.gm-style-iw');

        /* The DIV we want to change is above the .gm-style-iw DIV.
         * So, we use jQuery and create a iwBackground variable,
         * and took advantage of the existing reference to .gm-style-iw for the previous DIV with .prev().
         */
        var iwBackground = iwOuter.prev();

        // Remove the background shadow DIV
        iwBackground.children(':nth-child(2)').css({ 'display': 'none' });

        // Remove the white background DIV
        iwBackground.children(':nth-child(4)').css({ 'display': 'none' });

        // Moves the shadow of the arrow 76px to the left margin
        iwBackground.children(':nth-child(1)').attr('style', function(i,s){ return s + 'display: none'});

        // Moves the arrow 76px to the left margin
        iwBackground.children(':nth-child(3)').attr('style', function(i,s){ return s + 'display: none'});

        iwOuter.parent().parent().css({top: '15px'});

        // Taking advantage of the already established reference to
        // div .gm-style-iw with iwOuter variable.
        // You must set a new variable iwCloseBtn.
        // Using the .next() method of JQuery you reference the following div to .gm-style-iw.
        // Is this div that groups the close button elements.
        var iwCloseBtn = iwOuter.next();

        // Apply the desired effect to the close button
        iwCloseBtn.css({
            display: 'none' // by default the close button has an opacity of 0.7
        });
    });
}