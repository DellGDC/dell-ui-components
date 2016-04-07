angular.module('dellUiComponents').directive('truncate', function() {
	return {
		restrict: 'A',
		link: function(scope, element, attrs, fn) {
			var textToTruncate = element.text(),charCount = attrs.truncate;
			if(!charCount) { 
				charCount = 140;
			}
			if(textToTruncate.length > charCount) {
				textToTruncate = textToTruncate.substring(0,charCount) + "...";
				element.text(textToTruncate);
			}
		}
	};
});