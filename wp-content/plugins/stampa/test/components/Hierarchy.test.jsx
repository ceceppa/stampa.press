import React from 'react';
import ReactDOM from 'react-dom';
import Hierarchy from '../../src/components/Hierarchy';

describe('Hierarchy', () => {
  const props = {
    items: [
      {
        _stampa: {
          name: 'Test heading',
          type: 'heading',
          parent: 0,
          key: 'unique',
        },
      },
    ],
  };

  describe('Test the render method', () => {
    let container;

    beforeAll(() => {
      container = document.createElement('div');
      document.body.appendChild(container);

      ReactDOM.render(<Hierarchy {...props} />, container);
    });

    it('Should render a list of elements', () => {
      const ul = container.querySelectorAll('.hierarchy__list');

      expect(ul).toHaveLength(1);
    });

    it('Should render 1 li item', () => {
      const li = container.querySelectorAll(
        '.hierarchy__list > .hierarchy__item'
      );

      expect(li).toHaveLength(1);
    });
  });
});
