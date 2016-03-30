(function($) {
    $.dellUIsiteWideMessaging = function (el, options) {
        // To avoid scope issues, use 'base' instead of 'this'
        // to reference this class from internal events and functions.
        var base = this;

        // Access to jQuery and DOM versions of element
        base.$el = $(el);
        base.el = el;

        // Add a reverse reference to the DOM object
        base.$el.data("dellUIsiteWideMessaging", base);
    };
    $.dellUIsiteWideMessaging.defaultOptions = {
        xsMax: 750,
        smMin: 751,
        smMax: 975,
        mdMin: 974,
        mdMax: 1141,
        dosomething: ""
    };
    $.fn.dellUIsiteWideMessaging = function (options) {
        if (options) {
            $.dellUIsiteWideMessaging.defaultOptions = $.extend($.dellUIsiteWideMessaging.defaultOptions, options);
        }
        var message = document.getElementById('siteWideMessage');
         var deadline = message.dataset.counterDeadline;
         var desktopText = message.dataset.desktopOriginalText;
         var desktopText2 = message.dataset.desktopReplacementText;
         var mobileText = message.dataset.mobileOriginalText;
         var mobileText2 = message.dataset.mobileReplacementText;
         var cta = message.dataset.cta;
         var optionalCta = message.dataset.optionalCta;
         var mobileCta = message.dataset.optionalCtaMobile;
         var imageOption = message.dataset.optionalImage;
         var templates = {};
         var changeText;

         if (!desktopText) {
         alert('Please enter desktop text');
         }
         if (!mobileText) {
         alert('Please enter mobile text');
         }
         if (!cta) {
         alert('Please enter CTA text');
         }
         function changeDesktopText() {
         desktopText = message.dataset.desktopReplacementText;
         $('.desktop-countdown').css('display', 'none');
         }
         function changeMobileText() {
         mobileText = message.dataset.mobileReplacementText;
         $('.mobile-countdown').css('display', 'none');
         }
         templates.desktopCountDown = [
             "<ul class='list-inline pull-right'>",
             "<li>",
             " <span class='hours'></span>",
             "<small>HRS</small>",
             "</li>",
             "<li>:</li>",
             "<li>",
             "<span class='minutes'></span>",
             "<small>MIN</small>",
             "</li>",
             "<li>:</li>",
             "<li>",
             "<span class='seconds'></span>",
             "<small>SEC</small>",
             "</li>",
             "</ul>"
         ].join("\n");

         templates.mobileCountDown = [
             "<span><span class='hours'></span>&nbsp;:&nbsp;<span class='minutes'>&nbsp;:&nbsp;</span>&nbsp;:&nbsp;<span class='seconds'></span>&nbsp;|</span>"
         ].join("\n");

         $('#desktopCountDown').append(templates.desktopCountDown);
         $('#mobileCountDown').append(templates.mobileCountDown);

        return this.each(function () {
            (new $.dellUIsiteWideMessaging(this));
            var options = $.dellUIsiteWideMessaging.defaultOptions,
            breakpoint = function () {
                var window_size = $(window).width(),
                    breakpoint = {
                        isXS: false,
                        isSM: false,
                        isMD: false,
                        isLG: false
                    };
                switch (true) {
                    case (window_size < options.xsMax):
                        breakpoint.isXS = true;
                        break;
                    case (window_size > options.smMin && window_size < options.smMax):
                        breakpoint.isSM = true;
                        break;
                    case (window_size > options.mdMin && window_size < options.mdMax):
                        breakpoint.isMD = true;
                        break;
                    default:
                        breakpoint.isLG = true;
                        break;
                }
                return breakpoint;

            },
        // detects breakpoint and whether there is post-deadline replacement text and loads appropriate text
            writeDesktopTxt = function () {
                //checks to see if deadline is met and loads replacement text
                if (changeText === true) {
                    changeDesktopText();
                }
                //updates DOM based on breakpoint
                $('.site-wide-messaging-text').empty();
                $('.site-wide-messaging-text').append(desktopText);
                $('.site-wide-messaging-cta-optional').css('visibility', 'visible');
                $('.site-wide-messaging-product-image > img').attr("src", imageOption);
                $('.site-wide-messaging-product-image')
                    .css({
                        'visibility': 'visible',
                        'width': '78px'
                    }
                );
            },
        // detects breakpoint and whether there is post-deadline replacement text and loads appropriate text
            writeMobileTxt = function () {
                //checks to see if deadline is met and loads replacement text
                if (changeText === true) {
                    changeMobileText();
                }
                //updates DOM based on breakpoint
                $('.site-wide-messaging-text').empty();
                $('.site-wide-messaging-text').append(mobileText);
                if (mobileCta === 'true') {
                    $('.site-wide-messaging-cta-optional').css('visibility', 'visible');
                }
                if (mobileCta === 'false') {
                    $('.site-wide-messaging-cta-optional').css('visibility', 'hidden');
                }
                $('.site-wide-messaging-product-image')
                    .css({
                        'visibility': 'hidden',
                        'width': '0'
                    }
                );
            },
            getTimeRemaining = function (endtime) {
                var t = Date.parse(endtime) - Date.parse(new Date());
                var seconds = Math.floor((t / 1000) % 60);
                var minutes = Math.floor((t / 1000 / 60) % 60);
                var hours = Math.floor((t / (1000 * 60 * 60))); //divide this with remainder operative % 24 to break down by day
                //var days = Math.floor(t / (1000 * 60 * 60 * 24));  // Use this to add a day field
                return {
                    'total': t,
                    // 'days': days,
                    'hours': hours,
                    'minutes': minutes,
                    'seconds': seconds
                };
            },
            initializeClock = function (id, endtime) {
                var clock = document.getElementById(id);
                //var daysSpan = clock.querySelector('.days');
                var hoursSpan = clock.querySelectorAll('.hours');
                var minutesSpan = clock.querySelectorAll('.minutes');
                var secondsSpan = clock.querySelectorAll('.seconds');
                console.log('hourspan', hoursSpan);
                function updateClock() {
                    var t = getTimeRemaining(endtime);

                    //daysSpan.innerHTML = t.days;
                    /*[].forEach.call(daysSpan, function(span) {
                     // do whatever
                     span.innerHTML = ('0' + t.days).slice(-2);
                     });*/

                    //updates time in the view
                    [].forEach.call(hoursSpan, function (span) {
                        span.innerHTML = ('0' + t.hours).slice(-2);
                    });
                    [].forEach.call(minutesSpan, function (span) {
                        span.innerHTML = ('0' + t.minutes).slice(-2);
                    });
                    [].forEach.call(secondsSpan, function (span) {
                        span.innerHTML = ('0' + t.seconds).slice(-2);
                    });

                    if (t.total <= 0) {
                        clearInterval(timeinterval);
                    }
                    //triggers event when deadline is met
                    if (t.total === 0) {
                        $(message).trigger('countdownFinished', {});
                    }
                    $(message).on('countdownFinished', function () {
                        $('.desktop-countdown').css('display', 'none');
                        $('.mobile-countdown').css('display', 'none');
                        if (desktopText2 && mobileText2) {
                            changeText = true;
                            if (!breakpoint().isXS) {
                                changeDesktopText();
                                $('.site-wide-messaging-text').empty();
                                $('.site-wide-messaging-text').append(desktopText);
                            }
                            if (breakpoint().isXS) {
                                changeMobileText();
                                $('.site-wide-messaging-text').empty();
                                $('.site-wide-messaging-text').append(mobileText);
                            }
                        }
                        if (!desktopText2 || !mobileText2) {
                            $('.site-wide-messaging').css('display', 'none');
                        }
                    });
                }

                console.log('breakpoint', breakpoint().isXS);
                updateClock();
                var timeinterval = setInterval(updateClock, 1000);
            };
            // initializes clock based on message ID in view and deadline set it view
            initializeClock(message.id, deadline);

            // These conditions load the original content based on data attributes that are populated by designer in the view

            if ((desktopText !== '') && !breakpoint().isXS) {
                $('.site-wide-messaging-text').append(desktopText);
            }
            if ((mobileText !== '') && breakpoint().isXS) {
                $('.site-wide-messaging-text').append(mobileText);
            }
            if (cta === '') {
                $('#cta').append('Add CTA');
            } else {
                $('#cta').append('&nbsp;' + cta);
            }
            if (optionalCta !== '') {
                $('.site-wide-messaging-cta-optional > a').append(optionalCta);
            } else {
                $('.site-wide-messaging-cta-optional').css('display', 'none');
            }
            if ((mobileCta === 'true') && breakpoint().isXS) {
                $('.site-wide-messaging-cta-optional').css('visibility', 'visible');
            }
            if ((mobileCta === 'false') && breakpoint().isXS) {
                $('.site-wide-messaging-cta-optional').css('visibility', 'hidden');
            }
            if (!breakpoint().isXS) {
                $('.site-wide-messaging-cta-optional').css('visibility', 'visible');
            }

            if ((imageOption !== '') && !breakpoint().isXS) {
                $('.site-wide-messaging-product-image > img').attr("src", imageOption);
            } else {
                $('.site-wide-messaging-product-image')
                    .css({
                        'visibility': 'hidden',
                        'width': '0'
                    }
                );
            }
            var breakUpdate1 = breakpoint().isXS;
            // if not XS - this calculates window size and  loads the right text on breakpoint transition
            if (breakUpdate1 === false) {
                $(window).resize(function () {
                    breakpoint();
                    var breakUpdate2 = breakpoint().isXS;
                    console.log('breakUpdate2', breakUpdate2);
                    if (breakUpdate2) {
                        writeMobileTxt();
                    } else {
                        writeDesktopTxt();
                    }
                });
            }
            // if is XS - this calculates window size and  loads the right text on breakpoint transition
            if (breakUpdate1 === true) {
                $(window).resize(function () {
                    breakpoint();
                    var breakUpdate2 = breakpoint().isXS;
                    console.log('breakUpdate2', breakUpdate2);
                    if (!breakUpdate2) {
                        writeDesktopTxt();
                    } else {
                        writeMobileTxt();

                    }
                });
            }

        });
    };

})(jQuery);
