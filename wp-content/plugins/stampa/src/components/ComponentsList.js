/* global stampa */
import React, { useState } from 'react';
import GroupItems from './GroupItems';

export default function ComponentsList() {
  const blocks =
    window.stampa && window.stampa.blocks ? window.stampa.blocks : [];
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
          name="filter"
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
