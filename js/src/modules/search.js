
var siteSearchKo = require('../vendors/knockout-3.4.2.js');
var breakpoint = require('./breakpoint.js');
if ($('.c-main-search').length > 0) {
	var siteSearchKoId = document.getElementById("main-search-json").getAttribute('json-url');
};

(function () {
	var s,
		siteSearch = {
			searchBtn: document.getElementById('js-site-header__search-btn'),
			searchOverlay: document.getElementById('main-search-json'),
			searchClose: document.getElementById('js-search-close'),
			Result: siteSearchKo.observableArray([]),
			SearchQuery: siteSearchKo.observable(""),
			SearchQueryString: siteSearchKo.observable(""),
			settings: {
				containerClass: document.getElementsByClassName("c-main-search"),
				jsonApiUri: siteSearchKoId,
				displaySearchTerm: null
			},
			// filters: $('.c-vertical-listing .c-dropdown'),
			searchForm: $('#search-form-main'),
			searchInput: $('#search-form-main input'),
			KeyCompany: siteSearchKo.observable(""),
			Category: siteSearchKo.observable(""),
			TotalResultSetCount: siteSearchKo.observable(""),
			// paginationWrapper: $('.c-pagination__ul'),
			apiUrlParmeters: function apiUrlParmeters() {
				var sendUrl = siteSearch.settings.jsonApiUri;

				if (siteSearch.SearchQuery() != null) {
					sendUrl += '?terms=' + encodeURIComponent(siteSearch.SearchQuery());
				}
				return sendUrl;
			},
			getUrlParameter: function getUrlParameter(sParam) {
				var sPageURL = window.location.search.substring(1);
				var sURLVariables = sPageURL.split('&');
				var sParameterName;
				var i;

				for (i = 0; i < sURLVariables.length; i++) {
					sParameterName = sURLVariables[i].split('=');

					if (sParameterName[0] === sParam) {
						return sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
					}
				}
			},
			updateQueryString: function updateQueryString() {
				var result = '';
				var parameters = new Array();
				if (siteSearch.SearchQuery() != null) {
					parameters.push({
						key: "terms",
						val: encodeURIComponent(siteSearch.SearchQuery())
					});
				}
				jQuery(parameters).each(function (index, obj) {
					if (obj.val.length) {
						result += obj.key + '=' + obj.val + '&';
					}
				});


				try {
					var stateObj = {};
					var currentTitle = "test"; //JQuery(document).find("title").text();

					var newTabUrl = location.pathname;
					if (result.length) {
						result = '?' + result.substring(0, result.length - 1);
						newTabUrl += result;
					}

					history.replaceState(stateObj, currentTitle, newTabUrl);
				} catch (exc) {
					if (newTabUrl.indexOf("?") > -1 && window.location.search != "?" + newTabUrl.split("?")[1]) {
						window.location.href = location.protocol + "//" + location.hostname + ":" + location.port + newTabUrl;
					} else if (newTabUrl.indexOf("?") < 0 && window.location.search != "") {
						window.location.href = location.protocol + "//" + location.hostname + ":" + location.port + newTabUrl;
					}
				}
			},

			TriggerSearch: function triggerSearch() {

			},

			bindButtons: function bindButtons() {

				// Search submit
				if ($('#search-form-main input').length > 0) {
					// $(siteSearch.searchForm).submit(function (data) {
					var field = document.getElementById("search-form-main__input");

					if (breakpoint.value == 'gs' || breakpoint.value == 'md' || breakpoint.value == 'lg' || breakpoint.value == 'xl' || breakpoint.value == 'xxl') {
						$(field).keyup(function (data) {
							data.preventDefault();

							var search = $('#search-form-main input').val();
						
							if (search == "" || search == null || search == "undefined" ) {
								// console.log('search empty');
								return false;
							} else if (/^\s*$/.test(search)) {
								// console.log('search empty');
								return false;
							} else if (field.value.replace(/\s/g, '').length >= 3) {
								siteSearch.getResults();
								$('#main-search-json .c-search__suggestion--columns-predictive').fadeIn(300);
								$('#main-search-json .c-search__suggestion-group').fadeIn(300);

								$('.c-search__suggestion--columns-quick-links').fadeOut(300);

							} else {
								$('#main-search-json .c-search__suggestion--columns-predictive').fadeOut(300);
								$('#main-search-json .c-search__suggestion-group').fadeOut(300);

								$('.c-search__suggestion--columns-quick-links').fadeIn(300);
							}
						});
					}

					$(siteSearch.searchForm).submit(function (data) {
						var query = '/search?page=1&terms=';
						var search = $('#search-form-main input').val();

						data.preventDefault();
						
						if (search == "" || search == null || search == "undefined" ) {
							// console.log('search empty');
							return false;
						} else if (/^\s*$/.test(search)) {
							// console.log('search empty');
							return false;
						} else {
							window.location = query + encodeURIComponent(search);
						}

					});
				}

			},
			bindModel: function bindModel() {
				siteSearchKo.applyBindings(siteSearch, siteSearch.settings.containerClass.item(0));
			},
			getResults: function getResults() {
				$.getJSON(siteSearch.apiUrlParmeters(), function (data) {
					// siteSearch.updateQueryString();
					siteSearch.Result.removeAll();
					siteSearchKo.utils.arrayPushAll(siteSearch.Result, data.Result);
				});
			},
			toggleClose: function () {
				$(".c-search").fadeOut(150);
				$(".c-search__search-bar input").val('');
			},

			toggleSearch: function () {
				siteSearch.searchBtn.classList.toggle('js-site-header__search-btn--active');
				$(".c-search").fadeIn(250, function () {
					$(".c-search__search-bar input").focus();
				});

			},
			init: function init() {
				if (siteSearch.settings.containerClass.length > 0) {
					siteSearch.bindModel();
					siteSearch.bindButtons();
				}

				if ($("#js-search-close").length > 0) {
					siteSearch.searchClose.addEventListener('click', function () {
						siteSearch.toggleClose(this);
						$('.c-search__suggestion--columns-quick-links').fadeIn(300);
						$('#main-search-json .c-search__suggestion--columns-predictive').fadeOut(300);
						$('#main-search-json .c-search__suggestion-group').fadeOut(300);
					});
				}
				siteSearch.searchBtn.addEventListener('click', function () {
					siteSearch.toggleSearch(this);
					siteSearch.Result.removeAll();
				});
			}
		};
	(function () {
		siteSearch.init();
	})();
})();