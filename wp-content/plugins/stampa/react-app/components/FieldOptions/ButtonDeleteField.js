import React, { useCallback } from 'react';

export default function ButtonDeleteField({ deleteActiveField }) {
  return (
    <button
      name="delete-field"
      type="button"
      onClick={deleteActiveField}
      className="button button-link-delete"
    >
      Delete field
    </button>
  );
}
