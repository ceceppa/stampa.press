import React from 'react';
import TestRenderer from 'react-test-renderer';
import ComponentsList from '../../src/components/ComponentsList';

import blocksList from './blocks-list.test.json';

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
    props = {
      wallpaperPath: undefined,
      userInfoMessage: undefined,
      onUnlocked: undefined,
    };
    mountedList = undefined;
  });

  describe('Test the render method using the test JSON file', () => {
    let component;

    beforeAll(() => {
      component = componentsList();
    });

    it('Should render a list given an object', () => {
      expect(component.root.findAllByType('button').length).toBeGreaterThan(0);
    });

    it('Should render 1 dt "group" element', () => {
      const dt = component.root.findAllByType('dt');
      expect(dt.length).toBe(1);
      expect(dt[0].props.children).toEqual('Gutenberg');
    });

    it('Should render 2 dd & image elements', () => {
      const dd = component.root.findAllByType('dd');
      const images = component.root.findAllByType('img');
      expect(dd.length).toBe(2);
      expect(images.length).toBe(2);
    });
  });
});
