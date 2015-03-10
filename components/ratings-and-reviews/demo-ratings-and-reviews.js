
angular.module('demo').controller('ratingsAndReviewsCtrl',function($scope,$rootScope) {
	// this is for functionality related to demo code
	var block = 0;
	var s=0;
	var totalRatings = 0;
	var ratingAverage = 0;
	var a = 0;
	var thisVar = 0;
	var perCent = 0;
	var recs = 0;
	var totalUsers = 0;

	function renderStars(contextPath, thisVar, perCent) {
		//render stars
	    $( contextPath, thisVar ).prevAll().andSelf().addClass( 'yesRatings');
		$( contextPath, thisVar ).prevAll().andSelf().removeClass( 'noRatings');
		$( contextPath, thisVar ).prevAll().andSelf().html( '<i class="icon-small-favorite-100"></i>');
		$( contextPath, thisVar ).nextAll().addClass( 'noRatings');
		$( contextPath, thisVar ).nextAll().removeClass( 'yesRatings');
		$( contextPath, thisVar ).nextAll().html( '<i class="icon-small-favorite-0"></i>');
		$( contextPath, thisVar ).next().html( '<i class="icon-small-favorite-'+(perCent*10) % 10+'0"></i>');
		console.log((perCent*10) % 10);
	}

	// iterate through recomends divs on the page
	$(".recoRatio").each(function() {
		$(this).html( "<strong style='font-size:15px;'>"+$( this ).data('recs')+"</strong> out of <strong style='font-size:15px;'>"+$( this ).data('total')+"</strong> ("+Math.floor((parseInt($( this ).data('recs'))/parseInt($( this ).data('total')))*100)+"%) people would recommend this product to a friend" );
	});

	// iterate through rating divs on the page
	$(".ratingBlock").each(function() {
		// grab the data
		var block = $(this).data('reviewStars');
		// check if there are any star ratings
		if (block.length > 1) {
			//there is rating data
			s = block; //store data in an array
			totalRatings = (s[0]+s[1]+s[2]+s[3]+s[4]); //total number of ratings
			ratingAverage = ((s[0]+(s[1]*2)+(s[2]*3)+(s[3]*4)+(s[4]*5))/totalRatings).toFixed(1);// get average and store it
			//inject content on the page
			$(this).html( "<div style='width:100%;' class='pull-left'><div class='starbox pull-left yesRatings'><span data-rate='1'><i class='icon-small-favorite-0'></i></span><span data-rate='2'><i class='icon-small-favorite-0'></i></span><span data-rate='3'><i class='icon-small-favorite-0'></i></span><span data-rate='4'><i class='icon-small-favorite-0'></i></span><span data-rate='5'><i class='icon-small-favorite-0'></i></span></div><div class='pull-left reviewText'><div class='pointy text-blue bold-12 pull-left'>"+totalRatings+"&nbsp;</div><div class='pointy text-blue bold-12 pull-left'> Ratings</div></div><div class='pull-right reviewText'><div class='pointy text-blue bold-12'>Write your review</div></div></div>" );
			$(this).data('userRating', ratingAverage);
			//set current user rating stars
			a = "span:nth-child("+Math.floor(parseInt($( this ).data('userRating')))+")"; 
			//render stars
			renderStars(a, $(this), $( this ).data('userRating'));
		}	else {
			//nope, no data... just render the blank stars
			$(this).html( '<div style="width:100%;" class="pull-left"><div class="starbox pull-left"><span data-rate="1"><i class="icon-small-favorite-0"></i></span><span data-rate="2"><i class="icon-small-favorite-0"></i></span><span data-rate="3"><i class="icon-small-favorite-0"></i></span><span data-rate="4"><i class="icon-small-favorite-0"></i></span><span data-rate="5"><i class="icon-small-favorite-0"></i></span></div><div class="pull-left reviewText"><div class="linkStyle text-blue">Write your review</div></div>' );
			a = "span:nth-child("+Math.floor(parseInt($( this ).data('userRating')))+")"; 
			//render stars
			renderStars(a, $(this), $( this ).data('userRating'));
		}
		if ($(this).data('histogram') === "yes") {
			$( this ).addClass( 'histogramBlock');
			$( this ).removeClass( 'ratingBlock');
			$(this).append( "<div style='width:100%;' class='pull-left'><p>"+ratingAverage+" out of 5</p></div><div style='width:100%;' class='pull-left'><table width='100%'><tr height='24px'><td width='15%'>5 Stars</td><td width='70%'><div class='barG'><div class='histBar well-blue' style='width:"+Math.floor((s[4]/totalRatings)*217)+"px;'>&nbsp;</div></div></td><td width='15%'>&nbsp;&nbsp;"+s[4]+"</td></tr><tr><td>4 Stars</td><td><div class='barG'><div class='histBar well-blue' style='width:"+Math.floor((s[3]/totalRatings)*217)+"px;'>&nbsp;</div></div></td><td>&nbsp;&nbsp;"+s[3]+"</td></tr><tr><td>3 Stars</td><td><div class='barG'><div class='histBar well-blue' style='width:"+Math.floor((s[2]/totalRatings)*217)+"px;'>&nbsp;</div></div></td><td>&nbsp;&nbsp;"+s[2]+"</td></tr><tr><td>2 Stars</td><td><div class='barG'><div class='histBar well-blue' style='width:"+Math.floor((s[1]/totalRatings)*217)+"px;'>&nbsp;</div></div></td><td>&nbsp;&nbsp;"+s[1]+"</td></tr><tr><td>1 Star</td><td><div class='barG'><div class='histBar well-blue' style='width:"+Math.floor((s[0]/totalRatings)*217)+"px;'>&nbsp;</div></div></td><td>&nbsp;&nbsp;"+s[0]+"</td></tr></table></div>" );
		}
	});

	//star rating hover function
	$( ".starbox > span" )
		.mouseenter( function() {
			$(this).prevAll().andSelf().addClass( 'yesRatings');
			$(this).prevAll().andSelf().removeClass( 'noRatings');
			$(this).prevAll().andSelf().html( '<i class="icon-small-favorite-100"></i>');
			$(this).nextAll().addClass( 'noRatings');
			$(this).nextAll().removeClass( 'yesRatings');
			$(this).nextAll().html( '<i class="icon-small-favorite-0"></i>');
			console.log("Hover!");
		})
		.click(function() {
			//set user rating
			$( this ).parent().parent().data('userRating', Math.floor(parseInt($( this ).data('rate'))));
			console.log("Click!");
	});

	//click to set user rating
	$( ".starbox > span" ).on("click", function(){
		//set user rating
		$( this ).parent().parent().data('userRating', Math.floor(parseInt($( this ).data('rate'))));
		console.log("Click!");
	});

	$( ".starbox" ).mouseout(function() {
		//set current user rating stars
		a = "span:nth-child("+Math.floor(parseInt($( this ).parent().parent().data('userRating')))+")"; 
		//render stars
		if ($( this ).parent().parent().data('userRating')===0) {
			$( "span:nth-child(5)", $(this) ).prevAll().andSelf().addClass('noRatings');
			$( "span:nth-child(5)", $(this) ).prevAll().andSelf().removeClass('yesRatings');
			$( "span:nth-child(5)", $(this) ).prevAll().andSelf().html('<i class="icon-small-favorite-0"></i>');
		}	else	{
			renderStars(a, $(this), $( this ).parent().parent().data('userRating'));
		}
	});

});

angular.module('demo').controller('ratingsAndReviewsPLayDemoCtrl',function($scope,$rootScope,$sce) {
	//this is for functionality related to play demo code

});


	
