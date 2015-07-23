/**
 * Created by Clint_Batte on 7/14/2015.
 */


/* ======================================================================================
 * Dell-UI-Components: tables.js
 * http://www.delldesignlibrary.com/components/tables/
 * ======================================================================================
 * Copyright 2015 Dell, Inc.
 * Licensed under MIT (https://github.com/DellGDC/dell-ui-components/blob/master/LICENSE)
 * ======================================================================================
 */

angular.module('dellUiComponents')

    .directive('tableSort', function($timeout){
        // Runs during compile
        // requires bower_components/slick-1.5.0/slick/slick.js which is bundled in dell-ui-components.js
        return {
            restrict: 'C',
            link: function($scope, $element, iAttrs, controller ) {

                $(function(){
                    $("#myTable").tablesorter();
                });

            }
        };
    });




