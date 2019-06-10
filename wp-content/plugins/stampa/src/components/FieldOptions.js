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

  function deleteActiveBlock() {
    const blocks = store
      .get('stampaBlocks')
      .filter(block => block._stampa.key !== activeBlock);

    store.set('stampaBlocks')(blocks);
    store.set('activeBlock')(null);
  }

  return (
    <ToggleGroup
      label="Field Options"
      display="block"
      groupClass="block-options"
    >
      {store.get('activeBlock') && [
        <label htmlFor="field-name" className="number-slider">
          <span className="number-slider__label">Field name:</span>
          <input
            className="number-slider__input"
            type="text"
            name="field-name"
          />
        </label>,
        <button
          type="button"
          onClick={deleteActiveBlock}
          className="button button-link-delete"
        >
          Delete field
        </button>,
      ]}
      {!activeBlock && <p className="stampa--gray">No block selected</p>}
    </ToggleGroup>
  );
}
