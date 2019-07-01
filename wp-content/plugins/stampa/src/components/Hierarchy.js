import React, { useState } from 'react';
import SortableTree from 'react-sortable-tree';

import Store from '../store/store';

import ToggleGroup from './ToggleGroup';

export default function Hierarchy({ items }) {
  const store = Store.useStore();
  const treeData = store.get('stampaFields');

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
          maxDepth={1}
          onChange={treeData => store.set('stampaFields')(treeData)}
        />
      </div>
    </ToggleGroup>
  );
}
