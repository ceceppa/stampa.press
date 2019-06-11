/* eslint import/no-extraneous-dependencies: ["error", {"optionalDependencies": false}] */
/* eslint no-unused-expressions: ["off"] */
/* eslint import/no-unresolved: off */
/* eslint import/extensions: off */
/* eslint no-shadow: off */
import Vue from 'vue';
import {
  mount,
} from '@vue/test-utils';
import {
  expect,
} from 'chai';

import ajaxForm from '@/components/ajax-form';
import '@/event-hub';

import testSubmit from '../fakes/form';
import testEventBus from '../fakes/eventHub';

describe('Ajax Form', () => {
  const TEST_MESSAGE = 'This is just a test';

  describe('Component rules', () => {
    const wrapper = mount(ajaxForm, {
      propsData: {
        action: 'test',
      },
    });
    const vm = wrapper.vm;
    const form = wrapper.find('form');

    it('defines "models" property as an empty object', () => {
      expect(vm.models).to.be.eql({});
    });

    it('defines "html" property as empty string', () => {
      expect(vm.message).to.be.equal('');
    });

    it('defines "response" property as { invalid: {} }', () => {
      expect(vm.response).to.be.eql({
        invalid: {},
      });
    });

    it('defines "doingAjax" boolean property', () => {
      expect(vm.doingAjax).to.be.an('boolean');
      expect(vm.doingAjax).to.be.equal(false);
    });

    it('renders a <form> element', () => {
      expect(wrapper.contains('form')).to.be.true;
    });

    it('form element has "action" attributes defined', () => {
      const form = wrapper.find('form').element;

      expect(form.getAttribute('action')).to.not.be.null;
    });

    it('form element "method="POST" attributes defined', () => {
      const form = wrapper.find('form').element;

      expect(form.getAttribute('method')).to.not.be.null;
      expect(form.getAttribute('method').toUpperCase()).to.eql('POST');
    });

    it('Contains the "ajax-form__content" child', () => {
      expect(wrapper.find('.ajax-form__content').exists()).to.be.true;
    });

    it('<form> has "ajax-form" class', () => {
      expect(form.classes()).to.contains('ajax-form');
    });

    it('Has to append "ajax" class when performing an ajax call', () => {
      wrapper.setData({
        doingAjax: true,
      });

      expect(form.classes()).to.contains('ajax');

      wrapper.setData({
        doingAjax: false,
      });
    });

    it('Has to append all the reponse keys as classes of the form', () => {
      Vue.set(wrapper.vm, 'response', {
        invalid: ['email'],
        errors: ['email'],
      });

      expect(form.classes()).to.contains('invalid');
      expect(form.classes()).to.contains('errors');

      wrapper.setData({
        response: {},
      });
    });

    it('Has to switch to the message slot when the property "html" is not empty', () => {
      wrapper.setData({
        message: TEST_MESSAGE,
      });

      expect(wrapper.find('.ajax-form__content').isVisible()).to.be.false;
      expect(wrapper.find('.ajax-form__message').isVisible()).to.be.true;
    });

    it('Message slot has to contain the test message', () => {
      expect(wrapper.find('.ajax-form__message').html()).to.contains(TEST_MESSAGE);
    });
  });

  describe('Test Form functionalities', () => {
    const fakeEventBus = mount(testEventBus);

    const wrapper = mount(ajaxForm, {
      propsData: {
        action: 'test',
      },
      slots: {
        default: testSubmit,
      },
      mocks: {
        eventHub: fakeEventBus.vm,
      },
    });
    const submit = wrapper.find('.submit');

    it('should trigger "ajax-form-mounted-test" event', () => {
      expect(fakeEventBus.emitted('ajax-form-mounted-test').length).to.be.eq(1);
    });

    it('On form submit should trigger "ajax-start-test" event on eventBus', () => {
      /**
       * Can't stub the onSubmit method, because probably it is
       * attached during the the mounted event.
       * So just going to check that the event is emitted.
       */
      expect(submit.exists()).to.be.true;

      submit.trigger('click');

      setTimeout(() => {
        expect(fakeEventBus.emitted('ajax-start-test').length).to.be.eq(1);
      }, 0);
    });

    it('should allow to disable default "submit" behaviour using "remove-submit-listener-test"', () => {
      fakeEventBus.vm.$emit('remove-submit-listener-test');

      const component = fakeEventBus.emitted('ajax-form-mounted-test').shift()[0];
      component.$el.addEventListener('submit', e => {
        e.preventDefault();
        e.stopPropagation();

        return false;
      });

      submit.trigger('click');

      setTimeout(() => {
        expect(fakeEventBus.emitted('ajax-start-test').length).to.be.eq(1);
      }, 0);
    });

    it('should exec "onSubmit" when manually submitting the form with "ajax-submit-test"', () => {
      fakeEventBus.vm.$emit('ajax-submit-test');

      setTimeout(() => {
        expect(fakeEventBus.emitted('ajax-start-test').length).to.be.eq(1);
      }, 0);
    });

    it('has to set doingAjax to true', () => {
      expect(wrapper.vm.doingAjax).to.be.true;
    });

    it('post data has to contain the key "test" with value of "test value"', () => {
      expect(fakeEventBus.vm.onEvent).to.be.true;
      expect(fakeEventBus.vm.onEventAction).to.be.eq('test');

      expect(fakeEventBus.vm.onEventData.get('test')).to.be.eql('test value');
    });

    it('has to emit "ajax-completed-[action]" after parsing the ajax response', () => {
      const response = {
        test: 1,
      };
      fakeEventBus.vm.$emit('ajax-success-test', response);

      expect(wrapper.vm.doingAjax).to.be.false;
      expect(wrapper.vm.response).to.eql(response);

      expect(fakeEventBus.emitted('ajax-completed-test').length).to.eq(1);
      expect(fakeEventBus.emitted('ajax-completed-test')[0][0].test).to.eq(1);
    });

    it('has to handle "ajax" request failure', () => {
      const response = 'Something went wrong!';
      fakeEventBus.vm.$emit('ajax-failed-test', response);

      expect(wrapper.vm.doingAjax).to.be.false;
      expect(wrapper.vm.message).to.eql(response);
    });

    it('has to show the html element and revert back to the form when the property timeout is set', function (done) {
      const response = {
        message: TEST_MESSAGE,
        timeout: 500,
        clear: true,
      };
      fakeEventBus.vm.$emit('ajax-success-test', response);

      expect(wrapper.vm.message).to.be.eq(TEST_MESSAGE);

      this.timeout(600);
      setTimeout(() => {
        expect(wrapper.vm.message).to.be.eq('');

        done();
      }, 550);
    });

    it('form input should be "empty" when returning "clear"', () => {
      const input = wrapper.find('input[type="text"]').element;

      expect(input.value).to.eql('');
    });

    it('should allow to set "message" to "TEST_MESSAGE" using "ajax-message-set-[ACTION]" event', () => {
      fakeEventBus.vm.$emit('ajax-message-set-test', TEST_MESSAGE);

      expect(wrapper.vm.message).to.be.eq(TEST_MESSAGE);
    });

    it('should allow to clear the "message" variable using "ajax-message-clear-[ACTION]"', () => {
      fakeEventBus.vm.$emit('ajax-message-clear-test');

      expect(wrapper.vm.message).to.be.eq('');
    });

    it('should allow to set the "timeout" variable using "ajax-message-timeout-[ACTION]"', function (done) {
      fakeEventBus.vm.$emit('ajax-message-set-test', TEST_MESSAGE);
      fakeEventBus.vm.$emit('ajax-message-timeout-test', 500);

      this.timeout(600);
      setTimeout(() => {
        expect(wrapper.vm.message).to.be.eq('');

        done();
      }, 550);
    });

    it('should add "is-changed" class and emit "ajax-form-changed-test" if any input has changed', () => {
      const input = wrapper.find('input[type="text"]');
      const form = wrapper.find('form');

      input.element.value = '';
      input.trigger('change');
      input.trigger('input');

      expect(form.classes().indexOf('is-changed')).to.be.gte(0);

      // Triggers a "generic" ajax-form-changed event and a specific one
      expect(fakeEventBus.emitted('ajax-form-changed').length).to.be.gte(1);
      expect(fakeEventBus.emitted('ajax-form-changed-test').length).to.be.gte(1);
    });
  });

  describe('Accessibility tests', () => {
    const wrapper = mount(ajaxForm, {
      propsData: {
        action: 'accessibility-test',
      },
      slots: {
        default: `
        <div>
          <input type="text" name="test" value="" data-validity="Custom validity message" required>
          <input type="text" name="another" value="another value" data-validity="Another custom validity message" required>
          <p id="another-error" hidden style="display: none">This is the error</p>
          <input type="submit" value="Submit" class="submit">
        </div>
        `,
      },
    });
    const inputTest = wrapper.find('input[name="test"]').element;

    it('should define aria-required="true" for required inputs', () => {
      expect(inputTest.getAttribute('aria-required')).to.be.eql('true');
    });

    it('should define aria-describedby attribute if data-validity is not empty', () => {
      expect(inputTest.getAttribute('aria-describedby')).to.be.eql('test-error');
    });

    /**
     * When specifying a custom validity message the component define the "aria-describedby"
     * attribute as: aria-describedby="[field-name]-error".
     *
     * In this case, if the are no elements with this ID, the component creates and hidden one for us.
     */
    it('should create a <p> tag using the text from data-validity attribute', () => {
      const errorElement = wrapper.find('#test-error');

      expect(errorElement.exists()).to.be.true;
      expect(errorElement.element.getAttribute('hidden')).to.not.be.null;
      expect(errorElement.element.style.display).to.be.eql('none');
      expect(errorElement.element.innerHTML).to.be.eql('Custom validity message');
    });

    /**
     * Does not create the <p> tag if already exists, so message is the one
     * specified by the user, not the custom validity one.
     */
    it('should not create a custom <p> "error" element, if alredy exists', () => {
      const userErrorElement = wrapper.find('#another-error');

      expect(userErrorElement.element.innerHTML).to.be.eql('This is the error');
    });

    it('should still define the aria-describeby attribute if the relative error element exists', () => {
      const anotherInput = wrapper.find('input[name="another"]');

      expect(anotherInput.element.getAttribute('aria-describedby')).to.be.eql('another-error');
    });

    it('should set aria-invalid="true" when the browser triggers the "invalid" signal', () => {
      inputTest.checkValidity();

      expect(inputTest.getAttribute('aria-invalid')).to.be.eql('true');
    });
  });
});
