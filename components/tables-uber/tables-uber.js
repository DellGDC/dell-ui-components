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

    .directive('tableExpandableRow', function($timeout){
        // Runs during compile
        return {
            restrict: 'C',
            link: function($scope, $element, iAttrs, controller ) {


                function updateDataTableSelectAllCtrl(table){
                    var $table             = table.table().node();
                    var $chkbox_all        = $('tbody input[type="checkbox"]', $table);
                    var $chkbox_checked    = $('tbody input[type="checkbox"]:checked', $table);
                    var chkbox_select_all  = $('thead input[name="select_all"]', $table).get(0);

                    // If none of the checkboxes are checked
                    if($chkbox_checked.length === 0){
                        chkbox_select_all.checked = false;
                        if('indeterminate' in chkbox_select_all){
                            chkbox_select_all.indeterminate = false;
                        }

                        // If all of the checkboxes are checked
                    } else if ($chkbox_checked.length === $chkbox_all.length){
                        chkbox_select_all.checked = true;
                        if('indeterminate' in chkbox_select_all){
                            chkbox_select_all.indeterminate = false;
                        }

                        // If some of the checkboxes are checked
                    } else {
                        chkbox_select_all.checked = true;
                        if('indeterminate' in chkbox_select_all){
                            chkbox_select_all.indeterminate = true;
                        }
                    }
                }


                /* Formatting function for row details - modify as you need */
                function format ( d ) {
                    // `d` is the original data object for the row
                    return  '<row>'+
                                '<div class="row">'+
                                    '<div class="col-xs-12">'+
                            //repeated herders visible in XS only
                                        '<div class="col-xs-6 col-sm-3 visible-xs-block">'+
                                            '<p class="text-gray-medium small">Company Name</p>'+
                                            '<p>'+d.Company_name+'</p>' +
                                        '</div>'+
                                        '<div class="col-xs-6 col-sm-3 visible-xs-block">'+
                                            '<p class="text-gray-medium small">Solution ID</p>'+
                                            '<p><a href="javascript:;" class="btn-link">'+d.Solution_ID+'</a></p>' +
                                        '</div>'+
                                        '<div class="col-xs-6 col-sm-3 visible-xs-block">'+
                                            '<p class="text-gray-medium small">List Price</p>'+
                                            '<p>'+d.List_price+'</p>' +
                                        '</div>'+
                                        '<div class="col-xs-6 col-sm-3 visible-xs-block">'+
                                            '<p class="text-gray-medium small">Quote Number</p>'+
                                            '<p><a href="javascript:;" class="btn-link">'+d.Quote_number+'</a></p>' +
                                        '</div>'+
                                        '<div class="row">'+
                                            '<div class="col-xs-12 visible-xs-block">'+
                                                '<hr class="hr-gray top-offset-10">'+
                                            '</div>'+
                                        '</div>'+


                                        '<div class="col-xs-12">'+
                                            '<h2 class="text-blue">Account Details</h2>'+
                                        '</div>'+


                                        '<div class="col-xs-6 col-sm-3">' +
                                            '<p class="text-gray-medium small">Contact Number</p>'+
                                            '<p>'+d.Contact_number+'</p>'+
                                        '</div>'+
                                        '<div class="col-xs-6 col-sm-3">' +
                                            '<p class="text-gray-medium small">Extension</p>'+
                                            '<p>'+d.Extension+'</p>'+
                                        '</div>'+
                                        '<div class="col-xs-6 col-sm-3">'+
                                            '<p class="text-gray-medium small">Customer Since</p>'+
                                            '<p>'+d.Customer_since+'</p>' +
                                        '</div>'+
                                        '<div class="col-xs-6 col-sm-3">'+
                                            '<p class="text-gray-medium small">Location</p>'+
                                            '<p>'+d.Location+'</p>' +
                                        '</div>'+
                                        '<div class="col-xs-6 col-sm-3">'+
                                            '<p class="text-gray-medium small">Owner</p>'+
                                            '<p><a href="javascript:;" class="btn-link">'+d.Owner+'</a></p>' +
                                        '</div>'+
                                        '<div class="col-xs-6 col-sm-3">'+
                                            '<p class="text-gray-medium small">Last Edited</p>'+
                                            '<p>'+d.Last_edited+'</p>' +
                                        '</div>'+
                                        '<div class="col-xs-6 col-sm-3">'+
                                            '<p class="text-gray-medium small">Customer Number</p>'+
                                            '<p><a href="javascript:;" class="btn-link">'+d.Customer_number+'</a></p>' +
                                        '</div>'+
                                    '</div>'+
                                '</div>'+
                                '<div class="row">'+
                                    '<div class="col-xs-12">'+
                                        '<hr class="hr-gray top-offset-10">'+
                                    '</div>'+
                                '</div>'+

                                '<div class="row">'+

                                    '<div class="col-xs-12">'+
                                        '<h2 class="text-blue col-xs-12">Additional Notes</h2>'+
                                    '</div>'+

                                    '<div class="col-xs-12">'+
                                        '<div class="col-xs-6">'+
                                            '<p class="text-gray-medium small">Purchase Details</p>'+
                                            '<p>'+d.Purchase_details+'</p>' +
                                        '</div>'+
                                        '<div class="col-xs-6">'+
                                            '<p class=" text-gray-medium small">Sales Notes</p>'+
                                            '<p>'+d.Sales_notes+'</p>'+
                                        '</div>'+
                                    '</div>'+
                                '</div>'+
                            '</row>';

                }



                // Array holding selected row IDs
                var rows_selected = [];
                var tableData;
                var table = $element.DataTable({
                    "ajax": "components/tables-uber/data-responsive.json",
                    'columnDefs': [{
                        'targets': 0,
                        'searchable':true,
                        'orderable':true,
                        'stateSave': true,
                        'className': 'details-control',
                        'render': function (data, type, full, meta){
                            return '<input type="checkbox">';
                        }
                    }],
                    responsive: {
                        details: false
                    },
                    "columns": [

                        {
                            "data":''
                        },
                        {
                            "data": "Company_name",
                            "sClass":"editable"
                        },
                        {
                            "data": "Solution_ID",
                            "sClass":"editable"
                        },
                        {
                            "data": "List_price",
                            "sClass":"editable"
                        },
                        {
                            "data": "Quote_number",
                            "sClass":"editable"
                        }
                    ],
                    'order': [1, 'asc'],
                    "dom": 'C<"clear">lfrtip',
                    'pagingType': "simple",
                    'language': {
                        'paginate': {
                            'next': "Next&nbsp;<span aria-hidden=\"true\" class=\"icon-ui-arrowright\"><\/span>",
                            'previous': "<span aria-hidden=\"true\" class=\"icon-ui-arrowleft\"><\/span>&nbsp;Previous"
                        }
                    },
                    'fnDrawCallback': function() {
                        //bind the click handler script to the newly created elements held in the table
                        $('ul.pagination a').bind('click',dataReloadClick);
                        //console.log('i was clicked');

                        $('th.editable.sorting_asc' || 'th.editable.sorting_desc').bind('click',dataReloadClick);
                        //console.log('i was sorted');
                    },
                    'colVis': {
                        "buttonText": "<span aria-hidden=\"true\" class=\"glyphicon glyphicon-option-vertical\" style\"font-size:10px !important\"><\/span>&nbsp;Column"
                    }


                });

                 //change the position of the sorting toggle arrows
                table.columns().iterator( 'column', function (ctx, idx) {
                    $( table.column(idx).header() ).append('<span class="sort-icon"/>');
                });


                // Handle click on checkbox
                $element.find('tbody').on('click', 'input[type="checkbox"]', function(e){
                    var $row = $(this).closest('tr');

                    // Get row data
                    var data = table.row($row).data();

                    // Get row ID
                    var rowId = data[0];

                    // Determine whether row ID is in the list of selected row IDs
                    var index = $.inArray(rowId, rows_selected);

                    // If checkbox is checked and row ID is not in list of selected row IDs
                    if(this.checked && index === -1){
                        rows_selected.push(rowId);

                        // Otherwise, if checkbox is not checked and row ID is in list of selected row IDs
                    } else if (!this.checked && index !== -1){
                        rows_selected.splice(index, 1);
                    }

                    if(this.checked){
                        $row.addClass('selected');
                    } else {
                        $row.removeClass('selected');
                    }

                    // Update state of "Select all" control
                    updateDataTableSelectAllCtrl(table);

                    //Prevent click event from propagating to parent
                    e.stopPropagation();
                });


                // Handle click on "Select all" control
                $element.find('thead input[name="select_all"]').on('click', function(e){
                    if(this.checked){
                        $element.find('tbody input[type="checkbox"]:not(:checked)').trigger('click');
                    } else {
                        $element.find('tbody input[type="checkbox"]:checked').trigger('click');
                    }

                    // Prevent click event from propagating to parent
                    e.stopPropagation();
                });


                // Handle table draw event
                table.on('draw', function(){
                    // Update state of "Select all" control
                    updateDataTableSelectAllCtrl(table);
                });

                // Handle form submission event
                $('#frm-table-uber').on('submit', function(e){
                    var form = this;

                    // Iterate over all selected checkboxes
                    $.each(rows_selected, function(index, rowId){
                        // Create a hidden element
                        $(form).append(
                            $('<input>')
                                .attr('type', 'hidden')
                                .attr('name', 'id[]')
                                .val(rowId)
                        );
                    });
                });

                var inputTable = $element.DataTable(tableData);
                if($element.hasClass('table-editable')) {
                    $timeout(function(){
                        //console.log("editable table here");
                        $element.find('td.editable').attr("contenteditable",true);
                        $element.find('td.editable').on('blur',function(e){
                            var newData = $(e.currentTarget).text(), data = inputTable.cell( this ).data();
                            if(data !== newData) {
                                //console.log( 'You edited '+data+' and changed it to '+newData,inputTable);
                            }
                        } );
                    },100);
                }

                //onClick handler function
                function dataReloadClick(e) {
                    e.preventDefault();
                    //$(this).load('components/tables-uber/dataColumn.json');
                    $timeout(function(){
                        //console.log("editable table here");
                        $element.find('td.editable').attr("contenteditable",true);
                        $element.find('td.editable').on('blur',function(e){
                            var newData = $(e.currentTarget).text(), data = inputTable.cell( this ).data();
                            if(data !== newData) {
                                //console.log( 'You edited '+data+' and changed it to '+newData,inputTable);
                            }
                        } );
                    },100);
                }

                // Add event listener for opening and closing details
                $element.find('tbody').on('click', 'td.details-control', function () {
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
                } );


                // change positioning of search bar
                $element.each(function(){
                    var datatable = $(this);
                    // find the search label
                    var search_label = datatable.closest('.dataTables_wrapper').find('div[id$=_filter] label');
                    search_label.addClass('hide-text');


                    // SEARCH - Add the placeholder for Search and Turn this into in-line form control
                    var search_input = datatable.closest('.dataTables_wrapper').find('div[id$=_filter] input');
                    search_input.attr('placeholder', 'Search');
                    search_input.addClass('form-control col-xs-12 col-sm-4');

                    // LENGTH - Inline-Form control
                    // code below for select
                    var length_sel = datatable.closest('.dataTables_wrapper').find('div[id$=_length] select');
                    length_sel.addClass('form-control');

                });

             }
        };
    })





    .directive('tableResponsiveColumns', function($timeout){
        // Runs during compile
        return {
            restrict: 'C',
            link: function($scope, $element, iAttrs, controller ) {


                function updateDataTableSelectAllCtrl(table){
                    var $table             = table.table().node();
                    var $chkbox_all        = $('tbody input[type="checkbox"]', $table);
                    var $chkbox_checked    = $('tbody input[type="checkbox"]:checked', $table);
                    var chkbox_select_all  = $('thead input[name="select_all"]', $table).get(0);

                    // If none of the checkboxes are checked
                    if($chkbox_checked.length === 0){
                        chkbox_select_all.checked = false;
                        if('indeterminate' in chkbox_select_all){
                            chkbox_select_all.indeterminate = false;
                        }

                        // If all of the checkboxes are checked
                    } else if ($chkbox_checked.length === $chkbox_all.length){
                        chkbox_select_all.checked = true;
                        if('indeterminate' in chkbox_select_all){
                            chkbox_select_all.indeterminate = false;
                        }

                        // If some of the checkboxes are checked
                    } else {
                        chkbox_select_all.checked = true;
                        if('indeterminate' in chkbox_select_all){
                            chkbox_select_all.indeterminate = true;
                        }
                    }
                }


                // Array holding selected row IDs
                var rows_selected = [];
                var tableData;
                var table = $('#table-uber').DataTable({
                    "ajax": "components/tables-uber/dataColumn.json",
                    'columnDefs': [{
                        'targets': 0,
                        'searchable':true,
                        'orderable':false,
                        'stateSave': true,
                        'className': 'dt-body-center',
                        'render': function (data, type, full, meta){
                            return '<input type="checkbox">';
                        }
                    }],
                    "columns": [

                        {
                            "data":'',
                        },

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
                    'order': [1, 'asc'],
                    "dom": 'C<"clear">lfrtip',
                    'pagingType': "simple",
                    'language': {
                        'paginate': {
                            'next': "Next&nbsp;<span aria-hidden=\"true\" class=\"icon-ui-arrowright\"><\/span>",
                            'previous': "<span aria-hidden=\"true\" class=\"icon-ui-arrowleft\"><\/span>&nbsp;Previous"
                        }
                    },
                    'fnDrawCallback': function() {
                        //bind the click handler script to the newly created elements held in the table
                        $('ul.pagination a').bind('click',dataReloadClick);
                        //console.log('i was clicked');

                        $('th.editable.sorting_asc' || 'th.editable.sorting_desc').bind('click',dataReloadClick);
                        //console.log('i was sorted');
                    },
                    'responsive': true
                });


                // Handle click on checkbox
                $element.find('tbody').on('click', 'input[type="checkbox"]', function(e){
                    var $row = $(this).closest('tr');

                    // Get row data
                    var data = table.row($row).data();

                    // Get row ID
                    var rowId = data[0];

                    // Determine whether row ID is in the list of selected row IDs
                    var index = $.inArray(rowId, rows_selected);

                    // If checkbox is checked and row ID is not in list of selected row IDs
                    if(this.checked && index === -1){
                        rows_selected.push(rowId);

                        // Otherwise, if checkbox is not checked and row ID is in list of selected row IDs
                    } else if (!this.checked && index !== -1){
                        rows_selected.splice(index, 1);
                    }

                    if(this.checked){
                        $row.addClass('selected');
                    } else {
                        $row.removeClass('selected');
                    }

                    // Update state of "Select all" control
                    updateDataTableSelectAllCtrl(table);

                    //Prevent click event from propagating to parent
                    e.stopPropagation();
                });


                // Handle click on "Select all" control
                $element.find('thead input[name="select_all"]').on('click', function(e){
                    if(this.checked){
                        $element.find('tbody input[type="checkbox"]:not(:checked)').trigger('click');
                    } else {
                        $element.find('tbody input[type="checkbox"]:checked').trigger('click');
                    }

                    // Prevent click event from propagating to parent
                    e.stopPropagation();
                });


                // Handle table draw event
                table.on('draw', function(){
                    // Update state of "Select all" control
                    updateDataTableSelectAllCtrl(table);
                });

                // Handle form submission event
                $('#frm-table-uber').on('submit', function(e){
                    var form = this;

                    // Iterate over all selected checkboxes
                    $.each(rows_selected, function(index, rowId){
                        // Create a hidden element
                        $(form).append(
                            $('<input>')
                                .attr('type', 'hidden')
                                .attr('name', 'id[]')
                                .val(rowId)
                        );
                    });
                });

                var inputTable = $element.DataTable(tableData);
                if($element.hasClass('table-editable')) {
                    $timeout(function(){
                        //console.log("editable table here");
                        $element.find('td.editable').attr("contenteditable",true);
                        $element.find('td.editable').on('blur',function(e){
                            var newData = $(e.currentTarget).text(), data = inputTable.cell( this ).data();
                            if(data !== newData) {
                                //console.log( 'You edited '+data+' and changed it to '+newData,inputTable);
                            }
                        } );
                    },100);
                }

                //onClick handler function
                function dataReloadClick(e) {
                    e.preventDefault();
                    //$(this).load('components/tables-uber/dataColumn.json');
                    $timeout(function(){
                        //console.log("editable table here");
                        $element.find('td.editable').attr("contenteditable",true);
                        $element.find('td.editable').on('blur',function(e){
                            var newData = $(e.currentTarget).text(), data = inputTable.cell( this ).data();
                            if(data !== newData) {
                                //console.log( 'You edited '+data+' and changed it to '+newData,inputTable);
                            }
                        } );
                    },100);
                }

                // change positioning of search bar
                $element.each(function(){
                    var datatable = $(this);
                    // find the search label
                    var search_label = datatable.closest('.dataTables_wrapper').find('div[id$=_filter] label');
                    search_label.addClass('hide-text');


                    // SEARCH - Add the placeholder for Search and Turn this into in-line form control
                    var search_input = datatable.closest('.dataTables_wrapper').find('div[id$=_filter] input');
                    search_input.attr('placeholder', 'Search');
                    search_input.addClass('form-control col-xs-12 col-sm-4');

                    // LENGTH - Inline-Form control
                    // code below for select
                    var length_sel = datatable.closest('.dataTables_wrapper').find('div[id$=_length] select');
                    length_sel.addClass('form-control');

                });

            }
        };
    });






