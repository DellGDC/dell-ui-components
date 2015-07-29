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


                $(document).ready(function() {
                    var table = $('#table-fixed').DataTable({
                        "pagingType": "simple",
                        "language": {
                            "paginate": {
                                "next": "Next&nbsp;<span aria-hidden=\"true\" class=\"icon-ui-arrowright\"><\/span>",
                                "previous": "<span aria-hidden=\"true\" class=\"icon-ui-arrowleft\"><\/span>&nbsp;Previous"
                            }

                        },
                        //"scrollY": "300px",
                        //"scrollX": "100%",
                        //"scrollCollapse": true,
                        //"paging": false
                    });
                    new $.fn.dataTable.FixedHeader( table );
                });



            }
        };
    });




