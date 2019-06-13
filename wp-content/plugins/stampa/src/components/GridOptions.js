import React from 'react';

import Store from '../store/store';

import ToggleGroup from './ToggleGroup';
import NumberSlider from './NumberSlider';

export default function GridOptions() {
  const store = Store.useStore();
  const showGrid = store.get('gridShow');

  return (
    <ToggleGroup
      label="Grid options"
      groupClass="stampa__border--bottom"
      isCollapsed={true}
    >
      {/* Columns */}
      <NumberSlider id="columns" label="Columns:" storeKey="gridColumns" />

      {/* Rows */}
      <NumberSlider id="rows" label="Rows:" storeKey="gridRows" />

      {/* Gap */}
      <NumberSlider id="gap" label="Gap:" storeKey="gridGap" />

      <hr className="stampa-hr" />

      {/* Row height */}
      <NumberSlider
        id="rowHeight"
        label="Row Height (px):"
        storeKey="rowHeight"
      />

      <hr className="stampa-hr" />
      {/* Toggle grid */}
      <label htmlFor="showgrid" className="stampa-number">
        <span className="stampa-number__label">Show grid:</span>
        <input
          className="stampa-number__input"
          type="checkbox"
          name="showgrid"
          id="showgrid"
          checked={showGrid}
          onChange={() => store.set('gridShow')(!showGrid)}
        />
      </label>
    </ToggleGroup>
  );
}
