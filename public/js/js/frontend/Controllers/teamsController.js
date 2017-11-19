/**
 * Created by afnan on 5/17/2016.
 */

usersApp.controller('teamsCtrl', ['$scope', '$http', '$rootScope', function ($scope, $http, $rootScope) {

    $rootScope.teamsCtrlScope = $scope;
    $scope.imageSrc = "";
    $scope.model = {
        groups_search: ""
    };

    $scope.itemsPerPage = 10;
    $scope.totalItems = 0;
    $scope.setPage = function (pageNo) {
        $scope.currentPage = pageNo;
    };

    $scope.pageChanged = function () {
        //console.log('Page changed to: ' + $scope.currentPage);
    };

    $scope.setItemsPerPage = function (num) {
        $scope.itemsPerPage = num;
        $scope.currentPage = 1; //reset to first page
    };

    $scope.get_teams = function () {
        $http.get($APIs_server + "api/teams", {
            headers: {
                'Authorization': JWT_token
            }
        }).then(function (response) {
            // console.log("response.data: ", response.data);
            $scope.teams = eval(response.data);
            $scope.totalItems = $scope.teams.length;
            $scope.all_teams = $scope.teams;
            try {
                com.trackware.UsersManager.instance.setTeams($scope.all_teams);
            } catch (e) {
            }
        });
    };

    $scope.search = function (search_query) {
        $("#circle-loader").show();
        //This code for searching from the database
        /*var encoded_search_query = encodeURIComponent(search_query);
         $http.get("/api/users-search/" + encoded_search_query + "/-1")
         .then(function (response) {
         //console.log("users.js: ", response.data);
         $scope.users = eval(response.data);
         $("#circle-loader").hide();
         });*/


        var search_result = [];
        if (search_query == '*') {
            $scope.teams = $scope.all_teams;
        } else {
            angular.forEach($scope.all_teams, function (team, key) {
                if (team.name != null) {
                    var team_name = team.name.toLowerCase();
                    if (team_name.indexOf(search_query.toLowerCase()) > -1) {
                        search_result.push(team);
                    }
                }
            });
            $scope.teams = search_result;
        }
        if ($scope.teams != undefined)
            $scope.totalItems = $scope.teams.length;

        $("#circle-loader").hide();
    };

    $scope.$watch('model.groups_search', function (newValue, oldValue) {
        if (newValue == '') {
            newValue = '*';
            $scope.search(newValue);
        } else {
            $scope.search(newValue);
        }
    });
}]);