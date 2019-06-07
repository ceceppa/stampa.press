import React, { Component } from 'react';

import Store from '../store/store';

import ToggleGroup from './ToggleGroup';
import NumberSlider from './NumberSlider';
import stampa from '../stampa';

export default function FieldOptions() {
  const store = Store.useStore();

  const activeBlock = store.get('activeBlock');

  let blockOptions = null;
  if (activeBlock) {
    const blocks = store.get('stampaBlocks');

    for (const block of blocks) {
      // console.info(block);
    }
  }

  return (
    <ToggleGroup
      label="Field Options"
      display="block"
      groupClass="block-options"
    >
      {store.get('activeBlock') &&
        false && [
          <NumberSlider
            id="block-columns"
            label="Columns:"
            storeKey="blockColumns"
          />,
          <NumberSlider id="block-rows" label="Rows:" storeKey="blockRows" />,
        ]}
      {!activeBlock && <p className="stampa--gray">No block selected</p>}
    </ToggleGroup>
  );
}
