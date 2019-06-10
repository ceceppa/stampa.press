import React from 'react';
import TestRenderer from 'react-test-renderer';
import BlockOptions from '../../src/components/BlockOptions';
import ReactDOM from 'react-dom';
import { act } from 'react-dom/test-utils';
import Store from '../../src/store/store';

import blocksList from './fields-list.test.json';

describe('BlockOptions', () => {
  const props = {};
  let mountedComponent;

  const getComponent = () => {
    if (!mountedComponent) {
      mountedComponent = TestRenderer.create(
        <Store.Container>
          <BlockOptions {...props} />
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
          <BlockOptions />
        </Store.Container>,
        container
      );
    });

    it('Should render the "Background" option', () => {});

    it('Should render the "Save block" button', () => {
      const blockOptions = container.querySelector('.block-options__save');

      expect(blockOptions).not.toBeNull();
    });
  });
});
