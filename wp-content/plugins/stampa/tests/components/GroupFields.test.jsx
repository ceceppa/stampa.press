import React from 'react';
import TestRenderer from 'react-test-renderer';
import GroupFields from '../../src/components/GroupFields';
import ReactDOM from 'react-dom';
import { act } from 'react-dom/test-utils';
import Store from '../../src/store/store';

import fieldsList from './fields-list.test.json';

describe('GroupFields', () => {
  const props = {
    group: 'Gutenberg',
    fields: fieldsList,
  };
  let mountedComponent;

  const groupItems = () => {
    if (!mountedComponent) {
      mountedComponent = TestRenderer.create(
        <Store.Container>
          <GroupFields {...props} />
        </Store.Container>
      );
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

      ReactDOM.render(
        <Store.Container>
          <GroupFields {...props} />
        </Store.Container>,
        container
      );
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

    it('The <li> element should contain an image, a label and a help link', () => {
      const li = component.root.findAllByType('li');
      const children = li[0].children;
      const a = children[2];

      expect(children[0].type).toBe('img');
      expect(children[1].type).toBe('span');
      expect(a.type).toBe('a');
      expect(a.props.href).toBe(
        'https://github.com/WordPress/gutenberg/tree/master/packages/block-editor/src/components/plain-text'
      );
    });
  });
});
