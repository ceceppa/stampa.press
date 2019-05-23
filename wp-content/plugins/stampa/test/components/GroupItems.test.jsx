import React from 'react';
import TestRenderer from 'react-test-renderer';
import GroupItems from '../../src/components/GroupItems';
import ReactDOM from 'react-dom';
import { act } from 'react-dom/test-utils';

import blocksList from './blocks-list.test.json';

describe('GroupItems', () => {
  const props = {
    group: 'Gutenberg',
    blocks: blocksList,
  };
  let mountedComponent;

  const groupItems = () => {
    if (!mountedComponent) {
      mountedComponent = TestRenderer.create(<GroupItems {...props} />);
    }

    return mountedComponent;
  };

  afterEach(() => {
    mountedComponent = undefined;
  });

  describe('Test the render method using the test JSON file', () => {
    let component;
    let container;
    beforeAll(() => {
      component = groupItems();

      container = document.createElement('div');
      document.body.appendChild(container);

      ReactDOM.render(<GroupItems {...props} />, container);
    });

    it('Should render one <button> with the label "Gutenberg"', () => {
      const button = container.querySelector('button');

      expect(button.textContent).toBe('Gutenberg');
    });

    it('The <button> should toggle the group body', () => {
      const button = container.querySelector('button');
      const content = container.querySelector('.components__items');

      act(() => {
        button.dispatchEvent(
          new MouseEvent('click', {
            bubbles: true,
          })
        );
      });

      expect(button.className).toContain('collapsed');
      expect(content.style.display).toBe('none');
    });

    it('Should render one <ul> list', () => {
      const ul = component.root.findAllByType('ul');
      expect(ul.length).toBe(1);
    });

    it('Should render two <li> elements', () => {
      const li = component.root.findAllByType('li');
      expect(li.length).toBe(2);
    });

    it('<li> elements should be draggable', () => {
      const li = component.root.findAllByType('li');
      expect(li[0].props.draggable).toBe('true');
    });

    it('The <li> element should contain an image and a label', () => {
      const li = component.root.findAllByType('li');
      const children = li[0].children;

      expect(children[0].type).toBe('img');
      expect(children[1].type).toBe('span');
    });
  });
});
