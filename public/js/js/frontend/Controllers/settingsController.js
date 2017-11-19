/**
 * Created by Mohammad on 5/17/2016.
 */

usersApp.controller('settingsCtrl', ['$scope', '$http', 'Notification', 'fileReader', function ($scope, $http, Notification, fileReader) {
    $scope.imageSrc = "";
    $scope.model = {
        notifications_settings: {
            'battery_low': true,
            'stand_still': true,
            'speed_limit': true,
            'offline': true,
            'gps_off': true,
            'customer_check_in': true,
            'customer_check_out': true,
            'places_check_in': true,
            'places_check_out': true
        }
    };
    $scope.imageSrc = angular.element(document.querySelector('#img_src')).val();

    //Get user config
    $scope.get_user_config = function (user_id) {
        $http.get($APIs_server + "api/user-config/" + user_id, {
            headers: {
                'Authorization': JWT_token
            }
        }).then(function (response) {
            if (angular.isObject(response.data.notifications_settings)) {
                $scope.model.notifications_settings = response.data.notifications_settings;
            } else {
                $scope.model.notifications_settings = JSON.parse(response.data.notifications_settings);
            }
        });
    };

    $scope.set_config = function (user_id) {
        $http.post($APIs_server + "api/store-user-config/" + user_id, $scope.model, {
            headers: {
                'Authorization': JWT_token
            }
        }).success(function (data, status) {
            if (status == 200) {
                Notification.success('Saved ...');
            } else if (status == 400) {
                Notification.error('Not saved');
            }
        });
    };
}]);