/**
 * Object-fit Polyfill.
 * Detects if the user is viewing the page in IE11.
 * Adds a class name and img src to the parent element.
 * The class names then hide the img with opacity.
 * While using a fallback background size 'cover' for IE11.
 * 
 * See `assets/postcss/utility/media.css` for styles.
 * 
 * Usage:
 * <figure class="image-container">
 *   <img class="object-fit" src="https://placeimg.com/640/480/any">
 * </figure>
 * 
 */

(() => {
  // If is IE11 run object-fit polyfill.
  const isIE11 = !!window.MSInputMethodContext && !!document.documentMode;
  if (isIE11 !== true) {
    return;
  }
  
  // Get all our image elements with the class '.object-fit';
  // Adds a class name of 'object-fit-parent' to parent element.
  // Add a background image to the parent of the img based on its src.
  const images = document.querySelectorAll('img.object-fit');
    images.forEach(image => {
      const parent = image.parentElement;
      const src = image.src;
      parent.classList.add('object-fit-parent');
      parent.style.backgroundImage = `url(${src})`;
    });
})();
