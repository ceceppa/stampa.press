import React from 'react';
import TestRenderer from 'react-test-renderer';
import Block from '../../src/components/Block';
import ReactDOM from 'react-dom';
import { act } from 'react-dom/test-utils';
import Store from '../../src/store/store';

import blocksList from './blocks-list.test.json';

const block = Object.assign(blocksList.Gutenberg.text, {
  _stampa: {
    id: 'text',
    key: '_123',
    startRow: 2,
    startColumn: 3,
    endRow: 2,
    endColumn: 6,
  },
  _values: {},
  options: [
    {
      name: 'test',
      value: 'test-value',
    },
  ],
  className: 'test-class',
});

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

    it('Should render the test block', () => {
      const block = container.querySelector('.grid__block');

      expect(block).not.toBeNull();
      expect(block.classList).toContain('grid__block--text');
      expect(block.style.gridArea).toBe('2 / 3 / 4 / 9');
    });

    it('Should render "test-value"', () => {
      const content = container.querySelector('.grid__block__content');

      expect(content).not.toBeNull();
      expect(content.textContent).toBe('render: test-value');
    });

    it('Should add the custom class to the element', () => {
      const content = container.querySelector('.grid__block__content');

      expect(content).not.toBeNull();
      expect(content.classList).toContain('test-class');
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
