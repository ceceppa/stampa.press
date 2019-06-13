import React, { useState } from 'react';

import Store from '../../store/store';
import stampa from '../../stampa';

export default function Save() {
  const store = Store.useStore();
  const [isSaving, setSavingState] = useState(false);

  function saveBlock(e, generate) {
    setSavingState(true);

    const fields = [];

    for (const field of store.get('stampaFields')) {
      fields.push({
        id: field._stampa.id,
        _values: field._values,
        _stampa: field._stampa,
      });
    }

    jQuery.ajax({
      type: 'PUT',
      dataType: 'json',
      url: `${stampa.getRestURL()}/${stampa.getPostID()}`,
      data: {
        title: store.get('stampaBlockTitle'),
        options: store.get('stampaBlockOptions'),
        fields,
        grid: {
          columns: store.get('gridColumns'),
          rows: store.get('gridRows'),
          gap: store.get('gridGap'),
          rowHeight: store.get('rowHeight'),
        },
        generate,
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
        className="button"
        style={{ visibility: isSaving ? 'hidden' : '' }}
        onClick={saveBlock}
      >
        Save
      </button>
      &nbsp;&nbsp;&nbsp;&nbsp;
      <button
        type="button"
        className="button button-primary"
        style={{ visibility: isSaving ? 'hidden' : '' }}
        onClick={e => saveBlock(e, true)}
      >
        Save & Generate
      </button>
    </div>
  );
}
