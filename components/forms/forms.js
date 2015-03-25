/**
 * Created by Clint_Batte on 3/24/2015.
 */
angular.module('dellUiComponents')

.directive('listTree', function () {
    return {
        restrict: 'C',
        link: function ($scope, $element, $attr) {
            $element.find('.checkbox input').on('click', function(){
                if($(this).is(':checked')) {
                    $(this).parent().addClass('open');
                } else {
                    $(this).parent().removeClass('open');
                }
            });
        }
    };
});
