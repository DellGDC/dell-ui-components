/**
 * Created by Clint_Batte on 9/9/2015.
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


    .directive('tableResponsiveColumns', function($timeout){
        // Runs during compile
        return {
            restrict: 'C',
            link: function($scope, $element, iAttrs, controller ) {

                var tableData, table;
                if(iAttrs.tableData) {
                    tableData = JSON.parse(iAttrs.tableData);
                } else {
                    tableData = {
                        "ajax": "components/tables-uber/dataColumn.json",
                        "columns": [
                            {"data": "Company_name"},
                            {"data": "Solution_name"},
                            {"data": "Solution_ID"},
                            {"data": "Owner"},
                            {"data": "Last_edited"},
                            {"data": "List_price"},
                            {"data": "Customer_number"},
                            {"data": "Reference_number"},
                            {"data": "Quote_number"}
                        ],
                        "pagingType": "simple",
                        "language": {
                            "paginate": {
                                "next": "Next&nbsp;<span aria-hidden=\"true\" class=\"icon-ui-arrowright\"><\/span>",
                                "previous": "<span aria-hidden=\"true\" class=\"icon-ui-arrowleft\"><\/span>&nbsp;Previous"
                            }
                        }

                    };
                }

                table = $element.DataTable(tableData);

                if($element.hasClass('table-editable')) {
                    $timeout(function(){
                        console.log("editable table here");
                        $element.find('td.editable').attr("contenteditable",true);
                        $element.find('td.editable').on('blur',function(e){
                            var newData = $(e.currentTarget).text(), data = table.cell( this ).data();
                            if(data !== newData) {
                                console.log( 'You edited '+data+' and changed it to '+newData,table);
                            }
                            
                        } );
                    });


                }




                //editor = new $.fn.dataTable.Editor( {
                //    ajax: "components/tables-uber/dataColumn.json",
                //    table: "#example-uber",
                //    fields: [ {
                //        label: "Company name:",
                //        name: "Company_name"
                //    }, {
                //        label: "Solution_name:",
                //        name: "Solution_name"
                //    }, {
                //        label: "Solution_ID:",
                //        name: "Solution_ID"
                //    }, {
                //        label: "Owner:",
                //        name: "Owner"
                //    }, {
                //        label: "Customer_number:",
                //        name: "Customer_number"
                //    },  {
                //        label: "List_price:",
                //        name: "List_price"
                //    }, {
                //        label: "Quote_number:",
                //        name: "Quote_number"
                //    },  {
                //        label: "Reference_number:",
                //        name: "Reference_number"
                //    }, {
                //        label: "Last_edited:",
                //        name: "Last_edited",
                //        type: "date"
                //    }
                //
                //    ]
                //} );





                //
                //var table = $('.table-responsive-columns').DataTable( {
                //    //dom: "Bfrtip",
                //    ajax: "components/tables-uber/dataColumn.json",
                //    columns: [
                //        {
                //            data: null,
                //            defaultContent: '',
                //            className: 'select-checkbox',
                //            orderable: false
                //        },
                //            { "data": "Company_name" },
                //            { "data": "Solution_name" },
                //            { "data": "Solution_ID" },
                //            { "data": "Owner" },
                //            { "data": "Last_edited" },
                //            { "data": "List_price" },
                //            { "data": "Customer_number" },
                //            { "data": "Reference_number" },
                //            { "data": "Quote_number" }
                //    ],
                //    keys: {
                //        columns: ':not(:first-child)',
                //        editor:  editor
                //    },
                //    select: {
                //        style:    'os',
                //        selector: 'td:first-child',
                //        blurable: true
                //    },
                //
                //
                //    buttons: [
                //        { extend: "create", editor: editor },
                //        { extend: "edit",   editor: editor },
                //        { extend: "remove", editor: editor }
                //    ]
                //} );



            }
        };
    });







