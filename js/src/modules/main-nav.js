var breakpoint = require('./breakpoint.js');

(function () {

  var s,
    mainNav = {

      settings: {
        mainNav: document.getElementById('js-main-nav'),
        mainNavLinks: document.getElementById('js-main-nav').getElementsByClassName('main-nav__list-item'),
        searchBtn: document.getElementById('js-site-header__search-btn')
      },

      init: function () {
        s = this.settings;
        this.bindUIActions();
      },

      bindUIActions: function () {
        for (var i = 0; i < s.mainNavLinks.length; i++) {
          s.mainNavLinks[i].addEventListener('mouseover', function (event) {
            mainNav.toggleActiveLink(this);
            //$(this).siblings().addClass('main-nav__list-item--hover-state');
          });
          s.mainNavLinks[i].addEventListener('mouseout', function (event) {
            mainNav.toggleActiveLink(this);
            //$(this).siblings().removeClass('main-nav__list-item--hover-state');
          });
          s.mainNavLinks[i].addEventListener('focusin', function (event) {
            //mainNav.addFocus(this);
            $(this).addClass('main-nav__list-item--focus');
          });
          s.mainNavLinks[i].addEventListener('focusout', function (event) {
            //mainNav.removeFocus(this);
            $(this).removeClass('main-nav__list-item--focus');
          });
        }

        s.searchBtn.addEventListener('mouseover', function (event) {
          mainNav.toggleActiveLink(this);
        });
        s.searchBtn.addEventListener('mouseout', function (event) {
          mainNav.toggleActiveLink(this);
        });

        //reset if changing tabs
        document.addEventListener('visibilitychange', function () {
          if (document.hidden) {
            $('#js-main-nav').removeClass('main-nav--active');
            $('a').blur();
          }
        }, false);
      },

      toggleActiveLink: function (el) {
        //if (breakpoint.value == 'lg' || breakpoint.value == 'xl' || breakpoint.value == 'xxl') {
        s.mainNav.classList.toggle('main-nav--active');
        //}
      },

      // addFocus: function(el) {
      //   if (breakpoint.value == 'lg' || breakpoint.value == 'xl' || breakpoint.value == 'xxl') {
      //     for (let i = 0; i < s.mainNavLinks.length; i++ ) {
      //       $(this).removeClass('main-nav__list-item--focus');
      //     }
      //     $(this).addClass('main-nav__list-item--focus');
      //   }
      // },

      // removeFocus: function() {
      //   if (breakpoint.value == 'lg' || breakpoint.value == 'xl' || breakpoint.value == 'xxl') {
      //     for (let i = 0; i < s.mainNavLinks.length; i++ ) {
      //       mainNavLinks[i].classList.remove('main-nav__list-item--focus');
      //     }
      //   }
      // }

    };

  (function () {
    mainNav.init();
  })();

})();