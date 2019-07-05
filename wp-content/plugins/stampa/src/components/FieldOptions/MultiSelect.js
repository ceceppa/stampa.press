import React from 'react';
import ReactSelect from 'react-select';

const MultiSelect = function({ option, selectedValues, updateOptionValue }) {
  /** 
   * Convert to the format needed by ReactSelect
  */
  const options = Object.keys(option.values).map(key => {
    return {
      value: key,
      label: option.values[key],
    };
  });

  return (
    <ReactSelect
      options={options}
      onChange={e => updateOptionValue(e, e.value)}
      defaultValue={selectedValues[option.name] || option.value}
    />
  );
};

export default React.memo(MultiSelect);
