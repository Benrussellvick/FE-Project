var validate = require('../vendors/validate.js');

(function () {
	
	var s,
		formValidation = {
  
			settings: {
				form: document.getElementById('form-validate'),
			},
	
			init: function () {
				s = this.settings;
				this.bindUIActions();
			},		
	
			bindUIActions: function () {
				if (typeof(form) != 'undefined' && form != null) {
					formValidation.validateInit();
				}
			},

			validateInit: function() {
				validate.init();
			}

	  	};
  
	(function () {
		formValidation.init();
	})();
  
})();