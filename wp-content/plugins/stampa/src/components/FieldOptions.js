import React, { Component } from 'react';

import Store from '../store/store';

import ToggleGroup from './ToggleGroup';
import CheckboxField from './FieldOptions/CheckboxField';
import TextField from './FieldOptions/TextField';
import SelectField from './FieldOptions/SelectField';

import stampa from '../stampa';

/**
 * Dynamic components name
 */
const components = {
  checkbox: CheckboxField,
  text: TextField,
  select: SelectField,
};

export default function FieldOptions(props) {
  let store;
  if (props && props.store) {
    store = props.store.store;
  } else {
    store = Store.useStore();
  }
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

  function updateOptionValue(e, name) {
    const blocks = store.get('stampaFields');

    for (const block of blocks) {
      if (block._stampa.key == activeBlockKey) {
        block._values[name] = e.target.value;

        break;
      }
    }

    store.set('stampaFields')(blocks);
  }

  /**
   * Delete the active block
   */
  function deleteActiveBlock() {
    stampa.deleteActiveBlock(store);
  }

  return (
    <ToggleGroup
      label="Field Options"
      display="block"
      groupClass="block-options"
    >
      {activeBlock && [
        <label htmlFor="field-name" className="stampa-text" key="field-name">
          <span className="stampa-text__label">Field name:</span>
          <input
            className="stampa-text__input"
            type="text"
            name="field-name"
            id="field-name"
            value={activeBlock._stampa.name}
            onChange={updateFieldName}
          />
        </label>,
        <hr key="hr-1" />,
        activeBlock.options.map(option => {
          const Component = components[option.type];

          return (
            <Component
              option={option}
              updateOptionValue={updateOptionValue}
              selectedValues={activeBlock._values}
              key={option.name}
            />
          );
        }),
        <hr key="hr-2" />,
        <button
          key="delete"
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
