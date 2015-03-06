
angular.module('demo').controller('searchAndFilteringCtrl',function($scope,$rootScope) {
	//this is for functionality related to demo code

});

angular.module('demo').controller('searchAndFilteringPLayDemoCtrl',function($scope,$rootScope,$sce) {
	//this is for functionality related to play demo code

});	
/////////////////// CheckBox Filter Example
///////////////////////////////////////////

function myCheckboxCtrl($scope){
    $scope.selected = {};
    $scope.classes = ['19"', '20"', '24"', '25"', '27"', '34"'];
    $scope.cards = [{
        name: "Dell UltraSharp 24 Monitor - U2412M",
        size: '24"',
        price: "Dell Price		$289.99",
        link: "http://snpi.dell.com/snp/images/products/en-us~320-2676/320-2676.jpg"
    },{
        name: "Dell UltraSharp 24 Monitor – U2414H",
        size: '24"',
        price: "Dell Price		$289.99",
        link: "http://snpi.dell.com/snp/images/products/en-us~860-BBCG/860-BBCGr1.jpg"
    },{
        name: "Dell 20 Touch Monitor - E2014T",
        size: '20"',
        price: "Dell Price		$209.99",
        link: "http://snpi.dell.com/snp/images/products/en-us~858-BBBE/858-BBBEr1.jpg"
    },{
        name: "Dell 19 Monitor - P1914S",
        size: '19"',
        price: "Dell Price		$249.99",
        link: "http://snpi.dell.com/snp/images/products/en-us~857-BBBE/857-BBBEr2.jpg"
    },{
        name: "Dell 19 Monitor - E1914H",
        size: '19"',
        price: "Dell Price		$119.99",
        link: "http://snpi.dell.com/snp/images/products/en-us~320-9774/320-9774r2.jpg"
    },{
        name: "Dell UltraSharp 27 Monitor - U2715H",
        size: '27"',
        price: "Dell Price		$599.99",
        link: "http://snpi.dell.com/snp/images/products/en-us~210-ADKB/210-ADKBr3.jpg"
    },{
        name: "Dell UltraSharp 34 Curved Monitor - U3415W",
        size: '34"',
        price: "Dell Price		$1,199.99",
        link: "http://snpi.dell.com/snp/images/products/en-us~210-ADTR/210-ADTRr1.jpg"
    },{
        name: "Dell 25 Monitor - U2515H",
        size: '25"',
        price: "Dell Price		$499.99",
        link: "http://snpi.dell.com/snp/images/products/en-us~480-ACRZ/480-ACRZ.jpg"
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
		{size:'19"'},
		{size:'20"'},
		{size:'24"'},
		{size:'25"'},
		{size:'27"'},
		{size:'34"'}
		], 
		prices: [
		{pricerange:"$0 - $199"},
		{pricerange:"$200 - $349"},
		{pricerange:"$350 - $499"},
		{pricerange:"$500 - $749"},
		{pricerange:"$750 and above"}
		]
	};

    $scope.data = [{
        name: "Dell UltraSharp 24 Monitor - U2412M",
        size: '24"',
        price: "Dell Price		$289.99",
        pricerange: "$200 - $349",
        link: "http://snpi.dell.com/snp/images/products/en-us~320-2676/320-2676.jpg"
    },{
        name: "Dell UltraSharp 24 Monitor – U2414H",
        size: '24"',
        price: "Dell Price		$289.99",
        pricerange: "$200 - $349",
        link: "http://snpi.dell.com/snp/images/products/en-us~860-BBCG/860-BBCGr1.jpg"
    },{
        name: "Dell 20 Touch Monitor - E2014T",
        size: '20"',
        price: "Dell Price		$209.99",
        pricerange: "$200 - $349",
        link: "http://snpi.dell.com/snp/images/products/en-us~858-BBBE/858-BBBEr1.jpg"
    },{
        name: "Dell 19 Monitor - P1914S",
        size: '19"',
        price: "Dell Price		$249.99",
        pricerange: "$200 - $349",
        link: "http://snpi.dell.com/snp/images/products/en-us~857-BBBE/857-BBBEr2.jpg"
    },{
        name: "Dell 19 Monitor - E1914H",
        size: '19"',
        price: "Dell Price		$119.99",
        pricerange: "$0 - $200",
        link: "http://snpi.dell.com/snp/images/products/en-us~320-9774/320-9774r2.jpg"
    },{
        name: "Dell UltraSharp 27 Monitor - U2715H",
        size: '27"',
        price: "Dell Price		$599.99",
        pricerange: "$500 - $749",
        link: "http://snpi.dell.com/snp/images/products/en-us~210-ADKB/210-ADKBr3.jpg"
    },{
        name: "Dell UltraSharp 34 Curved - U3415W",
        size: '34"',
        price: "Dell Price		$1,199.99",
        pricerange: "$750 and above",
        link: "http://snpi.dell.com/snp/images/products/en-us~210-ADTR/210-ADTRr1.jpg"
    },{
        name: "Dell 25 Monitor - U2515H",
        size: '25"',
        price: "Dell Price		$499.99",
        pricerange: "$350 - $499",
        link: "http://snpi.dell.com/snp/images/products/en-us~480-ACRZ/480-ACRZ.jpg"
    },{
        name: "Dell UltraSharp 24 Monitor – U2414H",
        size: '24"',
        price: "Dell Price		$289.99",
        pricerange: "$200 - $349",
        link: "http://snpi.dell.com/snp/images/products/en-us~860-BBCG/860-BBCGr1.jpg"
    },{
        name: "Dell 20 Touch Monitor - E2014T",
        size: '20"',
        price: "Dell Price		$209.99",
        pricerange: "$200 - $349",
        link: "http://snpi.dell.com/snp/images/products/en-us~858-BBBE/858-BBBEr1.jpg"
    },{
        name: "Dell 19 Monitor - P1914S",
        size: '19"',
        price: "Dell Price		$249.99",
        pricerange: "$200 - $349",
        link: "http://snpi.dell.com/snp/images/products/en-us~857-BBBE/857-BBBEr2.jpg"
    },{
        name: "Dell 19 Monitor - E1914H",
        size: '19"',
        price: "Dell Price		$119.99",
        pricerange: "$0 - $200",
        link: "http://snpi.dell.com/snp/images/products/en-us~320-9774/320-9774r2.jpg"
    },{
        name: "Dell UltraSharp 27 Monitor - U2715H",
        size: '27"',
        price: "Dell Price		$599.99",
        pricerange: "$500 - $749",
        link: "http://snpi.dell.com/snp/images/products/en-us~210-ADKB/210-ADKBr3.jpg"
    },{
        name: "Dell UltraSharp 34 Curved - U3415W",
        size: '34"',
        price: "Dell Price		$1,199.99",
        pricerange: "$750 and above",
        link: "http://snpi.dell.com/snp/images/products/en-us~210-ADTR/210-ADTRr1.jpg"
    },{
        name: "Dell 25 Monitor - U2515H",
        size: "25",
        price: "Dell Price		$499.99",
        pricerange: "$350 - $499",
        link: "http://snpi.dell.com/snp/images/products/en-us~480-ACRZ/480-ACRZ.jpg"
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

