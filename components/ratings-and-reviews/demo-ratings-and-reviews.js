
angular.module('demo').controller('ratingsAndReviewsCtrl',function($scope,$rootScope) {
	// this is for functionality related to demo code

	// iterate through rating divs on the page
	$(".ratingBlock").each(function() {
		// grab the data
		var block = $(this).data('reviewStars');//document.querySelector('.ratingBlock');
		console.log(block);
		// check if there are any star ratings
		if (block.length > 1) {
			//there is rating data
	 		s = block; //store data in an array
	 		totalRatings = (s[0]+s[1]+s[2]+s[3]+s[4]) //total number of ratings
	 		ratingAverage = ((s[0]+(s[1]*2)+(s[2]*3)+(s[3]*4)+(s[4]*5))/totalRatings).toFixed(1);// get average and store it
	 		//inject content on the page
	 		$(this).html( "<div class='starbox pull-left yesRatings'>☆☆☆☆☆</div><div class='pull-left reviewText'>([<a href='#' class='linkStyle'>"+totalRatings+"</a>]<a href='#' class='linkStyle'> Ratings</a>)</div><div class='pull-left reviewText'><a href='#' class='linkStyle'>Write your review</a></div>" );

	 	}	else {
	 		//nope, no data... just render the blank stars
			$(this).html( "<div class='starbox pull-left'>☆☆☆☆☆</div><div class='pull-left reviewText'>(<a href='#' class='linkStyle'>Write your review</a>)</div>" );
		} 
	})

});

angular.module('demo').controller('ratingsAndReviewsPLayDemoCtrl',function($scope,$rootScope,$sce) {
	//this is for functionality related to play demo code

});
