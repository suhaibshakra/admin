usersApp.directive('visits', function ($http) {
    return {
        restrict: 'E',
        scope: false,
        templateUrl: 'visitsDirective.html',
        link: function ($scope, element, attrs) {
            $scope.model = {
                'from': '',
                'to': '',
                'user_id': '',
                'customer_id': ''
            };

            $scope.date = {startDate: '', endDate: ''};
            $scope.show_visits = false;
            $scope.visits_days = [];

            //Initialize customer id
            if (attrs.customerId != undefined) {
                $scope.model.customer_id = attrs.customerId;
            }

            //Initialize user id
            if (attrs.userId != undefined) {
                $scope.model.user_id = attrs.userId;
            }

            $http.post($APIs_server + "api/get-customer-visits", $scope.model, {
                headers: {
                    'Authorization': JWT_token
                }
            }).success(function (response, status) {
                //console.log(response.data);
                if (response.length == 0) {
                    $scope.show_visits = false;
                } else {
                    $scope.show_visits = true;
                }
                var last_key = Object.keys(response).length - 1;
                $scope.date = {startDate: Object.keys(response)[last_key], endDate: Object.keys(response)[0]};

                $scope.date_range = Object.keys(response)[last_key] + ' - ' + Object.keys(response)[0];

                $scope.visits_days = eval(response);

                $scope.disableButtons = true;
            });

        }
    };
});