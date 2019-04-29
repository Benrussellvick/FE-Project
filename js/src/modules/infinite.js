// var WayPoints = require('../vendors/jquery.waypoints.min.js');
    //infiniteScroll = require('../vendors/infinite.min.js');


    (function ($) { 

        if($('.infinite-container').length > 0){
            console.log('load ');
            // 
            $('.infinite-item').lazy();
        };

    
    })(jQuery);