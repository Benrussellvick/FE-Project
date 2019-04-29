//import * as breakpoint from './breakpoint'; -> needs to re-import on resize
var breakpoint = require('./breakpoint.js');
(function () {
    var s,
    fullHeight = {
        settings: {
            element: document.getElementsByClassName('can-full-height'),
            siteHeader : document.getElementsByClassName('site-header'),
            elementGS: document.getElementsByClassName('can-gs-height')
        },
        init: function () {
            s = this.settings;
            if(s.element.length > 0){
                window.onresize = function(event) {
                    fullHeight.makeFullHeight();
                };
                fullHeight.makeFullHeight();
            };
            if(s.elementGS.length > 0){
                window.onresize = function(event) {
                    fullHeight.makeFullHeightGS();
                    // console.log('breakpoint.value', breakpoint.value);
                };
                fullHeight.makeFullHeightGS();
            };
        },
        makeFullHeight: function (element){
            for (var i = 0; i < s.element.length; i++) {
                if (breakpoint.value == 'lg' || breakpoint.value == 'xl' || breakpoint.value == 'xxl'){
                    s.element.item(i).classList.add("make-full-height");
                    s.element.item(i).style.height = (window.innerHeight - s.siteHeader.item(0).offsetHeight) + 'px';
                }else{
                    s.element.item(i).classList.remove("make-full-height");
                    s.element.item(i).style = null
                }
            };
        },
        makeFullHeightGS: function (elementGS){
            for (var i = 0; i < s.elementGS.length; i++) {
                if (breakpoint.value == 'gs' || breakpoint.value == 'gs-height'){
                    s.elementGS.item(i).classList.add("make-full-height-gs");
                    s.elementGS.item(i).style.height = (window.innerHeight - s.siteHeader.item(0).offsetHeight) + 'px';
                    //console.log('gs');
                }else{
                    return false;
                    // alert('GS error');
                    // s.elementGS.item(i).classList.remove("make-full-height-gs");
                    // s.elementGS.item(i).style = null
                    // console.log('remove-gs');
                }
            };
        },
    };
    (function () {
        fullHeight.init();
    })();
})();