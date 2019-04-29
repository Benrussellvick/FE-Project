var LazyJSON = require('../vendors/lazyjson-jquery.min.js');

//NOTE, below is setup for multiple instances, BUT the 'jquery.lazyjson.js' has had addtional params: {} hacked in for the dropdown change and category tabs, it's only looking for first instance.

(function () {
    var s,
    lazyJson = {
        settings: {
            lazyWrap: document.getElementsByClassName('lazy-json-wrap'),
            lazyTemplate: document.getElementsByClassName('lazy-json-template')
        },
        inlineParams : function(element, inlineAttr, defaultValue){

            if($( "div#lazyjson-" + element ).attr(inlineAttr)){
                var inlineValue = $( "div#lazyjson-" + element ).attr(inlineAttr);
                if(inlineValue != ''){
                    var parameter = inlineValue;
                }else{
                    var parameter = defaultValue;
                }
            }else{
                var parameter = defaultValue;
            }
            return parameter;

        },

        initlazyJsonEl: function(i){

            //hackyness in the plugin js 'jquery.lazy.json.js

            $( "div#lazyjson-" + i ).lazyjson({
                loadOnInit: true,
                debug: false,
                //debug: false,
                noResults: '<div id="lj-noresponse" style="text-align:center;padding:20px;"></div>',
                noResultsText: 'No Results Found',
                api: {
                    //forceJSONP: false,
                    uri: lazyJson.inlineParams(i, 'lazyjson-url', 'assets/json/data.json'),//default test json
                    pagination: true,
                    //httpMethod: 'GET'
                    params: {
                        //orderby: filterParams.orderby,
                        //category : filterParams.category
                    }
                },
                effect: null,
                pagination: {
                    active: true,
                    pages: 1,
                    count: lazyJson.inlineParams(i, 'lazyjson-pagination-limit', 5),//default 5
                    nextBtn: 'div.next',
                    prevBtn: 'div.previous'
                },
                afterLoad: function (res) {
                    console.log('lazy json loaded');
                    var enableClasses = 'select, li, .next, .previous';
                    $('.c-vertical-listing__filters').find(enableClasses).removeClass('disabled');
                }
            });

        },

        init: function () {
            s = this.settings;

            //set the template ids
            for (var i = 0; i < s.lazyTemplate.length; i++) {
                var el = s.lazyTemplate;
                el[i].id = "template-lazyjson-" + i;
                el[i].classList.remove("lazy-json-template");
            };

            //set the wrap ids
            for (var i = 0; i < s.lazyWrap.length; i++) {
                var el = s.lazyWrap;
                el[i].id = "lazyjson-" + i;
                el[i].classList.remove("lazy-json-wrap");

                lazyJson.initlazyJsonEl(i);

            };
        },
    };
    (function () {
        lazyJson.init();
    })();
})();