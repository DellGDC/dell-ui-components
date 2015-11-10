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



                    var table = $('.table-column').DataTable({
                        scrollY:        "300px",
                        scrollX:        true,
                        scrollCollapse: true,
                        paging:         false
                    });

                    //change the position of the sorting toggle arrows
                    table.columns().iterator( 'column', function (ctx, idx) {
                        $( table.column(idx).header() ).append('<span class="sort-icon"/>');
                    });
                        new $.fn.dataTable.FixedColumns( table );


            }
        };
    })

    .directive('responsiveDataTable', function($timeout){
        // Runs during compile
        return {
            restrict: 'C',
            link: function($scope, $element, iAttrs, controller ) {

                    var table = $('table.responsive-data-table').DataTable( {
                        dom: 'C<"clear">lfrtip',
                        displayLength: 5,
                        paging: false,
                        scrollY:"300px",
                        scrollX: true
                    });

                    //change the position of the sorting toggle arrows
                    table.columns().iterator( 'column', function (ctx, idx) {
                        $( table.column(idx).header() ).append('<span class="sort-icon"/>');
                    });
            }
        };
    })


    .directive('tableComplex', function($timeout){
        // Runs during compile
        return {
            restrict: 'C',
            link: function($scope, $element, iAttrs, controller ) {

                /* Formatting function for row details - modify as you need */
                function format ( d ) {
                    // `d` is the original data object for the row
                    return '<table cellpadding="5" cellspacing="0" border="0" style="padding-left:50px;">'+
                        '<tr>'+
                        '<td>Full name:</td>'+
                        '<td>'+d.name+'</td>'+
                        '</tr>'+
                        '<tr>'+
                        '<td>Extension number:</td>'+
                        '<td>'+d.extn+'</td>'+
                        '</tr>'+
                        '<tr>'+
                        '<td>Extra info:</td>'+
                        '<td>And any further details here (images etc)...</td>'+
                        '</tr>'+
                        '</table>';
                }

                    var table = $('table.table-complex').DataTable( {
                        "ajax": "../components/tables/data.json",
                        "columns": [
                            {
                                "className":      'details-control',
                                "orderable":      false,
                                "data":           null,
                                "defaultContent": ''
                            },
                            { "data": "name" },
                            { "data": "position" },
                            { "data": "office" },
                            { "data": "salary" }
                        ],
                        "order": [[1, 'asc']],
                        dom: 'C<"clear">lfrtip',
                        displayLength: 5,
                        paging: false,
                        scrollY:"300px",
                        scrollX: true
                    });

                    //change the position of the sorting toggle arrows
                    table.columns().iterator( 'column', function (ctx, idx) {
                        $( table.column(idx).header() ).append('<span class="sort-icon"/>');
                    });

                    // Add event listener for opening and closing details
                    $('.table-complex tbody').on('click', 'td.details-control', function () {
                        var tr = $(this).closest('tr');
                        var row = table.row( tr );

                        if ( row.child.isShown() ) {
                            // This row is already open - close it
                            row.child.hide();
                            tr.removeClass('shown');
                        }
                        else {
                            // Open this row
                            row.child( format(row.data()) ).show();
                            tr.addClass('shown');
                        }
                    });
            }
        };
    })


    .directive('responsiveDataItem', function($timeout){
        // Runs during compile
        return {
            restrict: 'C',
            link: function($scope, $element, iAttrs, controller ) {

                $(document).ready(function() {
                    $('table.responsive-data-table').DataTable( {
                        dom: 'C<"clear">lfrtip',
                        displayLength: 5,
                        paging: false,
                        scrollY:"300px",
                        scrollX: true
                    });
                });

            }
        };
    });








