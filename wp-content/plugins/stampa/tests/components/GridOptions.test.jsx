import React from 'react';
import TestRenderer from 'react-test-renderer';
import GridOptions from '../../src/components/GridOptions';
import ReactDOM from 'react-dom';
import { act } from 'react-dom/test-utils';
import Store from '../../src/store/store';

describe('GridOptions', () => {
  describe('Should allow to define the grid properties', () => {
    let container;

    beforeAll(() => {
      container = document.createElement('div');
      document.body.appendChild(container);

      ReactDOM.render(
        <Store.Container>
          <GridOptions />
        </Store.Container>,
        container
      );
    });

    it('Should allow changing the # of columns', () => {
      const inputs = container.querySelectorAll('input#columns');
      const input = inputs[0];

      expect(inputs).toHaveLength(1);
    });

    it('Should allow changing the # of rows', () => {
      const inputs = container.querySelectorAll('input#rows');
      const input = inputs[0];

      expect(inputs).toHaveLength(1);
    });

    it('Should allow changing the # of rows', () => {
      const inputs = container.querySelectorAll('input#gap');
      const input = inputs[0];

      expect(inputs).toHaveLength(1);
    });

    it('Should render the "Save block" button', () => {
      const blockOptions = container.querySelector('.block-options__save');

      expect(blockOptions).not.toBeNull();
    });
  });
});
