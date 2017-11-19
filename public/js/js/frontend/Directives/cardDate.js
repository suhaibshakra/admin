/**
 * Created by samir on 9/18/2016.
 */
usersApp.directive('cardDate', function ($browser) {
    return {
        require: 'ngModel',
        link: function ($scope, $element, $attrs, ngModelCtrl) {

            var formatter = function () {

                var chunks = $element.val().replace(/[^\d]+/g, '').match(/\d{1,2}/g);

                if (chunks) {
                    $element.val(chunks.join(' / ').slice(0, 7));
                } else {
                    $element.val('');
                }
            };

            ngModelCtrl.$parsers.push(function (viewValue) {

                viewValue = viewValue.replace(/[^\d]+/g, '');

                var chunks = viewValue.match(/\d{1,2}/g);

                if (chunks[0] > 12 || chunks[0] == '00') {
                    ngModelCtrl.$setValidity('date', false);
                } else {
                    ngModelCtrl.$setValidity('date', true);
                }

                if (viewValue.length < 4) {
                    ngModelCtrl.$setValidity('date_length', false);
                } else {
                    ngModelCtrl.$setValidity('date_length', true);
                }

                return chunks.join(' / ').slice(0, 7);
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