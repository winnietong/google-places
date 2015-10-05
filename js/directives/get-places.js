placesApp.directive('getPlaces', function() {
    return {
        require: 'ngModel',
        link: function(scope, element, attrs, model) {

			var options = {};
            scope.googlePlace = new google.maps.places.Autocomplete(element[0], options);

            // ----------
            // Listeners
            // ----------
            google.maps.event.addListener(scope.googlePlace, 'place_changed', function() {
                scope.$apply(function() {
                    model.$setViewValue(element.val());
                });
            });
        }
    };
});