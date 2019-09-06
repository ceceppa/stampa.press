/* eslint comma-dangle: ["error", "never"] */
/**
 * JS helper functions.
 * These will need to be imported in the script they are to be used in.
 */

// convert px value into rems.
const pxToRem = px => {
  const fontSize = parseFloat(
    getComputedStyle(document.querySelector('html'))['font-size']
  );
  const rem = px / fontSize;

  return rem;
};

// convert rem value to pxs.
const remToPx = rem => {
  const fontSize = parseFloat(
    getComputedStyle(document.querySelector('html'))['font-size']
  );
  const px = rem * fontSize;

  return px;
};

// check if device is touch capable.
/**
 * Detect if the device has touch screen
 * https://stackoverflow.com/questions/4817029/whats-the-best-way-to-detect-a-touch-screen-device-using-javascript#4819886
 */
function isTouch() {
  const prefixes = ' -webkit- -moz- -o- -ms- '.split(' ');
  const mq = function (query) {
    return window.matchMedia(query).matches;
  };

  if ('ontouchstart' in window || (window.DocumentTouch && document instanceof DocumentTouch)) {
    return true;
  }

  // include the 'heartz' as a way to have a non matching MQ to help terminate the join
  // https://git.io/vznFH
  const query = ['(', prefixes.join('touch-enabled),('), 'heartz', ')'].join('');
  return mq(query);
}

module.exports = {
  pxToRem,
  remToPx,
  isTouch
};
