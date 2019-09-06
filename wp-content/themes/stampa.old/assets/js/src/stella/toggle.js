/**
 * Toggle Class.
 * Adds basic toggle functionality using data-toggle attributes.
 *
 * `data-toggle="{unique-name}"`; Added to buttons that will trigger an element.
 * `data-toggle-target="{unique-name}"`; Added to the element which needs to be toggled.
 *
 * Example:
 * <button type="button" data-toggle="search">Open Search</button>
 * <div data-toggle-target="search">
 *   ...
 *   <button type="button" data-toggle-close="search">Close Search</button>
 * </div>
 *
 * Todo:
 * 1. Add `data-target-role` to provide more accessibility.
 * 2. Toggle focus to first element if available when modal opens.
 *
 */
class Toggle {
  constructor(element, options) {
    this.element = element;
    this.state = false;
    this.options = typeof options == 'object' ? options : {}
    this.selector = this.toggle.element.getAttribute('data-toggle');
    this.class = `is-active-${this.toggle.selector}`;
    this.target = null;

    this.element.setAttribute('aria-pressed', this.state);

    if (!this.options.isDynamic) {
      this.target = document.querySelector(`[data-toggle-target="${this.selector}"]`);
      this.target.setAttribute('aria-hidden', !this.state);
    }

    // Our click event for our toggle button.
    this.element.addEventListener('click', () => this.toggle());

    // Click events to close our target.
    // Any element can be given this data attribute to close the specific target.
    this.closeBtns = document.querySelectorAll(`[data-toggle-close="${this.selector}"]`);
    this.closeBtns.forEach(el => {
      el.addEventListener('click', () => this.toggle());
    });
  }
  toggle() {
    // Toggle our current state (true/false).
    this.state = !this.state;

    // Toggle our active classes to our button and target elements.
    this.element.classList[this.state ? 'add' : 'remove']('is-active');

    // Toggle accessibility settings of our button and target elements.
    this.element.setAttribute('aria-pressed', this.state);

    // Toggle a global class to our body for CSS manipulation.
    // Include a delay (RFA) so we can style elements that may be hidden with CSS.
    document.body.classList[this.state ? 'add' : 'remove'](this.class);

    if (this.target) {
      this.target.classList[this.state ? 'add' : 'remove']('is-active');
      this.target.setAttribute('aria-hidden', !this.state);

      window.requestAnimationFrame(() => {
        this.target.classList[this.state ? 'add' : 'remove']('is-visible');
      });
    }

    // Trigger custom event listeners on open & close based on current state.
    this.triggerEvent(this.state ? 'open' : 'close');
  }
  triggerEvent(eventName) {
    const customEvent = new CustomEvent(eventName, {
      bubbles: true,
      detail: {
        toggleClass: this,
      },
    });
    this.element.dispatchEvent(customEvent);
  }
}

// Initialize all our toggle elements by data attribute.
const elements = document.querySelectorAll('[data-toggle]');
for (const element of elements) {
  new Toggle(element); // eslint-disable-line
}
