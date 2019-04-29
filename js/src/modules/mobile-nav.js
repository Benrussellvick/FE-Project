var breakpoint = require('./breakpoint.js');

(function () {

  var s,
    mobileNav = {

      settings: {
        mobileMenuBtn: document.getElementById('js-site-header__mobile-menu-btn'),
        mobileMenuBtnIcon: document.getElementById('js-site-header__mobile-menu-icon'),
        mainNavList: document.getElementById('js-main-nav__list'),
        body: document.body,
        pageWrapper: document.getElementsByClassName('page-wrapper'),
        subMenuShow: document.getElementsByClassName('sub-menu--show'),
        subMenu: document.getElementsByClassName('sub-menu'),
        mainNavLinkNext: document.getElementsByClassName('js-main-nav__link--next'),
        subMenuLinkTop: document.getElementsByClassName('js-sub-menu__link--top'),
        subMenuLinkBack: document.getElementsByClassName('js-sub-menu__link--back'),
      },

      init: function() {
        s = this.settings;
        this.bindUIActions();
      },

      bindUIActions: function() {

        // Two click navigation for iPad
        for (var i = 0; i < s.mainNavLinkNext.length; i++ ) {
          s.mainNavLinkNext[i].addEventListener('click', function(e) {
            if ($('body').hasClass('ipad')) {
              
              if(!$(this).parent().hasClass('main-nav__list-item--active')) {
                $('.main-nav__list li').removeClass('main-nav__list-item--active');
                $(this).parent().addClass('main-nav__list-item--active');
                e.preventDefault();
              } else {
                return true;
              }

            }
          });
        }
        // ----------

        s.mobileMenuBtn.addEventListener('click', function(e) {
          mobileNav.toggleOverlay(this);
        });
        
        window.addEventListener('resize', function (event) {
          mobileNav.closeOverlay();
        });

        for (var i = 0; i < s.mainNavLinkNext.length; i++ ) {
          s.mainNavLinkNext[i].addEventListener('click', function(e) {
            if (breakpoint.value == 'xs' || breakpoint.value == 'sm' || breakpoint.value == 'md') {
              e.preventDefault();
              // console.log('responsive menu');
            }
            mobileNav.openSubMenu(this);
          });
        }

        for (var i = 0; i < s.subMenuLinkBack.length; i++ ) {
          s.subMenuLinkBack[i].addEventListener('click', function(e) {
            if (breakpoint.value == 'xs' || breakpoint.value == 'sm' || breakpoint.value == 'md') {
              e.preventDefault();
            }
            mobileNav.closeSubMenu(this);
          });
        }
        
        for (var i = 0; i < s.subMenuLinkTop.length; i++ ) {
          s.subMenuLinkTop[i].addEventListener('click', function(e) {
            if (breakpoint.value == 'xs' || breakpoint.value == 'sm' || breakpoint.value == 'md') {
              e.preventDefault();
              // console.log('responsive menu');
            }
            mobileNav.returnToMainNav(this);
          });
        }

        // 4th level nav
        // for (var i = 0; i < s.subMenuLinkBack.length; i++ ) {
        //   s.subMenuLinkBack[i].addEventListener('click', function() {
        //     mobileNav.closeSubMenu(this);
        //   });
        // }
        
        // for (var i = 0; i < s.subMenuLinkTop.length; i++ ) {
        //   s.subMenuLinkTop[i].addEventListener('click', function(e) {
        //     if (breakpoint.value == 'xs' || breakpoint.value == 'sm' || breakpoint.value == 'md') {
        //       e.preventDefault();
        //       // console.log('responsive menu');
        //     }
        //     mobileNav.returnToMainNav(this);
        //   });
        // }
        // -------------------

      },
      
      toggleOverlay: function() {
        s.mobileMenuBtnIcon.classList.toggle('site-header__mobile-menu-icon--active');
        s.mainNavList.classList.toggle('main-nav__list--mobile-overlay');
        
        $('.page-wrapper').css({
          'overflow': $('.page-wrapper').css('overflow')=='hidden'?'':'hidden',
          'visibility': $('.page-wrapper').css('visibility')=='hidden'?'':'hidden'
        });
      },
      
      closeOverlay: function() {
        if (breakpoint.value == 'lg' || breakpoint.value == 'xl' || breakpoint.value == 'xxl') {
          s.mobileMenuBtnIcon.classList.remove('site-header__mobile-menu-icon--active');
          s.mainNavList.classList.remove('main-nav__list--mobile-overlay');
          // s.pageWrapper.classList.remove('u-no-scroll-nav');
          for (var i = 0; i < s.subMenuShow.length; i++ ) {
            s.subMenuShow[i].classList.remove('sub-menu--show');
          }
        }
        
      },

      openSubMenu: function(el) {
        if (breakpoint.value == 'xs' || breakpoint.value == 'sm' || breakpoint.value == 'md') {
          el.nextElementSibling.classList.add('sub-menu--show');
        }
      },

      closeSubMenu: function(el) {
        function findAncestor (el, cls) {
          while ((el = el.parentElement) && !el.classList.contains(cls));
          return el;
        }
        findAncestor (el, 'sub-menu--show').classList.remove('sub-menu--show');
      },

      returnToMainNav: function(el) {
        if (breakpoint.value == 'xs' || breakpoint.value == 'sm' || breakpoint.value == 'md') {
          for (var i = 0; i < s.subMenu.length; i++ ) {
            s.subMenu[i].classList.remove('sub-menu--show');
          }
        }
      }


    };

  (function () {
    mobileNav.init();
  })();

})();