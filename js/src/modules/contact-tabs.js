

(function () {

    var contactTabs = $('#js-contact-tabs');
    
    function moveToTabs(speed) {
        $('html, body').animate({
            scrollTop: contactTabs.offset().top - 65
        }, speed);
    }
    
    if (contactTabs.length > 0) {

        //onload
        var hash = window.location.hash;
        if (hash) {
            moveToTabs(500);
        }

        //clicking a tab
        $(".js-tablist__link").on("click", function(){
            moveToTabs(500);
        });
    }

})();

