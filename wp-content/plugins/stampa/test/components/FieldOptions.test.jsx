import React from 'react';
import TestRenderer from 'react-test-renderer';
import FieldOptions from '../../src/components/FieldOptions';
import ReactDOM from 'react-dom';
import { act } from 'react-dom/test-utils';
import Store from '../../src/store/store';

import blocksList from './blocks-list.test.json';

describe('FieldOptions', () => {
  const props = {};
  let mountedComponent;

  const getComponent = () => {
    if (!mountedComponent) {
      mountedComponent = TestRenderer.create(
        <Store.Container>
          <FieldOptions {...props} />
        </Store.Container>
      );
    }

    return mountedComponent;
  };

  afterEach(() => {
    mountedComponent = undefined;
  });

  describe('Test rendering', () => {
    let container;
    let store;

    beforeAll(() => {
      container = document.createElement('div');
      document.body.appendChild(container);

      ReactDOM.render(
        <Store.Container>
          <FieldOptions />
        </Store.Container>,
        container
      );
    });

    it('Should render a message if no block is selected', () => {
      const FieldOptions = container.querySelector('.block-options p');

      expect(FieldOptions).not.toBeNull();
    });

    it('Should render the NumberSliders if a block is selected', () => {});
  });
});
