import React, { useCallback } from 'react';

export default function ButtonAddCustomOption() {
  const addCustomOption = useCallback(() => {});

  return (
    <button
      name="add-custom-option"
      type="button"
      onClick={addCustomOption}
      className="button button-primary"
    >
      Add custom option
    </button>
  );
}
