import React from 'react';

export default function NumberField({
  option,
  selectedValues,
  updateOptionValue,
}) {
  if (selectedValues == null) {
    selectedValues = {};
  }

  return (
    <label htmlFor={`field-${option.name}`} className="stampa-number">
      <span className="stampa-number__label">{option.label}:</span>
      <input
        className="stampa-number__input"
        type="number"
        name={`field-${option.name}`}
        id={`field-${option.name}`}
        value={selectedValues[option.name] || option.value}
        onChange={e => updateOptionValue(e, option.name)}
      />
    </label>
  );
}
