import React from 'react';
import TestRenderer from 'react-test-renderer';
import ComponentsList from '../../src/components/ComponentsList';

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

  // All tests will go here

  describe('render', () => {
    it('Should render a list given an object', () => {
      const component = componentsList();
      expect(component.root.findAllByType('dl').length).toBeGreaterThan(0);
    });
  });
});
