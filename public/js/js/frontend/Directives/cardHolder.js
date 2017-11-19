/**
 * Created by samir on 9/18/2016.
 */
usersApp.directive('cardHolder', function ($browser) {
    return {
        require: 'ngModel',
        link: function ($scope, $element, $attrs, ngModelCtrl) {

            var capitalize = function (inputValue) {

                if (inputValue == undefined) inputValue = '';

                if (inputValue.search(/[^a-zA-Z\s]+/) === -1) {
                    ngModelCtrl.$setValidity('only_latin', true);
                } else {
                    ngModelCtrl.$setValidity('only_latin', false);
                }

                var capitalized = inputValue.toUpperCase();
                if (capitalized !== inputValue) {
                    ngModelCtrl.$setViewValue(capitalized);
                    ngModelCtrl.$render();
                }

                return capitalized;
            };

            ngModelCtrl.$parsers.push(capitalize);

            capitalize($scope[$attrs.ngModel]);

        }
    };
});