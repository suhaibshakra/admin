/**
 * Created by afnan on 5/17/2016.
 *
 * used when show groups in mapNav in resources/views/frontend/includes/mapNav.blade.php
 */
var scopes= {};

// usersApp.directive('teamDirective', [function() {
//     var html = '<div class="panel-heading map_tab" ng-click="get_team_users(team.id)"><img class="img-circle team_img" src="@{{ team.avatar }}" /><h4 class="panel-title" data-toggle="collapse" data-parent="#accordion"data-target="#collapse@{{ id }}" style="margin-bottom: 3px !important; line-height:1.2; padding-top:10px;">@{{ name }}</h4> </div>';
//     return{
//         template: html,
//         link : function(scope, element, attrs){
//         //Add event listener for 'click' event
//         element.on('click',  function(event) {
//             //Update DOM.
//             element.html('You clicked me');
//         });
//     }
// }
// }]);

usersApp.directive('teamMenuItem', function ($http) {
    return {
        restrict: 'E',
        scope: false,
        link: function ($scope, element, attrs) {
            scopes[attrs["accessName"]]= $scope;
            $scope.users = [];
            $scope.id = attrs.id;
            $scope.name = attrs.name;

            $scope.get_users = function () {

                if ($scope.users.length == 0) {
                    $("#circle-loader").show();
                    $http.get($APIs_server + "api/team-users-for-view/" + $scope.id, {
                        headers: {
                            'Authorization': JWT_token
                        }
                    }).then(function (response) {
                        // console.log("response.data: ", response.data);
                        $("#circle-loader").hide();
                        $scope.users = eval(response.data);
                    });
                }
            };

        }
    };
});