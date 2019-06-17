import React from 'react';

export default function CheckboxField({
  option,
  selectedValues,
  updateOptionValue,
}) {
  if (selectedValues == null) {
    selectedValues = {};
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

  let isChecked = option.checked || false;
  if (selectedValues[option.name] != null) {
    isChecked = selectedValues[option.name] === option.value;
  }

  return (
    <label htmlFor={`field-${option.name}`} className="stampa-number">
      <span className="stampa-number__label">{option.label}:</span>
      <input
        className="stampa-number__input"
        type="checkbox"
        name={`field-${option.name}`}
        id={`field-${option.name}`}
        value={option.value}
        checked={isChecked}
        onChange={e => updateOptionChecked(e, option.name, option.value)}
      />
    </label>
  );
}
