/**
 * Created by afnan on 5/17/2016.
 */

var places_scope;
usersApp.controller('placesCtrl', ['$scope', '$http', function ($scope, $http) {

    $scope.model = {
        'places_search': "",
        'places': [],
        'selected_place': [],
        'users_tags': [],
        'added_users': [],
        'users': [],
        'check_in_out_user': []
    };

    places_scope = $scope;
    $scope.selected_users = [];
    $scope.filtered_places = [];
    $scope.selected_place_users = [];
    $scope.isEmapty = true;
    $scope.currentPage = 1;
    $scope.itemsPerPage = 10;

    $scope.setPage = function (pageNo) {
        $scope.currentPage = pageNo;
    };

    $scope.pageChanged = function () {
        $scope.selected_place = $scope.filtered_places.slice((($scope.currentPage - 1) * $scope.itemsPerPage), (($scope.currentPage) * $scope.itemsPerPage))[0];
        initMapDefaultData($scope.selected_place, false);
    };

    $scope.setItemsPerPage = function (num) {
        $scope.itemsPerPage = num;
        $scope.currentPage = 1; //reset to first page
    };

    $scope.places_search = function (search_query) {
        var search_result = [];
        if (search_query == '*') {
            $scope.filtered_places = $scope.places;
        } else {
            angular.forEach($scope.places, function (place, key) {
                if (place.name != null) {
                    var place_name = place.name.toLowerCase();
                    if (place_name.indexOf(search_query.toLowerCase()) > -1) {
                        search_result.push(place);
                    }
                }
            });
            $scope.filtered_places = search_result;
        }

        if ($scope.filtered_places != undefined && $scope.filtered_places.length > 0) {
            $scope.isEmapty = false;
            $scope.totalItems = $scope.filtered_places.length;
            $scope.selected_place = $scope.filtered_places.slice((($scope.currentPage - 1) * $scope.itemsPerPage), (($scope.currentPage) * $scope.itemsPerPage))[0];
            initMapDefaultData($scope.selected_place, false);
        } else {
            $scope.isEmapty = true;
        }
    };

    $scope.$watch('model.places_search', function (newValue, oldValue) {
        if (newValue == '') {
            newValue = '*';
            $scope.places_search(newValue);
        } else {
            $scope.places_search(newValue);
        }
    });

    $scope.goToEditFunction = function (place_id) {
        window.location.href = '/territories/edit/' + place_id;
    };

    $scope.get_place_info = function (place_id) {
        $http.get($APIs_server + "api/get-place-info/" + place_id, {
            headers: {
                'Authorization': JWT_token
            }
        }).then(function (response) {
            var place = response.data[0];
            // console.log("response.data: ", response.data);
            angular.forEach(place.config, function (user, key) {
                var user_config = JSON.parse(user.config);
                $scope.selected_place_users.push(user_config);
                $scope.model.users_tags.push({
                    id: user_config.id,
                    name: user_config.name,
                    avatar: user_config.avatar,
                    notify_in_check_in: user_config.notify_in_check_in,
                    notify_in_check_out: user_config.notify_in_check_out
                });
            });
            $('#checked_in_out_users').val(JSON.stringify($scope.model.check_in_out_user));
            $scope.selected_users = $scope.selected_place_users;
            $scope.selected_place = place;
            $(document).ready(function () {
                setTimeout(function () {
                    initMapDefaultData(place, true);
                }, 500);
            });
        });
    };

    $scope.create_place = function ($event) {
        //$event.preventDefault();
        angular.forEach($scope.model.users_tags, function (user, key) {
            var checked_in = $('#check_in_user_' + user.id).prop('checked');
            var checked_out = $('#check_out_user_' + user.id).prop('checked');
            $scope.model.check_in_out_user.push({
                id: user.id,
                name: user.name,
                avatar: user.avatar,
                notify_in_check_in: checked_in,
                notify_in_check_out: checked_out
            });
        });
        $('#checked_in_out_users').val(JSON.stringify($scope.model.check_in_out_user));
    };

    $scope.show_place = function (place_id) {
        angular.forEach($scope.filtered_places, function (place, key) {
            if (place.id == place_id) {
                $scope.selected_place_users = [];
                $scope.selected_place = place;
                angular.forEach(place.config, function (user, key) {
                    var user_config = JSON.parse(user.config);
                    $scope.selected_place_users.push(user_config);
                });
                $(document).ready(function () {
                    setTimeout(function () {
                        initMapDefaultData(place, false);
                    }, 500);
                });
            }
        });
    };

    $scope.get_all_places = function () {
        $http.get($APIs_server + "api/get-all-places", {
            headers: {
                'Authorization': JWT_token
            }
        }).then(function (response) {
            var default_data = eval(response.data[0]);
            // console.log("response.data: ", response.data);
            //To check if there is no places left then we will hide the details div
            if (default_data == undefined) {
                $scope.isEmapty = true;
            } else {
                angular.forEach(default_data.config, function (user, key) {
                    var user_config = user.config;
                    $scope.selected_place_users.push(user_config);
                });
                $scope.places = eval(response.data);
                $scope.filtered_places = eval(response.data);
                $scope.totalItems = $scope.filtered_places.length;
                $scope.selected_place = default_data;
                $scope.isEmapty = false;
                $(document).ready(function () {
                    setTimeout(function () {
                        initMapDefaultData(default_data, false);
                    }, 500);
                });
            }
        });
    };

}]);