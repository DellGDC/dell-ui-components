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

    .directive('spy', function($timeout) {
        return {
            restrict: 'CA',
            link: function ($scope, $element, iAttrs, controller) {

                    //var waypoint = new Waypoint({
                    //    element: document.getElementById('context-example'),
                    //    handler: function() {
                    //        alert('Context example triggered');
                    //    }
                    //});


                var sticky = new Waypoint.Sticky({
                    element: $('.nav-sticky')[0]
                });

                $(document).ready(function(){
                    $('a[href^="#"]').on('click',function (e) {
                        e.preventDefault();

                        var target = this.hash;
                        var $target = $(target);

                        $('html, body').stop().animate({
                            'scrollTop': $target.offset().top - 100
                        }, 900, 'swing');
                    });
                });




                // Get section or article by href
                function getRelatedContent(el){
                    return $($(el).attr('href'));
                }
                // Get link by section or article id
                function getRelatedNavigation(el){
                    return $('nav a[href=#'+$(el).attr('id')+']');
                }





                // Just for showing
                var wpDefaults={
                    context: window,
                    continuous: true,
                    enabled: true,
                    horizontal: false,
                    offset: 0,
                    triggerOnce: false
                };
                $('section,article')
                    .waypoint(function(direction) {
                        getRelatedNavigation(this).toggleClass('active', direction === 'down');
                    }, {
                        offset: '90%'
                    })
                    .waypoint(function(direction) {
                        getRelatedNavigation(this).toggleClass('active', direction === 'up');
                    }, {
                        offset: function() {
                            return -$(this).height();
                        }
                    });



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




