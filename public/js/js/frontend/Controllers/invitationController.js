/**
 * Created by afnan on 5/17/2016.
 */

usersApp.controller('invitationCtrl', ['$scope', '$http', '$rootScope', function ($scope, $http, $rootScope) {

    $scope.get_pending_invitations = function () {
        $http.get($APIs_server + "api/get-pending-invitations", {
            headers: {
                'Authorization': JWT_token
            }
        }).success(function (data, status) {
            //console.log(data);
            if (data != 'There is no pending invitations')
                $scope.invitations = data;
        })
    };

    $scope.accept_invitation = function (id, key) {

        $http.get($APIs_server + "api/accept-invitation/" + id + "?XDEBUG_SESSION_START=LUMEN_DEBUG", {
            headers: {
                'Authorization': JWT_token
            }
        }).success(function (data, status) {
            if (data == 'Invitation accepted') {
                $scope.invitations.splice(key, 1);
            }
        })
    };

    $scope.deny_invitation = function (id, key) {

        $http.get($APIs_server + "api/deny-invitation/" + id, {
            headers: {
                'Authorization': JWT_token
            }
        }).success(function (data, status) {
            //console.log(data);
            if (data == 'Invitation denied') {
                $scope.invitations.splice(key, 1);
            }
        })
    };
}]);