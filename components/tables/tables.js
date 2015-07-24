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

                //$(function(){
                //    $("#myTable").tablesorter();
                //});

                //$(function(){
                //
                //    $('.tablesorter').tablesorter({
                //        theme: 'jui',
                //        showProcessing: true,
                //        //headerTemplate : '{content} {icon}',
                //        widgets: [ 'uitheme', 'zebra', 'filter', 'scroller' ],
                //        widgetOptions : {
                //            scroller_height : 300,
                //            // scroll tbody to top after sorting
                //            scroller_upAfterSort: true,
                //            // pop table header into view while scrolling up the page
                //            scroller_jumpToHeader: true,
                //            // In tablesorter v2.19.0 the scroll bar width is auto-detected
                //            // add a value here to override the auto-detected setting
                //            scroller_barWidth : null
                //            // scroll_idPrefix was removed in v2.18.0
                //            // scroller_idPrefix : 's_'
                //        }
                //    });
                //
                //    var startFixedColumns = 2;
                //
                //    $('#fixed-columns-table').tablesorter({
                //        theme: 'jui',
                //        showProcessing: true,
                //        headerTemplate : '{content} {icon}',
                //        widgets: [ 'uitheme', 'zebra', 'filter', 'scroller' ],
                //        widgetOptions : {
                //            // scroll tbody to top after sorting
                //            scroller_upAfterSort: true,
                //            // pop table header into view while scrolling up the page
                //            scroller_jumpToHeader: true,
                //
                //            scroller_height : 300,
                //            // set number of columns to fix
                //            scroller_fixedColumns : startFixedColumns,
                //            // add a fixed column overlay for styling
                //            scroller_addFixedOverlay : false,
                //            // add hover highlighting to the fixed column (disable if it causes slowing)
                //            scroller_rowHighlight : 'hover',
                //
                //            // bar width is now calculated; set a value to override
                //            scroller_barWidth : null
                //        }
                //    });
                //
                //    // use jQuery UI slider to change the fixed column size
                //    $( '#slider' ).slider({
                //        value : startFixedColumns,
                //        min   : 0,
                //        max   : 4,
                //        step  : 1,
                //        slide : function( event, ui ) {
                //            // page indicator
                //            $( '.fixed-columns' ).text( ui.value );
                //            // method to update the fixed column size
                //            $( '#fixed-columns-table').trigger( 'setFixedColumnSize', ui.value );
                //        }
                //    });
                //
                //    // update column value display
                //    $( '.fixed-columns' ).text( startFixedColumns );
                //
                //});

                $(function () {

                    $('table-fixed-column').tablesorter({
                        theme: 'blue',
                        // widthFixed: true, // <- now automatically set by the scroller widget
                        showProcessing: true,
                        widgets: ['zebra', 'scroller'],
                        widgetOptions: {
                            scroller_fixedColumns: 1,
                            scroller_height: 300,
                            // scroll tbody to top after sorting
                            scroller_upAfterSort: true,
                            // pop table header into view while scrolling up the page
                            scroller_jumpToHeader: true
                        }
                    });

                });

            }
        };
    });




