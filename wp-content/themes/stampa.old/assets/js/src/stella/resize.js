/**
 * OptimizedResize for performance purpose
 *
 * https://developer.mozilla.org/en-US/docs/Web/Events/resize
 *
 * Usage:
 *
 *   import optimizedResize from 'resize';
 *
 *   optimizedResize.add(function() {
 *      console.log('Resource conscious resize callback!')
 *   });
 */
export default (() => {
  const callbacks = [];
  let running = false;


  // run the actual callbacks
  const runCallbacks = () => {
    callbacks.forEach(callback => {
      callback();
    });

    running = false;
  };

  // adds callback to loop
  const addCallback = callback => {
    if (callback) {
      callbacks.push(callback);
    }
  };

  // fired on resize event
  const resize = () => {
    if (!running) {
      running = true;

      if (window.requestAnimationFrame) {
        window.requestAnimationFrame(runCallbacks);
      } else {
        setTimeout(runCallbacks, 66);
      }
    }
  };

  return {
    // public method to add additional callback
    add: callback => {
      if (!callbacks.length) {
        window.addEventListener('resize', resize);
      }

      addCallback(callback);
    },
  };
})();
