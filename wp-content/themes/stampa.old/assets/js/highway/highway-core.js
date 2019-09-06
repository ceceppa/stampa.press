/* global Highway */
import Highway from '@dogstudio/highway/build/es5/highway';

// Import classes.
import CustomRenderer from './highway-renderer';
import Fade from './highway-transitions';

const H = new Highway.Core({
  renderers: {
    name: CustomRenderer,
  },
  transitions: {
    name: Fade,
  },
});

const gtm = nine3.gtm;
const links = document.querySelectorAll('.menu-item a');

H.on('NAVIGATE_IN', (to, location) => {
  // Check Active Link
  for (let i = 0; i < links.length; i++) {
    const link = links[i];
    const parent = link.parentNode;

    // Clean class
    parent.classList.remove('current-menu-item');

    // Active link
    if (link.href === location.href) {
      parent.classList.add('current-menu-item');
    }
  }
});

H.on('NAVIGATE_END', (to, from, location) => {
  if (typeof gtag !== 'undefined') {
    // eslint-disable-next-line
    gtag('config', gtm, {
      page_path: location.pathname,
      page_title: to.page.title,
      page_location: location.href,
    });
  }
});
