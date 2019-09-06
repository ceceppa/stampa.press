// Import Highway
import Highway from '@dogstudio/highway/build/es5/highway';

// GSAP
import Tween from 'gsap';
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';

// Fade
class Fade extends Highway.Transition {
  in(view, done) {
    // Animation
    Tween.fromTo(view, 0.15,
      { opacity: 0 },
      {
        opacity: 1,
        onComplete: () => {
          done();
          enableBodyScroll(window);
        },
      }
    );
  }

  out(view, done) {
    // Animation
    Tween.fromTo(view, 0.25,
      { opacity: 1 },
      {
        opacity: 0,
        onComplete: () => {
          window.scrollTo(0, 0);
          disableBodyScroll(window);
          done();
        },
      }
    );
  }
}

export default Fade;
