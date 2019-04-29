var Accordions = require('../vendors/accordions.js');

(function () {

  function open() {

    $(this).closest(".js-accordion").find(".js-accordion__panel").attr('aria-expanded', "true");
    $(this).closest(".js-accordion").find(".js-accordion__header").attr('aria-expanded', "true");
    $(this).closest(".js-accordion").find(".accordion__all__open").toggleClass("hide");
    $(this).closest(".js-accordion").find(".accordion__all__close").toggleClass("hide");

    $(this).one("click", close);
  }

  function close() {

    $(this).closest(".js-accordion").find(".js-accordion__panel").attr('aria-expanded', "false");
    $(this).closest(".js-accordion").find(".js-accordion__header").attr('aria-expanded', "false");
    $(this).closest(".js-accordion").find(".accordion__all__open").toggleClass("hide");
    $(this).closest(".js-accordion").find(".accordion__all__close").toggleClass("hide");
    
    $(this).one("click", open);
  }

  $(".js-toggle-accordion").one("click", open);
	
	// var s,
	// 	accordion = {
  
	// 		settings: {
  //       accordionWrapper: document.getElementsByClassName('js-accordion'),
  //       accordionHeader: document.getElementsByClassName('js-accordion__header'),
  //       accordionPanel: document.getElementsByClassName('js-accordion__panel'),
  //       openAll: document.getElementsByClassName('accordion__all'),
  //       openAllText: document.getElementsByClassName('accordion__all__text'),
	// 		},
	
	// 		init: function () {
	// 			s = this.settings;
  //       this.bindUIActions();
        
  //       if (s.accordionHeader.length > 0) {
  //          accordion.openAllShow();
  //       }

	// 		},		
	
	// 		bindUIActions: function () {

  //       for (var i = 0; i < s.openAll.length; i++) {

  //         $(s.openAll[i]).parent().attr('data-accordion-index', i);

  //         s.openAll[i].addEventListener("click", function(event) {

  //           var accordionIndex = $(this).parent().attr('data-accordion-index');
  //           var openText = $('.accordion__all__open');
  //           var closeText = $('.accordion__all__close');

  //           var currentState = this.innerHTML;

  //           // switch(this.innerHTML) {
  //           //   case openText:
  //           //       this.innerHTML = closeText;
  //           //       break;
  //           //   case closeText:
  //           //       this.innerHTML = openText;
  //           //       break;
  //           //   default:
  //           //       this.innerHTML = closeText;
  //           // };

  //           var innerHeaders =  $(s.accordionWrapper[accordionIndex]).find('.js-accordion__header');
  //           //console.log(this.innerHTML);
  //           $(innerHeaders).each(function(){
  //             if($(currentState).text() == openText.text()){
  //               $(this).attr('aria-expanded', "true").next().attr('aria-hidden', "false");
  //             }else{
  //               $(this).attr('aria-expanded', "false").next().attr('aria-hidden', "true");
  //             }
  //           });

  //           $('html, body').animate({
  //             scrollTop: $(this).offset().top - 100
  //           }, 500);

  //         });
  //       }
  //     },
  //     openAllShow: function() {
  //       for (var i = 0; i < s.openAll.length; i++ ) {
  //         s.openAll[i].classList.toggle('show');
  //       }
  //     },

  //   };
    
  //   (function () {
  //     accordion.init();
  //   })();
  
  })();