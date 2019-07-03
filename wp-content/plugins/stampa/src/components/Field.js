import React, { useCallback, useRef } from 'react';

import Store from '../store/store';
import stampa from '../stampa';

export default function Block({ field }) {
  const ref = useRef();

  const store = Store.useStore();
  const stampaField = field._stampa;
  const isDragging = stampa.getDraggedFieldId() != null;
  const resizingClass = stampa.isResizing() || isDragging ? 'resizing' : '';
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
  const storeBlockPosition = useCallback(e => {
    //Calculate the offset from the cell clicked and the top left one.
    const clientRect = ref.current.getBoundingClientRect();

    const x = e.clientX - clientRect.x;
    const y = e.clientY - clientRect.y;
    const cellWidth = clientRect.width / stampaField.endColumn;
    const cellHeight = clientRect.height / stampaField.endRow;

    const offsetY = Math.floor(x / cellWidth);
    const offsetX = Math.floor(y / cellHeight);

    stampa.setFieldPosition({
      startRow: stampaField.startRow,
      startColumn: stampaField.startColumn,
      endColumn: stampaField.endColumn,
      endRow: stampaField.endRow,
      offsetX,
      offsetY,
    });

    e.dataTransfer.setData('stampa-field-key', field._stampa.key);
    stampa.setDraggedFieldId(field._stampa.key);
  });

  // Allow the block itself to be dragged
  const dragMe = useCallback(e => {
    e.stopPropagation();

    storeBlockPosition(e);
  });

  /**
   * Let's resize the block :)
   *
   * @param {HTMLEvent} e event
   */
  const startResize = useCallback(e => {
    e.stopPropagation();

    storeBlockPosition(e);

    // Don't want/need to trigger a re-render of the block/app
    stampa.setResizeDirection(e.target.dataset.resize);
    stampa.setResizing(true);
  });

  const endResize = useCallback(e => {
    stampa.setResizeDirection(null);
    stampa.setResizing(false);

    // Need to trigger the re-render of the Grid
    store.set('draggedFieldId')(null);
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
      ref={ref}
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
        onDragEnd={endResize}
      />
      <div
        className="stampa-grid__field__resizer stampa-grid__field__resizer--height"
        data-resize="height"
        draggable="true"
        onDragStart={startResize}
        onDragEnd={endResize}
      />
      <div
        className="stampa-grid__field__resizer stampa-grid__field__resizer--se"
        data-resize="se"
        draggable="true"
        onDragStart={startResize}
        onDragEnd={endResize}
      />
    </div>
  );
}
