
angular.module('demo').controller('tablesUberCtrl',function($scope,$rootScope) {
	//this is for functionality related to demo code

	$scope.exampleComplexTableData = {
                    "ajax": "components/tables-uber/dataColumn.json",
                    "columns": [
                        {
                        	"data": "Company_name",
                        	"sClass":"editable"
                    	},
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

});

angular.module('demo').controller('tablesUberPLayDemoCtrl',function($scope,$rootScope,$sce) {
	//this is for functionality related to play demo code

});