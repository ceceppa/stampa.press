/**
 * Swipe events
 * @see https://codepen.io/ganmahmud/pen/RaoKZa?editors=0010
 *
 * Example:
 * var elem = document.querySelector('.swipezone');
 * swipedetect(elem, swipedir => {
 *   console.log('Swiped: ' + swipedir); // 'up', 'down', 'left' or 'right'.
 * });
 */
export default (el, callback) => {
  const touchsurface = el;
  const handleswipe = callback;
  const threshold = 50; // required min distance traveled to be considered swipe
  const restraint = 150; // maximum distance allowed at the same time in perpendicular direction
  const allowedTime = 300; // maximum time allowed to travel that distance

  let swipedir;
  let startX;
  let startY;
  let distX;
  let distY;
  let elapsedTime;
  let startTime;

  touchsurface.addEventListener('touchstart', e => {
    const touchobj = e.changedTouches[0];
    swipedir = 'none';
    startX = touchobj.pageX;
    startY = touchobj.pageY;
    startTime = new Date().getTime(); // record time when finger first makes contact with surface
    e.preventDefault();
  }, false);

  touchsurface.addEventListener('touchend', e => {
    const touchobj = e.changedTouches[0];

    // get horizontal dist traveled by finger while in contact with surface
    distX = touchobj.pageX - startX;
    // get vertical dist traveled by finger while in contact with surface
    distY = touchobj.pageY - startY;
    // get time elapsed
    elapsedTime = new Date().getTime() - startTime;

    // first condition for swipe met
    if (elapsedTime <= allowedTime) {
      if (Math.abs(distX) >= threshold && Math.abs(distY) <= restraint) {
        // horizontal swipe condition met - if dist traveled is negative, it indicates left swipe
        swipedir = (distX < 0) ? 'left' : 'right';
      } else if (Math.abs(distY) >= threshold && Math.abs(distX) <= restraint) {
        // vertical swipe condition met - if dist traveled is negative, it indicates up swipe
        swipedir = (distY < 0) ? 'up' : 'down';
      }
    }
    handleswipe(swipedir);
    e.preventDefault();
  }, false);
};
