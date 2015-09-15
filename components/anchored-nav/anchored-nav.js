/**
 * Created by Clint_Batte on 5/18/2015.
 *
 * Examples
 * <nav class="navbar navbar-inverse" data-spy="affix"> sets up affix immediately when window scrolls
 * <nav class="navbar navbar-inverse" data-spy="affix" data-offset-top="197"> sets up affix immediately when window scrolls past 197 pixels
 * <nav class="navbar navbar-inverse" data-spy="affix" data-offset-top="197" data-offset-bottom="100">  affix off when 100 pixels from bottom
 * <nav class="navbar navbar-inverse" data-spy="affix" data-offset-top="197" data-target="#myNavbar">  sets ups scrollspy on #myNavbar element
 *
 */

angular.module('dellUiComponents')

    .directive('navSticky', function($timeout) {
        return {
            restrict: 'CA',
            link: function ($scope, $element, iAttrs, controller) {


                var sticky = new Waypoint.Sticky({
                    element: $('.nav-sticky')[0]
                });

                //var waypoint = new Waypoint({
                //    element: document.getElementsByClassName('waypoint'),
                //    handler: function() {
                //        alert('Basic waypoint triggered');
                //    }
                //});
                //$('a[href^="#"]').on('click',function (e) {


                $($element).find('.nav a[href^=#]').on('click',function (e) {
                    e.preventDefault();

                    var target = this.hash;
                    var $target = $(target);

                    $('html, body').stop().animate({
                        'scrollTop': $target.offset().top - 100
                    }, 900, 'swing');

                    if ($($element).find('.nav li').hasClass('active')) {
                        $('.nav li').removeClass('active');
                        $(this).parent().addClass('active');
                        //$(this).addClass('active');
                    }

                });




                //$('.post-26').waypoint(function(direction) {
                //    if (direction === 'down') {
                //        $('#menu-item-29').addClass('black');
                //    }
                //    else {
                //        $('#menu-item-29').removeClass('black');
                //    }
                //});



                //var target_id,
                //    uuid;
                //
                ////is there a target?
                //if(iAttrs.target) {
                //
                //    target_id = iAttrs.target;
                //    $('body').waypoint({ target: target_id });
                //
                //    //$('body').scrollspy({ target: target_id });
                //    //fire scrollspy on the target
                //
                //} else if($element.hasClass('navbar')) {
                //
                //    target_id = $element.attr('id');
                //    //does this element have id?
                //    if(!target_id) {
                //
                //        //Needed to set up a unique id when we don't have a target
                //        uuid = function () {
                //            function s4() {
                //                return Math.floor((1 + Math.random()) * 0x10000)
                //                    .toString(16)
                //                    .substring(1);
                //            }
                //            return new Date().getTime().toString(36) + '-' + s4() + '-' + s4() + '-' +
                //                s4() + '-' + s4() + s4() + s4();
                //        };
                //
                //        //no id, assign a random id and add it in the dom to the element
                //        target_id = "#"+uuid();
                //        $element.attr('id',target_id);
                //    }
                //    //fire scrollspy on the target with random id
                //
                //    //is there an offset configured?
                //    //if(iAttrs.offset) {
                //    //    spyOffset = iAttrs.offset;
                //    //}
                //
                //    $('body').waypoint({ target: target_id });
                //}
                //if(target_id) {
                //    $(target_id).find('.nav a[href^=#]').on('click', function(e){
                //        e.preventDefault();
                //        $('html, body').stop().animate({
                //            scrollTop: $($(e.currentTarget)).offset().top - 100
                //        }, 900, 'swing');
                //
                //    });
                //}



                // ---------------- Paul Lund code ---------------
                //$('a[href^="#"]').on('click',function (e) {
                //    e.preventDefault();
                //
                //    var target = this.hash;
                //    var $target = $(target);
                //
                //    $('html, body').stop().animate({
                //        'scrollTop': $target.offset().top - 100
                //    }, 900, 'swing');
                //});
                // ---------------- Paul Lund code ---------------



                //------------ Bo's code --------------
                //var affixConfig = {offset:{}},
                //    offset,
                //    target_id,
                //    uuid,
                //    spyOffset = - 100,
                //    distanceFromTheTop = 50,
                //    animation = 'swing';
                //
                //if(iAttrs.spy === "affix") {
                //    //combines affix with scrollspy
                //
                //
                //    if(iAttrs.offsetTop) {
                //        //is there a top offset?
                //        affixConfig.offset.top = iAttrs.offsetTop;
                //        offset = true;
                //    }
                //    if(iAttrs.offsetBottom) {
                //        //is there a bottom offset?
                //        affixConfig.offset.bottom = iAttrs.offsetBottom;
                //        offset = true;
                //    }
                //    if(!offset) {
                //        //there are no offsets
                //        affixConfig = {};
                //    }
                //
                //    //fire the affix
                //    $element.affix(affixConfig);
                //
                //}
                //
                //
                ////is there a target?
                //if(iAttrs.target) {
                //
                //    target_id = iAttrs.target;
                //    $('body').scrollspy({ target: target_id });
                //    //fire scrollspy on the target
                //
                //} else if($element.hasClass('navbar')) {
                //
                //    target_id = $element.attr('id');
                //    //does this element have id?
                //    if(!target_id) {
                //
                //        //Needed to set up a unique id when we don't have a target
                //        uuid = function () {
                //            function s4() {
                //                return Math.floor((1 + Math.random()) * 0x10000)
                //                .toString(16)
                //                .substring(1);
                //            }
                //            return new Date().getTime().toString(36) + '-' + s4() + '-' + s4() + '-' +
                //            s4() + '-' + s4() + s4() + s4();
                //        };
                //
                //        //no id, assign a random id and add it in the dom to the element
                //        target_id = "#"+uuid();
                //        $element.attr('id',target_id);
                //    }
                //    //fire scrollspy on the target with random id
                //
                //    //is there an offset configured?
                //    if(iAttrs.offset) {
                //        spyOffset = iAttrs.offset;
                //    }
                //
                //    $('body').scrollspy({ target: target_id,offset: spyOffset });
                //}
                //if(target_id) {
                //    $(target_id).find('.nav a[href^=#]').on('click', function(e){
                //        e.preventDefault();
                //        $("body").animate({
                //            scrollTop: $($(e.currentTarget).attr('href')).offset().top - 70
                //        }, animation);
                //    });
                //}
                //------------ Bo's code --------------


            }
        };

    });




