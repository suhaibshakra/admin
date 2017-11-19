/**
 * Created by afnan on 5/17/2016.
 */

usersApp.directive('userItem', function () {
    return {
        restrict: 'E',
        scope: false,
        templateUrl: 'userItemDirective.html',
        link: function ($scope, element, attrs) {
            
            $scope.removeUserPermanently = attrs.removeUserPermanently;

            $scope.confirmDeleteUser = function () {

                $scope.$parent.confirmDeleteUser($scope.user.id, $scope.user.name, attrs.teamId, attrs.teamName, $scope.removeUserPermanently, "#delete-user");
            };
        }
    };
});