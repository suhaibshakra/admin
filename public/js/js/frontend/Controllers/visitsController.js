usersApp.controller('visitsCtrl', ['$scope', '$http', '$rootScope', '$timeout', function ($scope, $http, $rootScope, $timeout) {
    $scope.disableButtons = false;

    var pagination_count = $('#pagination_count').val();

    $scope.all_visits_search = function () {

        $scope.model.from = $scope.date.startDate.format('YYYY-MM-DD');
        $scope.model.to = $scope.date.endDate.format('YYYY-MM-DD');
        $http.post($APIs_server + "api/get-customer-visits", $scope.model, {
            headers: {
                'Authorization': JWT_token
            }
        }).success(function (response, status) {
            //console.log(response);
            if (status == 200) {

                var from = $scope.model.from;
                var to = $scope.model.to;
                var visits = {};

                /*
                 Fill blank days in all query interval
                 */
                var counter = 0;
                for (var m = moment(from); m.diff(to, 'days') <= 0; m.add(1, 'days')) {
                    var date_key = m.format('YYYY-MM-DD');
                    if (counter < pagination_count) {
                        if (response.hasOwnProperty([date_key])) {
                            visits[date_key] = response[date_key];
                        } else {
                            visits[date_key] = [];
                        }
                    } else {
                        break;
                    }
                    counter++;
                }

                var last_key = Object.keys(visits).length - 1;

                $scope.date = {
                    startDate: moment(Object.keys(visits)[0]),
                    endDate: moment(Object.keys(visits)[last_key])
                };
                $scope.model.from = Object.keys(visits)[last_key];
                $scope.model.to = Object.keys(visits)[0];
                $scope.disableButtons = false;
                /*if ($scope.date.endDate.diff(moment()) <= 0)
                 $scope.disableButtons = true;*/
                $scope.date_range = Object.keys(visits)[0] + ' - ' + Object.keys(visits)[last_key];

                $scope.visits_days = eval(visits);
            }

        })
    };

    $scope.my_visits_search = function () {
        $scope.model.from = $scope.date.startDate.format('YYYY-MM-DD');
        $scope.model.to = $scope.date.endDate.format('YYYY-MM-DD');
        $scope.model.user_id = '';
        $http.post($APIs_server + "api/get-customer-visits", $scope.model, {
            headers: {
                'Authorization': JWT_token
            }
        }).success(function (response, status) {
            //console.log(response);
            if (status == 200) {

                var from = $scope.model.from;
                var to = $scope.model.to;
                var visits = {};

                /*
                 Fill blank days in all query interval
                 */
                var counter = 0;
                for (var m = moment(from); m.diff(to, 'days') <= 0; m.add(1, 'days')) {
                    var date_key = m.format('YYYY-MM-DD');
                    if (counter < pagination_count) {
                        if (response.hasOwnProperty([date_key])) {
                            visits[date_key] = response[date_key];
                        } else {
                            visits[date_key] = [];
                        }
                    } else {
                        break;
                    }
                    counter++;
                }

                var last_key = Object.keys(visits).length - 1;

                $scope.date = {
                    startDate: moment(Object.keys(visits)[0]),
                    endDate: moment(Object.keys(visits)[last_key])
                };
                $scope.model.from = Object.keys(visits)[last_key];
                $scope.model.to = Object.keys(visits)[0];
                $scope.disableButtons = false;
                /*if ($scope.date.endDate.diff(moment()) <= 0)
                 $scope.disableButtons = true;*/
                $scope.date_range = Object.keys(visits)[0] + ' - ' + Object.keys(visits)[last_key];

                $scope.visits_days = eval(visits);
            }

        })
    };

    $scope.get_next_visits_page = function () {

        if ($scope.model.from == '') {
            $scope.model.from = $scope.date.startDate.format('YYYY-MM-DD');
        }

        if ($scope.model.to == '') {
            $scope.model.to = $scope.date.endDate.format('YYYY-MM-DD');
        }

        var from = $scope.model.from;
        var to = $scope.model.to;

        //$scope.model.from = to;
        $scope.model.to = moment(to).add(pagination_count, 'days').format('YYYY-MM-DD');

        $http.post($APIs_server + "api/get-customer-visits", $scope.model, {
            headers: {
                'Authorization': JWT_token
            }
        }).success(function (response, status) {
            //console.log(response);
            if (status == 200) {

                var from = $scope.model.from;
                var to = $scope.model.to;

                var visits = {};

                /*
                 Fill blank days in all query interval
                 */
                var counter = 0;
                for (var m = moment(from); m.diff(to, 'days') <= 0; m.add(1, 'days')) {
                    var date_key = m.format('YYYY-MM-DD');
                    if (counter < pagination_count) {
                        if (response.hasOwnProperty([date_key])) {
                            visits[date_key] = response[date_key];
                        } else {
                            visits[date_key] = [];
                        }
                    } else {
                        break;
                    }
                    counter++;
                }

                var last_key = Object.keys(visits).length - 1;

                $scope.date = {
                    startDate: moment(Object.keys(visits)[0]),
                    endDate: moment(Object.keys(visits)[last_key])
                };
                $scope.model.from = Object.keys(visits)[last_key];
                $scope.model.to = Object.keys(visits)[0];
                $scope.disableButtons = false;
                /*if ($scope.date.endDate.diff(moment()) <= 0)
                 $scope.disableButtons = true;*/
                $scope.date_range = Object.keys(visits)[0] + ' - ' + Object.keys(visits)[last_key];

                $scope.visits_days = eval(visits);
            }
        })
    };

    $scope.get_pre_visits_page = function () {

        if ($scope.model.from == '') {
            $scope.model.from = $scope.date.startDate;
        }

        if ($scope.model.to == '') {
            $scope.model.to = $scope.date.endDate;
        }


        var from = $scope.model.from;
        var to = $scope.model.to;

        $scope.model.from = moment(to).subtract(pagination_count, 'days').format('YYYY-MM-DD');
        $scope.model.to = to;

        $http.post($APIs_server + "api/get-customer-visits", $scope.model, {
            headers: {
                'Authorization': JWT_token
            }
        }).success(function (response, status) {
            //console.log(response);
            if (status == 200) {

                var from = $scope.model.from;
                var to = $scope.model.to;

                var visits = {};

                /*
                 Fill blank days in all query interval
                 */
                var counter = 0;
                for (var m = moment(from); m.diff(to, 'days') <= 0; m.add(1, 'days')) {
                    var date_key = m.format('YYYY-MM-DD');
                    if (counter < pagination_count) {
                        if (response.hasOwnProperty([date_key])) {
                            visits[date_key] = response[date_key];
                        } else {
                            visits[date_key] = [];
                        }
                    } else {
                        break;
                    }
                    counter++;
                }

                var last_key = Object.keys(visits).length - 1;

                $scope.date = {
                    startDate: moment(Object.keys(visits)[0]),
                    endDate: moment(Object.keys(visits)[last_key])
                };
                $scope.model.from = Object.keys(visits)[last_key];
                $scope.model.to = Object.keys(visits)[0];
                $scope.disableButtons = false;
                /*if ($scope.date.endDate.diff(moment()) <= 0)
                 $scope.disableButtons = true;*/
                $scope.date_range = Object.keys(visits)[0] + ' - ' + Object.keys(visits)[last_key];

                $scope.visits_days = eval(visits);
            }
        })
    };
}]);