angular.module('dellUiComponents').directive('alertCollapsible', function () {
    return {
        restrict: 'C',
        link: function ($scope, $element, $attrs) {
            //toggle x
            $element.find('.close').on('click',function(){
                $(event.currentTarget).parent().addClass('collapsed');
            });
            $element.find('> .show-collapsed').on('click',function(){
                $(event.currentTarget).parent().removeClass('collapsed');
            });
        }
    };
})