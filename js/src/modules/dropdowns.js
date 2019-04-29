(function () {

	var s,
		dropDowns = {
			settings: {
				elements: document.getElementsByClassName('c-dropdown'),
			},
			init: function () {
				s = this.settings;
				this.bindSelect();
				this.bindFocus();
				this.bindBlur();
			},
			bindSelect: function () {
				for (var i = 0; i < s.elements.length; i++) {
					$(s.elements.item(i)).find('.c-dropdown__content').on('click', 'a', function (event) {
						dropDowns.changeButtonText(event.currentTarget);
					});
				}
			},
			bindFocus: function () {
				for (var i = 0; i < s.elements.length; i++) {
					$(s.elements.item(i)).on('mouseover focus', function (event) {
						$(this).addClass("c-dropdown--active");
					});
				}
			},
			bindBlur: function () {
				for (var i = 0; i < s.elements.length; i++) {
					$(s.elements.item(i)).on('mouseout blur', function (event) {
						$(this).removeClass("c-dropdown--active");
					});
				}
			},
			changeButtonText: function (element) {
				var text = $(element).text();
				$(element).closest('.c-dropdown').find('button strong').text(text);
			}
		};
	(function () {
		dropDowns.init();
	})();

})();