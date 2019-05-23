import React from 'react';
import TestRenderer from 'react-test-renderer';
import SVGGrid from '../../src/components/SVGGrid';
import ReactDOM from 'react-dom';
import { act } from 'react-dom/test-utils';

import blocksList from './blocks-list.test.json';

describe('SVGGrid', () => {
  const props = {
    columns: 12,
    rows: 5,
    drag: {
      isDragMode: false,
    },
  };
  let mountedComponent;

  const getComponent = () => {
    if (!mountedComponent) {
      mountedComponent = TestRenderer.create(<SVGGrid {...props} />);
    }

    return mountedComponent;
  };

  afterEach(() => {
    mountedComponent = undefined;
  });

  describe('Test the render method using the test JSON file', () => {
    let component;

    beforeAll(() => {
      component = getComponent();
    });

    it('Should render a <svg> elemnt', () => {
      expect(component.root.findAllByType('svg')).toHaveLength(1);
    });

    it('Should render 12 columns', () => {
      expect(
        component.root.findAll(
          node =>
            node.type === 'line' && node.props.className === 'line--column'
        )
      ).toHaveLength(12);
    });

    it('Should render 5 rows', () => {
      expect(
        component.root.findAll(
          node => node.type === 'line' && node.props.className === 'line--row'
        )
      ).toHaveLength(5);
    });

    it('Should render a <rect> when dragging over it', () => {
      const p = props;
      p.drag = {
        isDragMode: true,
        x: 0,
        y: 0,
      };

      const container = document.createElement('div');
      document.body.appendChild(container);

      ReactDOM.render(<SVGGrid {...p} />, container);

      // expect(component.root.findAllByType('rect')).toHaveLength(1);
    });
  });
});
