
//PRIVACY OVERLAY

$(".js-overlay-box__close").on('click', function (e) {
    var exdate = new Date();
    exdate.setDate(exdate.getDate() + (365 * 25));
    document.cookie = "privacyPolicyAccepted=true; expires=" + exdate.toUTCString() + "; path=/";
    $(".c-overlay-box").removeClass('c-overlay-box--visible');
});

if (document.cookie.indexOf("privacyPolicyAccepted") < 0) {
    $(".c-overlay-box").addClass('c-overlay-box--visible');
}