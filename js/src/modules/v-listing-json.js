
var vListingKo = require('../vendors/knockout-3.4.2.js');
if ($('.c-vertical-listing').length > 0) {
	var vListingKoId = document.getElementById("vertical-listing-json").getAttribute('json-url');
};

(function () {
	var s,
		vListing = {
			Items: vListingKo.observableArray([]),
			Years: vListingKo.observableArray([]),
			Categories: vListingKo.observableArray([]),
			CurrentPage: vListingKo.observable(1),
			TotalPages: vListingKo.observable(1),
			TotalResults: vListingKo.observable(0),
			FilterYear: vListingKo.observable(""),
			FilterCategory: vListingKo.observable("All"),
			// SearchPage : vListingKo.observable(),
			// TriggerSearch : function(){
			//     alert(vListing.SearchQuery());
			// },
			SearchQuery: vListingKo.observable(""),
			SearchQueryString: vListingKo.observable(""),
			settings: {
				containerClass: document.getElementsByClassName("c-vertical-listing"),
				jsonApiUri: vListingKoId,
				displayCategory: null,
				displayYear: null,
				displaySearchTerm: null
			},
			filters: $('.c-vertical-listing .c-dropdown'),
			searchForm: $('#search-form'),
			paginationWrapper: $('.c-pagination__ul'),
			apiUrlParmeters: function apiUrlParmeters() {
				var sendUrl = vListing.settings.jsonApiUri + '&np=' + vListing.CurrentPage();

				if (vListing.SearchQuery() != null) {
					sendUrl += '&terms=' + encodeURIComponent(vListing.SearchQuery());
				}
				if (vListing.settings.displayCategory != null) {
					sendUrl += '&cat=' + vListing.settings.displayCategory;
				}
				if (vListing.settings.displayYear != null) {
					sendUrl += '&year=' + vListing.settings.displayYear;
				}
				return sendUrl;
			},
			updateSeachByQuerystring: function updateSeachByQuerystring() {
				var year = vListing.getUrlParameter("year");
				var cat = vListing.getUrlParameter("cat");
				var np = vListing.getUrlParameter("page");
				var search = vListing.getUrlParameter("terms");

				if (year != null) {
					vListing.filter(year, "year");
				}
				if (cat != null) {
					vListing.filter(cat, "category");
				}
				if (np != null) {
					vListing.CurrentPage(np);
				}

				if (search != null) {
					vListing.SearchQuery(search);
				}
				vListing.SearchQueryString(search);
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
				if (vListing.settings.displayYear != null) {
					parameters.push({
						key: "year",
						val: encodeURIComponent(vListing.settings.displayYear)
					});
				}

				if (vListing.settings.displayCategory != null) {
					parameters.push({
						key: "cat",
						val: encodeURIComponent(vListing.settings.displayCategory)
					});
				}
				if (vListing.CurrentPage() != null) {
					parameters.push({
						key: "page",
						val: encodeURIComponent(vListing.CurrentPage())
					});
				}

				if (vListing.SearchQuery() != null) {
					parameters.push({
						key: "terms",
						val: encodeURIComponent(vListing.SearchQuery())
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
			setActiveClasses: function setActiveClasses(event) {
				var parent = $(event.currentTarget).parent();
				$(parent).find('a').removeClass('selected');
				$(event.currentTarget).addClass('selected');
			},
			setFiltersActiveState: function setFiltersActiveState() {
				var thisYear = vListing.settings.displayYear;
				var thisCategory = vListing.settings.displayCategory;
				if (thisYear != null) {
					$("[data-filter='year']").find(".c-dropdown__dropbtn strong").text(thisYear);
				}
				if (thisCategory != null) {
					$("[data-filter='category']").find(".c-dropdown__dropbtn strong").text(thisCategory);
				}
			},
			filter: function filter(value, type) {
				if (type == "year") {
					vListing.settings.displayYear = value;
					vListing.FilterYear(value);
				};
				if (type == "category") {
					vListing.settings.displayCategory = value;
					vListing.FilterCategory(value);
				};
				// if (type == "search-bar") {
				//     vListing.settings.displaySearchTerm = value;
				// };
			},

			bindButtons: function bindButtons() {
				//filters
				$(vListing.filters.find('.c-dropdown__content')).on('click', 'a', function (event) {
					$(event.currentTarget).closest('.c-dropdown').removeClass("c-dropdown--active");
					var type = $(event.currentTarget).closest('.c-dropdown').attr('data-filter');
					var value = $(event.currentTarget).text();
					vListing.filter(value, type);
					vListing.setActiveClasses(event);
					vListing.CurrentPage(1);
					vListing.updateQueryString();
					vListing.getItems();
				});
				//pagination page select
				$(vListing.paginationWrapper.find('.page-item a')).on('click', function (data) {
					var pageNumber = parseInt($(this).attr("data-page-number"));
					//console.log(pageNumber);
					vListing.CurrentPage(pageNumber);
					vListing.updateQueryString();
					vListing.getItems();
				});

				// Search submit
				if ($('#search-form input').length > 0) {
					$(vListing.searchForm).submit(function (data) {
						data.preventDefault();
						var search = $('#search-form input').val();
						
						if (search == "" || search == null || search == "undefined" ) {
							// console.log('search empty');
							return false;
						} else if (/^\s*$/.test(search)) {
							// console.log('search empty');
							return false;
						} else {
							vListing.CurrentPage(1);
							vListing.SearchQueryString(search);
							vListing.updateQueryString();
							vListing.getItems();
						}
					});
				}
			},
			bindModel: function bindModel() {
				vListingKo.applyBindings(vListing, vListing.settings.containerClass.item(0));
			},
			getItems: function getItems() {
				$.getJSON(vListing.apiUrlParmeters(), function (data) {
					vListing.updateQueryString();
					vListing.Items.removeAll();
					vListingKo.utils.arrayPushAll(vListing.Items, data.Items);
					vListing.CurrentPage(data.CurrentPage);
					vListing.TotalPages(data.TotalPages);
					vListing.TotalResults(data.TotalResultSetCount);
					//vListing.buildPagNav();
				})
				.done(function() {
					//console.log( "second success" );
				  })
				  .fail(function() {
					//console.log( "error" );
					vListing.TotalResults(0);
				  })
				  .always(function() {
					//console.log( "complete" );
				  });
			},
			populateFilters: function () {
				$.getJSON(vListing.apiUrlParmeters(), function (data) {
					vListing.Years.removeAll();
					vListing.Categories.removeAll();

					if (data.Years != null) {
						vListingKo.utils.arrayPushAll(vListing.Years, data.Years);
					}
					if (data.Categories != null) {
						vListingKo.utils.arrayPushAll(vListing.Categories, data.Categories);
					}
				});
			},
			init: function init() {
				if (vListing.settings.containerClass.length > 0) {
					vListing.bindModel();
					if ($('body').hasClass('search-results-page')) {
						//Get items by querystring
						vListing.updateSeachByQuerystring();
						vListing.populateFilters();
					} else {
						//Request without filtering down by querystring
						vListing.populateFilters();
						vListing.updateSeachByQuerystring();
					}
					vListing.getItems();
					vListing.bindButtons();
					vListing.setFiltersActiveState();
				}
			}
		};
	(function () {
		vListing.init();
	})();
})();