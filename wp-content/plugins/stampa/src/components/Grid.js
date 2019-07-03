import React, { useRef, useState, useCallback } from 'react';

import Store from '../store/store';
import stampa from '../stampa';

import CSSGrid from './CSSGrid';
import Field from './Field';

import {
  gridArea,
  updateDragData,
  updateFieldPosition,
  addNewField,
} from './Grid.utils';

export default function Grid({
  gridColumns,
  gridRows,
  gridGap,
  gridRowHeight,
}) {
  const ref = useRef();
  const store = Store.useStore();
  const [drag, setDrag] = useState({});

  const fields = store.get('stampaFields');
  const draggedFieldId = store.get('draggedFieldId');

  const handleDragOver = useCallback(e => {
    const isStampaField = e.dataTransfer.types.includes('stampa-field-key');

    if (isStampaField) {
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
    stampa.setResizing(false);

    const isFieldOnBoard = draggedFieldId[0] == '_';
    if (isFieldOnBoard) {
      updateFieldPosition(draggedFieldId, drag, store);
    } else {
      addNewField(draggedFieldId, drag, store);
    }
  };

  const minHeight = gridRowHeight * gridRows + 'px';

  return (
    <div className="stampa-grid">
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
          height: minHeight,
        }}
      >
        <CSSGrid />
        {fields.map(field => <Field field={field} key={field._stampa.key} />)}
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
}
