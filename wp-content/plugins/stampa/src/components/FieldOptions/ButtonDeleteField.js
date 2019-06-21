import React, { useCallback } from 'react';

export default function ButtonDeleteField({ deleteActiveBlock }) {
  return (
    <button
      name="delete-field"
      type="button"
      onClick={deleteActiveBlock}
      className="button button-link-delete"
    >
      Delete field
    </button>
  );
}
