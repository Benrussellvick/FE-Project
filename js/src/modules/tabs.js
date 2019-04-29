var Tabs = require('../vendors/tabs.js');
var breakpoint = require('./breakpoint.js');

(function () {

  var s,
    tabs = {

      settings: {
        tabWrapper: document.getElementById('js-main-nav'),
        tabContainer: document.getElementsByClassName('tabs-container'),
        // tabTriggerWrapper: document.getElementsByClassName('tabs-trigger'),
        tabTriggerLink: document.getElementsByClassName('js-tabs-trigger__link'),
        tabContentLink: document.getElementsByClassName('js-tablist__link'),
      },

      init: function () {
        s = this.settings;
        this.bindUIActions();
      },

      bindUIActions: function () {
        for (var i = 0; i < s.tabTriggerLink.length; i++) {
          // s.tabTriggerLink[i].addEventListener("click", function(elem) {
          $(s.tabTriggerLink[i]).on('click touchstart', function(elem){
            elem.preventDefault();
            this.parentNode.nextElementSibling.classList.toggle("js-active");
            this.parentNode.classList.toggle("js-active");
          });
        }
        for (var i = 0; i < s.tabContentLink.length; i++) {

          // s.tabContentLink[i].addEventListener("click", function(elem) {
          $(s.tabContentLink[i]).on('click', function(elem){
            elem.preventDefault();
            if (breakpoint.value == 'xs' || breakpoint.value == 'sm' || breakpoint.value == 'md') {
              this.parentNode.parentNode.classList.toggle("js-active");
              // this.classList.toggle("js-active");
              this.parentNode.parentNode.previousElementSibling.classList.toggle("js-active");

              var dropdownTrigger = $(this).text();
              $(this).parent().parent().parent().find('.tabs-trigger p').text(dropdownTrigger);
            }
          });

          $(window).bind("load", function() {
            $('.js-tablist__link[aria-selected=true]').each(function() {
              if ($('.js-tablist__link[aria-selected]').val('true')) {
                var dropdownTrigger = $(this).text();
                $(this).parent().parent().parent().find('.tabs-trigger p').text(dropdownTrigger);
              }
            });
          });
          
        }

      },

    };

  (function () {
    tabs.init();
  })();

})();