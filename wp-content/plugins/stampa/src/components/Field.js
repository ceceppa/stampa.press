import React, { useCallback, useRef, useEffect, useState } from 'react';

import Store from '../store/store';
import Grid from './Grid';
import stampa from '../stampa';

const Field = React.memo(function({ field, resizingClass, draggingClass }) {
  const ref = useRef();
  const [noDropClass, setNoDropClass] = useState('');

  const store = Store.useStore();
  const stampaField = stampa.getFieldById(field.id);

  const contentClassName = stampaField.contentClassName || '';
  let fieldHTML = stampaField.html || '';
  let fieldClassName = stampaField.fieldClassName || '';

  for (let option of stampaField.options) {
    if (option && option.name) {
      let value = field.values[option.name];

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
    const fieldGroup = stampa.getDraggedFieldGroup();
    const fieldId = stampa.getDraggedFieldId();
    const stampaField = stampa.getFieldById(field.id);

    if (
      stampaField.container != 1 ||
      draggingClass.length == 0 ||
      fieldGroup == null ||
      fieldId == field.key
    ) {
      setNoDropClass('');
      return;
    }

    const acceptedGroups = stampaField.acceptedGroups;
    const isFieldGroupAccepted = acceptedGroups.indexOf(fieldGroup) >= 0;

    if (!isFieldGroupAccepted) {
      setNoDropClass('no-drop');
    } else {
      // Don't have to set pointers-event none or change opacity
      setNoDropClass('accept-drop');
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
    const cellWidth = clientRect.width / field.position.endColumn;
    const cellHeight = clientRect.height / field.position.endRow;

    const offsetY = Math.floor(x / cellWidth);
    const offsetX = Math.floor(y / cellHeight);

    e.dataTransfer.setData('stampa-field-key', field.key);

    stampa.setFieldPosition({
      startRow: field.position.startRow,
      startColumn: field.position.startColumn,
      endColumn: field.position.endColumn,
      endRow: field.position.endRow,
      offsetX,
      offsetY,
    });

    stampa.setDraggedFieldId(field.key);
    stampa.setDraggedFieldGroup(field.group.toLowerCase());

    setTimeout(() => {
      store.set('draggedFieldId')(field.key);
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
    store.set('activeFieldId')(field.id);
    store.set('activeFieldKey')(field.key);

    e.stopPropagation();
  });

  /**
   * Data saved with PHP using json_encode gets converted to string, but we need numbers...
   */
  const gridArea = `${+field.position.startRow} / ${+field.position.startColumn} / ${+field.position.endRow + +field.position.startRow} / ${+field.position.endColumn + +field.position.startColumn}`;

  const activeBlock = store.get('activeFieldKey');
  const activeClass = activeBlock == field.key ? 'active' : '';

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

  const fieldGridPosition = {
    columns: (field.values && field.values.columns) || field.position.endColumn,
    rows: (field.values && field.values.rows) || field.position.endRow,
    gap: (field.values && field.values.gap) || store.get('gridGap'),
  };

  return (
    <div
      draggable="true"
      className={`stampa-grid__field
      stampa-field--${field.id} ${activeClass} ${resizingClass} ${fieldClassName} ${draggingClass} ${noDropClass}`}
      ref={ref}
      onDragStart={dragMe}
      onDragEnd={endResize}
      data-key={field.key}
      style={{
        gridArea,
      }}
      onClick={setAsActive}
    >
      <div className="stampa-grid__field__type">
        {stampaField.container && <span>{field.name}</span>}
        {!stampaField.container &&
          (<img src={field.icon} aria-hidden="true" draggable="false" />, (
            <span>{field.id}</span>
          ))}
      </div>
      {stampaField.container &&
        <Grid
          gridColumns={+fieldGridPosition.columns}
          gridRows={+fieldGridPosition.rows}
          gridGap={+fieldGridPosition.gap}
          gridRowHeight={-1}
          acceptedGroups={stampaField.acceptedGroups}
          fields={field.fields || []}
          parentField={field}
          draggable={true}
          useClassName="is-container"
        />}
      {stampaField.container == null &&
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
