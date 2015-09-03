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

                    var piosData = [{
                        id: 'a',
                        address: '7886 Dublin Blvd',
                        city: 'Dublin, ',
                        state: 'CA ',
                        zip: '94568'
                    }, {
                        id: 'b',
                        address: '1 Stoneridge Mall Space',
                        city: 'Pleasanton, ',
                        state: 'CA ',
                        zip: '94568'
                    }, {
                        id: 'c',
                        address: '1120 Stoneridge Mall Drive',
                        city: 'Pleasanton, ',
                        state: 'CA ',
                        zip: '94568'
                    }];

                    piosData.forEach(function(pio) {
                        pios(pio);
                    });

                    function pios(pio) {
                        var div = document.createElement('div');
                        div.setAttribute('id', pio.id);
                        div.innerHTML = pio.address + '<br />' + pio.city + pio.state + pio.zip;
                        document.body.appendChild(div);
                    }
                });


                //$(document).ready(function() {
                //    var data = [
                //        {
                //            "word": "hello",
                //            "favnumber": "0070",
                //            "item": "item1",
                //            "color": "red"
                //        },
                //        {
                //            "word": "hello world",
                //            "favnumber": "0233070",
                //            "item": "item2",
                //            "color": "blue"
                //        },
                //        {
                //            "word": "hello mom",
                //            "favnumber": "0070",
                //            "item": "item3",
                //            "color": "pink"
                //        },
                //        {
                //            "word": "hello dad",
                //            "favnumber": "0070",
                //            "item": "item4",
                //            "color": "silver"
                //        }
                //    ];
                //
                //    var items = document.querySelectorAll('[data-item]');
                //
                //    for (var e in items) {
                //        var element = items[e];
                //        var name = element.getAttribute('data-item');
                //
                //        for (var i in data) {
                //            var item = data[i];
                //
                //            if (name == item.item) {
                //                var text = [];
                //                text.push(item.word);
                //                text.push(item.favnumber);
                //                text.push(item.item);
                //                text.push(item.color);
                //
                //                element.innerText = text.join(", ");
                //            }
                //        }
                //    }
                //});

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
    })








