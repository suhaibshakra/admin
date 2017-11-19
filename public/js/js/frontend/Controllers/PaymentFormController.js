/**
 * Created by samir on 9/18/2016.
 */

usersApp.controller('PaymentFormCtrl', ['$scope', '$http', '$rootScope', function ($scope, $http, $rootScope) {
    $scope.card = {};

    $scope.isVisa = function () {
        if ($scope.card.number && $scope.card.number.charAt(0) == 4) {
            return true;
        } else {
            return false;
        }
    };

    $scope.isMasterCard = function () {
        if ($scope.card.number && $scope.card.number.charAt(0) == 5) {
            return true;
        } else {
            return false;
        }
    };

    $scope.sendForm = function () {
        var is_token_exist = document.getElementById("is_token_exist").value;
        if (is_token_exist == 'true') {
            //Do nothing
        } else if (is_token_exist == 'false') {
            var date = $scope.card.date;
            var mm = date.split('/')[0].slice(0, -1);
            var yy = date.split('/')[1].slice(1);
            var card_date = yy + mm;
            document.getElementById("card_number").value = $scope.card.number;
            document.getElementById("card_date").value = card_date;
        }

        document.getElementById("payment_form").submit();
    };
}]);