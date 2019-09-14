import React from 'react';

import Store from '../store/store';

import SaveBlock from './BlockOptions/Save';
import NumberField from './TextNumberField';
import ToastMessage from './ToastMessage';

export default function GridOptions() {
  const store = Store.useStore();
  const showGrid = store.get('gridShow');
  const showFieldTypeHint = store.get('showFieldTypeHint');

  return (
    <div className="grid-options stampa__border--bottom">
      {/* Columns */}
      <NumberField id="columns" label="Columns:" storeKey="gridColumns" />

      {/* Rows */}
      <NumberField id="rows" label="Rows:" storeKey="gridRows" />

      {/* Gap */}
      <NumberField id="gap" label="Gap:" storeKey="gridGap" />

      {/* Row height */}
      <NumberField
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

      {/* Toggle Field Type Hint */}
      <label htmlFor="showFieldTypeHint" className="stampa-checkbox no-divider">
        <input
          className="stampa-checkbox__input"
          type="checkbox"
          name="showFieldTypeHint"
          id="showFieldTypeHint"
          checked={showFieldTypeHint}
          onChange={() => store.set('showFieldTypeHint')(!showFieldTypeHint)}
        />
        <span className="stampa-checkbox__label">Show field type hint</span>
      </label>

      {/* Save & Generate buttons */}
      <SaveBlock />

      {/* Toast Message */}
      <ToastMessage />
    </div>
  );
}
