/**
 * Created by samir on 9/18/2016.
 */
usersApp.directive('cardNumber', function ($browser) {
    return {
        require: 'ngModel',
        link: function ($scope, $element, $attrs, ngModelCtrl) {

            var formatter = function () {
                var chunks = $element.val().replace(/[^\d]+/g, '').match(/\d{1,4}/g);
                if (chunks) {
                    $element.val(chunks.join(' ').slice(0, 19));
                } else {
                    $element.val('');
                }
            };

            ngModelCtrl.$parsers.push(function (viewValue) {

                viewValue = viewValue.replace(/[^\d]+/g, '').slice(0, 16);

                if (viewValue.charAt(0) != 4 && viewValue.charAt(0) != 5 && viewValue) {
                    ngModelCtrl.$setValidity('first_char', false);
                } else {
                    ngModelCtrl.$setValidity('first_char', true);
                }

                if (viewValue.length < 16) {
                    ngModelCtrl.$setValidity('card_length', false);
                } else {
                    ngModelCtrl.$setValidity('card_length', true);
                }

                return viewValue;
            });

            ngModelCtrl.$render = function () {
                formatter();
            };

            $element.bind('change', formatter);

            $element.bind('keydown', function (event) {
                var key = event.keyCode;
                if (key == 91 || (15 < key && key < 19) || (37 <= key && key <= 40)) {
                    return;
                }
                $browser.defer(formatter);
            });

            $element.bind('paste cut', function () {
                $browser.defer(formatter);
            });

        }
    };
});