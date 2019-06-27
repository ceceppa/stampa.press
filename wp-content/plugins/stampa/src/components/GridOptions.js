import React from 'react';

import Store from '../store/store';

import SaveBlock from './BlockOptions/Save';
import NumberSlider from './NumberSlider';
import CheckboxField from './FieldOptions/CheckboxField';

export default function GridOptions() {
  const store = Store.useStore();
  const showGrid = store.get('gridShow');

  return (
    <div className="grid-options stampa__border--bottom">
      {/* Columns */}
      <NumberSlider id="columns" label="Columns:" storeKey="gridColumns" />

      {/* Rows */}
      <NumberSlider id="rows" label="Rows:" storeKey="gridRows" />

      {/* Gap */}
      <NumberSlider id="gap" label="Gap:" storeKey="gridGap" />

      {/* Row height */}
      <NumberSlider
        id="rowHeight"
        label="Row Height (px):"
        storeKey="rowHeight"
      />

      {/* Toggle grid */}
      <CheckboxField
        option="show-grid"
        selectedValues={showGrid}
        updateOptionValue={() => store.set('gridShow')(!showGrid)}
      />
      {/* 
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
      </label> */}

      {/* Save & Generate buttons */}
      <SaveBlock />
    </div>
  );
}
