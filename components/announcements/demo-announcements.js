
angular.module('demo').controller('announcementsCtrl',function($scope,$rootScope) {
	//this is for functionality related to demo code

});

angular.module('demo').controller('announcementsPLayDemoCtrl',function($scope,$rootScope,$sce) {
	//this is for functionality related to play demo code


	var titleText,bodyHTML,iconHTML,ctaLinks,announcementId;

	$scope.sampleAnnouncementConfig = {
		type:"blue"
	};

	$scope.$watch('sampleAnnouncementConfig.body', function(newValue, oldValue) {
		//console.log(newValue);
		if(newValue) {
			$scope.sampleAnnouncementConfig.body = newValue.replace(/(?:\r\n|\r|\n)/g, ' <br/>');
		}
		refreshSample();
	});

	$scope.$watch('sampleAnnouncementConfig.type', function(newValue, oldValue) {
		refreshSample();
	});
	$scope.$watch('sampleAnnouncementConfig.title', function(newValue, oldValue) {
		refreshSample();
	});
	$scope.$watch('sampleAnnouncementConfig.id', function(newValue, oldValue) {
		$scope.sampleAnnouncementConfig.id = _.str.dasherize(newValue);
		refreshSample();
	});
	$scope.$watch('sampleAnnouncementConfig.icon', function(newValue, oldValue) {
		refreshSample();
	});
	$scope.$watch('sampleAnnouncementConfig.cta_0.url', function(newValue, oldValue) {
		refreshSample();
	});
	$scope.$watch('sampleAnnouncementConfig.cta_1.url', function(newValue, oldValue) {
		refreshSample();
	});
	$scope.$watch('sampleAnnouncementConfig.cta_0.label', function(newValue, oldValue) {
		refreshSample();
	});
	$scope.$watch('sampleAnnouncementConfig.cta_1.label', function(newValue, oldValue) {
		refreshSample();
	});

	
	function refreshSample() {
			$scope.textkeysToAdd = "";
			$scope.resourcesToAdd = "";
			if($scope.sampleAnnouncementConfig.title) {
				titleText = '\n    <h4>'+$scope.sampleAnnouncementConfig.title+'</h4>';
			} else {
				titleText = "";
			}
			if($scope.sampleAnnouncementConfig.body) {
				if($scope.sampleAnnouncementConfig.body.match(/<.*>|\n/)) {
					//TODO convert markdown
					bodyHTML = '\n    '+$scope.sampleAnnouncementConfig.body;
					$scope.textkeysToAdd = ('"text_announcement_'+_.str.underscored($scope.sampleAnnouncementConfig.id)+'_markdown":"'+$scope.sampleAnnouncementConfig.body+'"');
				} else {
					bodyHTML = '\n    <p>'+$scope.sampleAnnouncementConfig.body+'</p>';
					$scope.textkeysToAdd = '"text_announcement_'+_.str.underscored($scope.sampleAnnouncementConfig.id)+'":"'+$scope.sampleAnnouncementConfig.body+'"';
				}
				
			} else {
				bodyHTML = '\n    <p>Deserunt sint qui cillum cillum eu et ut culpa dolor. Amet sunt culpa nisi exercitation laborum dolore aliquip eu ullamco dolore duis exercitation minim laboris.</p>';
			}

			if($scope.sampleAnnouncementConfig.title) {
				if($scope.sampleAnnouncementConfig.body) {
					$scope.textkeysToAdd += ',\n';
				}
				$scope.textkeysToAdd += '"title_announcement_'+_.str.underscored($scope.sampleAnnouncementConfig.id)+'":"'+$scope.sampleAnnouncementConfig.title+'"';
			}
			if($scope.sampleAnnouncementConfig.id) {
				announcementId = ' id="'+$scope.sampleAnnouncementConfig.id+'"';
			} else {
				announcementId = "";
			}
			//TODO need to create these icons within the theme
			if($scope.sampleAnnouncementConfig.icon) {
				iconHTML = '\n    <img class="icon-large-'+$scope.sampleAnnouncementConfig.icon+'" src="app/dell-ui-site/img/'+$scope.sampleAnnouncementConfig.icon+'.png"/>';
			} else {
				iconHTML = "";
			}

			if($scope.sampleAnnouncementConfig.cta_0 || $scope.sampleAnnouncementConfig.cta_1) {
				ctaLinks="";
				if($scope.sampleAnnouncementConfig.cta_0) {
					ctaLinks += '\n    <p><a href="'+$scope.sampleAnnouncementConfig.cta_0.url+'">'+$scope.sampleAnnouncementConfig.cta_0.label+'</a></p>';
					$scope.resourcesToAdd += '"url_announcement_'+_.str.underscored($scope.sampleAnnouncementConfig.id)+'_cta_0":"'+$scope.sampleAnnouncementConfig.cta_0.url+'"';
					if($scope.textkeysToAdd){
						$scope.textkeysToAdd += ',\n';
					}
					$scope.textkeysToAdd += '"text_announcement_'+_.str.underscored($scope.sampleAnnouncementConfig.id)+'_cta_0":"'+$scope.sampleAnnouncementConfig.cta_0.label+'"';
				}
				if($scope.sampleAnnouncementConfig.cta_1) {
					ctaLinks += '\n    <p><a href="'+$scope.sampleAnnouncementConfig.cta_1.url+'">'+$scope.sampleAnnouncementConfig.cta_1.label+'</a></p>';
					if($scope.resourcesToAdd){
						$scope.resourcesToAdd += ',\n';
					}
					$scope.resourcesToAdd += '"url_announcement_'+_.str.underscored($scope.sampleAnnouncementConfig.id)+'_cta_1":"'+$scope.sampleAnnouncementConfig.cta_1.url+'"';
					if($scope.sampleAnnouncementConfig.cta_0 && $scope.textkeysToAdd) {
						$scope.textkeysToAdd += ',\n';
					}
					$scope.textkeysToAdd += '"text_announcement_'+_.str.underscored($scope.sampleAnnouncementConfig.id)+'_cta_1":"'+$scope.sampleAnnouncementConfig.cta_1.label+'"';
				}
			} else {
				ctaLinks = "";
			}
			
			$scope.playHtmlCode = '<blockquote class="blockquote-'+$scope.sampleAnnouncementConfig.type+'"'+announcementId+'>'+
				iconHTML+
				titleText+
				bodyHTML+
				ctaLinks+
				'\n</blockquote>';
			$scope.renderingHTML = $sce.trustAsHtml($scope.playHtmlCode);
			console.log("$scope.renderingHTML",$scope.renderingHTML);
			$scope.sampleSherpaConfig = _.clone($scope.sampleAnnouncementConfig);
			delete $scope.sampleSherpaConfig.body;
			delete $scope.sampleSherpaConfig.title;

			$rootScope.safeApply();
	}
	refreshSample();
	

});