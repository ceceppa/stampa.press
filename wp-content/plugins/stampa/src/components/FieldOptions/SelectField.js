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
   * key-value object data format is used for react-select, example:
   * {
   *    post: 'Post',
   *    page: 'Page,
   * }
   */
  const useSimpleSelect = Array.isArray(option.values);

  return (
    <div className="stampa-select">
      <label
        htmlFor={`field-${option.name}`}
        className={`stampa-select__name ${option.tooltip ? 'tooltip' : ''}`}
        data-tooltip={option.tooltip}
        dangerouslySetInnerHTML={{ __html: `${option.label}:` }}
      />
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
