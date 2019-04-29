// Hotspots ----------------------------
// make entire div clickable
(function ($) {
  function createLinkArea(d, defaultState, hoverState) {
      d
      .on('mouseover focus', function (e) {
          $(this).addClass(hoverState)
      })
      .on('mouseout blur', function (e) {
          $(this).removeClass(hoverState)
      })
      .on('touchstart', function (e) {
          $(this).addClass(hoverState)
      })
      .on('touchend', function (e) {
          $(this).removeClass(hoverState)
      })
      .on('click', function (e) {
          e.preventDefault();
          var href = $(this).find('a').attr('href')
          // var download = $(this).find('a').attr('download')
          var url = $(this).find('a').data('url');

          // Download link
          // if ($(this).find('a').attr('download')) {
          //     window.open(download, href.val);
          // }
          if (url != undefined) { //tile link
              //return false;
              e.preventDefault();
          } else {
              if (href != undefined) { //normal link
                  if ($(this).find('a').attr('target') == '_blank') {
                      window.open(href, '_blank');
                  } else {
                      window.location = href;
                  }
              } 
          }
      })
      .on('keypress', function (e) {
          if (e.keyCode == 13) { //Enter key	
              e.preventDefault();
              var href = $(this).find('a').attr('href')
              if (href != undefined) {
                  console.log($(this))
                  if ($(this).find('a').attr('target') == '_blank') {
                      window.open(href, '_blank');
                  } else {
                      window.location = href;
                  }
              }
          }
      })
  }
  $(".hotspot-element").each(function() {
      createLinkArea($(this), "hotspot-element", "hotspot-element-hover");
  });


  // $(".hotspot-element-play").each(function() {
  //     createLinkArea($(this), "hotspot-element-play", "hotspot-element-play-hover");
  // });

  // $(".link-div-download").each(function() {
  //     createLinkArea($(this), "link-div-download", "link-div-download-hover");
  // });

})(jQuery);
