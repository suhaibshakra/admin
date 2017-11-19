/**
 * Created by afnan on 5/17/2016.
 */

usersApp.directive('teamItem', function () {
    
    return {
        restrict: 'A',
        scope: false,
        templateUrl: 'teamItemDirective.html',
        link: function ($scope, element, attrs) {

            // console.log(("teamItem scope", $scope.team.id));

            $scope.confirmDeleteTeam = function () {

                // send data to be used in the Modal
                $("#delete-team" + $scope.team.id + "-btn").attr("data-toggle", "modal");
                $("#delete-team" + $scope.team.id + "-btn").attr("data-target", "#confirmDeleteTeamModal");
                $("#delete-team" + $scope.team.id + "-btn").attr("data-team-id", $scope.team.id);
                $("#delete-team" + $scope.team.id + "-btn").attr("data-team-name", $scope.team.name);
            };
        }
    };
});