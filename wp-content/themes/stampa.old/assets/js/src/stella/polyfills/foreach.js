/**
 * JS polyfills.
 * Babel usually handles this kind of thing, but there is an IE11 bug when using
 * forEach on an array of nodes...
 */

(() => {
  if (typeof NodeList.prototype.forEach !== 'function') {
    NodeList.prototype.forEach = Array.prototype.forEach;
  }

  smoothScroll.polyfill();
  return false;
})();
