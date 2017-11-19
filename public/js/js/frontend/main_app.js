/**
 * Created by samir on 4/18/2016.
 */
// var trackwareApp = angular.module('trackwareApp', ['angular-location-picker']);

var mainApp = angular.module('mainApp', ['ngTagsInput', 'yaru22.angular-timeago', 'chart.js', 'ui-notification', 'NgSwitchery', 'daterangepicker']);

mainApp.controller('notificationsCtrl', ['$scope', '$http', function ($scope, $http, timeAgo, nowTime) {

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

mainApp.config(function (tagsInputConfigProvider) {
    tagsInputConfigProvider
        .setDefaults('tagsInput', {
            addFromAutocompleteOnly: true
        })
        .setDefaults('autoComplete', {
            debounceDelay: 200,
            loadOnDownArrow: true,
            loadOnEmpty: true
        })
});
//AngularJs directive for telephone numbers
mainApp.directive('numbersOnly', function () {
    return {
        require: 'ngModel',
        link: function (scope, element, attr, ngModelCtrl) {
            function fromUser(text) {
                if (text) {
                    var transformedInput = text.replace(/[^0-9]/g, '');

                    if (transformedInput !== text) {
                        ngModelCtrl.$setViewValue(transformedInput);
                        ngModelCtrl.$render();
                    }
                    return transformedInput;
                }
                return undefined;
            }

            ngModelCtrl.$parsers.push(fromUser);
        }
    };
});
mainApp.directive("ngFileSelect", function (fileReader, $timeout) {
    return {
        scope: {
            ngModel: '='
        },
        link: function ($scope, el) {
            function getFile(file) {
                fileReader.readAsDataUrl(file, $scope)
                    .then(function (result) {
                        $timeout(function () {
                            $scope.ngModel = result;
                        });
                    });
            }

            el.bind("change", function (e) {
                var file = (e.srcElement || e.target).files[0];
                getFile(file);
            });
        }
    };
});
mainApp.factory("fileReader", function ($q, $log) {
    var onLoad = function (reader, deferred, scope) {
        return function () {
            scope.$apply(function () {
                deferred.resolve(reader.result);
            });
        };
    };

    var onError = function (reader, deferred, scope) {
        return function () {
            scope.$apply(function () {
                deferred.reject(reader.result);
            });
        };
    };

    var onProgress = function (reader, scope) {
        return function (event) {
            scope.$broadcast("fileProgress", {
                total: event.total,
                loaded: event.loaded
            });
        };
    };

    var getReader = function (deferred, scope) {
        var reader = new FileReader();
        reader.onload = onLoad(reader, deferred, scope);
        reader.onerror = onError(reader, deferred, scope);
        reader.onprogress = onProgress(reader, scope);
        return reader;
    };

    var readAsDataURL = function (file, scope) {
        var deferred = $q.defer();

        var reader = getReader(deferred, scope);
        reader.readAsDataURL(file);

        return deferred.promise;
    };

    return {
        readAsDataUrl: readAsDataURL
    };
});
mainApp.filter('ampmtime', function () {
    return function (input) {
        var full_time = input.split(" ")[1];
        var hours = full_time.split(":")[0];
        var minutes = full_time.split(":")[1];
        var ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'
        minutes = minutes < 10 ? '0' + minutes : minutes;
        return hours + ':' + minutes + ' ' + ampm;
    }
});
