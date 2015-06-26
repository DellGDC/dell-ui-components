


Eve.scope('.contact-drawer', function() {

    this.listen('.contact-drawer-cta', 'click', function(e) {
      var contactDrawer = $(e.currentTarget).parents('.contact-drawer');
      contactDrawer.toggleClass('open');
    });

});

