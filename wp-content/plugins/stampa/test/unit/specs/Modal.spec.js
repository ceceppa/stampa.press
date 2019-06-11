/* eslint import/no-extraneous-dependencies: ["error", {"optionalDependencies": false}] */
/* eslint no-unused-expressions: ["off"] */
/* eslint import/no-unresolved: off */
/* eslint import/extensions: off */
/* eslint no-shadow: off */
import Vue from 'vue';
import '@/event-hub';

import { mount } from '@vue/test-utils';
import { expect } from 'chai';

import sinon from 'sinon';

/**
 * Modal button is used to trigger a signal when the element is clicked.
 */
import modal from '@/components/modal';

describe('<modal>', () => {
  const eventHub = Vue.prototype.$eventHub;
  const wrapper = mount(modal, {
    propsData: {
      name: 'test-modal',
      value: 'test-value',
    },
  });
  eventHub.$on('modal', 'test-modal', 'test-value');
  const div = wrapper.find('div');

  /**
   * Modal name must follow one of this pattern:
   *
   * 1. [a-z]
   * 2. [a-z]-[a-z]...
   *
   * no space or other signs are accepted!
   */
  it('should throw an error if the name contains unhexpected character', () => {
    const originalError = Error;
    const customError = sinon.stub();
    Error = customError;

    mount(modal, {
      propsData: {
        name: 'test modal',
        value: 'test-value',
      },
    });

    expect(customError.called).to.be.true;
    Error = originalError;
  });

  it('by default it should be rendered as <div>', () => {
    expect(div.exists()).to.be.true;
  });

  it('it should have "modal" class', () => {
    expect(div.element.classList.contains('modal')).to.be.true;
  });

  it('should define "aria-label" if no aria-labelledby / aria-describedby attributes are specified', () => {
    expect(div.element.getAttribute('aria-label')).to.eql('test modal');
  });

  it('"focusElement" should be null if no focusable elements are found', () => {
    expect(wrapper.vm.focusElement).to.be.null;
  });

  it('should define the "modal" attribute', () => {
    expect(div.attributes().modal).to.eql('test-modal');
  });

  it('should append the value triggered by <modal-button> as its own class', () => {
    const eventStub = sinon.stub();
    eventHub.$on('modal-visible-test-modal', eventStub);
    eventHub.$emit('modal-clicked', 'test-modal', 'test-value');

    expect(div.element.classList.contains('test-value')).to.be.true;
    expect(eventStub.called).to.be.true;
  });

  it('should also have "active" class when using the custom attribute "value"', () => {
    expect(div.element.classList.contains('active')).to.be.true;
  });


  it('clicking outside the modal should remove the class "active" & "test-value"', () => {
    const eventStub = sinon.stub();
    eventHub.$on('modal-hidden-test-modal', eventStub);

    document.body.click();

    expect(div.element.classList.contains('test-value')).to.be.false;
    expect(div.element.classList.contains('active')).to.be.false;
    expect(eventStub.called).to.be.true;
  });

  it('should append the "value" as class only if value matches the "value" attribute of the modal itself', () => {
    eventHub.$emit('modal-clicked', 'test-modal', 'test-value');
    eventHub.$emit('modal-clicked', 'test-modal', 'another-value');

    expect(div.element.classList.contains('another-value')).to.be.false;
  });

  // it('clicking inside the modal should not close it', () => {
  //   div.element.click();

  //   expect(div.element.classList.contains('active')).to.be.true;
  // });

  it('should ignore the outside click when [click-outside] is passed', () => {
    const wrapper = mount(modal, {
      propsData: {
        name: 'another-modal',
        value: 'test-value',
        clickOutside: false,
      },
    });
    const div2 = wrapper.find('div');
    eventHub.$emit('modal-clicked', 'test-modal', 'test-value');
    eventHub.$emit('modal-clicked', 'another-modal', 'test-value');

    document.body.click();

    // must "close" the other modal
    expect(div.element.classList.contains('test-value')).to.be.false;
    expect(div2.element.classList.contains('test-value')).to.be.true;
  });

  /**
   * The same name can be reused with different modal but target each of them
   * with different "value".
   *
   * Example:
   *
   * <modal name="another-modal" value="test-value"></modal>
   * <modal name="another-modal" value="another-value"></modal>
   *
   * To display them you need something like:
   *
   * <modal-button name="another-value" value="test-value">This displays the 1st one</modal-button>
   * <modal-button name="another-value" value="another-value">This displays the 2nd one</modal-button>
   */
  it('should hide itself when emitted value is different from the attribute one', () => {
    const wrapper = mount(modal, {
      propsData: {
        name: 'another-modal',
        value: 'test-value',
        clickOutside: false,
      },
    });
    const div = wrapper.find('div');
    eventHub.$emit('modal-clicked', 'another-modal', 'test-value');
    eventHub.$emit('modal-clicked', 'another-modal', 'another-value');

    expect(div.element.classList.contains('active')).to.be.false;
  });

  /**
   * The persistent attribute allow to have multiple modal open at the same time,
   * as each of them can be only closed when clicking the corresponding <modal-button> element.
   * In this case <modal-button> should be used with the "toggle" option set to true.
   *
   * The attribute implicitly set "click-outside" to true.
   */
  it('when using "persistent" attribute the modal should only be close by its <modal-button>', () => {
    const wrapper = mount(modal, {
      propsData: {
        name: 'another-modal',
        persistent: true,
      },
    });
    const div = wrapper.find('div');
    eventHub.$emit('modal-clicked', 'another-modal', 'active');

    // Clicking on a different modal.
    eventHub.$emit('modal-clicked', 'test-modal', 'active');

    expect(div.element.classList.contains('active')).to.be.true;
  });

  /**
   * focusElement should be pointing to the fist element that can have focus
   */
  it('focusElement should be <button> and be focused when the modal is displayed', () => {
    const wrapper = mount(modal, {
      propsData: {
        name: 'another-modal',
        persistent: true,
      },
      slots: {
        default: `
          <p>This is a paragraph</p>
          <button type="button">This can be focused</button>
        `,
      },
    });

    eventHub.$emit('modal-clicked', 'another-modal', 'active');

    const button = wrapper.vm.focusElement;
    expect(button.type).to.eql('button');

    // Need to wait before check
    setTimeout(() => {
      expect(document.activeElement).to.eql(button);
    }, 100);
  });

  /**
   * focusElement should be pointing to the fist element that can have focus
   */
  it('pressing ESC should close the dialog', () => {
    const wrapper = mount(modal, {
      propsData: {
        name: 'another-modal',
      },
      slots: {
        default: `
          <p>This is a paragraph</p>
          <button type="button">This can be focused</button>
        `,
      },
    });
    const div = wrapper.find('div');

    eventHub.$emit('modal-clicked', 'another-modal', 'active');

    const escEvent = document.createEvent('Events');
    escEvent.initEvent('keypress', true, true);
    escEvent.code = 27;

    document.dispatchEvent(escEvent);

    setTimeout(() => {
      expect(div.element.classList.contains('active')).to.be.false;
    }, 20);
  });
});
