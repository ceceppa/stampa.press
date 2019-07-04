import React, { useCallback, useRef, useEffect } from 'react';

import Store from '../store/store';
import Grid from './Grid';
import stampa from '../stampa';

const Field = React.memo(function({ field, resizingClass, draggingClass }) {
  const ref = useRef();

  const store = Store.useStore();
  const stampaField = field._stampa;

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
   * The 'no-drop' class is added externally via JS,
   * so the re-render cause the class to be lost
  */
  useEffect(() => {
    const grid = ref.current.querySelector('.stampa-grid');
    const fieldGroup = stampa.getDraggedFieldGroup();
    const fieldId = stampa.getDraggedFieldId();

    if (grid == null || fieldGroup == null || fieldId == field._stampa.key) {
      return;
    }

    const acceptedGroups = grid.dataset.acceptedGroups;
    const isFieldGroupAccepted = acceptedGroups.indexOf(fieldGroup) >= 0;
    const gridClassList = grid.parentNode.classList;
    const containsNoDrop = gridClassList.contains('no-drop');
    const isResizing = stampa.isResizing();

    if (fieldGroup != null && !isResizing && !isFieldGroupAccepted) {
      if (!containsNoDrop) {
        gridClassList.add('no-drop');
      }
    } else {
      if (containsNoDrop) {
        gridClassList.remove('no-drop');
      }
    }
  });

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

    e.dataTransfer.setData('stampa-field-key', field._stampa.key);

    stampa.setFieldPosition({
      startRow: stampaField.startRow,
      startColumn: stampaField.startColumn,
      endColumn: stampaField.endColumn,
      endRow: stampaField.endRow,
      offsetX,
      offsetY,
    });

    stampa.setDraggedFieldId(field._stampa.key);
    stampa.setDraggedFieldGroup(field.group.toLowerCase());

    setTimeout(() => {
      store.set('draggedFieldId')(field._stampa.key);
    });
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

    // Don't want/need to trigger a re-render of the block/app
    stampa.setResizeDirection(e.target.dataset.resize);
    stampa.setDraggedFieldGroup(field.group.toLowerCase());
    stampa.setResizing(true);

    storeBlockPosition(e);
  });

  const endResize = useCallback(e => {
    stampa.setResizeDirection(null);
    stampa.setResizing(false);
    stampa.setDraggedFieldId(null);
    stampa.setDraggedFieldGroup(null);

    // Need to trigger the re-render of the Grid
    setTimeout(() => {
      store.set('draggedFieldId')(null);
    });
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

  /**
   * Ignore the resizing & dragging class if I'm dragging anything in
   * my container
  */
  if (field.container == 1 && (resizingClass.length || draggingClass.length)) {
    const draggedFieldGroup = stampa.getDraggedFieldGroup();

    if (field.acceptedGroups.indexOf(draggedFieldGroup) >= 0) {
      resizingClass = '';
      draggingClass = '';
    }
  }

  return (
    <div
      draggable="true"
      className={`stampa-grid__field
      stampa-field--${field._stampa.id} ${activeClass} ${resizingClass} ${fieldClassName} ${draggingClass}`}
      ref={ref}
      onDragStart={dragMe}
      data-key={field._stampa.key}
      style={{
        gridArea,
      }}
      onClick={setAsActive}
    >
      <div className="stampa-grid__field__type">
        {!field.container &&
          <img src={field.icon} aria-hidden="true" draggable="false" />}
        <span>{field._stampa.id}</span>
      </div>
      {field.container &&
        <Grid
          gridColumns={+field._values.columns || field._stampa.endColumn}
          gridRows={+field._values.rows || field._stampa.endRow}
          gridGap={+field._values.gap || store.get('gridGap')}
          gridRowHeight={-1}
          acceptedGroups={field.acceptedGroups}
          fields={field.fields || []}
          parentField={field}
          draggable={true}
          useClassName="is-container"
        />}
      {field.container == null &&
        <div
          dangerouslySetInnerHTML={{ __html: fieldHTML }}
          className={`stampa-grid__field__content ${contentClassName}`}
        />}

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
});

export default Field;
