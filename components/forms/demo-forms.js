
angular.module('demo').controller('formsCtrl',function($scope,$rootScope) {

    $(function () {
        $('.tree li:has(ul)').addClass('parent_li').find(' > span').attr('title', 'Collapse this branch');
        $('.tree li.parent_li > span').on('click', function (e) {
            var children = $(this).parent('li.parent_li').find(' > ul > li');
            if (children.is(":visible")) {
                children.hide('fast');
                $(this).attr('title', 'Expand this branch');
            } else {
                children.show('fast');
                $(this).attr('title', 'Collapse this branch');
            }
            e.stopPropagation();
        });
    });

    //
    //$(function () {
    //    $('.tree li:has(ul)').addClass('parent_li').find(' > span').attr('title', 'Collapse this branch');
    //    $('.tree li.parent_li > span').on('click', function (e) {
    //        var children = $(this).parent('li.parent_li').find(' > ul > li');
    //        if (children.is(":visible")) {
    //            children.hide('fast');
    //            $(this).attr('title', 'Expand this branch');
    //        }
    //        e.stopPropagation();
    //    });
    //});
    //
    //$(function () {
    //    $('.tree li.parent_li > span').on('click', function (e) {
    //        var children = $(this).parent('li.parent_li').find(' > ul > li');
    //        if (children.is(":hidden")) {
    //            children.show('fast');
    //            $(this).attr('title', 'Expand this branch');
    //        }
    //        e.stopPropagation();
    //    });
    //});
});

angular.module('demo').controller('formsPLayDemoCtrl',function($scope,$rootScope,$sce) {
	//this is for functionality related to play demo code

});

//
//$(function () {
//    $('.tree li:has(ul)').addClass('parent_li').find(' > span').attr('title', 'Collapse this branch');
//    $('.tree li.parent_li > span').on('click', function (e) {
//        var children = $(this).parent('li.parent_li').find(' > ul > li');
//        if (children.is(":visible")) {
//            children.hide('fast');
//            $(this).attr('title', 'Expand this branch').find(' > i').addClass('icon-plus-sign').removeClass('icon-minus-sign');
//        } else {
//            children.show('fast');
//            $(this).attr('title', 'Collapse this branch').find(' > i').addClass('icon-minus-sign').removeClass('icon-plus-sign');
//        }
//        e.stopPropagation();
//    });
//});
//





















//
//if(children.is(":hidden")) {
//    children.show('slow');
//    $(this).attr('title', 'Collapse this branch');
//}
//

//
//$(function () {
//    $('.tree li:has(ul)').addClass('parent_li').find(' label').attr('title', 'Collapse this branch');
//    $('.tree li.parent_li label').on('click', function (e) {
//        var children = $(this).parent(' li.parent_li').find(' li');
//        if (children.is(":visible")) {
//            children.hide('fast');
//            $(this).attr('title', 'Expand this branch');
//        } else if(children.is(":hidden")) {
//            children.show('slow');
//            $(this).attr('title', 'Collapse this branch');
//            //$(this).attr('title', 'Collapse this branch').find(' > i').addClass('icon-minus-sign').removeClass('icon-plus-sign');
//        } else {
//            children.show('slow');
//        }
//        e.stopPropagation();
//    })
//})
