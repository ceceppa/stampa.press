import React, { Component } from 'react';

import Store from '../store/store';

import ToggleGroup from './ToggleGroup';
import NumberSlider from './NumberSlider';

export default function BlockOptions() {
  const store = Store.useStore();

  const isBlockSelected = store.get('selectedBlock');

  return (
    <ToggleGroup
      label="Block Options"
      display="block"
      groupClass="block-options"
    >
      {isBlockSelected && [
        <NumberSlider
          id="block-columns"
          label="Columns:"
          storeKey="blockColumns"
        />,
        <NumberSlider id="block-rows" label="Rows:" storeKey="blockRows" />,
      ]}
      {!isBlockSelected && <p className="stampa--gray">No block selected</p>}
    </ToggleGroup>
  );
}
