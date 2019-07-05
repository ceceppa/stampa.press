import React from 'react';
import SimpleSelect from './SimpleSelect';
import MultiSelect from './MultiSelect';

export default function SelectField({
  option,
  selectedValues,
  updateOptionValue,
}) {
  if (selectedValues == null) {
    selectedValues = {};
  }

  const areValuesAnArray = Array.isArray(option.values);

  return (
    <div className="stampa-select">
      <label htmlFor={`field-${option.name}`} className="stampa-select__name">
        {option.label}:
      </label>
      {areValuesAnArray &&
        <SimpleSelect
          optin={option}
          selectedValues={selectedValues}
          updateOptionValue={updateOptionValue}
        />}
      {!areValuesAnArray &&
        <MultiSelect
          option={option}
          selectedValues={selectedValues}
          updateOptionValue={updateOptionValue}
        />}
    </div>
  );
}
