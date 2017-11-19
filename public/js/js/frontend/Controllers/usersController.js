/**
 * Created by afnan on 5/17/2016.
 */
var root;
usersApp.controller('usersCtrl', ['$scope', '$http', '$rootScope', '$timeout', 'Notification', function ($scope, $http, $rootScope, $timeout, Notification) {

    root = $rootScope;
    $scope.latlng = [];
    $scope.users_ids_in_teams = [];
    $scope.filtered_users = [];
    $scope.all_users = [];
    $scope.customers = [];
    $scope.user_sites = [];
    $scope.node_users_tags = [];
    $scope.customer_info = [];
    $scope.edit_account_managers = false;
    $scope.show_edit_form = false;
    $scope.imageSrc = '';
    $scope.model = {
        users_search: "",
        customers_search: "",
        sites_search: "",
        users_tags: "",
        team_managers_tags: "",
        name: "",
        email: "",
        mobile_number: ""
    };

    $scope.currentPage = 1;
    $scope.customers_current_page = $scope.currentPage;
    $scope.sites_current_page = $scope.currentPage;
    $scope.itemsPerPage = 10;
    //$scope.maxSize = 2; //Number of pager buttons to show

    $scope.setPage = function (pageNo) {
        $scope.currentPage = pageNo;
    };

    $scope.setItemsPerPage = function (num) {
        $scope.itemsPerPage = num;
        $scope.currentPage = 1; //reset to first page
    };

    $rootScope['user_controler'] = $scope;
    $rootScope['user_controller_model'] = $scope.model;

    $scope.fetchHistory = function () {
        $scope.user_details = $scope.spec_user.split('|');
        navigator.geolocation.getCurrentPosition(showPosition, errorCallback, {timeout: 10000});
    };

    function showPosition(position) {
        com.trackware.HistoryManager.instance.drawUserRouteHistory($GOOGLE_API, $PHOENIX_API_URL, $APIs_server, $scope.user_details[0], $scope.user_details[1], position.coords.latitude + "," + position.coords.longitude, $scope.spec_date, $scope.time_from, $scope.time_to, JWT_token);
    }

    function errorCallback() {
        alert("An error has occured while attempting to get your location for the purpose of fetching your time offset from Google's geolocation API." +
            " Please make sure that this domain is allowed to use your location data in the browser settings.");
    }

    $scope.set_user = function ($event, user_id) {
        var checkbox = $event.target;
        var action = (checkbox.checked ? true : false);
        //com.trackware.se
    };

    $scope.usersTags = function (search_query) {
        var users_tags = [];
        angular.forEach($scope.users, function (user, key) {
            if (user.name != null) {
                var user_name = user.name.toLowerCase();
                if (user_name.indexOf(search_query.toLowerCase()) > -1) {
                    users_tags.push(user);
                }
            }
        });
        return users_tags;
    };

    $scope.user_search = function (search_query) {
        $("#circle-loader").show();
        //This code for searching from the database
        /*var encoded_search_query = encodeURIComponent(search_query);
         $http.get("/api/users-search/" + encoded_search_query + "/-1")
         .then(function (response) {
         //console.log("users.js: ", response.data);
         $scope.filtered_users = eval(response.data);
         $("#circle-loader").hide();
         });*/
        var search_result = [];
        if (search_query == '*') {
            $scope.filtered_users = $scope.users;
        } else {
            angular.forEach($scope.users, function (user, key) {
                if (user.name != null) {
                    var user_name = user.name.toLowerCase();
                    if (user_name.indexOf(search_query.toLowerCase()) > -1) {
                        search_result.push(user);
                    }
                }
            });
            $scope.filtered_users = search_result;
        }

        if ($scope.filtered_users != undefined)
            $scope.totalItems = $scope.filtered_users.length;

        $("#circle-loader").hide();
    };

    $scope.customer_search = function (search_query) {
        $("#circle-loader").show();
        var search_result = [];
        if (search_query == '*') {
            $scope.filtered_customers = $scope.customers;
        } else {
            angular.forEach($scope.customers, function (customer, key) {
                if (customer.name != null) {
                    var customer_name = customer.name.toLowerCase();
                    if (customer_name.indexOf(search_query.toLowerCase()) > -1) {
                        search_result.push(customer);
                    }
                }
            });
            $scope.filtered_customers = search_result;
        }

        if ($scope.filtered_customers != undefined)
            $scope.totalItems = $scope.filtered_customers.length;

        $("#circle-loader").hide();
    };

    $scope.sites_search = function (search_query) {
        $("#circle-loader").show();
        var search_result = [];
        if (search_query == '*') {
            $scope.filtered_sites = $scope.user_sites;
        } else {
            angular.forEach($scope.user_sites, function (site, key) {
                if (site.name != null) {
                    var site_name = site.name.toLowerCase();
                    if (site_name.indexOf(search_query.toLowerCase()) > -1) {
                        search_result.push(site);
                    }
                }
            });
            $scope.filtered_sites = search_result;
        }

        if ($scope.filtered_sites != undefined)
            $scope.totalItems = $scope.filtered_sites.length;

        $("#circle-loader").hide();
    };

    $scope.$watch('model.users_search', function (newValue, oldValue) {
        if (newValue == '') {
            newValue = '*';
            $scope.user_search(newValue);
        } else {
            $scope.user_search(newValue);
        }
    });

    $scope.$watch('model.customers_search', function (newValue, oldValue) {
        if (newValue == '') {
            newValue = '*';
            $scope.customer_search(newValue);
        } else {
            $scope.customer_search(newValue);
        }
    });

    $scope.$watch('model.sites_search', function (newValue, oldValue) {
        if (newValue == '') {
            newValue = '*';
            $scope.sites_search(newValue);
        } else {
            $scope.sites_search(newValue);
        }
    });

    $scope.advanced_search = function () {
        var search_result = [];
        var selected_country_code = $(".country.highlight.active").attr("data-country-code") == undefined ? 'US' : $(".country.highlight.active").attr("data-country-code").toUpperCase();

        if ($scope.model.name == '' && $scope.model.email == '' && $scope.model.mobile_number == '') {
            angular.forEach($scope.all_users, function (user, key) {
                var user_country_code = user.country_code;
                if ((user_country_code == selected_country_code)) {
                    search_result.push(user);
                }
            });
        } else {
            angular.forEach($scope.all_users, function (user, key) {
                var user_name = user.name.toLowerCase();
                var email = user.email.toLowerCase();
                var mobile_number = user.mobile_number;
                var user_country_code = user.country_code;
                var mobile_number_valid = "";
                var name_valid = "";
                var email_valid = "";

                if (user_name == null || $scope.model.name == "") {
                    name_valid = true;
                } else {
                    name_valid = (user_name.indexOf($scope.model.name.toLowerCase()) > -1);
                }

                if (email == null || $scope.model.email == "") {
                    email_valid = true;
                } else {
                    email_valid = (email.indexOf($scope.model.email.toLowerCase()) > -1);
                }

                if (mobile_number == null || $scope.model.mobile_number == "") {
                    mobile_number_valid = true;
                } else {
                    mobile_number_valid = (mobile_number.indexOf($scope.model.mobile_number.toLowerCase()) > -1);
                }


                if (name_valid && email_valid && mobile_number_valid && (user_country_code == selected_country_code)) {
                    search_result.push(user);
                }
            });
        }

        $timeout(function () {
            $scope.filtered_users = search_result;
        }, 1);
    };

    function get_all_user_data() {
        //console.log("get_all_user_data . . . . .");
        $http.get($APIs_server + "api/users-for-view", {
            headers: {
                'Authorization': JWT_token
            }
        }).then(function (response) {
            // console.log("response.data: ", response.data);
            $("#circle-loader").hide();
            $scope.filtered_users = eval(response.data.users_with_avatar);
            $scope.users_ids_in_teams = eval(response.data.users_in_teams);
            $scope.users = eval(response.data.users_with_avatar);
            $scope.totalItems = $scope.filtered_users.length;
            $scope.all_users = eval(response.data.users_with_avatar);
            if ($scope.users == undefined)
                $scope.users = [];

            //console.log($scope.users);
            try {
                com.trackware.UsersManager.instance.setUsers($scope.users);
            } catch (e) {
            }

        });
    }

    $scope.get_node_users = function (node_id) {
        $http.get($APIs_server + "api/get-node-users/" + node_id, {
            headers: {
                'Authorization': JWT_token
            }
        }).then(function (response) {
            $scope.node_users_tags = response.data;
            //$scope.users = eval(response.data.users_with_avatar);
        });
    };

    $scope.get_all_users = function () {
        if ($scope.filtered_users == undefined) {
            get_all_user_data();
        } else if ($scope.filtered_users.length == 0) {
            get_all_user_data();
        }
    };

    /*
     * collect team users from users_ids_in_teams array
     * without recall it from the server
     * */

    $scope.users_of_team = function (team_id) {

        for (var i = 0; i < $scope.users_ids_in_teams.length; i++) {
            if ($scope.users_ids_in_teams[i]["id"] == team_id) {
                var team_users = [];
                // loop for all team users_ids
                for (var j = 0; j < $scope.users_ids_in_teams[i]["users_ids"].length; j++) {
                    for (var k = 0; k < $scope.filtered_users.length; k++) {
                        if ($scope.filtered_users[k]["id"] == $scope.users_ids_in_teams[i]["users_ids"][j]["id"]) {

                            team_users.push($scope.filtered_users[k]);
                            break;
                        }
                    }
                }

                break;
            }
        }
        return team_users;
    };

    $scope.update_customer_users = function (customer_id) {

        $http.post($APIs_server + "api/update-node-users/" + customer_id, $scope.node_users_tags, {
            headers: {
                'Authorization': JWT_token
            }
        }).success(function (data, status) {
            Notification.success("Saved");
        }).error(function (data, status) {
            Notification.error({message: 'Ops! something went wrong', delay: null});
        });

    };

    $scope.update_site_users = function (site_id) {

        $http.post($APIs_server + "api/update-node-users/" + site_id, $scope.node_users_tags, {
            headers: {
                'Authorization': JWT_token
            }
        }).success(function (data, status) {
            Notification.success("Saved");
        }).error(function (data, status) {
            Notification.error({message: 'Ops! somthing whent worng', delay: null});
        });

    };

    $scope.get_users_of_teams = function () {
        // console.log($rootScope.teamsCtrlScope.teams);
        for (var i = 0; i < $rootScope.teamsCtrlScope.teams.length; i++) {

            var team_scope = $("#" + $rootScope.teamsCtrlScope.teams[i]['id']).scope();
            team_scope.get_users();
        }
    };

    /*
     called when team-menu-item is clicked
     */
    $scope.get_team_users = function (team_scope, set_nodes = false) {
        if (team_scope.users.length == 0) {

            $("#circle-loader").show();
            $http.get($APIs_server + "api/team-users-for-view/" + team_scope.id, {
                headers: {
                    'Authorization': JWT_token
                }
            }).then(function (response) {
                // console.log("response.data: ", response.data);
                /*if ($scope.filtered_users == undefined) {
                 get_all_user_data();
                 } else if ($scope.filtered_users.length == 0) {
                 get_all_user_data();
                 }*/
                team_scope.users = eval(response.data);

                //Call this function only in the map to set the users in the map
                if (set_nodes)
                    com.trackware.UsersManager.instance.setUsers(team_scope.users);
            });
        }
    };

    $scope.get_user_nodes = function (user_id) {
        $("#circle-loader").show();
        $http.get($APIs_server + "api/get-user-nodes/" + user_id + "/customer", {
            headers: {
                'Authorization': JWT_token
            }
        }).then(function (response) {
            $("#circle-loader").hide();
            $scope.customers = eval(response.data);
            $scope.filtered_customers = eval(response.data);
            $scope.totalItems = $scope.filtered_customers.length;
            try {
                com.trackware.NodesManager.instance.setNodes(user_id, response.data, '#00aaAA');
            } catch (e) {
                //console.log(e);
            }
        });

    };

    $scope.get_user_sites = function (user_id) {

        $("#circle-loader").show();
        $http.get($APIs_server + "api/get-user-nodes/" + user_id + "/site", {
            headers: {
                'Authorization': JWT_token
            }
        }).then(function (response) {
            $("#circle-loader").hide();
            $scope.user_sites = eval(response.data);
            $scope.filtered_sites = eval(response.data);
            $scope.totalItems = $scope.user_sites.length;
            try {
                com.trackware.NodesManager.instance.setNodes(user_id, response.data, '#00aaAA');
            } catch (e) {
                //console.log(e);
            }
        });

    };


    $scope.send_invitation = function ($event) {
        $event.preventDefault();
        var name = $('#invited_user_name').val();
        var email = $('#invited_user_email').val();
        var mobile_number = $('#invited_user_mobile_number').val();
        var initial_team_id = $('#invited_user_ini_team').val();
        var data = [];
        data['name'] = name;
        data['email'] = email;
        data['mobile_number'] = mobile_number;
        data['initial_team_id'] = initial_team_id;

        $http.post($APIs_server + "api/create-invitation", data, {
            headers: {
                'Authorization': JWT_token
            }
        }).success(function (data1, status) {
            //console.log(data1)
        })
    };

    $scope.confirmDeleteUser = function (user_id, user_name, team_id, team_name, remove_user_permanently, delete_btn_delimiter) {

        // send data to be used in the Modal
        $(delete_btn_delimiter + user_id + "-btn").attr("data-toggle", "modal");
        $(delete_btn_delimiter + user_id + "-btn").attr("data-target", "#confirmDeleteUserModal");
        $(delete_btn_delimiter + user_id + "-btn").attr("data-remove-user-permanently", remove_user_permanently);
        $(delete_btn_delimiter + user_id + "-btn").attr("data-user-id", user_id);
        $(delete_btn_delimiter + user_id + "-btn").attr("data-user-name", user_name);

        // check if the process is detach user from team OR delete user
        if (team_id != undefined && team_name != undefined) {
            $(delete_btn_delimiter + user_id + "-btn").attr("data-team-id", team_id);
            $(delete_btn_delimiter + user_id + "-btn").attr("data-team-name", team_name);
        }
    };
}]);