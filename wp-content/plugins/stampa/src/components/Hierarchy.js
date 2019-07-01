import React, { useState } from 'react';
import SortableTree from 'react-sortable-tree';

import Store from '../store/store';

import ToggleGroup from './ToggleGroup';

export default function Hierarchy({ items }) {
  const store = Store.useStore();
  const [treeData, setTreeData] = useState([
    { title: 'Chicken', children: [{ title: 'Egg' }] },
  ]);
  if (items == null) {
    items = store.get('stampaFields');
  }

  return (
    <ToggleGroup
      label="Hierarchy"
      display="block"
      groupClass="hierarchy stampa__border--bottom"
    >
      <div style={{ height: 400 }}>
        <SortableTree
          treeData={treeData}
          onChange={treeData => setTreeData(treeData)}
        />
      </div>
      <ul className="hierarchy__list">
        {items.map(item => (
          <li className="hierarchy__item" key={item._stampa.key}>
            {item._stampa.name}
          </li>
        ))}
      </ul>
    </ToggleGroup>
  );
}
