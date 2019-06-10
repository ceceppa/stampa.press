import React, { Component } from 'react';

import Store from '../store/store';

import ToggleGroup from './ToggleGroup';
import NumberSlider from './NumberSlider';
import stampa from '../stampa';

export default function FieldOptions() {
  const store = Store.useStore();

  const activeBlockKey = store.get('activeBlockKey');

  let activeBlock;
  let blockOptions = null;
  if (activeBlockKey) {
    const blocks = store.get('stampaFields');

    for (const block of blocks) {
      if (block._stampa.key == activeBlockKey) {
        activeBlock = block;
        blockOptions = block.options;

        break;
      }
    }
  }

  /**
   * Update the name option for the current field.
   *
   * @param {*} e
   */
  function updateFieldName(e) {
    const blocks = store.get('stampaFields');

    for (const block of blocks) {
      if (block._stampa.key == activeBlockKey) {
        block._stampa.name = e.target.value;

        break;
      }
    }

    store.set('stampaFields')(blocks);
  }

  /**
   * Delete the active block
   */
  function deleteActiveBlock() {
    const blocks = store
      .get('stampaFields')
      .filter(block => block._stampa.key !== activeBlock);

    store.set('stampaFields')(blocks);
    store.set('activeBlockKey')(null);
  }

  return (
    <ToggleGroup
      label="Field Options"
      display="block"
      groupClass="block-options"
    >
      {activeBlock && [
        <label htmlFor="field-name" className="number-slider">
          <span className="number-slider__label">Field name:</span>
          <input
            className="number-slider__input"
            type="text"
            name="field-name"
            id="field-name"
            value={activeBlock._stampa.name}
            onChange={updateFieldName}
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
