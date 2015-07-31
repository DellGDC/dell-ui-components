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

    .directive('tableFixedHeader', function($timeout){
        // Runs during compile
        return {
            restrict: 'C',
            link: function($scope, $element, iAttrs, controller ) {

                $(document).ready(function() {

                    var table = $('.table-sort').DataTable({
                        "pagingType": "simple",
                        "language": {
                            "paginate": {
                                "next": "Next&nbsp;<span aria-hidden=\"true\" class=\"icon-ui-arrowright\"><\/span>",
                                "previous": "<span aria-hidden=\"true\" class=\"icon-ui-arrowleft\"><\/span>&nbsp;Previous"
                            }

                        }
                    });
                    new $.fn.dataTable.FixedHeader( table );

                });

            }
        };
    })

    .directive('tableFixedColumn', function($timeout){
        // Runs during compile
        return {
            restrict: 'C',
            link: function($scope, $element, iAttrs, controller ) {


                $(document).ready(function() {
                    var table = $('.table-column').DataTable({
                        scrollY:        "300px",
                        scrollX:        true,
                        scrollCollapse: true,
                        paging:         false
                    });
                    new $.fn.dataTable.FixedColumns( table );
                });


            }
        };
    })

    .directive('responsiveDataTable', function($timeout){
        // Runs during compile
        return {
            restrict: 'C',
            link: function($scope, $element, iAttrs, controller ) {


                $(document).ready(function() {
                    var table = $('#example-rdt').DataTable( {
                        "scrollY": "200px",
                        "paging": false
                    } );

                    $('a.toggle-vis').on( 'click', function (e) {
                        e.preventDefault();

                        // Get the column API object
                        var column = table.column( $(this).attr('data-column') );

                        // Toggle the visibility
                        column.visible( ! column.visible() );
                    });
                });


                //$(document).ready(function() {
                //
                //    $('#example-rdt').DataTable({
                //        responsive: {
                //            details: {
                //                type: 'column'
                //            }
                //        },
                //        "pagingType": "simple",
                //        "language": {
                //            "paginate": {
                //                "next": "Next&nbsp;<span aria-hidden=\"true\" class=\"icon-ui-arrowright\"><\/span>",
                //                "previous": "<span aria-hidden=\"true\" class=\"icon-ui-arrowleft\"><\/span>&nbsp;Previous"
                //            }
                //        },
                //        columnDefs: [ {
                //            className: 'control',
                //            orderable: false,
                //            targets:   0
                //        } ],
                //        order: [ 1, 'asc' ]
                //
                //    });
                //});
            }
        };
    });


