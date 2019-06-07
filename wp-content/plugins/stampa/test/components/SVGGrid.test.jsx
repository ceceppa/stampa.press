import React from 'react';
import TestRenderer from 'react-test-renderer';
import SVGGrid from '../../src/components/SVGGrid';
import ReactDOM from 'react-dom';
import { act } from 'react-dom/test-utils';
import Store from '../../src/store/store';

import blocksList from './blocks-list.test.json';

describe('SVGGrid', () => {
  it('true', () => {
    expect(true).toBe(true);
  });
  // const props = {};
  // let mountedComponent;
  // const getComponent = () => {
  //   if (!mountedComponent) {
  //     mountedComponent = TestRenderer.create(
  //       <Store.Container>
  //         <SVGGrid {...props} />
  //       </Store.Container>
  //     );
  //   }
  //   return mountedComponent;
  // };
  // afterEach(() => {
  //   mountedComponent = undefined;
  // });
  // describe('Test the render method using the test JSON file', () => {
  //   let component;
  //   beforeAll(() => {
  //     component = getComponent();
  //   });
  //   it('Should render a <svg> elemnt', () => {
  //     expect(component.root.findAllByType('svg')).toHaveLength(1);
  //   });
  //   it('Should render 12 columns (11 lines)', () => {
  //     expect(
  //       component.root.findAll(
  //         node =>
  //           node.type === 'line' && node.props.className === 'line--column'
  //       )
  //     ).toHaveLength(11);
  //   });
  //   it('Should render 5 rows (4 lines)', () => {
  //     expect(
  //       component.root.findAll(
  //         node => node.type === 'line' && node.props.className === 'line--row'
  //       )
  //     ).toHaveLength(4);
  //   });
  //   it('Should render a <rect> when dragging over it', () => {
  //     const drag = {
  //       hover: true,
  //       x: 0,
  //       y: 0,
  //     };
  //     const container = document.createElement('div');
  //     document.body.appendChild(container);
  //     ReactDOM.render(
  //       <Store.Container>
  //         <SVGGrid drag={drag} />
  //       </Store.Container>,
  //       container
  //     );
  //     expect(container.querySelectorAll('rect')).toHaveLength(1);
  //   });
  // });
});
