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

    it('Should render the "Group Options" toggle-group', () => {
      const blockOptions = container.querySelector('.block-options');

      expect(blockOptions).not.toBeNull();
    });

    it('Should render the option for the "Block" name', () => {
      const blockOptions = container.querySelector('input[name="block-name"]');

      expect(blockOptions).not.toBeNull();
    });

    it('Should render the option for the "Background" setting', () => {
      const blockOptions = container.querySelector(
        'input[name="block-background"]'
      );

      expect(blockOptions).not.toBeNull();
    });

    it('Should render the "Save block" button', () => {
      const blockOptions = container.querySelector('.block-options__save');

      expect(blockOptions).not.toBeNull();
    });
  });
});
