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
      <label htmlFor="showgrid" className="stampa-checkbox">
        <input
          className="stampa-checkbox__input"
          type="checkbox"
          name="showgrid"
          id="showgrid"
          checked={showGrid}
          onChange={() => store.set('gridShow')(!showGrid)}
        />
        <span className="stampa-checkbox__label">Show grid:</span>
      </label>

      {/* Save & Generate buttons */}
      <SaveBlock />
    </div>
  );
}
