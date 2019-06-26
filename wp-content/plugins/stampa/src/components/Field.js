import React, { useCallback } from 'react';

import Store from '../store/store';
import stampa from '../stampa';

export default function Block({ field }) {
  const store = Store.useStore();
  const stampaField = field._stampa;
  const resizingClass = stampa.isResizing() ? 'resizing' : '';
  const contentClassName = field.contentClassName || '';

  let fieldHTML = field.html;
  let fieldClassName = field.fieldClassName || '';

  for (let option of field.options) {
    if (option && option.name) {
      let value = field._values[option.name];

      if (value == null) {
        value = option.value;
      }

      const re = new RegExp(`\{${option.name}\}`, 'g');

      if (fieldHTML) {
        fieldHTML = fieldHTML.replace(re, value);
      }

      fieldClassName = fieldClassName.replace(re, value);
    }
  }

  /**
   * Store the block position and size (needed to nicely show the resize & moving squares)
   */
  const storeBlockPosition = useCallback(() => {
    stampa.setFieldPosition({
      startRow: stampaField.startRow,
      startColumn: stampaField.startColumn,
      endColumn: stampaField.endColumn,
      endRow: stampaField.endRow,
    });
  });

  // Allow the block itself to be dragged
  const dragMe = useCallback(e => {
    e.stopPropagation();

    storeBlockPosition();
    store.set('draggedFieldId')(field._stampa.key);
  });

  /**
   * Let's resize the block :)
   *
   * @param {HTMLEvent} e event
   */
  const startResize = useCallback(e => {
    e.stopPropagation();

    storeBlockPosition();

    // Don't want/need to trigger a re-render of the block/app
    stampa.setResizeDirection(e.target.dataset.resize);
    stampa.setResizing(true);
    store.set('draggedFieldId')(field._stampa.key);
  });

  /**
   * Activate the current block
   *
   * @param {HTMLEvent} e event
   */
  const setAsActive = useCallback(e => {
    store.set('activeFieldKey')(field._stampa.key);
  });

  const gridArea = `${stampaField.startRow} / ${stampaField.startColumn} / ${stampaField.endRow + stampaField.startRow} / ${stampaField.endColumn + stampaField.startColumn}`;

  const activeBlock = store.get('activeFieldKey');
  const activeClass = activeBlock == field._stampa.key ? 'active' : '';

  return (
    <div
      draggable="true"
      className={`stampa-grid__field
      stampa-field--${field._stampa.id} ${activeClass} ${resizingClass} ${fieldClassName}`}
      onDragStart={dragMe}
      data-key={field._stampa.key}
      style={{
        gridArea,
      }}
      onClick={setAsActive}
    >
      <div className="stampa-grid__field__type">
        <img src={field.icon} aria-hidden="true" draggable="false" />
        <span>{field._stampa.id}</span>
      </div>
      <div
        dangerouslySetInnerHTML={{ __html: fieldHTML }}
        className={`stampa-grid__field__content ${contentClassName}`}
      />

      <div
        className="stampa-grid__field__resizer stampa-grid__field__resizer--width"
        draggable="true"
        data-resize="width"
        onDragStart={startResize}
      />
      <div
        className="stampa-grid__field__resizer stampa-grid__field__resizer--height"
        data-resize="height"
        draggable="true"
        onDragStart={startResize}
      />
      <div
        className="stampa-grid__field__resizer stampa-grid__field__resizer--se"
        data-resize="se"
        draggable="true"
        onDragStart={startResize}
      />
    </div>
  );
}
