var breakpoint = {};

(function () {

  breakpoint.refreshValue = function () {
    this.value = window.getComputedStyle(document.querySelector('body'), ':before').getPropertyValue('content').replace(/\"/g, '');
  };
  
  window.addEventListener('resize', function (event) {
    breakpoint.refreshValue();
  });

  // Get value on page load
  breakpoint.refreshValue();
  
})();

module.exports = breakpoint;