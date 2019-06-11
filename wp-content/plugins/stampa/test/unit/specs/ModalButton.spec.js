/* eslint import/no-extraneous-dependencies: ["error", {"optionalDependencies": false}] */
/* eslint no-unused-expressions: ["off"] */
/* eslint import/no-unresolved: off */
/* eslint import/extensions: off */
/* eslint no-shadow: off */
import {
  mount,
  shallowMount,
} from '@vue/test-utils';
import { expect } from 'chai';

/**
 * Modal button is used to trigger a signal when the element is clicked.
 */
import modalButton from '@/components/modal-button';

// Fake event bus
import testEventHub from '../fakes/eventHub';

describe('<modal-button>', () => {
  /**
   * The component should be "rendered" as an <a> tag (by default).
   */
  it('Default "tag" should be <button>', () => {
    const wrapper = mount(modalButton, {
      propsData: {
        name: 'test-modal',
      },
    });
    const button = wrapper.find('button');

    expect(button.exists()).to.be.true;
  });

  /**
   * Default tag can be changed using the "tag" attribute.
   */
  it('It renders as a <a> when passing tag="a" attribute', () => {
    const wrapper = shallowMount(modalButton, {
      propsData: {
        tag: 'a',
        name: 'test-modal',
      },
    });
    const anchor = wrapper.find('a');

    expect(anchor.exists()).to.be.true;
  });

  describe('Test component behaviour', () => {
    const fakeEventHub = mount(testEventHub);

    const wrapper = shallowMount(modalButton, {
      propsData: {
        name: 'test-modal',
        value: 'active',
      },
      mocks: {
        eventHub: fakeEventHub.vm,
      },
    });

    const button = wrapper.find('button');


    it('should have "modal-button" class', () => {
      expect(button.element.classList.contains('modal-button')).to.be.true;
    });

    it('should keep the "name" attribute', () => {
      expect(button.attributes().name).to.eql('test-modal');
    });

    it('It should use the "name" attribute as href when rendered as an <anchor>', () => {
      const basicTemplate = {
        template: '<modal-button name="test-modal" tag="a">This is a test</modal-button>',
      };

      const basicWrapper = mount(basicTemplate);
      const a = basicWrapper.find('a');

      expect(a.element.href.indexOf('#test-modal')).to.be.gt(0);
    });

    it('when clicked should trigger the "modal-test-modal" event', () => {
      button.trigger('click');

      // modal-mounted is triggered when the component is mounted.
      expect(fakeEventHub.emitted('modal-button-mounted-test-modal').length).to.be.eq(1);
      expect(fakeEventHub.emitted('modal-clicked-test-modal').length).to.be.eq(1);
    });

    it('Should set the value to "active" for the key "test-modal" of modals object.', () => {
      expect(fakeEventHub.vm.modals['test-modal']).to.be.eq('active');
    });

    it('should add "is-active" class to the element itself.', () => {
      expect(button.element.classList.contains('is-active')).to.be.true;
    });

    it('should remove "is-active" class when clicking outside the element <modal> target component', () => {
      fakeEventHub.vm.$emit('modal-hidden-test-modal');

      expect(button.element.classList.contains('is-active')).to.be.false;
    });

    it('should toggle "is-active" and "aria-pressed" when using the "toggle" attribute', () => {
      /**
       * Need to test the interaction with the eventBus itself
       */
      const wrapper = mount(modalButton, {
        propsData: {
          name: 'test-modal',
          value: 'active',
          toggle: true,
        },
      });

      const button = wrapper.find('button');

      // Add the class
      button.trigger('click');
      expect(button.element.getAttribute('aria-pressed')).to.be.eql('true');

      // Removes it
      button.trigger('click');

      expect(button.element.classList.contains('is-active')).to.be.false;
      expect(button.element.getAttribute('aria-pressed')).to.be.eql('false');
    });

    // Single attribute is used to trigger custom JS function
    it('should not keep "is-active" when using the "single" attribute', () => {
      /**
       * Need to test the interaction with the eventBus itself
       */
      const wrapper = mount(modalButton, {
        propsData: {
          name: 'test-modal',
          value: 'active',
          single: true,
        },
      });

      const button = wrapper.find('button');

      // Add the class
      button.trigger('click');

      expect(button.element.classList.contains('is-active')).to.be.false;
    });
  });
});
