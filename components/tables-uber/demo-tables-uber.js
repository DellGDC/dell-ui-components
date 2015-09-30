angular.module('demo').controller('tablesUberCtrl', function ($scope, $rootScope) {
    //this is for functionality related to demo code
    //


// Updates "Select all" control in a data table
//
//    function updateDataTableSelectAllCtrl(table){
//        var $table             = table.table().node();
//        var $chkbox_all        = $('tbody input[type="checkbox"]', $table);
//        var $chkbox_checked    = $('tbody input[type="checkbox"]:checked', $table);
//        var chkbox_select_all  = $('thead input[name="select_all"]', $table).get(0);
//
//        // If none of the checkboxes are checked
//        if($chkbox_checked.length === 0){
//            chkbox_select_all.checked = false;
//            if('indeterminate' in chkbox_select_all){
//                chkbox_select_all.indeterminate = false;
//            }
//
//            // If all of the checkboxes are checked
//        } else if ($chkbox_checked.length === $chkbox_all.length){
//            chkbox_select_all.checked = true;
//            if('indeterminate' in chkbox_select_all){
//                chkbox_select_all.indeterminate = false;
//            }
//
//            // If some of the checkboxes are checked
//        } else {
//            chkbox_select_all.checked = true;
//            if('indeterminate' in chkbox_select_all){
//                chkbox_select_all.indeterminate = true;
//            }
//        }
//    }
//
//        // Array holding selected row IDs
//        var rows_selected = [];
//        var table = $('#table-uber').DataTable({
//            "ajax": "components/tables-uber/dataColumn.json",
//            'columnDefs': [{
//                'targets': 0,
//                'searchable':false,
//                'orderable':false,
//                'className': 'dt-body-center',
//                'render': function (data, type, full, meta){
//                    return '<input type="checkbox">';
//                }
//            }],
//            "columns": [
//
//                {
//                    "data": "Company_name",
//                    "sClass":"editable"
//                },
//                {
//                    "data": "Solution_name",
//                    "sClass":"editable"
//                },
//
//                {
//                    "data": "Solution_ID",
//                    "sClass":"editable"
//                },
//                {
//                    "data": "Owner",
//                    "sClass":"editable"
//                },
//                {
//                    "data": "Last_edited",
//                    "sClass":"editable"
//                },
//                {
//                    "data": "List_price",
//                    "sClass":"editable"
//                },
//                {
//                    "data": "Customer_number",
//                    "sClass":"editable"
//                },
//                {
//                    "data": "Reference_number",
//                    "sClass":"editable"
//                },
//                {
//                    "data": "Quote_number",
//                    "sClass":"editable"
//                }
//            ],
//            'order': [1, 'asc'],
//            'rowCallback': function(row, data, dataIndex){
//                // Get row ID
//                var rowId = data[0];
//
//                // If row ID is in the list of selected row IDs
//                if($.inArray(rowId, rows_selected) !== -1){
//                    $(row).find('input[type="checkbox"]').prop('checked', true);
//                    $(row).addClass('selected');
//                }
//            },
//            "pagingType": "simple",
//            "language": {
//                "paginate": {
//                    "next": "Next&nbsp;<span aria-hidden=\"true\" class=\"icon-ui-arrowright\"><\/span>",
//                    "previous": "<span aria-hidden=\"true\" class=\"icon-ui-arrowleft\"><\/span>&nbsp;Previous"
//                }
//            }
//        });
//
//        // Handle click on checkbox
//        $('#table-uber tbody').on('click', 'input[type="checkbox"]', function(e){
//            var $row = $(this).closest('tr');
//
//            // Get row data
//            var data = table.row($row).data();
//
//            // Get row ID
//            var rowId = data[0];
//
//            // Determine whether row ID is in the list of selected row IDs
//            var index = $.inArray(rowId, rows_selected);
//
//            // If checkbox is checked and row ID is not in list of selected row IDs
//            if(this.checked && index === -1){
//                rows_selected.push(rowId);
//
//                // Otherwise, if checkbox is not checked and row ID is in list of selected row IDs
//            } else if (!this.checked && index !== -1){
//                rows_selected.splice(index, 1);
//            }
//
//            if(this.checked){
//                $row.addClass('selected');
//            } else {
//                $row.removeClass('selected');
//            }
//
//            // Update state of "Select all" control
//            updateDataTableSelectAllCtrl(table);
//
//            // Prevent click event from propagating to parent
//            e.stopPropagation();
//        });
//
//        // Handle click on table cells with checkboxes
//        $('#table-uber').on('click', 'tbody td, thead th:first-child', function(e){
//            $(this).parent().find('input[type="checkbox"]').trigger('click');
//        });
//
//        // Handle click on "Select all" control
//        $('#table-uber thead input[name="select_all"]').on('click', function(e){
//            if(this.checked){
//                $('#table-uber tbody input[type="checkbox"]:not(:checked)').trigger('click');
//            } else {
//                $('#table-uber tbody input[type="checkbox"]:checked').trigger('click');
//            }
//
//            // Prevent click event from propagating to parent
//            e.stopPropagation();
//        });
//
//        // Handle table draw event
//        table.on('draw', function(){
//            // Update state of "Select all" control
//            updateDataTableSelectAllCtrl(table);
//        });
//
//        // Handle form submission event
//        $('#frm-table-uber').on('submit', function(e){
//            var form = this;
//
//            // Iterate over all selected checkboxes
//            $.each(rows_selected, function(index, rowId){
//                // Create a hidden element
//                $(form).append(
//                    $('<input>')
//                        .attr('type', 'hidden')
//                        .attr('name', 'id[]')
//                        .val(rowId)
//                );
//            });
//        });

    });

    angular.module('demo').controller('tablesUberPLayDemoCtrl', function ($scope, $rootScope, $sce) {
        //this is for functionality related to play demo code

    });
