/**
 * Created by Clint_Batte on 8/26/2015.
 */
(function($,Eve){
    Eve.scope('*', function() {
        this.listen('a.scroll', 'click', function(e) {
            e.preventDefault();

            $.scrollTo($(e.currentTarget).attr('href'),800,  {axis:'y'});
            console.log('hello, I was clicked');
        });
    });
})(jQuery,Eve);
