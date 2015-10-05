placesApp.directive('googleMaps', ["Places", "Maps", function(Places, Maps) {
    return {
        link: function(scope, element, attrs) {

            var zoom = 14;
            var mapCenter = new google.maps.LatLng(37.786, -122.401);

            // ---------------
            // Initialization
            // ---------------
            (function init() {
                Maps.initializeGeocoder();
                Maps.initializeMap(element[0], {zoom: zoom, center: mapCenter});

                // Sets up the map markers from local storage, if any.
                angular.forEach(Places.placesSearched, function(address) {
                    Maps.geocodeAddress(address, addMarkerSuccessHandler);
                })
            }());

            function addMarkerSuccessHandler(address, geocodeResponse) {
                Maps.addMarker(address, geocodeResponse);
            }

            // ----------
            // Listeners
            // ----------
            google.maps.event.addListener(scope.googlePlace, 'place_changed', function() {
                scope.$apply(function() {
                    Maps.geocodeAddress(scope.chosenPlace, addMarkerSuccessHandler);
                    Places.addPlacesSearched(scope.chosenPlace);
                });
            });
        }
    };
}]);