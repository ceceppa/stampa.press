import React, { useState, useCallback } from 'react';

import Store from '../../store/store';
import stampa from '../../stampa';

export default function Save() {
  const store = Store.useStore();
  const [isSaving, setSavingState] = useState(false);

  const saveBlock = useCallback((e, generate) => {
    const blockTitle = store.get('stampaBlockTitle');
    if (blockTitle.trim().length == 0) {
      alert('Please specify the block title');

      return;
    }

    const fields = store.get('stampaFields');
    const toastData = store.get('toast');

    toastData.message = generate ? 'Generating the block code' : 'Saving block';
    toastData.button1 = null;
    toastData.button2 = null;
    toastData.autoHide = false;
    store.set('toast')(toastData);

    setSavingState(true);

    jQuery.ajax({
      type: 'PUT',
      dataType: 'json',
      url: `${stampa.getRestURL()}/${stampa.getPostID()}`,
      data: {
        title: store.get('stampaBlockTitle'),
        block_options: store.get('stampaBlockOptions'),
        fields,
        grid: {
          columns: store.get('gridColumns'),
          rows: store.get('gridRows'),
          gap: store.get('gridGap'),
          rowHeight: store.get('rowHeight'),
          showFieldTypeHint: store.get('showFieldTypeHint'),
        },
        generate,
      },
      beforeSend: xhr => {
        xhr.setRequestHeader('X-WP-Nonce', window.stampa.nonce);
      },
      success: data => {
        if (data && data.link) {
          window.history.replaceState('edit', document.title, data.link);
        }

        toastData.message = generate ? `</p><p>${data.message}</p>` : null;
        toastData.button1 = generate ? 'Ok' : null;
        toastData.button1Callback = () => {
          toastData.message = null;
          store.set('toast')(toastData);
        };
        toastData.button2 = null;
        toastData.autoHide = true;
        store.set('toast')(toastData);

        setSavingState(false);
      },
      error: data => {
        const toastData = store.get('toast');

        toastData.message = `</p><p>${data.responseJSON.message}</p>`;
        toastData.button1 = 'Ok';
        toastData.button1Callback = () => {
          toastData.message = null;
          store.set('toast')(toastData);
        };
        toastData.button2 = null;
        store.set('toast')(toastData);

        setSavingState(false);
      },
    });
  });

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
