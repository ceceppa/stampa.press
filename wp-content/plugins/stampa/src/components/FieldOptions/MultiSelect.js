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
      isMulti={true}
      onChange={selectedOption => {
        /**
         * "Emulates" the event parameter to be able to use the updateOptionValue
         * function without any changes
         */
        const e = {
          target: {
            value: selectedOption,
          },
        };
        updateOptionValue(e, option.name);
      }}
      value={selectedValues[option.name] || option.value}
    />
  );
};

export default React.memo(MultiSelect);
