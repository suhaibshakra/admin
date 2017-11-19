/**
 * Created by samir on 4/18/2016.
 */

usersApp.directive('latlonPicker', function () {

    return {
        restrict: 'E',
        link: function ($scope) {




            //scope.map = { center: { latitude: 45, longitude: -73 }, zoom: 8 };
            //$scope.location = {latitude: 31.9497, longitude: 35.9328};
            $scope.location = {latitude: $latlong[0], longitude: $latlong[1]};
            $scope.locationJSON = JSON.stringify($scope.location);

            $scope.onLocationInitialize = function (location) {
                console.log("=====from controller=======");
                console.log(location);
            }

            $scope.onLocationChange = function (location) {
                console.log("=====from controller=======")
                console.log(location);
                $scope.$apply(function () {
                    $scope.locationJSON = JSON.stringify(location);
                })

            }

            $scope.onMapLoaded = function (map) {
                console.log("=====from controller=======")
                console.log(map);
            }


        }
    };
});