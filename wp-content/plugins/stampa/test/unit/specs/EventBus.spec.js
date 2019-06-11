/* eslint import/no-extraneous-dependencies: ["error", {"optionalDependencies": false}] */
// import 'babel-polyfill';
import {
  mount,
} from '@vue/test-utils';
import {
  expect,
} from 'chai';
import moxios from 'moxios';
import eventHub from '@/event-hub';


// Fake nonce.
window.Vico = {
  nonce: 'fakenonce',
};

describe('Event Bus', () => {
  const wrapper = mount(eventHub);

  beforeEach(() => {
    moxios.install();
  });

  afterEach(() => {
    moxios.uninstall();
  });

  it('should re-emit ajax-start event when got it', () => {
    wrapper.vm.$emit('ajax', 'test');

    expect(wrapper.emitted('ajax-start-test').length).to.be.eq(1);
  });

  it('performs ajax request to /wp-json/vico/v1/ajax/test', done => {
    const responseText = {
      title: 'ok',
    };
    moxios.stubRequest('/wp-json/vico/v1/ajax/test', {
      status: 200,
      responseText,
    });

    wrapper.vm.$emit('ajax', 'test', {});

    moxios.wait(() => {
      const emitted = wrapper.emitted('ajax-success-test');

      expect(emitted.length).to.be.gt(1);
      expect(emitted[0][0]).to.be.eql(responseText);

      done();
    });
  });

  it('emit an ajax-failed event if ajax request fails', done => {
    moxios.stubRequest('/wp-json/vico/v1/ajax/test', {
      status: 404,
    });

    wrapper.vm.$emit('ajax', 'test', {});

    moxios.wait(() => {
      const emitted = wrapper.emitted('ajax-failed-test');

      expect(emitted.length).to.be.eq(1);
      done();
    });
  });

  it('throw an error if response is not an json object', done => {
    moxios.stubRequest('/wp-json/vico/v1/ajax/test', {
      status: 200,
      responseText: '0',
    });

    wrapper.vm.$emit('ajax', 'test', {});

    moxios.wait(() => {
      const emitted = wrapper.emitted('ajax-failed-test');

      expect(emitted.length).to.be.eq(2);
      done();
    });
  });
});
