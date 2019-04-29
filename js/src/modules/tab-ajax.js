//tiles
$(document).on('click', '.ajax-tabs .nav--tabs li', function() {
	
	$('.loader').fadeIn(300);
	
	var target = $('.ajax-tabs');
	var url = $(this).find('a').attr('href');
	if (url != undefined) {
		
		$('.ajax-tabs .nav--tabs li a').removeClass('active');
		
		$(this).find('a').addClass('active');
		
		$('.ajax-container').load(url + ' .ajax-container', function () {
			$('.ajax-container').fadeIn(300, function() {
				
				// $('.loader').fadeOut(300);
				//$('html, body').animate({ scrollTop: target.offset().top }, 500);
				
				// $.getScript("/assets/js/src/modules/equalise.js")
				// $.getScript("/assets/js/src/modules/image-slider.js")
				// $.getScript("/assets/js/src/modules/accordion.js")
				
			});
			

			
			
		});
		
		//tabs on mobile
		if (window.innerWidth < 768 ) {
			var currentlink = $(this).text();
			$('.tabs-trigger a').removeClass('active').text(currentlink);
			$(this).parents('.nav--tabs').removeClass('active').slideUp(300);
		}
		
		//close tabs
		$('li.has-children').removeClass('links-active').find('ul').removeClass('active').slideUp(300);
		
		// return false;
	
	}
});
