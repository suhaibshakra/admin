/**
 * Created by Mohammad on 5/17/2016.
 */

dashboardApp.controller('dashboardCtrl', ['$scope', '$http', function ($scope, $http) {

    // For the bar chart
    $scope.labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    $scope.series = ['Series A'];
    $scope.colors =  ['#048396','#048396','#048396','#048396','#048396','#048396','#048396','#048396','#048396','#048396','#048396','#048396'];
    $scope.last_day_visits=0;
    $scope.this_day_visits = 0;
    $scope.last_month_visits=0;
    $scope.this_month_visits=0;
    $scope.avg_time=0;
    $scope.now_visits = 0;
    $scope.now_visits_name=[];
    $scope.now_customer_name=[];
    $scope.time_checked_in_at=[];
    $scope.time_from_checked_in=[];
    var current_year_data = false;

        $scope.get_all_visits_of_year = function (year_inc= 0) {

                  if (year_inc == 0){
                        year=moment().format("YYYY");
                  }else if(year_inc == 1 || year_inc == -1){

                         if (year == undefined){
                            year=moment().format("YYYY");
                                  }
                         else if (year_inc == 1) {
                                   year=moment(year).add(1, 'years');
                                   year=moment(year).format("YYYY");
                         }else if(year_inc == -1){
                                   year=moment(year).subtract(1, 'years');
                                   year=moment(year).format("YYYY");
                       }

                  }
      $scope.choice_year=year;
      $http.get($APIs_server + "api/get-visits-data/"+ year, {
           headers: {
               'Authorization': JWT_token
           }
       }).then(function (response) {

           var jan = 0;
           var feb = 0;
           var mar = 0;
           var apr = 0;
           var may = 0;
           var june = 0;
           var july = 0;
           var aug = 0;
           var sep = 0;
           var oct = 0;
           var nov = 0;
           var dec = 0;

           $scope.monthly_visits = [
               jan, feb, mar, apr, may, june, july, aug, sep, oct, nov, dec
           ];

           $scope.all_visits_count = response.data.length;

           angular.forEach(response.data, function (visit, key) {
                var visit_Year=moment(visit.checked_in_at).format("YYYY");
                var visit_day = moment(visit.checked_in_at).format("DD");
                var visit_month = moment(visit.checked_in_at).format("MM");
                var current_year = moment().format("YYYY");
                var current_day = moment().format("DD");
                var current_month = moment().format("MM");
                var time_in = new Date(visit.checked_in_at).getTime();
                var time_out = new Date(visit.checked_out_at).getTime();

                //Here we set calculate the visits of each month
                if($scope.choice_year ==  visit_Year ){

                     $scope.monthly_visits[visit_month - 1] += 1;
                }
                if(current_year == $scope.choice_year && current_year_data == false){

                     if (time_out == 0  ) {

                         $scope.now_visits++;
                         $scope.now_visits_name.push(visit.user_name);
                         $scope.now_customer_name.push(visit.customer_name);
                         $scope.time_checked_in_at.push(moment(visit.checked_in_at).format("HH:mm:ss"));
                         $scope.time_from_checked_in.push(moment(visit.checked_in_at).fromNow());

                    }
                    //We will get this day visits
                    if (visit_day ==  current_day && current_month == visit_month && current_year == visit_Year) {
                        $scope.this_day_visits++;
                    }
                    var last_day = moment().subtract(1, 'day').format("DD");
                    if (visit_day ==  last_day && current_month == visit_month && current_year == visit_Year) {
                        $scope.last_day_visits++;
                    }
                    if($scope.last_day_visits > $scope.this_day_visits){
                        document.getElementById("color_today").className = "red";
                        document.getElementById("arrow_today").className = "glyphicon glyphicon-triangle-bottom";
                    }
                    $scope.from_last_day= Math.abs(($scope.this_day_visits - $scope.last_day_visits)*100);

                    //We will get Average visits time
                    if ( time_out !== 0  && visit_day ==  current_day && current_month == visit_month && current_year == visit_Year) {

                            time = (((time_out - time_in)/ 60000) / 60) / $scope.this_day_visits ;
                            $scope.avg_time=time.toFixed(2);

                       }
                       var  now_month = new Date().getMonth();
                       $scope.this_month_visits = $scope.monthly_visits[now_month];
                       $scope.last_month_visits = $scope.monthly_visits[now_month-1];
                       $scope.from_last_month= Math.abs(($scope.monthly_visits[now_month] - $scope.monthly_visits[now_month-1])*100);
                       if($scope.last_month_visits > $scope.this_month_visits){
                           document.getElementById("color_month").className = "red";
                           document.getElementById("arrow_month").className = "glyphicon glyphicon-triangle-bottom";
                       }
                  }










           });

                    current_year_data = true;
       });
   };
    $scope.get_all_node = function (user_id) {
         $scope.customers_last_7days = 0;
         $scope.customers_from_last_week = 0;
         $scope.from_last_week_customers  = 0;
        $http.get($APIs_server + "api/get-user-nodes/" + user_id + "/customer", {
            headers: {
                'Authorization': JWT_token
            }
        }).then(function (res) {


            angular.forEach(res.data, function (nodes, key) {

                var from_last_week = moment().subtract(14, 'day').format("MM-DD-YYYY");
                var last_7days = moment().subtract(7, 'day').format("MM-DD-YYYY");
                var node_date= moment(nodes.created_at).format("MM-DD-YYYY");

                if(node_date >=  last_7days){
                              $scope.customers_last_7days++;
                }else if (node_date >=  from_last_week) {
                          $scope.customers_from_last_week++;
                }

                $scope.from_last_week_customers  = Math.abs(($scope.customers_last_7days - $scope.customers_from_last_week) * 100);
                if($scope.customers_from_last_week > $scope.customers_last_7days){
                    document.getElementById("color_customer").className = "red";
                    document.getElementById("arrow_customer").className = "glyphicon glyphicon-triangle-bottom";
                }

            });
        });
    };

    $scope.get_all_site = function (user_id) {
         $scope.from_last_week_site=0;
         $scope.site_last_7days = 0;
         $scope.site_from_last_week = 0;
        $http.get($APIs_server + "api/get-user-nodes/" + user_id + "/site", {
            headers: {
                'Authorization': JWT_token
            }
        }).then(function (res) {
            $scope.all_site = res.data.length;

            angular.forEach(res.data, function (nodes, key) {

                 var from_last_week = moment().subtract(14, 'day').format("MM-DD-YYYY");
                 var last_7days = moment().subtract(7, 'day').format("MM-DD-YYYY");
                 var site_date = moment(nodes.created_at).format("MM-DD-YYYY");

                 if(site_date >=  last_7days){
                           $scope.site_last_7days++;
                 }else if (site_date >=  from_last_week) {
                           $scope.site_from_last_week++;
                 }

                 $scope.from_last_week_site = Math.abs(($scope.site_last_7days - $scope.site_from_last_week) * 100);
                 if($scope.site_from_last_week > $scope.site_last_7days){
                     document.getElementById("color_site").className = "red";
                     document.getElementById("arrow_site").className = "glyphicon glyphicon-triangle-bottom";
                 }



            });
        });
    };

  }]);
