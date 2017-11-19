/**
 * Created by afnan on 5/17/2016.
 */

usersApp.controller('notificationsCtrl', ['$scope', '$http', function ($scope, $http, timeAgo, nowTime) {

    $scope.model = {
        selected_notifications: []
    };


    $scope.get_notifications = function () {

        // $http({
        //     method: 'GET',
        //     url:$APIs_server + "api/get-all-notifications",
        //     headers: {
        //         'Access-Control-Allow-Headers': 'Content-Type',
        //         'Access-Control-Allow-Origin':'*',
        //         'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
        //         'Authorization': JWT_token
        //     }
        // }).success(function (response) {
        //     //console.log("response.data: ", response.data);
        //     if (response.data != undefined)
        //         $scope.populate_notifications(response.data);
        //
        // });

    };

    $scope.mark_as_read = function () {
        $(':checkbox:checked').each(function (i) {
            $scope.model.selected_notifications.push($(this).val());
        });
        $http.post($APIs_server + "api/notifications/mark-as-read", $scope.model, {
            headers: {
                'Authorization': JWT_token
            }
        }).success(function (data, status) {
            if (data != undefined)
                $scope.populate_notifications(data)
        })
    };

    $scope.populate_notifications = function (data) {
        $scope.all_notifications = eval(data);
        $scope.nowTime = nowTime;
        if (eval(data).length >= 9) {
            $scope.number_of_notifications = "9+";
        } else {
            $scope.number_of_notifications = eval(data).length;
        }
    }

}]);