
var companySearchKo = require('../vendors/knockout-3.4.2.js');
if ($('.c-company-search').length > 0) {
	var companySearchKoId = document.getElementById("company-search-json").getAttribute('json-url');
};

(function () {
	var s,
		companySearch = {
			Result: companySearchKo.observableArray([]),
			SearchQuery: companySearchKo.observable(""),
			SearchQueryString: companySearchKo.observable(""),
			settings: {
				containerClass: document.getElementsByClassName("c-company-search"),
				jsonApiUri: companySearchKoId,
				displaySearchTerm: null
			},
			// filters: $('.c-vertical-listing .c-dropdown'),
			searchForm: $('#search-form'),
			KeyCompany: companySearchKo.observable(""),
			// paginationWrapper: $('.c-pagination__ul'),
			apiUrlParmeters: function apiUrlParmeters() {
				var sendUrl = companySearch.settings.jsonApiUri;

				if (companySearch.SearchQuery() != null) {
					sendUrl += '&terms=' + encodeURIComponent(companySearch.SearchQuery());
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
				if (companySearch.SearchQuery() != null) {
					parameters.push({
						key: "terms",
						val: encodeURIComponent(companySearch.SearchQuery())
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
				if ($('#search-form input').length > 0) {
					$(companySearch.searchForm).submit(function (data) {
						data.preventDefault();

						var search = $('#search-form input').val();
						
						if (search == "" || search == null || search == "undefined" ) {
							// console.log('search empty');
							return false;
						} else if (/^\s*$/.test(search)) {
							// console.log('search empty');
							return false;
						} else {
							companySearch.getResults();
						}
					});
				}

				// Company search
				// if ($('.c-company-search').length > 0) {
				//     vListing.Items = companySearchKo.computed(function() {
				//         var q = vListing.SearchQuery();
				//         return vListing.filter(function(type) {
				//             return type.Title.toLowerCase().indexOf(q) >= 0;
				//         });
				//     })
				// }
			},
			bindModel: function bindModel() {
				companySearchKo.applyBindings(companySearch, companySearch.settings.containerClass.item(0));
			},
			getResults: function getResults() {
				$.getJSON(companySearch.apiUrlParmeters(), function (data) {
					console.log(companySearch.apiUrlParmeters());
					companySearch.updateQueryString();
					companySearch.Result.removeAll();
					companySearchKo.utils.arrayPushAll(companySearch.Result, data.Result);
					// vListing.CurrentPage(data.CurrentPage);
					// vListing.TotalPages(data.TotalPages);
				});
			},
			init: function init() {
				if (companySearch.settings.containerClass.length > 0) {
					companySearch.bindModel();
					// companySearch.getResults();
					companySearch.bindButtons();
				}
			}
		};
	(function () {
		companySearch.init();
	})();
})();