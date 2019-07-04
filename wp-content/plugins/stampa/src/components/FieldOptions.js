import React, { Component, useCallback } from 'react';

import Store from '../store/store';

import ToggleGroup from './ToggleGroup';
// import ButtonAddCustomOption from './FieldOptions/ButtonAddCustomOption';
import ButtonDeleteField from './FieldOptions/ButtonDeleteField';
import CheckboxField from './FieldOptions/CheckboxField';
import TextField from './FieldOptions/TextField';
import SelectField from './FieldOptions/SelectField';
import NumberField from './FieldOptions/NumberField';

import stampa from '../stampa';

/**
 * Dynamic components name
 */
const components = {
  checkbox: CheckboxField,
  text: TextField,
  select: SelectField,
  number: NumberField,
};

export default function FieldOptions(props) {
  let store;
  if (props && props.store) {
    store = props.store.store;
  } else {
    store = Store.useStore();
  }
  const activeFieldKey = store.get('activeFieldKey');

  let activeField;
  let options = null;
  if (activeFieldKey) {
    const activeFieldId = store.get('activeFieldId');
    const field = stampa.getFieldById(activeFieldId);

    activeField = field;
    options = field.options;
  }

  /**
   * Update the name option for the current field.
   *
   * @param {*} e
   */
  const updateFieldName = useCallback(e => {
    // const fields = store.get('stampaFields');
    // for (const field of fields) {
    //   if (field.key == activeFieldKey) {
    //     field.name = stampa.sanitizeVariableName(e.target.value);
    //     break;
    //   }
    // }
    // store.set('stampaFields')(fields);
  });

  const updateOptionValue = useCallback((e, name) => {
    const fields = store.get('stampaFields');

    for (const block of fields) {
      if (block.key == activeFieldKey) {
        block._values[name] = e.target.value;

        break;
      }
    }

    store.set('stampaFields')(fields);
  });

  /**
   * Delete the active block
   */
  const deleteactiveField = useCallback(() => {
    stampa.deleteactiveField(store);
  });

  return (
    <ToggleGroup
      label="Field Options"
      display="block"
      groupClass="block-options"
    >
      {/* The field "name" */}
      {activeField && [
        <label htmlFor="field-name" className="stampa-text" key="field-name">
          <span
            className="stampa-text__label"
            data-tooltip="This fields is used to generate the variable name"
          >
            Field name:
          </span>
          <input
            className="stampa-text__input"
            type="text"
            name="field-name"
            id="field-name"
            value={activeField.name}
            onChange={updateFieldName}
          />
        </label>,
        <hr key="hr-1" className="stampa-hr" />,
        <h3 key="h3-tag">Options:</h3>,
        activeField.options.map(option => {
          const Component = components[option.type];

          return (
            <Component
              option={option}
              updateOptionValue={updateOptionValue}
              selectedValues={activeField._values}
              key={option.name}
            />
          );
        }),
        <hr key="hr-2" className="stampa-hr" />,
        <div key="add-delete-buttons" className="block-options__save">
          {/* <ButtonAddCustomOption /> */}
          <ButtonDeleteField deleteactiveField={deleteactiveField} />
        </div>,
      ]}
      {!activeField && <p className="stampa--gray">No block selected</p>}
    </ToggleGroup>
  );
}
