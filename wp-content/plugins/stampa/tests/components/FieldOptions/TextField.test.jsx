import React from 'react';
import ReactDOM from 'react-dom';

import TextField from '../../../src/components/FieldOptions/TextField';

describe('TextField', () => {
  describe('Test rendering', () => {
    let container;
    const props = {
      option: {
        type: 'text',
        name: 'placeholder',
        label: 'Placeholder',
        value: 'Write text...',
      },
    };

    beforeAll(() => {
      container = document.createElement('div');
      document.body.appendChild(container);

      ReactDOM.render(<TextField {...props} />, container);
    });

    it('Should render the <label> for the TextField', () => {
      const label = container.querySelector('label');

      expect(label.textContent).toBe('Placeholder:');
    });

    it('Should render the "placeholder" text field', () => {
      const input = container.querySelector('input[name="field-placeholder"]');
      expect(input).not.toBeNull();
      expect(input.value).toBe('Write text...');
    });

    it('Should render the selected value instead of the default one', () => {
      props.selectedValues = {
        placeholder: 'Test value',
      };

      container = document.createElement('div');
      document.body.appendChild(container);

      ReactDOM.render(<TextField {...props} />, container);

      const input = container.querySelector('input[name="field-placeholder"]');
      expect(input.value).toBe('Test value');
    });
  });
});
