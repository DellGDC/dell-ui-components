angular.module('demo').controller('tablesUberCtrl', function ($scope, $rootScope) {
    //this is for functionality related to demo code
    //


    //$(document).ready(function () {
    //   var tableCheckbox = new $.fn.dataTable({
    //       "ajax": "components/tables-uber/dataColumn.json",
    //        "table": "#table-uber",
    //        "fields": [{
    //            label: "Active:",
    //            name: "active",
    //            type: "checkbox",
    //            separator: "|",
    //            options: [
    //                {label: '', value: 1}
    //            ]
    //        }, {
    //            label: "Solution name",
    //            name: "solution_name"
    //        },{
    //            label: "Solution ID",
    //            name: "solution_ID"
    //        },{
    //            label: "Owner",
    //            name: "owner"
    //        },{
    //            label: "Last edited",
    //            name: "last_edited"
    //        },{
    //            label: "List price",
    //            name: "list_price"
    //        },{
    //            label: "Customer number",
    //            name: "customer_number"
    //        },{
    //            label: "Reference number",
    //            name: "reference_number"
    //        },{
    //            label: "Quote number",
    //            name: "quote_number"
    //        }
    //
    //        ]
    //    });
    //});

        $scope.exampleComplexTableData = {
            "ajax": "components/tables-uber/dataColumn.json",
            "columns": [
                //{
                //    data: "active",
                //    render: function (data, type, row) {
                //        if (type === 'display') {
                //            return '<input type="checkbox" class="editor-active">';
                //        }
                //        return data;
                //    },
                //    className: "dt-body-center"
                //},


                {
                    "data": "Solution_name",
                    "sClass": "editable"
                },

                {
                    "data": "Solution_ID",
                    "sClass": "editable"
                },
                {
                    "data": "Owner",
                    "sClass": "editable"
                },
                {
                    "data": "Last_edited",
                    "sClass": "editable"
                },
                {
                    "data": "List_price",
                    "sClass": "editable"
                },
                {
                    "data": "Customer_number",
                    "sClass": "editable"
                },
                {
                    "data": "Reference_number",
                    "sClass": "editable"
                },
                {
                    "data": "Quote_number",
                    "sClass": "editable"
                }
            ],
            "pagingType": "simple",
            "language": {
                "paginate": {
                    "next": "Next&nbsp;<span aria-hidden=\"true\" class=\"icon-ui-arrowright\"><\/span>",
                    "previous": "<span aria-hidden=\"true\" class=\"icon-ui-arrowleft\"><\/span>&nbsp;Previous"
                }
            },
            select: {
                style: 'os',
                selector: 'td:not(:last-child)' // no row selection on last column
            },
            rowCallback: function ( row, data ) {
                // Set the checked state of the checkbox in the table
                $('input.editor-active', row).prop( 'checked', data.active == 1 );
            }

        };


    });

    angular.module('demo').controller('tablesUberPLayDemoCtrl', function ($scope, $rootScope, $sce) {
        //this is for functionality related to play demo code

    });
