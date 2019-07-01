import React from 'react';

import Store from '../store/store';

import ToggleGroup from './ToggleGroup';

export default function Hierarchy({ items }) {
  const store = Store.useStore();

  if (items == null) {
    items = store.get('stampaFields');
  }

  return (
    <ToggleGroup
      label="Hierarchy"
      display="block"
      groupClass="hierarchy stampa__border--bottom"
    >
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
