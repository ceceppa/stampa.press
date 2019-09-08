import React from 'react';
import Store from '../store/store';

export default function NumberField({ id, label, storeKey, min }) {
  const store = Store.useStore();
  const value = store.get(storeKey);

  if (min == null) {
    min = 0;
  }

  const updateValue = e => {
    store.set(storeKey)(Math.max(min, e.target.value));
  };

  return (
    <div className="stampa-number">
      <label className="stampa-number__label" htmlFor={id}>
        {label}
      </label>
      <input
        className="stampa-number__input"
        type="number"
        id={id}
        value={value}
        onChange={updateValue}
      />
    </div>
  );
}
