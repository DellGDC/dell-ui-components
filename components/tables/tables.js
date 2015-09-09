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
    })

    .directive('tableResponsiveColumns', function($timeout){
        // Runs during compile
        return {
            restrict: 'C',
            link: function($scope, $element, iAttrs, controller ) {


                    var Data = [{
                        id: 'a',
                        company_name: 'Boeing Aerospace',
                        solution_name: 'Server Rack Bo245 ',
                        solution_id: '1234567825',
                        owner: 'Michael Kirk',
                        last_edited: '03/15/15  14:28',
                        list_price: '$3,657.95',
                        version_creator: '10',
                        customer_number: '234517',
                        reference_number: '13598',
                        quote_number: '342123'
                    }, {
                        id: 'b',
                        company_name: 'General Motors',
                        solution_name: 'Server Rack AsS9840 ',
                        solution_id: '1234567825',
                        owner: 'Tim Donnell',
                        last_edited: '05/02/15  12:34',
                        list_price: '$5,667.95',
                        version_creator: '10',
                        customer_number: '33242545',
                        reference_number: '224567',
                        quote_number: '200291'
                    }, {
                        id: 'c',
                        company_name: 'Home Depot',
                        solution_name: 'Server Rack Def345 ',
                        solution_id: '1234567825',
                        owner: 'Sharron McCaw',
                        last_edited: '01/04/15  10:24',
                        list_price: '$12,667.95',
                        version_creator: '6',
                        customer_number: '133567872',
                        reference_number: '579432',
                        quote_number: '721113'
                    }];

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

                    var table = $('table.table-responsive-columns').DataTable( {
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

                    // Add event listener for opening and closing details
                    $('.table-responsive-columns tbody').on('click', 'td.details-control', function () {
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

                $(document).ready(function() {
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








