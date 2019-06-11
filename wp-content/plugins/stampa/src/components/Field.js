import React from 'react';

import Store from '../store/store';
import stampa from '../stampa';

export default function Block({ field }) {
  const store = Store.useStore();
  const stampaField = field._stampa;
  const resizingClass = stampa.isResizing() ? 'resizing' : '';

  let blockHTML = field.html;
  for (let option of field.options) {
    if (option && option.name) {
      const value = field._values[option.name] || option.value;
      const re = new RegExp(`\{${option.name}\}`, 'g');

      blockHTML = blockHTML.replace(re, value);
    }
  }

  /**
   * Store the block position and size (needed to nicely show the resize & moving squares)
   */
  function storeBlockPosition() {
    stampa.setFieldPosition({
      startRow: stampaField.startRow,
      startColumn: stampaField.startColumn,
      endColumn: stampaField.endColumn,
      endRow: stampaField.endRow,
    });
  }

  // Allow the block itself to be dragged
  function dragMe(e) {
    e.stopPropagation();

    storeBlockPosition();
    store.set('draggedFieldId')(field._stampa.key);
  }

  /**
   * Let's resize the block :)
   *
   * @param {HTMLEvent} e event
   */
  function startResize(e) {
    e.stopPropagation();

    storeBlockPosition();

    // Don't want/need to trigger a re-render of the block/app
    stampa.setResizeDirection(e.target.dataset.resize);
    stampa.setResizing(true);
    store.set('draggedFieldId')(field._stampa.key);
  }

  /**
   * Activate the current block
   *
   * @param {HTMLEvent} e event
   */
  function setAsActive(e) {
    store.set('activeBlockKey')(field._stampa.key);
  }

  const gridArea = `${stampaField.startRow} / ${stampaField.startColumn} / ${stampaField.endRow + stampaField.startRow} / ${stampaField.endColumn + stampaField.startColumn}`;

  const activeBlock = store.get('activeBlockKey');
  const activeClass = activeBlock == field._stampa.key ? 'active' : '';

  return (
    <div
      draggable="true"
      className={`grid__block grid__block--${field._stampa.id} ${activeClass} ${resizingClass}`}
      onDragStart={dragMe}
      data-key={field._stampa.key}
      style={{
        gridArea,
      }}
      onClick={setAsActive}
    >
      <div
        dangerouslySetInnerHTML={{ __html: blockHTML }}
        className={`grid__block__content ${field.className || ''}`}
      />

      <div
        className="grid__block__resizer grid__block__resizer--width"
        draggable="true"
        data-resize="width"
        onDragStart={startResize}
      />
      <div
        className="grid__block__resizer grid__block__resizer--height"
        data-resize="height"
        draggable="true"
        onDragStart={startResize}
      />
      <div
        className="grid__block__resizer grid__block__resizer--se"
        data-resize="se"
        draggable="true"
        onDragStart={startResize}
      />
    </div>
  );
}