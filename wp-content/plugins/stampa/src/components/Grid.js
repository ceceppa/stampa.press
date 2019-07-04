import React, { useRef, useState, useCallback } from 'react';

import Store from '../store/store';
import stampa from '../stampa';

import CSSGrid from './CSSGrid';
import Field from './Field';

import {
  gridArea,
  updateDragData,
  updateField,
  addNewField,
} from './Grid.utils';

const Grid = function({
  gridColumns,
  gridRows,
  gridGap,
  gridRowHeight,
  acceptedGroups,
  fields,
  useClassName,
  parentField,
}) {
  const ref = useRef();
  const store = Store.useStore();
  const [drag, setDrag] = useState({});

  const handleDragOver = useCallback(e => {
    const isStampaField = e.dataTransfer.types.includes('stampa-field-key');
    const draggedFieldGroup = stampa.getDraggedFieldGroup();
    const isFieldGroupAccepted = acceptedGroups.indexOf(draggedFieldGroup) >= 0;

    /**
     * Prevent the parent grid from showing the highlighted cells
     * if the child container does not accept the dragged field.
    */
    if (!isFieldGroupAccepted) {
      e.stopPropagation();
    }

    if (isStampaField && isFieldGroupAccepted) {
      e.preventDefault();

      const clientRect = ref.current.getBoundingClientRect();

      updateDragData(e, clientRect, gridColumns, gridRows, setDrag);
    }
  });

  const handleDragLeave = e => {
    setDrag({ over: false });
  };

  const handleDrop = e => {
    handleDragLeave();

    const draggedFieldId = e.dataTransfer.getData('stampa-field-key');

    if (draggedFieldId == null) {
      return;
    }

    const draggedFieldGroup = stampa.getDraggedFieldGroup();
    const isFieldGroupAccepted = acceptedGroups.indexOf(draggedFieldGroup) >= 0;
    if (isFieldGroupAccepted) {
      e.stopPropagation();
    }

    stampa.setResizing(false);

    const isFieldOnBoard = draggedFieldId[0] == '_';
    if (isFieldOnBoard) {
      updateField(parentField, draggedFieldId, drag, store);
    } else {
      addNewField(parentField, draggedFieldId, drag, store);
    }
  };

  const resizingClass = stampa.isResizing() ? 'resizing' : '';

  /**
   * During the drag mode "container" elements don't need to:
   * - change their opacity
   * - have the "pointer-events" set to "none"
   */
  const isDragging = stampa.getDraggedFieldId() != null;
  const draggingClass = isDragging ? 'dragging' : '';

  const gridHeight = gridRowHeight > 0 ? gridRowHeight * gridRows : 100;
  const heightUnit = gridRowHeight > 0 ? 'px' : '%';

  return (
    <div
      className={`stampa-grid ${useClassName || ''}`}
      data-accepted-groups={acceptedGroups.join(',')}
      onClick={() => store.set('activeFieldKey')(null)}
    >
      <div
        className="stampa-grid__content editor-styles-wrapper"
        ref={ref}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        style={{
          gridTemplateColumns: `repeat(${gridColumns}, 1fr)`,
          gridTemplateRows: `repeat(${gridRows}, 1fr)`,
          gridGap: `${gridGap}px`,
          height: `${gridHeight}${heightUnit}`,
        }}
      >
        {store.get('gridShow') &&
          <CSSGrid
            gridColumns={gridColumns}
            gridRows={gridRows}
            gridGap={gridGap}
            gridHeight={gridHeight}
            gridHeightUnit={heightUnit}
          />}
        {fields.map(field => (
          <Field
            field={field}
            key={field._stampa.key}
            resizingClass={resizingClass}
            draggingClass={draggingClass}
          />
        ))}
        {drag.over &&
          <div
            className="stampa-grid__highlight"
            style={{
              gridArea,
            }}
          />}
      </div>
    </div>
  );
};

export default React.memo(Grid);
