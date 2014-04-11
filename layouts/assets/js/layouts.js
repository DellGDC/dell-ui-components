// Layouts Documentation

angular.module('sherpaApp.layouts', [])
	.controller('layoutsController', [
	            '$sce', 'sherpa', '$scope', '$rootScope', '$state',
	    function($sce,   sherpa,   $scope,   $rootScope,   $state){

	    $scope.current_layout = {};
	    sherpa.api({action:"get_layouts",path:sherpa.config.project.paths.layouts}).then(function(result){
	      $rootScope.layouts = [];
	      _.each(result.data, function(layout){
	        $rootScope.layouts.push({
	          url:sherpa.config.project.paths.layouts+layout,
	          id:layout.replace(".html",""),
	          label:_.str.titleize(_.str.humanize(layout.replace(".html",""))),
	          thumnail_url:sherpa.config.project.paths.layouts.replace("/templates/","/assets/img/")+layout.replace(".html","-thumbnail.jpg")
	        })

	      });

	      console.log(">>>>LAYOUTS>>>> ",$rootScope.layouts);
	    });
	    $scope.switchLayout = function(layout){
	    	event.preventDefault();
	    	if(!layout){
	    		$scope.current_layout = {};
	    	} else {
	    		$scope.current_layout = layout;
	    	}
	    	$state.go("layouts."+layout.id);
	    }

	  }])

