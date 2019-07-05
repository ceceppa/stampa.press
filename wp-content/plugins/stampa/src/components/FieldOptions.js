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
import { getFieldByKey } from './FieldOptions.utils';

/**
 * Dynamic components name
 */
const components = {
  checkbox: CheckboxField,
  text: TextField,
  select: SelectField,
  number: NumberField,
};

const FieldOptions = function(props) {
  let store;
  if (props && props.store) {
    store = props.store.store;
  } else {
    store = Store.useStore();
  }
  const activeFieldId = store.get('activeFieldId');
  let activeField = null;
  let activeFieldKey = null;
  let stampaField = null;

  if (activeFieldId) {
    stampaField = stampa.getFieldById(activeFieldId);

    activeFieldKey = store.get('activeFieldKey');

    const fields = store.get('stampaFields');
    activeField = getFieldByKey(fields, activeFieldKey);
  }

  const updateFieldName = useCallback(e => {
    const fields = store.get('stampaFields');
    const field = getFieldByKey(fields, activeFieldKey);

    field.name = stampa.sanitizeVariableName(e.target.value);

    store.set('stampaFields')(fields);
  });

  const updateOptionValue = useCallback((e, name) => {
    const fields = store.get('stampaFields');
    const field = getFieldByKey(fields, activeFieldKey);

    field.values[name] = e.target.value;

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
        stampaField.options.map(option => {
          const Component = components[option.type];

          return (
            <Component
              option={option}
              updateOptionValue={updateOptionValue}
              selectedValues={activeField.values}
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
};

export default React.memo(FieldOptions);
