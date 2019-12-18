import React, {
  useCallback,
  useRef,
  useEffect,
  useState,
  useMemo,
} from 'react';

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

  fieldHTML = fieldHTML.replace('{field.title}', field.title);

  const values = field.values || [];
  for (let option of stampaField.options) {
    if (option && option.name) {
      let value = values[option.name] || null;
      const isCheckbox = option.type == 'checkbox';
      const isChecked = option.checked;
      const isValueNull = value == null;

      if (isCheckbox && isChecked && isValueNull) {
        value = option.value;
      } else if (isValueNull && !isCheckbox) {
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

  const useDataAttribute = useMemo(() => {
    const data = {};

    console.info(field.values);
    const keys = Object.keys(field.values || {});
    for (let key of keys) {
      data[`data-option-${key.toLowerCase()}`] = field.values[key];
    }

    return data;
  });

  const useStyleAttribute = useMemo(() => {
    const data = {};

    for (let option of stampaField.options) {
      const key = option.name;
      const value = field.values[key];

      if (value == null || value.length === 0) {
        continue;
      }

      data[`--${key.toLowerCase()}`] = `${value}${option.suffix || ''}`;
    }

    return data;
  });

  /**
   * Data saved with PHP using json_encode gets converted to string, but we need numbers...
   */
  const gridArea = `${+field.position.startRow} / ${+field.position
    .startColumn} / ${+field.position.endRow +
    +field.position.startRow} / ${+field.position.endColumn +
    +field.position.startColumn}`;

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

  const gridFieldGridData = {
    columns: (field.values && field.values.columns) || field.position.endColumn,
    rows: (field.values && field.values.rows) || field.position.endRow,
    gap: (field.values && field.values.gap) || store.get('gridGap'),
  };

  const tooltipPosition = stampaField.container ? 'top' : '';
  const showFieldTypeHint = store.get('showFieldTypeHint');
  const tooltipClass = showFieldTypeHint ? '' : 'has-html-tooltip';

  return (
    <div
      draggable="true"
      className={`stampa-grid__field ${tooltipClass}
      stampa-field--${field.id} ${activeClass} ${resizingClass} ${fieldClassName} ${draggingClass} ${noDropClass}`}
      ref={ref}
      onDragStart={dragMe}
      onDragEnd={endResize}
      data-key={field.key}
      style={{
        gridArea,
      }}
      onClick={setAsActive}
      {...useDataAttribute}
    >
      <div
        className={`tooltip tooltip--html grid ${tooltipPosition}`}
        aria-hidden="true"
      >
        <span className="tooltip__row padding-top" aria-hidden="true">
          {field.title}
        </span>
        <strong className="tooltip__row padding-bottom" aria-hidden="true">
          <i>${field.name}</i>
        </strong>
        <span
          className="tooltip__right"
          aria-hidden="true"
          dangerouslySetInnerHTML={{
            __html: stampaField.label.replace(' ', '<br/>'),
          }}
        ></span>
      </div>
      {showFieldTypeHint && (
        <div className="stampa-grid__field__type">
          <img src={stampaField.icon} aria-hidden="true" draggable="false" />
          <span>{stampaField.label}</span>
        </div>
      )}
      {stampaField.container && (
        <Grid
          gridColumns={+gridFieldGridData.columns}
          gridRows={+gridFieldGridData.rows}
          gridGap={+gridFieldGridData.gap}
          gridRowHeight={-1}
          acceptedGroups={stampaField.acceptedGroups}
          maxChildren={stampaField.maxChildren}
          fields={field.fields || []}
          parentField={field}
          draggable={true}
          useClassName="is-container"
          useCustomStyle={useStyleAttribute}
        />
      )}
      {stampaField.container == null && (
        <div
          dangerouslySetInnerHTML={{ __html: fieldHTML }}
          className={`stampa-grid__field__content ${contentClassName}`}
        />
      )}
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
