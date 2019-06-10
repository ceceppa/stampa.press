import React, { useState } from 'react';

import Store from '../../store/store';

export default function Save() {
  const store = Store.useStore();
  const [isSaving, setSavingState] = useState(false);

  function saveBlock(e, generate) {
    setSavingState(true);

    const fields = [];

    for (const field of store.get('stampaFields')) {
      fields.push({
        id: field._stampa.id,
        _values: field.options.map(option => {
          return { name: option.name, value: option.value };
        }),
        _stampa: field._stampa,
      });
    }

    jQuery.ajax({
      type: 'POST',
      dataType: 'json',
      url: `${stampa.rest_url}/${stampa.post_ID}`,
      data: {
        title: title.value,
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
