/* globals: jQuery, Eve */

/* ======================================================================================
 * Dell-UI-Components: contact-drawer.js
 * http://www.delldesignlibrary.com/components/contact-drawer/
 * ======================================================================================
 * Copyright 2015 Dell, Inc.
 * Licensed under MIT (https://github.com/DellGDC/dell-ui-components/blob/master/LICENSE)
 * ======================================================================================
 */


//Requires jQuery and Eve.js

(function($,Eve){
	Eve.scope('.contact-drawer', function() {
	    this.listen('.contact-drawer-cta', 'click', function(e) {
	      $(e.currentTarget).parent().toggleClass('open');
	    });
	});
})(jQuery,Eve);

