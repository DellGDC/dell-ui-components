
angular.module('demo').controller('searchAndNavigationCtrl',function($scope,$rootScope) {
	//this is for functionality related to demo code

});

angular.module('demo').controller('searchAndNavigationPLayDemoCtrl',function($scope,$rootScope,$sce) {
	//this is for functionality related to play demo code

});

/////////////////// CheckBox Filter Example
///////////////////////////////////////////

function myCheckboxCtrl($scope){
    $scope.selected = {};
    $scope.classes = ['size1', 'size2', 'size3'];
    $scope.cards = [{
        name: "Result1",
        size: 'size1',
        price: "price1"
    },{
        name: "Result2",
        size: 'size1',
        price: "price2"
    },{
        name: "Result3",
        size: 'size1',
        price: "price3"
    },{
        name: "Result4",
        size: 'size2',
        price: "price1"
    },{
        name: "Result5",
        size: 'size2',
        price: "price2"
    },{
        name: "Result6",
        size: 'size2',
        price: "price3"
    },{
        name: "Result7",
        size: 'size3',
        price: "price1"
    },{
        name: "Result8",
        size: 'size3',
        price: "price2"
    },{
        name: "Result9",
        size: 'size3',
        price: "price3"
    }];

    
    function isChecked(obj){
        var checked = [];
        for(var key in obj){
            if(obj[key]) {
                checked.push(key);
            }
        }
        return checked;
    }
    $scope.showCards = function(card){
        var checked = isChecked($scope.selected);
        if(checked.length < 1) {
			checked = $scope.classes;
        }
        return checked.indexOf(card.size) > -1;
    };
}


/////////////////// Drop Down Filter Example
////////////////////////////////////////////
function myDDCtrl($scope){
	$scope.selected = {};
	$scope.filterOptions = {
		sizes: [
		{size:'size1'},
		{size:'size2'},
		{size:'size3'},
		{size:'size4'}
		], 
		prices: [
		{pricerange:"price1"},
		{pricerange:"price2"},
		{pricerange:"price3"},
		{pricerange:"price4"}
		]
	};

    $scope.data = [{
        name: "Result1",
        size: 'size1',
        pricerange: "price1"
    },{
        name: "Result2",
        size: 'size1',
        pricerange: "price2"
    },{
        name: "Result3",
        size: 'size1',
        pricerange: "price3"
    },{
        name: "Result4",
        size: 'size1',
        pricerange: "price4"
    },{
        name: "Result5",
        size: 'size2',
        pricerange: "price2"
    },{
        name: "Result6",
        size: 'size2',
        pricerange: "price3"
    },{
        name: "Result7",
        size: 'size2',
        pricerange: "price4"
    },{
        name: "Result8",
        size: 'size2',
        pricerange: "price1"
    },{
        name: "Result9",
        size: 'size3',
        pricerange: "price2"
    },{
        name: "Result10",
        size: 'size3',
        pricerange: "price3"
    },{
        name: "Result11",
        size: 'size3',
        pricerange: "price4"
    },{
        name: "Result12",
        size: 'size3',
        pricerange: "price1"
    },{
        name: "Result13",
        size: 'size4',
        pricerange: "price2"
    },{
        name: "Result14",
        size: 'size4',
        pricerange: "price3"
    },{
        name: "Result15",
        size: "size4",
        pricerange: "price4"
    }];
    
    //Mapped to the model to filter
	$scope.filterItem = {store: $scope.filterOptions.sizes[0]};

    //Custom filter - filter based on the rating selected
	$scope.customFilter = function (data) {
	    if (data.size === $scope.filterItem.store.sizes) {
	      return true;
	    } else {
	      return false;
	    }
	};
}

