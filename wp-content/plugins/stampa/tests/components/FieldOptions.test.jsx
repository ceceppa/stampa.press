import React from 'react';
import TestRenderer from 'react-test-renderer';
import FieldOptions from '../../src/components/FieldOptions';
import ReactDOM from 'react-dom';
import { act } from 'react-dom/test-utils';
import Store from '../../src/store/store';

import blocksList from './fields-list.test.json';
import { createConnectedStore } from 'undux';

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

  // describe('Test rendering', () => {
  //   let container;

  //   beforeAll(() => {
  //     container = document.createElement('div');
  //     document.body.appendChild(container);
  //     ReactDOM.render(
  //       <Store.Container>
  //         <FieldOptions />
  //       </Store.Container>,
  //       container
  //     );
  //   });

  //   it('Should render a message if no block is selected', () => {
  //     const FieldOptions = container.querySelector('.block-options p');
  //     expect(FieldOptions).not.toBeNull();
  //   });
  // });

  describe('should render the block options', () => {
    let container;
    let Z;

    beforeAll(() => {
      container = document.createElement('div');
      document.body.appendChild(container);

      const C = createConnectedStore({
        activeFieldKey: '_key',
        activeFieldId: 'text',
        stampaFields: [
          {
            id: 'text',
            key: '_key',
            values: {
              placeholder: 'Test placeholder',
            },
          },
        ],
      });

      window.stampa = {
        fields: {
          Fields: {
            text: {
              id: 'text',
              label: 'Text',
              tooltip: 'Simple text input field',
              options: [
                {
                  type: 'text',
                  name: 'placeholder',
                  label: 'Placeholder',
                  value: 'Write text...',
                },
                {
                  type: 'select',
                  name: 'select',
                  label: 'Select:',
                  values: ['Value 1', 'Value 2', 'Value 3'],
                  value: 'Value 2',
                },
                {
                  type: 'checkbox',
                  name: 'test-check',
                  label: 'Checkbox:',
                  value: 'test-value',
                },
              ],
            },
          },
        },
      };

      const X = C.withStore(store => <FieldOptions store={store} />);

      ReactDOM.render(
        <C.Container>
          <X />
        </C.Container>,
        container
      );
    });

    it('Should render the "field-name" input text', () => {
      expect(
        container.querySelector('input[name="field-name"]')
      ).not.toBeNull();
    });

    it('Should render the "placeholder" option', () => {
      const input = container.querySelector('input[name="field-placeholder"]');
      expect(input).not.toBeNull();
      expect(input.value).toBe('Test placeholder');
    });

    it('Should render a <select></select>', () => {
      const select = container.querySelector('select[name="field-select"]');
      expect(select).not.toBeNull();
      expect(select.children.length).toBe(3);
      expect(select.selectedIndex).toBe(1);
    });

    it('Should render an input[type="checkbox"] element', () => {
      const checkbox = container.querySelector('input[type="checkbox"]');
      expect(checkbox).not.toBeNull();
      expect(checkbox.value).toBe('test-value');
    });

    it('Should render the "Delete field" button', () => {
      const button = container.querySelector('button[name="delete-field"]');

      expect(button).not.toBeNull();
    });
  });
});
