
angular.module('demo').controller('paginationCtrl',function($scope, $rootScope, $timeout) {
	//this is for functionality related to demo code
    $('.pagination').jqPagination({
        paged: function(page) {
            // do something with the page variable
        }
    });


    $scope.loadingButtonInit = function () {
        $('#loading-example-btn').click(function () {
            var btn = $(this);
            btn.button('loading');
            window.setTimeout(function () {
                btn.button('reset');
            }, 2000);

            //var lazyLoad = document.getElementById("loading-example-btn");
            //lazyLoad.addEventListener("click", firstSet);
            //
            //function firstSet(){
            //    document.getElementById("results").innerHTML += "1 of 20";
            //}
        });
    };

    $(function() {
        /* initiate plugin */
        $("div.holder").jPages({
            containerID : "itemContainer",
            callback    : function( pages, items ){
                $("#legend1").html("Page " + pages.current + " of " + pages.count);
                $("#legend2").html(items.range.start + " - " + items.range.end + " of " + items.count);
            }
        });
    });

    //var lazyLoad = document.getElementById("loading-example-btn");
    //lazyLoad.addEventListener("click", firstClick);
    //lazyLoad.addEventListener("click", secondClick);
    //
    //function firstClick() {
    //    document.getElementById("results").innerHTML += "1 of 20"
    //}
    //
    //function secondClick() {
    //    document.getElementById("results").innerHTML += "21 of 40"
    //}



});

angular.module('demo').controller('paginationPLayDemoCtrl',function($scope,$rootScope,$sce) {
	//this is for functionality related to play demo code

});
