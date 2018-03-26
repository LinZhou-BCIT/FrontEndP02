// Show Mobile Menu Script
(function($){

    'use strict';

    const $body = $('body');
    const $hamburger = $('.hamburger');

    $hamburger.click(function(){
        $body.toggleClass('show');
    });

})(jQuery);