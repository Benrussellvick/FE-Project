// Share ----------------------------
var breakpoint = require('./breakpoint.js');
(function ($) { 

    $("#js-share").click(function(e){
        e.preventDefault();

         if ($(".open").hasClass("close")) { 
             $(".open").removeClass("close");
             $(".open").addClass("fadeOut");
             $(".js-copy").removeClass("active");
        } else {
             $(".open").addClass("close");
             $(".open").removeClass("fadeOut");
        }
    });

    $(".js-copy").click(function(e){
        e.preventDefault();
        $(".js-copy").toggleClass("active");
    });

})(jQuery);
