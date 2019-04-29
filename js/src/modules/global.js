var Headroom = require('../vendors/headroom.js'),
objectFitVideos = require('../vendors/object-fit.polyfill.js'),
iframeResize = require('../vendors/iframe-resize.min.js'),
breakpoint = require('./breakpoint.js');

(function () {

  var s,
    headroom,
    objectFit,
    global = {

      settings: {
        externalLinks: document.querySelectorAll('a[target="_blank"]'),
        footerExpandBtn: document.getElementById('js-site-footer__expand-btn'),
        footerNav: document.getElementById('js-footer-nav'),
        header: document.getElementById('js-site-header')
      },

      init: function () {
        s = this.settings;
        this.bindUIActions();
      },
      
      bindUIActions: function () {
        for (var i = 0; i < s.externalLinks.length; i++ ) {
          s.externalLinks[i].addEventListener('mouseover', function(event) {
            global.externalLinksAddTitle(this);
          });
        }

        // Detect sitecore edit mode
        if ($('#scWebEditRibbon').length > 0) {
          $('body').addClass('sitecore-edit-custom');
        }
        // ----------

        // Detect if safari
        var is_safari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
        if (is_safari) {
          $('body').addClass('safari');
        }
        // ----------

        // Refresh Feature panel 3 between state changes
        if ($('.c-story-panel-3').length > 0) {
          var ww = $(window).width();
          var limit = 1295;

          function refresh() {
            ww = $(window).width();
            var w =  ww<limit ? (location.reload(true)) :  ( ww>limit ? (location.reload(true)) : ww=limit );
          }

          var tOut;
          $(window).resize(function() {
              var resW = $(window).width();
              clearTimeout(tOut);
              if ( (ww>limit && resW<limit) || (ww<limit && resW>limit) ) {        
                  tOut = setTimeout(refresh, 100);
              }
          });
        }
        // ----------

        // Responsive tables overflow detection
        if ($('.table-responsive').length > 0) {
          $( ".table-responsive" ).each(function() {
            if ($(".table-responsive").prop('scrollWidth') > $(".table-responsive").width() +20 ) {
              $(this).parent().addClass('table-overflow');
            }
            else {
              $(this).parent().removeClass('table-overflow');
            }
          });
        }
        // ----------

        // Detect IE
        (function detectIE() {
          var ua = window.navigator.userAgent;
      
          var msie = ua.indexOf('MSIE ');
          if (msie > 0) {
              // IE 10 or older => return version number
              var ieV = parseInt(ua.substring(msie + 5, ua.indexOf('.', msie)), 10);
              document.querySelector('body').className += ' IE';

          }
      
          var trident = ua.indexOf('Trident/');
          if (trident > 0) {
              // IE 11 => return version number
              var rv = ua.indexOf('rv:');
              var ieV = parseInt(ua.substring(rv + 3, ua.indexOf('.', rv)), 10);
              document.querySelector('body').className += ' IE';

          }
      
          var edge = ua.indexOf('Edge/');
          if (edge > 0) {
             // IE 12 (aka Edge) => return version number
             var ieV = parseInt(ua.substring(edge + 5, ua.indexOf('.', edge)), 10);
              document.querySelector('body').className += ' IE';
          }
      
          // other browser
          return false;
        })();
        // ----------

        // IE object fit polyfill
        document.addEventListener('DOMContentLoaded', function() {
          if ($('.IE').length > 0) {
            objectFitVideos();
          }
        }, false);
        // ----------

        // Detect iPad for 2 click navigation
        var IS_IPAD = navigator.userAgent.match(/iPad/i) != null;
        var IS_IPHONE = (navigator.userAgent.match(/iPhone/i) != null) || (navigator.userAgent.match(/iPod/i) != null);
        if (IS_IPAD) {
          IS_IPHONE = false;

          $('body').addClass("ipad");

        }
        // ----------

        // Detect mobile/tablet device
        var isMobile = {
          Android: function() {
              return navigator.userAgent.match(/Android/i);
          },
          BlackBerry: function() {
              return navigator.userAgent.match(/BlackBerry/i);
          },
          iOS: function() {
              return navigator.userAgent.match(/iPhone|iPad|iPod/i);
          },
          Opera: function() {
              return navigator.userAgent.match(/Opera Mini/i);
          },
          Windows: function() {
              return navigator.userAgent.match(/IEMobile/i) || navigator.userAgent.match(/WPDesktop/i);
          },
          any: function() {
              return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
          }
        };

        if( isMobile.any() ) {
          // reload page on orientation change
          $(window).on( "orientationchange", function(event) {
            location.reload(true);
          });
        };
        // ----------

        // adds padding to title container //
        $(".page-title").closest(".container-single").addClass("container-padding");
        // -----

        // add white class to header links //
        if ($('[class^=c-header-]').length > 0) {
          $('[class^=c-header-]').each(function(){
            $(this).find('[class^=link-]').addClass('white');
          });
        }
        // -----

        // temp fix --------
        $(".page-title.u-hidden").closest(".container-single").addClass("u-hidden");
        if ($('.c-story-panel-3__video').length > 0) {
          $(".c-story-panel-3__video-wrapper").closest(".c-story-panel-3").addClass("c-story-panel-3--video");
        }
        // ----------
        
        // Preloader --------
        $('.c-article-header, .c-vertical-listing, .c-company-search, .c-main-search').each(function(){
          $(this).find('.preloader').fadeOut('slow', function() {
            $(this).remove();
          }) 
        });
        // var img = document.querySelector('.c-story-panel-1 img')
        // function loaded() {
        //   $('.c-story-panel-1, .c-story-panel-2, .c-story-panel-3, .c-article-header').each(function(){
        //     $(this).children('.preloader').fadeOut('slow', function() {
        //       $(this).remove();
        //     }) 
        //   });
        // }
        
        // if (img.complete) {
        //   loaded()
        // } else {
        //   img.addEventListener('load', loaded)
        // }
        // --------

        // Checkbox  --------
        $(".checkbox-accept input").click(function () {
          if ($(this).is(":checked")) {
            $(this).parent().parent().siblings('.link-download').fadeIn(300);
          } else {
            $(this).parent().parent().siblings('.link-download').fadeOut(300);
          }
        });
        // --------

        // moves vertical gradient into correct position //
        $(".c-story-panel-2__article").find(".c-story-panel-2__vertical-gradient").each(function(){
            var vGradient = $(this).closest(".c-story-panel-2__article").children(".c-story-panel-2__media-wrapper");
            $(vGradient).append(this);
        });

        $(".c-story-panel-1").find(".c-story-panel-1__vertical-gradient").each(function(){
            var vGradient_a = $(this).closest(".c-story-panel-1").children(".c-story-panel-1__media-wrapper");
            $(vGradient_a).append(this);
        });

        $(".c-story-panel-3__article").find(".c-story-panel-3__vertical-gradient").each(function(){
          var vGradient_a = $(this).closest(".c-story-panel-3__article").children(".c-story-panel-3__media-wrapper");
          $(vGradient_a).append(this);
        });

        $(".c-story-panel-3-small__article").find(".c-story-panel-3-small__vertical-gradient").each(function(){
          var vGradient_a = $(this).closest(".c-story-panel-3-small__article").children(".c-story-panel-3-small__media-wrapper");
          $(vGradient_a).append(this);
        });
        // -----

        // flip split panel view content around where img should come before text mob only //
        if (breakpoint.value == 'xs' || breakpoint.value == 'sm' || breakpoint.value == 'md') {
          $(".c-split-panel .row .c-split-panel__text:first-child").each(function(){
              var textDiv = $(this).next();
              $(this).insertAfter(textDiv);
          });
        }
        // -----

        s.footerExpandBtn.addEventListener('click', function() {
          global.expandFooterNav(this);
        });
        
        headroom = new Headroom(s.header, {
          'offset': 100
        });
        global.headroomInit();


        // Apply height of side nav to parent for pages with minimum content
        if ($('.c-side-nav').length > 0) {
          if (breakpoint.value == 'lg' || breakpoint.value == 'xl' || breakpoint.value == 'xxl') {
            
              var leftHeight = $('.c-side-nav').height(),
                  sideNav = $('.c-side-nav');
              sideNav.parent().height(leftHeight);
          }

          window.addEventListener('resize', function (e) {
            // global.sideNavHeight();
            if (breakpoint.value == 'xs' || breakpoint.value == 'sm' || breakpoint.value == 'md') {
              $('.c-side-nav').parent().css('height','auto');
            } else {
              var leftHeight = $('.c-side-nav').height(),
                  sideNav = $('.c-side-nav');
              sideNav.parent().height(leftHeight);
            }
          });
        }
        // ----------

        if ($('.c-resp-container__iframe').length > 0) {
          $('.c-resp-container__iframe').iFrameResize();
        }
        
      },
      
      externalLinksAddTitle: function(el) {
        el.setAttribute('title', 'External link. Opens in new browser window.');
      },
      
      expandFooterNav: function(el) {
        el.classList.toggle('site-footer__expand-btn--open');
        s.footerNav.classList.toggle('u-slide-down');
      },
      
      headroomInit: function() {
        headroom.init();
      },

      iframeResizeInit: function() {
        iframeResize.init();
      }
      
    };

  (function () {
    global.init();
  })();

})();

module.exports = global;