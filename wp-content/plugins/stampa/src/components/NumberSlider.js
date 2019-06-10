import React from 'react';
import Store from '../store/store';

export default function NumberSlider({ id, label, storeKey, min }) {
  const store = Store.useStore();
  const value = store.get(storeKey);

  if (min == null) {
    min = 1;
  }

  const updateValue = e => {
    store.set(storeKey)(Math.max(min, e.target.value));
  };

  return (
    <div className="number-slider">
      <label className="number-slider__label" htmlFor={id}>
        {label}
      </label>
      <input
        className="number-slider__input"
        type="number"
        id={id}
        value={value}
        onChange={updateValue}
      />
    </div>
  );
}
