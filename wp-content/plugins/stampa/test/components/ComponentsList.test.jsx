import React from 'react';
import TestRenderer from 'react-test-renderer';
import ComponentsList from '../../src/components/ComponentsList';
import ReactDOM from 'react-dom';
import { act } from 'react-dom/test-utils';

import blocksList from './fields-list.test.json';

window.stampa = { blocks: blocksList };

// https://medium.freecodecamp.org/the-right-way-to-test-react-components-548a4736ab22
// https://reactjs.org/docs/test-renderer.html
describe('ComponentsList', () => {
  let props;
  let mountedList;

  const componentsList = () => {
    if (!mountedList) {
      mountedList = TestRenderer.create(<ComponentsList {...props} />);
    }

    return mountedList;
  };

  beforeEach(() => {
    props = {};

    mountedList = undefined;
  });

  describe('Test the render method using the test JSON file', () => {
    let component;

    beforeAll(() => {
      component = componentsList();
    });

    it('Should render the sidebar', () => {
      expect(component.root.findAllByType('aside').length).toBeGreaterThan(0);
    });

    it('Should render the search filter', () => {
      expect(
        component.root.findAll(
          node => node.type == 'input' && node.props.id == 'filter'
        )
      ).toHaveLength(1);
    });

    it('Test filter functionality', () => {
      const container = document.createElement('div');
      document.body.appendChild(container);

      act(() => {
        ReactDOM.render(<ComponentsList />, container);
      });

      const inputElement = container.querySelector('input[type="search"]');

      act(() => {
        inputElement.dispatchEvent(
          new KeyboardEvent('keypress', {
            key: 's',
          })
        );
      });

      // console.info(inputElement);
    });

    it('Should render one "group" of element', () => {
      expect(
        component.root.findAll(
          node =>
            node.type === 'div' && node.props.className == 'components__group'
        )
      ).toHaveLength(1);
    });

    it('Should render 2 items (Text & Button)', () => {
      const li = component.root.findAllByType('li');
      expect(li.length).toBe(2);
    });
  });
});
