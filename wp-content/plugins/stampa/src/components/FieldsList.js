/* global stampa */
import React, { useState } from 'react';
import GroupFields from './GroupFields';

import stampa from '../stampa';

export default function FieldsList() {
  const fields = stampa.getFields();
  let keys = Object.keys(fields);
  const [filter, setFilter] = useState('');

  const updateFilter = e => {
    setFilter(e.target.value);
  };

  return (
    <aside className="stampa__left stampa-fields">
      <div
        className="stampa-fields__filter stampa__border--bottom stampa__content"
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
        <div className="stampa-fields__group" key={group}>
          <GroupFields group={group} fields={fields} />
        </div>
      ))}
    </aside>
  );
}
