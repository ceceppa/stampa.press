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

  /**
   * react-select stores the data as object.
   */
  const useSimpleSelect = Array.isArray(option.values);

  return (
    <div className="stampa-select">
      <label htmlFor={`field-${option.name}`} className="stampa-select__name">
        {option.label}:
      </label>
      {useSimpleSelect &&
        <SimpleSelect
          option={option}
          selectedValues={selectedValues}
          updateOptionValue={updateOptionValue}
        />}
      {!useSimpleSelect &&
        <MultiSelect
          option={option}
          selectedValues={selectedValues}
          updateOptionValue={updateOptionValue}
        />}
    </div>
  );
}
