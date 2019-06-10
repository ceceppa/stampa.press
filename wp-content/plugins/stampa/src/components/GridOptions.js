import React from 'react';
import ToggleGroup from './ToggleGroup';
import NumberSlider from './NumberSlider';

export default function GridOptions() {
  return (
    <ToggleGroup label="Grid options" groupClass="stampa__border--bottom">
      {/* Columns */}
      <NumberSlider id="columns" label="Columns:" storeKey="gridColumns" />

      {/* Rows */}
      <NumberSlider id="rows" label="Rows:" storeKey="gridRows" />

      {/* Gap */}
      <NumberSlider id="gap" label="Gap:" storeKey="gridGap" />

      <hr />

      {/* Row height */}
      <NumberSlider
        id="rowHeight"
        label="Row Height (px):"
        storeKey="rowHeight"
        min="20"
      />
    </ToggleGroup>
  );
}
