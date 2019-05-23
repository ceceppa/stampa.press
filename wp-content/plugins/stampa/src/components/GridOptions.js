import React from 'react';
import ToggleGroup from './ToggleGroup';

import Store from '../store/store';

export default function GridOptions() {
  const store = Store.useStore();
  const columns = store.get('gridColumns');
  const rows = store.get('gridRows');
  const gap = store.get('gridGap');

  const updateColumnsCount = e => {
    store.set('gridColumns')(Math.max(1, e.target.value));
  };

  const updateRowsCount = e => {
    store.set('gridRows')(Math.max(1, e.target.value));
  };

  const updateGap = e => {
    store.set('gridGap')(Math.max(1, e.target.value));
  };

  return (
    <ToggleGroup label="Grid options">
      {/* Columns */}
      <div className="grid-options">
        <label htmlFor="grid-columns">Columns:</label>
        <input
          type="number"
          id="grid-columns"
          value={columns}
          onChange={updateColumnsCount}
        />
      </div>

      {/* Rows */}
      <div className="grid-options">
        <label htmlFor="grid-rows">Rows:</label>
        <input
          type="number"
          id="grid-rows"
          value={rows}
          onChange={updateRowsCount}
        />
      </div>

      {/* Gap */}
      <div className="grid-options">
        <label htmlFor="grid-gap">Gap:</label>
        <input type="number" id="grid-gap" value={gap} onChange={updateGap} />
      </div>
    </ToggleGroup>
  );
}
