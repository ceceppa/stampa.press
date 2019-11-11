import React, { useCallback } from 'react';

import Store from '../store/store';

import ToggleGroup from './ToggleGroup';
// import ButtonAddCustomOption from './FieldOptions/ButtonAddCustomOption';
import ButtonDeleteField from './FieldOptions/ButtonDeleteField';
import CheckboxField from './FieldOptions/CheckboxField';
import TextField from './FieldOptions/TextField';
import SelectField from './FieldOptions/SelectField';
import NumberField from './FieldOptions/NumberField';
import LabelField from './FieldOptions/LabelField';
// import MediaField from './FieldOptions/MediaField';

import stampa from '../stampa';

/**
 * Dynamic components name
 */
const components = {
  checkbox: CheckboxField,
  text: TextField,
  select: SelectField,
  number: NumberField,
  label: LabelField,
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
    const fields = store.get('stampaFields');

    activeFieldKey = store.get('activeFieldKey');
    activeField = stampa.findFieldByKey(fields, activeFieldKey);
  }

  const updateFieldOption = useCallback((e, fieldName, sanitize = false) => {
    const fields = store.get('stampaFields');
    const field = stampa.findFieldByKey(fields, activeFieldKey);
    let value = e.target.value;

    if (sanitize) {
      value = stampa.sanitizeVariableName(value);
    }

    field[fieldName] = value;

    store.set('stampaFields')(fields);
  });

  const updateOptionValue = useCallback((e, name) => {
    const fields = store.get('stampaFields');
    const field = stampa.findFieldByKey(fields, activeFieldKey);

    field.values[name] = e.target.value;

    store.set('stampaFields')(fields);
  });

  const deleteActiveField = useCallback(() => {
    stampa.deleteActiveField(store);
  });

  let options = [];
  const hasOptions = stampaField && Array.isArray(stampaField.options);
  if (hasOptions) {
    options = stampaField.options.filter(function isOptionConditional(option) {
      if (option.if == null || activeField == null) {
        return true;
      }

      return activeField.values[option.if.option] === option.if.equals;
    });
  }

  const groupLabel = activeField ? stampaField.label : 'Field';

  return (
    <ToggleGroup
      label={`${groupLabel} Options`}
      display="block"
      groupClass="field-options"
      groupIcon={activeField && stampaField.icon}
    >
      {/*  Field "title" */}
      {activeField && !stampaField.container && (
        <label htmlFor="field-title" className="stampa-text" key="field-title">
          <span
            className="stampa-text__label tooltip"
            data-tooltip="This fields is used for the title attribute"
          >
            Field title:
          </span>
          <input
            className="stampa-text__input"
            type="text"
            name="field-title"
            id="field-title"
            value={activeField.title || ''}
            onChange={e => updateFieldOption(e, 'title')}
          />
        </label>
      )}
      {activeField && [
        <label htmlFor="field-name" className="stampa-text" key="field-name">
          <span
            className="stampa-text__label tooltip"
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
            onChange={e => updateFieldOption(e, 'name', true)}
          />
        </label>,
        <label htmlFor="field-class" className="stampa-text" key="field-class">
          <span
            className="stampa-text__label tooltip"
            data-tooltip="Custom class for the element (optional)"
          >
            Field class:
          </span>
          <input
            className="stampa-text__input"
            type="text"
            name="field-class"
            id="field-class"
            value={activeField.class || ''}
            onChange={e => updateFieldOption(e, 'class')}
          />
        </label>,
        <hr key="hr-1" className="stampa-hr" />,
        // Field options
        <h3 key="h3-tag">Options:</h3>,
        options.map(option => {
          const Component = components[option.type];
          const tooltipClass = option.tooltip ? 'tooltip tooltip--left' : '';
          return (
            Component && (
              <div
                className={`field-option ${tooltipClass}`}
                key={option.name}
                data-tooltip={option.tooltip}
              >
                <Component
                  option={option}
                  updateOptionValue={updateOptionValue}
                  selectedValues={activeField.values}
                />
              </div>
            )
          );
        }),
        <hr key="hr-2" className="stampa-hr" />,
        <div key="add-delete-buttons" className="block-options__save">
          {/* <ButtonAddCustomOption /> */}
          <ButtonDeleteField deleteActiveField={deleteActiveField} />
        </div>,
      ]}
      {!activeField && <p className="stampa--gray">No block selected</p>}
    </ToggleGroup>
  );
};

export default React.memo(FieldOptions);
