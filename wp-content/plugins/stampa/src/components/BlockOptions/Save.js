import React, { useState } from 'react';

import Store from '../../store/store';

export default function Save() {
  const store = Store.useStore();
  const [isSaving, setSavingState] = useState(false);

  function saveBlock() {
    setSavingState(true);

    const fields = [];

    for (const field of store.get('stampaBlocks')) {
      fields.push({
        id: field.id,
        options: field.options,
        _stampa: field._stampa,
      });
    }

    jQuery.ajax({
      type: 'POST',
      dataType: 'json',
      url: `${stampa.rest_url}/${stampa.post_ID}`,
      data: {
        title: title.value,
        options: {},
        fields,
        grid: {
          columns: store.get('gridColumns'),
          rows: store.get('gridRows'),
          gap: store.get('gridGap'),
        },
      },
      beforeSend: xhr => {
        xhr.setRequestHeader('X-WP-Nonce', stampa.nonce);
      },
      success: data => {
        setSavingState(false);
      },
      error: data => {
        alert('Something went wrong :(');
        setSavingState(false);
      },
    });
  }

  return (
    <div className="block-options__save">
      <div
        className="spinner"
        style={{ visibility: isSaving ? 'visible' : '' }}
      />
      <button
        type="button"
        className="button button-primary"
        style={{ visibility: isSaving ? 'hidden' : '' }}
        onClick={saveBlock}
      >
        Save
      </button>
    </div>
  );
}
