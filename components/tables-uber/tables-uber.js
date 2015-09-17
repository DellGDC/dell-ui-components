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

                $('.table-responsive-columns').DataTable( {
                    //"ajax": "components/tables-uber/dataColumn.json",
                    //"columns": [
                    //    { "data": "Company_name" },
                    //    { "data": "Solution_name" },
                    //    { "data": "Solution_ID" },
                    //    { "data": "Owner" },
                    //    { "data": "Last_edited" },
                    //    { "data": "List_price" },
                    //    { "data": "Customer_number" },
                    //    { "data": "Reference_number" },
                    //    { "data": "Quote_number" }
                    //],
                    //"pagingType": "simple",
                    //"language": {
                    //    "paginate": {
                    //        "next": "Next&nbsp;<span aria-hidden=\"true\" class=\"icon-ui-arrowright\"><\/span>",
                    //        "previous": "<span aria-hidden=\"true\" class=\"icon-ui-arrowleft\"><\/span>&nbsp;Previous"
                    //    }
                    //}














                } );




            }
        };
    });







