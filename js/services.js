/**
 * The Places factory helps us keep track of what we've searched for
 * and stores a copy of our searches in local storage.
 */

placesApp.factory('Places', ["$localStorage", function($localStorage) {

    var Places = {};
    Places.placesSearched = [];

    // ----------------
    // Initializations
    // ----------------

    if ($localStorage.placesSearched) {
        Places.placesSearched = $localStorage.placesSearched;
    }

    // ---------
    // Functions
    // ---------

    Places.updatePlacesSearchedLocalStorage = function() {
        $localStorage.placesSearched = Places.placesSearched;
    };

    Places.addPlacesSearched = function(address) {
        Places.placesSearched.unshift(address);
        Places.updatePlacesSearchedLocalStorage();
    };

    Places.clearPlacesSearched = function(successHandler) {
        Places.placesSearched = [];
        Places.updatePlacesSearchedLocalStorage();
        if (successHandler) {
            successHandler();
        }
    };

    return Places;
}]);

/**
 * The Maps factory helps us keep track of our map canvas and
 * talks to google geocoder as well.
 */
placesApp.factory('Maps', function() {

    var Maps = {};
    Maps.geocoder = {};
    Maps.googleMaps = {};
    Maps.markers = [];

    // Local variables
    var zenefits = "Zenefits, 2nd Street, San Francisco, CA, United States";

    // ---------
    // Functions
    // ---------

    /**
     * Google's Geocoder API for translating an address to lat lng coordinates
     */
    Maps.initializeGeocoder = function () {
        Maps.geocoder = new google.maps.Geocoder();
    };

    Maps.geocodeAddress = function (address, successHandler) {
        Maps.geocoder.geocode({address: address}, function (results, status) {
            if (status === google.maps.GeocoderStatus.OK) {
                successHandler(address, results);
            }
        });
    };

    /**
     * Google Maps helper functions for intializing maps, and setting logic for map markers
     */
    Maps.initializeMap = function(element, mapOptions) {
        Maps.googleMaps = new google.maps.Map(element, mapOptions);
    };

    // Adds a marker and corresponding info window
    Maps.addMarker = function(address, geocodeResponse) {
        // Set up the info window content
        var infowindow = new google.maps.InfoWindow({
            content:  (address === zenefits) ? '<div id="zenefits"></div>' : address
        });

        // Centers both the map and the markers
        var center = geocodeResponse[0].geometry.location;
        var marker = new google.maps.Marker({map: Maps.googleMaps, position: center});
        Maps.markers.push(marker);
        Maps.googleMaps.setCenter(center);

        // Listeners for the specific marker drawn
        google.maps.event.addListener(marker, 'click', function() {
            infowindow.open(Maps.googleMaps, marker);
        });
        google.maps.event.addListener(marker, 'mouseout', function() {
            infowindow.close();
        });
    };

    // Clears each marker from the map
    Maps.clearAllMarkers = function() {
        angular.forEach(Maps.markers, function(marker) {
            marker.setMap(null);
        });
        Map.markers = [];
    };

    return Maps;
});
