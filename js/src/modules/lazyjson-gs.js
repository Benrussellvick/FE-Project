var LazyLoad = require('../vendors/lazyjson-jquery.min.js');

//NOTE, below is setup for multiple instances, BUT the 'jquery.lazyjson.js' has had addtional params: {} hacked in for the dropdown change and category tabs, it's only looking for first instance.

(function () {
    var s,
    lazyJson = {
        settings: {
            
        },

        init: function () {
            s = this.settings;
            this.bindUIActions();    
        },

        bindUIActions: function () {
            var lazyLoadInstances = [];
            var lazyLazy = new LazyLoad({
                elements_selector: ".lazyLoad",
                callback_set: function(el) {
                    var oneLL = new LazyLoad({
                        container: el
                    });
                    lazyLoadInstances.push(oneLL);

                    setTimeout(function(){ 
                        $('.lazyLoad[data-was-processed="true"]').find('.preloader').fadeOut('slow', function() {
                            $(this).remove();
                        }) 
                    }, 500);
                    
                },
            });
        },

    };
    (function () {
        if ($('.lazyLoad').length > 0) {
            lazyJson.init();
        };
    })();
})();