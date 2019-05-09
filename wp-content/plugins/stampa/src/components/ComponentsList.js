/* global stampa */
import React, { useState } from 'react';

function ComponentsList() {
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
        <dl className="components__group" key={group}>
          <dt className="components__group__label stampa__content stampa__border--bottom">
            {group}
          </dt>
          {Object.keys(blocks[group]).map(id => (
            <dd key={id} className="components__group__item">
              <img
                className="components__group__image"
                src={blocks[group][id].icon}
                title={blocks[group][id].tooltip}
              />
            </dd>
          ))}
        </dl>
      ))}
    </aside>
  );
}

export default ComponentsList;
