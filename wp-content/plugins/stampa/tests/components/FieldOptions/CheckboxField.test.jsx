import React from 'react';
import ReactDOM from 'react-dom';

import { act } from 'react-dom/test-utils';

import CheckboxField from '../../../src/components/FieldOptions/CheckboxField';

describe('CheckboxField', () => {
  const updateOptionValue = jest.fn();

  const props = {
    option: {
      name: 'test-check',
      label: 'Checkbox',
      value: 'test-value',
    },
    updateOptionValue,
  };

  describe('Test rendering', () => {
    let container;
    let checkbox;

    beforeAll(() => {
      container = document.createElement('div');
      document.body.appendChild(container);

      ReactDOM.render(<CheckboxField {...props} />, container);

      checkbox = container.querySelector('input[type="checkbox"]');
    });

    it('Should render an input[type="checkbox"] element', () => {
      expect(checkbox).not.toBeNull();
      expect(checkbox.value).toBe('test-value');
    });

    it('Should render the <label> for the SelectField', () => {
      const label = container.querySelector('label');

      expect(label.textContent).toBe('Checkbox:');
    });

    it('Should not be checked by default', () => {
      checkbox = container.querySelector('input[type="checkbox"]');

      expect(checkbox.checked).not.toBeTruthy();
    });

    it('Should call updateOptionValue when checked/unchecked', () => {
      act(() => {
        checkbox.dispatchEvent(
          new MouseEvent('click', {
            bubbles: true,
          })
        );
      });

      expect(updateOptionValue.mock.calls.length).toBe(1);
    });
  });

  describe('Test default "checked" option', () => {
    it('Should be checked by default when passing the "checked: true" option', () => {
      const container = document.createElement('div');
      document.body.innerHTML = '';
      document.body.appendChild(container);

      props.option.checked = true;
      ReactDOM.render(<CheckboxField {...props} />, container);

      const checkbox = container.querySelector('input[type="checkbox"]');
      expect(checkbox.checked).toBeTruthy();
    });
  });
});
