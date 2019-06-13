import React, { Component } from 'react';

import Store from '../store/store';

import ToggleGroup from './ToggleGroup';
import stampa from '../stampa';

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
   * Update the state for the checkbox
   */
  function updateOptionChecked(e, name, value) {
    if (e.target.checked) {
      e.target.value = value;
    } else {
      e.target.value = '';
    }

    updateOptionValue(e, name);
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
        activeBlock.options.map((option, index) => {
          switch (option.type) {
            case 'checkbox':
              return (
                <label
                  htmlFor={`field-${option.name}`}
                  className="stampa-number"
                  key={option.name}
                >
                  <span className="stampa-number__label">{option.label}:</span>
                  <input
                    className="stampa-number__input"
                    type="checkbox"
                    name={`field-${option.name}`}
                    id={`field-${option.name}`}
                    value={activeBlock._values[option.name] || option.checked}
                    checked={activeBlock._values[option.name] === option.value}
                    onChange={e =>
                      updateOptionChecked(e, option.name, option.value)
                    }
                  />
                </label>
              );
            case 'text':
              return (
                <label
                  htmlFor={`field-${option.name}`}
                  className="stampa-text"
                  key={option.name}
                >
                  <span className="stampa-text__label">{option.label}:</span>
                  <input
                    className="stampa-text__input"
                    type="text"
                    name={`field-${option.name}`}
                    id={`field-${option.name}`}
                    value={activeBlock._values[option.name] || option.value}
                    onChange={e => updateOptionValue(e, option.name)}
                  />
                </label>
              );
            case 'select':
              return (
                <div className="stampa-select" key={option.name}>
                  <label
                    htmlFor={`field-${option.name}`}
                    className="stampa-select__name"
                  >
                    {option.label}
                  </label>
                  <select
                    className="stampa-select__select"
                    name={`field-${option.name}`}
                    id={`field-${option.name}`}
                    onChange={e => updateOptionValue(e, option.name)}
                    defaultValue={
                      activeBlock._values[option.name] || option.value
                    }
                  >
                    {option.values.map(value => (
                      <option key={value} value={value}>
                        {value}
                      </option>
                    ))}
                  </select>
                </div>
              );
          }
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
