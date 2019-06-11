import React from 'react';
import TestRenderer from 'react-test-renderer';
import Field from '../../src/components/Field';
import ReactDOM from 'react-dom';
import { act } from 'react-dom/test-utils';
import Store from '../../src/store/store';

import fieldsList from './fields-list.test.json';

const field = Object.assign(fieldsList.Gutenberg.text, {
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

describe('Field', () => {
  const props = {
    field,
  };
  let mountedComponent;

  const getComponent = () => {
    if (!mountedComponent) {
      mountedComponent = TestRenderer.create(
        <Store.Container>
          <Field {...props} />
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
          <Field {...props} />
        </Store.Container>,
        container
      );
    });

    it('Should render the test block', () => {
      const block = container.querySelector('.stampa-grid__field');

      expect(block).not.toBeNull();
      expect(block.classList).toContain('stampa-grid__field--text');
      expect(block.style.gridArea).toBe('2 / 3 / 4 / 9');
    });

    it('Should render "test-value"', () => {
      const content = container.querySelector('.stampa-grid__field__content');

      expect(content).not.toBeNull();
      expect(content.textContent).toBe('render: test-value');
    });

    it('Should add the custom class to the element', () => {
      const content = container.querySelector('.stampa-grid__field__content');

      expect(content).not.toBeNull();
      expect(content.classList).toContain('test-class');
    });

    it('Should render the width resizing handler', () => {
      const widthResizer = container.querySelector(
        '.stampa-grid__field__resizer--width'
      );

      expect(widthResizer).not.toBeNull();
    });

    it('Should render the corner resizing handler', () => {
      const seResizer = container.querySelector(
        '.stampa-grid__field__resizer--se'
      );

      expect(seResizer).not.toBeNull();
    });

    it('Should render the height resizing handler', () => {
      const heightResizer = container.querySelector(
        '.stampa-grid__field__resizer--height'
      );

      expect(heightResizer).not.toBeNull();
    });
  });
});
