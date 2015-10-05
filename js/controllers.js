placesApp.controller('homeController', function($scope, Places, Maps) {

    // ---------------
    // Initializations
    // ---------------

    (function init() {
        $scope.panelCollapsed = false;
        $scope.placesSearched = Places.placesSearched;
    })();

    // ---------
    // Functions
    // ---------

    $scope.clearSearch = function() {
        var successHandler = function() {
            $scope.placesSearched = Places.placesSearched;
            $scope.chosenPlace = "";
        };
        Maps.clearAllMarkers();
        Places.clearPlacesSearched(successHandler);
    };
});