'use strict';

//REQUIRE NEEDED SCRIPTS

// var jQuery = null;
window.$ = window.jQuery = require('./vendors/jquery-3.1.1.min.js');

function GetIEVersion() {
    var sAgent = window.navigator.userAgent;
    var Idx = sAgent.indexOf("MSIE");
    // If IE, return version number.
    if (Idx > 0) 
        return parseInt(sAgent.substring(Idx+ 5, sAgent.indexOf(".", Idx)));
    // If IE 11 then look for Updated user agent string.
    else if (!!navigator.userAgent.match(/Trident\/7\./)) 
        return 11;
    else
         return 0; //It is not IE
}

if (GetIEVersion() > 0) {
    var polyfill = require('./vendors/plyr.polyfill.js');    
}
var objectFitVideosFile = require('./vendors/object-fit.polyfill.js');

var global = require('./modules/global.js');
var mainNav = require('./modules/main-nav.js');
var mobileNav = require('./modules/mobile-nav.js');
var breakpoint = require('./modules/breakpoint.js');
var formValidation = require('./modules/formvalidation.js');
var analytics = require('./modules/analytics.js');
var accordion = require('./modules/accordion.js');
var carousels = require('./modules/carousels.js');
var tabs = require('./modules/tabs.js');
var cookie = require('./modules/cookie-bar.js');
var fullHeight = require('./modules/full-height.js');
var mediaPlayers = require('./modules/media-players.js');
//var hotspots = require('./modules/hotspots.js');
var dropdown = require('./modules/dropdowns.js');

var lazyjson = require('./modules/lazyjson-gs.js');

var privacyoverlay = require('./modules/privacy-overlay.js');

var tabAjax = require('./modules/tab-ajax.js');
var pictureFill = require('./vendors/picturefill.js');

var share = require('./modules/share.js');
var companyOverlay = require('./modules/company-overlay.js');

var predictiveSearch = require('./modules/search.js');
var companySearch = require('./modules/company-search.js');
var verticalListing = require('./modules/v-listing-json.js');

var contactTabs = require('./modules/contact-tabs.js');


// var validatescript = require('./vendors/validate.js');
