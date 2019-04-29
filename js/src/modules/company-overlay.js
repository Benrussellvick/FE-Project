// Company overlay ----------------------------

(function ($) {

    //open
    $(document).on("click", ".js-company-profile", function (event) {

        event.preventDefault();

        const url = $(this).attr("href");
        const target = $("#js-company-overlay-panel");

        $(".c-company-overlay").addClass("c-company-overlay--visible");
        $("html").addClass("overlay-open");

        $.get(url)
            .done(function (data) {
                const content = $("#js-company-data", data);
                if (content.length === 0) {
                    window.location.replace(url);
                }
                target.find(".c-company-overlay__content").html(content);
                target.find('.preloader').fadeOut('slow', function () {
                    $(this).hide()
                })
            })
            .fail(function () {
                window.location.replace(url);
            });

    });

    //close
    $(document).on("click", ".js-close-company", function (event) {
        event.preventDefault();
        const target = $("#js-company-overlay-panel");
        $("html").removeClass("overlay-open");
        target.find('.preloader').removeAttr("style");
        target.find(".c-company-overlay").removeClass("c-company-overlay--visible");
        target.find(".c-company-overlay__content").empty();
    });

})(jQuery);
