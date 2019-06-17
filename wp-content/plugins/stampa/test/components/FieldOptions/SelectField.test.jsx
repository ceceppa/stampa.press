import React from 'react';
import ReactDOM from 'react-dom';

import SelectField from '../../../src/components/FieldOptions/SelectField';

describe('SelectField', () => {
  describe('Test rendering', () => {
    let container;
    const props = {
      option: {
        type: 'select',
        name: 'select',
        label: 'Select',
        values: ['Value 1', 'Value 2', 'Value 3'],
        value: 'Value 2',
      },
    };

    beforeAll(() => {
      container = document.createElement('div');
      document.body.appendChild(container);

      ReactDOM.render(<SelectField {...props} />, container);
    });

    it('Should render a <select></select>', () => {
      const select = container.querySelector('select[name="field-select"]');
      expect(select).not.toBeNull();
      expect(select.children.length).toBe(3);
      expect(select.selectedIndex).toBe(1);
    });

    it('Should render the <label> for the SelectField', () => {
      const label = container.querySelector('label');

      expect(label.textContent).toBe('Select:');
    });
  });
});
