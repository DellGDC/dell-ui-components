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
})

.directive('showPassword', function() {

    /* TODO Can't really use a message here because dellUiBootstrap is production directive so content will have to be in the UI code */

    //var template = '<div ng-transclude></div><label class="checkbox">' +
    //    '<input type="checkbox" id="optionsCheckbox" value="option1" ng-model="showPassword" ng-click="togglePassword()">' +
    //    '<span ng-if="!showPassword">{{text_show_password}}</span>' +
    //    '<span ng-if="showPassword">{{text_hide_password}}</span>' +
    //    '</label>';
    return {
        scope: true, // {} = isolate, true = child, false/undefined = no change
        controller: function($scope, $element, $attrs, $transclude, utils, $locale) {
            utils.getJSON("data/messages_en.json", function(data) {
                $scope.text_show_password = data.text_show_password;
                $scope.text_hide_password = data.text_hide_password;
            });
        },
        restrict: 'C', // E = Element, A = Attribute, C = Class, M = Comment
        template: template,
        replace: false,
        transclude: true,
        link: function($scope, $element, $attrs, controller) {
            $scope.togglePassword = function() {
                $scope.showPassword = !$scope.showPassword;
                if ($scope.showPassword) {
                    $($element).find('input[type=password]').attr('type', 'text');
                } else {
                    $($element).find('input[type=text]').attr('type', 'password');
                }
            };
        }
    };
})

    .directive('phoneNumber', function() {
        // Runs during compile
        return {
            restrict: 'C', // E = Element, A = Attribute, C = Class, M = Comment
            link: function($scope, element, attributes, controller) {
                //requires https://raw.githubusercontent.com/RobinHerbots/jquery.inputmask/3.x/dist/jquery.inputmask.bundle.min.js
                //TODO use $locale to create mask
                if ($(element).is('input')) {
                    $(element).attr('data-inputmask', "'mask': '(999)-999-9999'");
                    $(element).inputmask();
                }
            }
        };
    })


    .directive('phoneExtension', function() {
        return {
            restrict: 'C', // E = Element, A = Attribute, C = Class, M = Comment
            link: function($scope, element, attributes, controller) {

                if ($(element).is('input')) {
                    $(element).attr('data-inputmask', "'mask': 'ext: (9999)'");
                    $(element).inputmask();
                }
            }
        };
    })



.directive('spinbox', function() {
    // Inject html code
    $( ".spinbox" ).each(function( index ) {

        var el = $( this );

        if(el.data("orient")==="vertical"){
            $(el).addClass("dpui-numberPicker spinbox-vert").html("<button class='spinbox-increase'>"+el.data("spinincrease")+"</button><input type='text' class='spinbox-input spinbox-input-vert' style='border-top: 0px solid #cfcfcf; border-bottom: 0px solid #cfcfcf;' value='"+el.data("spindefault")+"' name='"+el.data("spinname")+"'/><button class='spinbox-decrease'>"+el.data("spindecrease")+"</button>");
        } else {
            $(el).addClass("dpui-numberPicker").html("<button class='spinbox-decrease'>"+el.data("spindecrease")+"</button><input type='text' class='spinbox-input' style='border-left: 0px solid #cfcfcf; border-right: 0px solid #cfcfcf;' value='"+el.data("spindefault")+"' name='"+el.data("spinname")+"'/><button class='spinbox-increase'>"+el.data("spinincrease")+"</button>");
        }

    });

    // Increase Button code
    $( ".spinbox-increase" ).click(function() {
        var em = $( this );
        if(em.parent().data("orient")==="vertical" &&
            parseInt($(this).siblings('input').val()) < em.parent().data("spinmax")){
            $( em ).next().val( parseInt($( em ).next().val()) + em.parent().data("spinstep") );
        } else if(parseInt($(this).siblings('input').val()) < em.parent().data("spinmax")){
            $( em ).prev().val( parseInt($( em ).prev().val()) + em.parent().data("spinstep") );
        }
    });

    // Decrease Button code
    $( ".spinbox-decrease" ).click(function() {
        var el = $( this );
        if(el.parent().data("orient")==="vertical" &&
            parseInt($(this).siblings('input').val()) > el.parent().data("spinmin")){
            $( el ).prev().val( parseInt($( el ).prev().val()) - el.parent().data("spinstep") );
        } else if(parseInt($(this).siblings('input').val()) > el.parent().data("spinmin")){
            $( el ).next().val( parseInt($( el ).next().val()) - el.parent().data("spinstep") );
        }
    });

    // Checks to see if the manual input is outside the range of the min-max and changes it to bring it back in range.
    $( ".spinbox-input" ).blur(function() {
        var em = $( this );
        if(parseInt($(this).val()) > em.parent().data("spinmax")){
            $(this).val( em.parent().data("spinmax") );
        } else if(parseInt($(this).val()) < em.parent().data("spinmin")){
            $(this).val( em.parent().data("spinmin") );
        }
    });

    // Limits keyboard input to alphanumeric
    $(document).ready(function() {
        $('.spinbox-input').keypress(function(key) {
            if(key.charCode < 48 || key.charCode > 57) {
                return false;
            }
        });
    });
});
