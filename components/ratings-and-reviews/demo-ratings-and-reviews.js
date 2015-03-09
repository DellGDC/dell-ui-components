
angular.module('demo').controller('ratingsAndReviewsCtrl',function($scope,$rootScope) {
	// this is for functionality related to demo code
	var block = 0;
	var s=0;
	var totalRatings = 0;
	var ratingAverage = 0;
	var a = 0;
	// iterate through rating divs on the page
	$(".ratingBlock").each(function() {
		// grab the data
		var block = $(this).data('reviewStars');//document.querySelector('.ratingBlock');
		console.log(block);
		// check if there are any star ratings
		if (block.length > 1) {
			//there is rating data
			s = block; //store data in an array
			totalRatings = (s[0]+s[1]+s[2]+s[3]+s[4]); //total number of ratings
			ratingAverage = ((s[0]+(s[1]*2)+(s[2]*3)+(s[3]*4)+(s[4]*5))/totalRatings).toFixed(1);// get average and store it
			//inject content on the page
			$(this).html( "<div style='width:100%;' class='pull-left'><div class='starbox pull-left yesRatings'><span data-rate='1'>☆</span><span data-rate='2'>☆</span><span data-rate='3'>☆</span><span data-rate='4'>☆</span><span data-rate='5'>☆</span></div><div class='pull-left reviewText'>([<a href='#' class='linkStyle'>"+totalRatings+"</a>]<a href='#' class='linkStyle'> Ratings</a>)</div><div class='pull-left reviewText'><a href='#' class='linkStyle'>Write your review</a></div></div>" );
			$(this).data('userRating', ratingAverage);
			//set current user rating stars
			a = "span:nth-child("+Math.floor(parseInt($( this ).data('userRating')))+")"; 
			//render stars
			$( a, $(this) ).prevAll().andSelf().addClass( 'yesRatings');
			$( a, $(this) ).prevAll().andSelf().removeClass( 'noRatings');
			$( a, $(this) ).prevAll().andSelf().html( '★');
			$( a, $(this) ).nextAll().addClass( 'noRatings');
			$( a, $(this) ).nextAll().removeClass( 'yesRatings');
			$( a, $(this) ).nextAll().html( '☆');
		}	else {
			//nope, no data... just render the blank stars
			$(this).html( '<div class="starbox pull-left"><span data-rate="1">☆</span><span data-rate="2">☆</span><span data-rate="3">☆</span><span data-rate="4">☆</span><span data-rate="5">☆</span></div><div class="pull-left reviewText">(<a href="#" class="linkStyle">Write your review</a>)</div>' );
			a = "span:nth-child("+Math.floor(parseInt($( this ).data('userRating')))+")"; 
			//render stars
		    $( a, $(this) ).prevAll().andSelf().addClass( 'yesRatings');
			$( a, $(this) ).prevAll().andSelf().removeClass( 'noRatings');
			$( a, $(this) ).prevAll().andSelf().html( '★');
			$( a, $(this) ).nextAll().addClass( 'noRatings');
			$( a, $(this) ).nextAll().removeClass( 'yesRatings');
			$( a, $(this) ).nextAll().html( '☆');
		}
		if ($(this).data('histogram') === "yes") {
			$( this ).addClass( 'histogramBlock');
			$( this ).removeClass( 'ratingBlock');
			console.log(totalRatings, ratingAverage);
			$(this).append( "<div style='width:100%;' class='pull-left'><p>["+ratingAverage+"] out of 5</p></div><div style='width:100%;' class='pull-left'><table width='80%'><tr><td width='15%'>5 star</td><td width='70%' class='barG'><div class='histBar' style='width:"+Math.floor((s[4]/totalRatings)*217)+"px;'>&nbsp;</div></td><td width='15%'>("+s[4]+")</td></tr><tr><td>4 star</td><td class='barG'><div class='histBar' style='width:"+Math.floor((s[3]/totalRatings)*217)+"px;'>&nbsp;</div></td><td>("+s[3]+")</td></tr><tr><td>3 star</td><td class='barG'><div class='histBar' style='width:"+Math.floor((s[2]/totalRatings)*217)+"px;'>&nbsp;</div></td><td>("+s[2]+")</td></tr><tr><td>2 star</td><td class='barG'><div class='histBar' style='width:"+Math.floor((s[1]/totalRatings)*217)+"px;'>&nbsp;</div></td><td>("+s[1]+")</td></tr><tr><td>1 star</td><td class='barG'><div class='histBar' style='width:"+Math.floor((s[0]/totalRatings)*217)+"px;'>&nbsp;</div></td><td>("+s[0]+")</td></tr></table></div>" );
		}
	});

	//star rating hover function
	$( ".starbox > span" ).hover( function() {
			$(this).prevAll().andSelf().addClass( 'yesRatings');
			$(this).prevAll().andSelf().removeClass( 'noRatings');
			$(this).prevAll().andSelf().html( '★');
			$(this).nextAll().addClass( 'noRatings');
			$(this).nextAll().removeClass( 'yesRatings');
			$(this).nextAll().html( '☆');
		});

	//click to set user rating
	$( ".starbox > span" ).click(function() {
			//set user rating
		    $( this ).parent().parent().data('userRating', Math.floor(parseInt($( this ).data('rate'))));
		});
	$( ".starbox" )
		.mouseout(function() {
			//set current user rating stars
			a = "span:nth-child("+Math.floor(parseInt($( this ).parent().data('userRating')))+")"; 
			console.log(a);
			//render stars
			$( a, $(this) ).prevAll().andSelf().addClass( 'yesRatings');
			$( a, $(this) ).prevAll().andSelf().removeClass( 'noRatings');
			$( a, $(this) ).prevAll().andSelf().html( '★');
			$( a, $(this) ).nextAll().addClass( 'noRatings');
			$( a, $(this) ).nextAll().removeClass( 'yesRatings');
			$( a, $(this) ).nextAll().html( '☆');
		});

});

angular.module('demo').controller('ratingsAndReviewsPLayDemoCtrl',function($scope,$rootScope,$sce) {
	//this is for functionality related to play demo code

});

