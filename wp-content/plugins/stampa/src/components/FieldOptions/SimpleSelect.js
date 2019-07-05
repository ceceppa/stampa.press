import React from 'react';

const SimpleSelect = function({ option, updateOptionValue, selectedValues }) {
  return (
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
  );
};

export default React.memo(SimpleSelect);
