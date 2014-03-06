// Page level libraries
$script([
	"lib/sherpa/design_library/styleguide/lib/google-code-prettify/prettify.js", 
	"lib/sherpa/design_library/styleguide/lib/ZeroClipboard.js"
],"styleguideBundle");

$style("lib/sherpa/design_library/styleguide/assets/styles/styleguide.less")

//TODO convert to directive that requires no change to bootstrap native code
/*sherpaApp.directive('affixAside', function(){
	return function(scope, elem, attr) {

	}
});*/

/*var initAside = function(selector){	
	$(selector).affix({
        offset: {
          top: function () { return $('.docs-masthead').height() },
          bottom: 270
        }
    })
    var fixWidth = function(){ 
    	var offset = 0;
    	if(Sherpa.viewModel.IsTabletDevice) {
    		offset = 36;
    	}
    	if(Sherpa.viewModel.IsPhoneDevice) {
    		offset = 0;
    	}
    	$(selector).width($(selector).parent().width()-offset);
    }
	$(window).resize(function() {
		fixWidth();
	});    
	fixWidth();
}
*/

function initPrettyPrint(){

	window.setTimeout(function(){
		$('pre').addClass('prettyprint linenums');
		$script.ready("styleguideBundle", function(){
			prettyPrint();
		});
	},1000);

}


angular.module('sherpaApp.styleguide', [])

.directive('copysample', function(){
  return function(scope, elem, attr) {
  	var target_selector = attr.copysample;
  	$(elem).html($(target_selector)[0].innerHTML.replace(/</g,'&lt;'));
  }
})

.directive('loadclipboardtext', function(){
  return function(scope, elem, attr) {
  	var target_selector = attr.loadclipboardtext;
	var html = $(target_selector).clone(), list = html.find('ul').clone(),
		comment = '\n\t\t<!-- '+html.attr('id').replace(/#/,'');

	if(html.find('ul')) {
		comment += '\n\t\t\tOptions:';
		comment += _.str.rstrip(_.str.stripTags(list.html()));
	}
	comment += '\n\t\t-->';
	html.prepend(comment);
	html.find('hr').remove();
	html.find('ul').remove();
	html.find('button').remove();
	html.find('p').remove();
	html.find('h4').remove();
	//html.find('.well').remove();
	html.find('\p\p').remove();
	html.removeAttr('id');
	html = '\t'+html[0].outerHTML;

  	$(elem).attr('data-clipboard-text',html);
  	//data-clipboard-text
  }
})



// Controllers 

.controller("docsMastheadController", function($scope, $timeout, projectInfo) {

	$scope.routes = Sherpa.styleguideRoutes;
	//$scope.$state = $state;
	//$scope.current_name = $state.current.name;
	$scope.project_info = projectInfo;

	$scope.toggleAlienware = function(){
		if($scope.isAlienware) {
			$('body').addClass('alienware');
			$scope.isAlienware =  true;
		} else {
			$('body').removeClass('alienware');
			$scope.isAlienware =  false;
		}
	}
	/*$timeout(function(){
		$('[data-toggle="tooltip"]').tooltip();
	},300);*/

	if($('body').hasClass('alienware')){
		$scope.isAlienware =  true;
		console.log("alienware on")
	} else {
		$scope.isAlienware =  false;
		console.log("alienware off")
	}


})

.controller("styleguideController", function($scope,$timeout,$rootScope,coreConfig,projectConfigs) {

 	//$('.footer-back-to-top').show();
 	$scope.projectConfigs = projectConfigs;
	$scope.prettyPrint = initPrettyPrint(); //TODO make directive to do this with class
	//$scope.initAside = initAside('.styleguide-aside'); //TODO to make directive
	$scope.initAside = function(){}; //TODO need to fixs
	$scope.sections = Sherpa.styleguideRoutes;
	$scope.getSectionUrl = function(id){
		return "#/"+id.replace(".","/");
	}

	$scope.example_modal = {
		title:'Hello my friend',
		body: 'I am a simple demo modal!',
		footer: '<a href="#" class="btn">Close</a> <a href="#" class="btn btn-primary">Save changes</a>',
		dismiss:true
	}
	$script.ready("styleguideBundle", function(){
		window.setTimeout(function(){
			activateClipboard();
		},1000);
	});
	$scope.activateClipboard = activateClipboard();
	$scope.scrollToTop = function(){
		$timeout(function(){
			$('.styleguide-aside').removeClass('affix');
			activateClipboard();
		},300);
		$.scrollTo('#masthead',300);
	}
/*	$scope.initTooltips = function(){
		$('[data-toggle="tooltip"]').tooltip();
	}
	$scope.initPopovers = function(){
		$('[data-toggle="popover"]').popover({trigger:'manual'});
		$('[data-toggle="popover"]').click(function(event){
		  event.preventDefault();
		  $('[data-toggle="popover"]').popover('destroy');
		  $(this).popover('show');
		  $('[data-dismiss="popover"]').click(function(event){
		    event.preventDefault();
		    $(this).parents('.popover').prev().popover('hide');
		  });
		});
		$('[data-toggle="popover"][data-trigger="hover"]').mouseover(function(event){
		  event.preventDefault();
		  $('[data-toggle="popover"]').popover('destroy');
		  $(this).popover('show');
		});
		$('[data-toggle="popover"][data-trigger="hover"]').mouseout(function(event){
		  $(this).popover('destroy');
		});
		$('[data-toggle="popover"][data-trigger="hover"]').focus(function(event){
		  $('[data-toggle="popover"]').popover('destroy');
		  $(this).popover('show');
		});
		 
		$('#custom-popover').click(function(event){
		  event.preventDefault();
		  $(this).popover('show');
		  $('[data-dismiss="popover"]').click(function(event){
		    event.preventDefault();
		    $(this).parents('.popover').prev().popover('hide');
		  });
		});
	}
	$scope.popoversHTML = (function(){
		var html = []
		_.each($('#popover-example-HTML [data-toggle="popover"]'), function(popover){
			var tempObj = {};
			tempObj.clipboardText = popover;
			tempObj.exampleHTML = popover.replace((/</g,'&lt;'));
			html.push(tempObj);
			console.log(html)
		});
		return html;
	})();
	$timeout(function(){
		$scope.paginationHTML = (function(){
			return $('#pagination-example-HTML .pagination');
		})();

	},1000);*/
	$scope.changeTabs = function(new_val){
		if(new_val==="tabs-aside"){

			var html = $('#tabbable-aside-example-HTML').html();
			$('#tabs-HTML-code').html(html.replace(/\</g,"&lt;"));
			$('#tabs-HTML-code').removeClass("prettyprinted");
			$('#tabs-HTML button').attr('data-clipboard-text',html);
			initPrettyPrint();
			$('#tabbable-example-HTML').hide();
			$('#tabbable-aside-example-HTML').show();
			$.scrollTo('#tabs-lists-pills',300,{offset:-20})
		} else {
			var new_class = "tabbable "+$(event.currentTarget).val();
			$('#tabbable-example-HTML > .tabbable').attr('class', new_class);
			var html = $('#tabbable-example-HTML').html();
			$('#tabs-HTML-code').html(html.replace(/\</g,"&lt;"));
			$('#tabs-HTML-code').removeClass("prettyprinted");
			$('#tabs-HTML button').attr('data-clipboard-text',html);
			initPrettyPrint();
			$('#tabbable-example-HTML').show();
			$('#tabbable-aside-example-HTML').hide();
			$.scrollTo('#tabs-lists-pills',300,{offset:-20})
		}

		/* tabs-HTML">
         <button class="btn btn-mini" data-copy="2-clipboard" data-clipboard-text

         */
		
	}
	$scope.toggleListAside = function(){
		if($(event.currentTarget).context.checked) {
			$scope.showListAside = true;
			console.log("show list aside",$scope.showListAside)
		} else {
			$scope.showListAside = false;
			console.log("hide list aside",$scope.showListAside)
		}
	};
	$scope.colors = coreConfig.defaultDellColors;
	$scope.defaultColor = _.find($scope.colors,function(item){return item.color == "blue"});
	$scope.selectedTextColor = $scope.defaultColor;
	$scope.switchTextColor = function(item) {
		event.preventDefault();
		$scope.selectedTextColor=item;
	}
	$scope.selectedTableColor = $scope.defaultColor;
	$scope.switchTableColor = function(item) {
		event.preventDefault();
		$scope.selectedTableColor=item;
	}


	$scope.defaultColorNames= [
        {
            "color":"gray-dark",
            "label":"Dark Gray",
            "labelColor":"text-white"
        },
        {
            "color":"gray-medium",
            "label":"Medium Gray",
            "labelColor":"text-white"
        },
        {
            "color":"gray",
            "label":"Gray",
            "labelColor":"text-white"
        },
        {
            "color":"gray-light",
            "label":"Light Gray",
            "labelColor":""
        },
        {
            "color":"gray-very-light",
            "label":"Very Light Gray"
        },
        {
            "color":"white",
            "label":"White",
            "labelColor":""
        },
        {
            "color":"blue",
            "label":"Blue",
            "labelColor":"text-white"
        },
        {
            "color":"green",
            "label":"Green",
            "labelColor":""
        },
        {
            "color":"yellow",
            "label":"Yellow",
            "labelColor":""
        },
        {
            "color":"orange",
            "label":"Orange",
            "labelColor":"text-white"
        },
        {
            "color":"red",
            "label":"Red",
            "labelColor":"text-white"
        },
        {
            "color":"red-dark",
            "label":"Dark Red",
            "labelColor":"text-white"
        },
        {
            "color":"berry",
            "label":"Berry",
            "labelColor":"text-white"
        },
        {
            "color":"purple",
            "label":"Purple",
            "labelColor":"text-white"
        },
        {
            "color":"teal",
            "label":"Teal",
            "labelColor":""
        }

    ]

})

.controller("footerController", function($scope, projectInfo) {

	
    $scope.project_info = projectInfo;
	$scope.init = function(){
		//$('.footer-back-to-top').affix();
	}

});




function activateClipboard(){
	var clip = new ZeroClipboard( $('[data-copy="2-clipboard"]'), {
	  moviePath: "lib/sherpa/design_library/styleguide/lib/ZeroClipboard.swf"
	} );

	clip.on( 'load', function(client) {
	  // alert( "movie is loaded" );
	} );

	clip.on( 'complete', function(client, args) {
	  //TODO need to do global modal
	  Sherpa.publish("modal", {
	    title:'Your HTML is in your clipboard',
	    body: args.text,
	    dismiss:true
	  });
	  window.setTimeout(function(){Sherpa.publish("modal","hide")}, 3000);

	} );

	clip.on( 'mouseover', function(client) {
	  // alert("mouse over");

	} );

	clip.on( 'mouseout', function(client) {
	  // alert("mouse out");
	} );

	clip.on( 'mousedown', function(client) {

	  // alert("mouse down");
	} );

	clip.on( 'mouseup', function(client) {
	  // alert("mouse up");
	} );		
}

