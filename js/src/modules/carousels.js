var Swiper = require('../vendors/swiper.js');

(function () {
	
  var s,
    swiper,
		carousel = {
  
			settings: {
        carouselWrapper: document.getElementsByClassName('swiper-container'),
			},
	
			init: function () {
				s = this.settings;
				this.bindUIActions();
			},		
	
			bindUIActions: function () {
          if (typeof(s.carouselWrapper) != 'undefined' && s.carouselWrapper != null) {
            carousel.carouselInit();
          }
      },

      carouselInit: function() {
        swiper = new Swiper(s.carouselWrapper, {
          pagination: {
            el: '.swiper-pagination',
            type: 'fraction',
          },
          navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
          },
        });
      },

    };
    
    (function () {
      carousel.init();
    })();
  
  })();
