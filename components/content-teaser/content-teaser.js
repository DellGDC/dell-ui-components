angular.module('dellUiComponents')

    .directive('contentTeaserContainer', function() {
	return {
		restrict: 'C',
		link: function($scope, $element, attrs ) {

            $element.find('.content-toggle').on('click', function(event){
                console.log(event);
                var teasers = $('.content-teaser-container');
                _.each(teasers, function(t){
                    console.log($(t).height());
                    $('.content-teaser-container').matchHeight();
                });
            });
		}
	};
});

