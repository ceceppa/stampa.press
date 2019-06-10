/* global stampa */
import React, { useState } from 'react';
import GroupItems from './GroupItems';

import stampa from '../stampa';

export default function ComponentsList() {
  const blocks = stampa.getFields();
  let keys = Object.keys(blocks);
  const [filter, setFilter] = useState('');

  const updateFilter = e => {
    setFilter(e.target.value);
  };

  return (
    <aside className="stampa__left components">
      <div
        className="components__filter stampa__border--bottom stampa__content"
        role="search"
      >
        <label htmlFor="filter">Search:</label>
        <input
          type="search"
          id="filter"
          value={filter}
          onChange={updateFilter}
        />
      </div>
      {keys.map(group => (
        <div className="components__group" key={group}>
          <GroupItems group={group} blocks={blocks} />
        </div>
      ))}
    </aside>
  );
}
