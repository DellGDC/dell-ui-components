/**
 * Created by Clint_Batte on 5/18/2015.
 */

angular.module('dellUiComponents')

    .directive('navSticky', function($timeout) {
        return {
            restrict: 'CA',
            link: function ($scope, $element, iAttrs, controller) {

                var sticky = new Waypoint.Sticky({
                    element: $('.nav-sticky')[0]
                });

                //var waypoints = $('.waypoint').waypoint(function(direction) {
                //    alert(this.element.id + ' hit 10% from top of window');
                //}, {
                //    offset: '10%'
                //});


//-- working code for on.click ------
//                $($element).find('.nav a[href^=#]').on('click',function (e) {
//                    e.preventDefault();
//
//                    var target = this.hash;
//                    var $target = $(target);
//
//                    $('html, body').stop().animate({
//                        'scrollTop': $target.offset().top - 100
//                    }, 900, 'swing');
//
//                    if ($($element).find('.nav li').hasClass('active')) {
//                        $('.nav li').removeClass('active');
//                        $(this).parent().addClass('active');
//                    }
//
//
//                });

//-- working code for on.click ------

                var target_id = $($element).find('.nav a[href^=#]');

                if (target_id) {
                    $(target_id).on('click',function (e) {
                        e.preventDefault();

                        var target = this.hash;
                        var $target = $(target);

                        $('html, body').stop().animate({
                            'scrollTop': $target.offset().top - 100
                        }, 900, 'swing');

                        if ($($element).find('.nav li').hasClass('active')) {
                            $('.nav li').removeClass('active');
                            $(this).parent().addClass('active');
                        }

                    });
                }

                if (target_id) {
                    var $waypoint = $('.waypoint');

                    $waypoint.waypoint(function (direction) {
                        if (direction === 'down'){
                            $('.nav a[href^=#]').find('.nav li').hasClass('active');
                            $('.nav li').removeClass('active');
                            $(this).parent().next().addClass('active');
                        } else {
                            //$(this).parent().addClass('active');

                        }

                        console.log('Waypoint!!!!!!!!');
                    }, {offset:'10%'});
                }


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




