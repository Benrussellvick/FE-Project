var analyticsevent = require('./analytics.js');

(function () {

    var s,
    cookieBar = {
  
        settings: {
          cookieBarMessage: document.getElementById('cookie-bar'),
          cookieClose: document.getElementById('cookie-bar-close'),
        },
  
        init: function() {
            s = this.settings;
            // this.bindUIActions();
            // this.showCookie();


              /***Cookies***/
            var e = new Date, type;
            e.setTime(e.getTime() + 31536e6);
            var t = "; expires=" + e.toGMTString();
            
            function getCookie(cname) {
                var name = cname + "=";
                var decodedCookie = decodeURIComponent(document.cookie);
                var ca = decodedCookie.split(';');
                for(var i = 0; i <ca.length; i++) {
                    var c = ca[i];
                    while (c.charAt(0) == ' ') {
                        c = c.substring(1);
                    }
                    if (c.indexOf(name) == 0) {
                        return c.substring(name.length, c.length);
                    }
                }
                return "";
            }
            
            var analytics = getCookie("analytics-cookies"), 
                functional = getCookie("functional-cookies");

            if (analytics) {
                $("#analytics-checkbox").attr("checked", "checked")
                .parents('.cookie-enable')
                .find('label[for=analytics-checkbox]')
                .empty().append('<span class="col-xs-12">Enabled (tap to disable)')
                .addClass('disabled');
            }
            
            if (functional) {
                $("#functional-checkbox").attr("checked", "checked")
                .parents('.cookie-enable')
                .find('label[for=functional-checkbox]')
                .empty().append('<span class="col-xs-12">Enabled (tap to disable)')
                .addClass('disabled');
            } 
            
            $('.cookie-enable').css('opacity' , 1);
            
                // cookie bar - hide on click
                $("#cookie-bar").on("click", '#cookie-bar-close', function() {
                return document.cookie = "seen_cookie_message=yes" + t + "; path=/",
                document.cookie = "analytics-cookies=yes" + t + "; path=/",
                document.cookie = "functional-cookies=yes" + t + "; path=/",
                $("#cookie-bar").slideUp();
            }),
            document.cookie.indexOf("seen_cookie_message") < 0 && $("#cookie-bar").show();
                
            /***setting individual cookies on checkbox change***/
            $("#functional-checkbox, #analytics-checkbox").change(function() {
                var type = $(this).attr('id').replace('#' , '').replace('-checkbox' , '') + "-cookies",
                    id = $(this).attr('id'),
                    exp = '=; expires=Thu, 01 Jan 1970 00:00:00 GMT;';
                if(this.checked) {
                $('#' + id).parents('.cookie-enable').closest('label[for=' + id + ']').empty().append('<span class="col-xs-12">Enabled (tap to disable)');      
                document.cookie = type + "=yes" + t + "; path=/";
                } else {
                    document.cookie = type + '=disable;expires=Thu, 01 Jan 1970 00:00:01 GMT;path=/';
                $('#' + id).parents('.cookie-enable').closest('label[for=' + id + ']').empty().append('<span class="col-xs-12">Disabled (tap to enable)');       
                }
                $('label[for=' + id + ']').toggleClass('disabled');
            });

        },
  
        // bindUIActions: function() {
        //     if ($('#cookie-bar').length > 0) {
        //         s.cookieClose.addEventListener('click', function() {
        //             cookieBar.setCookie('seen_cookie_message','no');
        //             s.cookieBarMessage.style.opacity = '0';
        //             setTimeout(function(){ 
        //                 s.cookieBarMessage.style.display = 'none';
        //             }, 250);
        //         });
        //     }
        // },
  
        // setCookie: function(cookie_name, value) {
        //     var exdate = new Date();
        //     exdate.setDate(exdate.getDate() + (365*25));
        //     document.cookie = cookie_name + "=" + escape(value) + "; expires="+exdate.toUTCString() + "; path=/";
        // },

        // getCookie: function(cookie_name) {
        //     if (document.cookie.length>0)
        //     {
        //         s.cookie_start = document.cookie.indexOf(cookie_name + "=");
        //         if (s.cookie_start != -1)
        //         {
        //             s.cookie_start = s.cookie_start + cookie_name.length+1;
        //             s.cookie_end = document.cookie.indexOf(";",s.cookie_start);
        //             if (s.cookie_end == -1)
        //             {
        //                 s.cookie_end = document.cookie.length;
        //             }
        //             return unescape(document.cookie.substring(s.cookie_start,s.cookie_end));
        //         }
        //     }
        //     return "";
        // },

        // showCookie: function() {
        //     if(cookieBar.getCookie('seen_cookie_message') != 'no') {
        //         s.cookieBarMessage.style.display = 'block';
        //     }
        // },
  
      };
  
    (function () {
        cookieBar.init();
    })();
  
  })();
