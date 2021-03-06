import React from 'react';
import TestRenderer from 'react-test-renderer';
import ToggleGroup from '../../src/components/ToggleGroup';
import ReactDOM from 'react-dom';
import { act } from 'react-dom/test-utils';

describe('ToggleGroup', () => {
  const props = {
    label: 'Gutenberg',
    display: 'grid',
    groupClass: 'another-class',
  };
  let mountedComponent;

  const getComponent = () => {
    if (!mountedComponent) {
      mountedComponent = TestRenderer.create(<ToggleGroup {...props} />);
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
      component = getComponent();

      container = document.createElement('div');
      document.body.appendChild(container);

      ReactDOM.render(<ToggleGroup {...props} />, container);
    });

    it('Should render one <button> with the label "Gutenberg"', () => {
      const button = container.querySelector('button');

      expect(button.textContent).toBe('Gutenberg');
    });

    it('Should use the `another-class` for main div', () => {
      const div = container.querySelector('div');

      expect(div.className).toContain('another-class');
    });

    it('The <button> should toggle the group body', () => {
      const button = container.querySelector('button');
      const content = container.querySelector('.toggle-group__content');

      act(() => {
        button.dispatchEvent(
          new MouseEvent('click', {
            bubbles: true,
          })
        );
      });

      expect(button.className).toContain('collapsed');
      expect(content.style.display).toBe('none');

      act(() => {
        button.dispatchEvent(
          new MouseEvent('click', {
            bubbles: true,
          })
        );
      });
      expect(content.style.display).toBe('grid');
    });
  });
});
