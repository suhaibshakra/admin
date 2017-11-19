/**
 * Created by samir on 9/18/2016.
 */
usersApp.directive('cardCvv', function ($browser) {
    return {
        require: 'ngModel',
        link: function($scope, $element, $attrs, ngModelCtrl) {

            var formatter = function() {
                $element.val($element.val().replace(/[^\d]+/g,'').slice(0,3));
            };

            ngModelCtrl.$parsers.push(function(viewValue) {
                viewValue = viewValue.replace(/[^\d]+/g,'');

                if(viewValue.length < 3){
                    ngModelCtrl.$setValidity('cvv_length', false);
                }else{
                    ngModelCtrl.$setValidity('cvv_length', true);
                }

                return viewValue.slice(0,3);
            });

            ngModelCtrl.$render = function() {
                formatter();
            };

            $element.bind('change', formatter);

            $element.bind('keydown', function(event) {
                var key = event.keyCode;
                if (key == 91 || (15 < key && key < 19) || (37 <= key && key <= 40)){
                    return;
                }

                $browser.defer(formatter);
            });

            $element.bind('paste cut', function() {
                $browser.defer(formatter);
            });
        }
    };
});