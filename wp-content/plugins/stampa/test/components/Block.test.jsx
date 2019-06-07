import React from 'react';
import TestRenderer from 'react-test-renderer';
import Block from '../../src/components/Block';
import ReactDOM from 'react-dom';
import { act } from 'react-dom/test-utils';
import Store from '../../src/store/store';

import blocksList from './blocks-list.test.json';

const block = Object.assign(
  {
    _stampa: {
      id: 'text',
      key: '_123',
      startRow: 2,
      startColumn: 3,
      endRow: 2,
      endColumn: 6,
    },
  },
  blocksList.Gutenberg.text
);

describe('Block', () => {
  const props = {
    block,
  };
  let mountedComponent;

  const getComponent = () => {
    if (!mountedComponent) {
      mountedComponent = TestRenderer.create(
        <Store.Container>
          <Block {...props} />
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

    beforeAll(() => {
      container = document.createElement('div');
      document.body.appendChild(container);

      ReactDOM.render(
        <Store.Container>
          <Block {...props} />
        </Store.Container>,
        container
      );
    });

    it('Should the test block', () => {
      const block = container.querySelector('.grid__block');

      expect(block).not.toBeNull();
      expect(block.classList).toContain('grid__block--text');
      expect(block.style.gridArea).toBe('2 / 3 / 4 / 9');
    });

    it('Should render "Lorem ipsum" text', () => {
      const content = container.querySelector('.grid__block__content');

      expect(content).not.toBeNull();
      expect(content.textContent).toBe('Lorem ipsum');
    });

    it('Should render the width resizing handler', () => {
      const widthResizer = container.querySelector(
        '.grid__block__resizer--width'
      );

      expect(widthResizer).not.toBeNull();
    });

    it('Should render the corner resizing handler', () => {
      const seResizer = container.querySelector('.grid__block__resizer--se');

      expect(seResizer).not.toBeNull();
    });

    it('Should render the height resizing handler', () => {
      const heightResizer = container.querySelector(
        '.grid__block__resizer--height'
      );

      expect(heightResizer).not.toBeNull();
    });
  });
});
