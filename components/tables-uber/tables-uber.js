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

                            {
                                "data": "Company_name",
                                "sClass":"editable"
                            },
                            {
                                "data": "Solution_name",
                                "sClass":"editable"
                            },

                            {
                                "data": "Solution_ID",
                                "sClass":"editable"
                            },
                            {
                                "data": "Owner",
                                "sClass":"editable"
                            },
                            {
                                "data": "Last_edited",
                                "sClass":"editable"
                            },
                            {
                                "data": "List_price",
                                "sClass":"editable"
                            },
                            {
                                "data": "Customer_number",
                                "sClass":"editable"
                            },
                            {
                                "data": "Reference_number",
                                "sClass":"editable"
                            },
                            {
                                "data": "Quote_number",
                                "sClass":"editable"
                            }
                        ],
                        //select: {
                        //    style:    'os',
                        //    selector: 'td:first-child'
                        //},
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
                    },100);
                }

            }
        };
    });

