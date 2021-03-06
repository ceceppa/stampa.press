import React from 'react';

export default function TextField({
  option,
  selectedValues,
  updateOptionValue,
}) {
  if (selectedValues == null) {
    selectedValues = {};
  }

  return (
    <label htmlFor={`field-${option.name}`} className="stampa-text">
      <span className="stampa-text__label">{option.label}:</span>
      <input
        className="stampa-text__input"
        type="text"
        name={`field-${option.name}`}
        id={`field-${option.name}`}
        value={selectedValues[option.name] || option.value}
        onChange={e => updateOptionValue(e, option.name)}
      />
    </label>
  );
}
