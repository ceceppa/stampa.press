import React from 'react';

export default function SelectField({
  option,
  selectedValues,
  updateOptionValue,
}) {
  if (selectedValues == null) {
    selectedValues = {};
  }

  return (
    <div className="stampa-select">
      <label htmlFor={`field-${option.name}`} className="stampa-select__name">
        {option.label}:
      </label>
      <select
        className="stampa-select__select"
        name={`field-${option.name}`}
        id={`field-${option.name}`}
        onChange={e => updateOptionValue(e, option.name)}
        defaultValue={selectedValues[option.name] || option.value}
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
