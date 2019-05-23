import React from 'react';
import TestRenderer from 'react-test-renderer';
import NumberSlider from '../../src/components/NumberSlider';
import ReactDOM from 'react-dom';
import { act } from 'react-dom/test-utils';
import Store from '../../src/store/store';

describe('NumberSlider', () => {
  describe('Test render function', () => {
    let container;

    beforeAll(() => {
      container = document.createElement('div');
      document.body.appendChild(container);

      ReactDOM.render(
        <Store.Container>
          <NumberSlider id="columns" label="Columns:" storeKey="gridColumns" />
        </Store.Container>,
        container
      );
    });

    it('Should define a label', () => {
      const labels = container.querySelectorAll('label[for="columns"]');

      expect(labels).toHaveLength(1);
      expect(labels[0].textContent).toBe('Columns:');
    });

    it('Should define an input[type="number"] with value 12', () => {
      const inputs = container.querySelectorAll('#columns[type="number"]');

      expect(inputs).toHaveLength(1);
      expect(inputs[0].value).toEqual('12');
    });
  });
});
