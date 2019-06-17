import React, { useRef, useState, useEffect } from 'react';
import shortid from 'shortid';

import Store from '../store/store';
import stampa from '../stampa';

import CSSGrid from './CSSGrid';
import Field from './Field';

let oldX, oldY;

export default function Grid() {
  const ref = useRef();
  const store = Store.useStore();
  const [drag, setDrag] = useState({});

  const draggedFieldId = store.get('draggedFieldId');
  const fields = store.get('stampaFields');

  const handleDragOver = e => {
    e.preventDefault();

    if (draggedFieldId) {
      const clientRect = ref.current.getBoundingClientRect();
      const columns = store.get('gridColumns');
      const rows = store.get('gridRows');

      const x = e.clientX - clientRect.x;
      const y = e.clientY - clientRect.y;
      const cellWidth = clientRect.width / columns;
      const cellHeight = clientRect.height / rows;

      const cellX = Math.ceil(x / cellWidth);
      const cellY = Math.ceil(y / cellHeight);

      if (
        !Number.isNaN(cellX) &&
        !Number.isNaN(cellY) &&
        (cellX != oldX || cellY != oldY)
      ) {
        oldX = cellX;
        oldY = cellY;

        setDrag({
          column: cellX,
          row: cellY,
          over: true,
        });
      }
    }
  };

  const handleDragLeave = e => {
    setDrag({ over: false });
  };

  const handleDrop = e => {
    handleDragLeave();

    const draggedFieldId = store.get('draggedFieldId');

    if (draggedFieldId == null) {
      return;
    }

    stampa.setResizing(false);

    /**
     * Is a new item or am I moving a one from the board?
     */
    if (draggedFieldId[0] == '_') {
      for (let i = 0, l = fields.length; i < l; ++i) {
        const field = fields[i];

        if (field._stampa.key === draggedFieldId) {
          const resize = stampa.getResizeDirection();

          let resizeWidth = false;
          let resizeHeight = false;

          if (resize == 'width') {
            resizeWidth = true;
          } else if (resize == 'height') {
            resizeHeight = true;
          } else if (resize == 'se') {
            resizeWidth = true;
            resizeHeight = true;
          } else {
            field._stampa.startRow = drag.row;
            field._stampa.startColumn = drag.column;
          }

          if (resizeWidth && drag.column >= field._stampa.startColumn) {
            field._stampa.endColumn =
              drag.column - field._stampa.startColumn + 1;
          }

          if (resizeHeight && drag.row >= field._stampa.startRow) {
            field._stampa.endRow = drag.row - field._stampa.startRow + 1;
          }

          break;
        }
      }

      store.set('stampaFields')(fields);
      store.set('draggedFieldId')(null);

      stampa.setResizeDirection(null);
      // store.set('resizeDirection')(null);
    } else {
      const field = stampa.getFieldById(draggedFieldId);

      field._stampa = {
        id: draggedFieldId,
        key: `_${shortid.generate()}`,
        startColumn: drag.column,
        startRow: drag.row,
        endColumn: 1,
        endRow: 1,
        name: draggedFieldId,
      };

      field._values = {};

      /**
       * All the checkbox option set by default to "false" have to create
       * an empty record in field._values, otherwise it will automatically fallback
       * to the default "value"
       */
      for (let option of field.options) {
        if (option.type == 'checkbox' && option.checked == false) {
          field._values[option.name] = '';
        }
      }

      store.set('stampaFields')([...fields, field]);

      // Set the last block as "active"
      store.set('activeBlockKey')(field._stampa.key);
    }
  };

  let gridArea;

  if (stampa.isResizing()) {
    let {
      startRow,
      startColumn,
      endRow,
      endColumn,
    } = stampa.getFieldPosition();

    const resize = stampa.getResizeDirection();

    if (resize == 'width') {
      endColumn = Math.max(startColumn, drag.column + 1);
      endRow += startRow;
    } else if (resize == 'height') {
      endRow = Math.max(startRow, drag.row + 1);
      endColumn += startColumn;
    } else {
      endColumn = Math.max(startColumn, drag.column + 1);
      endRow = Math.max(startRow, drag.row + 1);
    }

    if (!Number.isNaN(endRow) && !Number.isNaN(endColumn)) {
      gridArea = `${startRow} / ${startColumn} / ${endRow} / ${endColumn}`;
    }
  } else {
    let endRow = drag.row;
    let endColumn = drag.column;

    if (draggedFieldId && draggedFieldId[0] == '_') {
      const position = stampa.getFieldPosition();

      endRow += position.endRow;
      endColumn += position.endColumn;
    }

    gridArea = `${drag.row} / ${drag.column} / ${endRow} / ${endColumn}`;
  }

  const minHeight = store.get('rowHeight') * store.get('gridRows') + 'px';
  return (
    <div className="stampa-grid">
      <div
        className="stampa-grid__content editor-styles-wrapper"
        ref={ref}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        style={{
          gridTemplateColumns: `repeat(${store.get('gridColumns')}, 1fr)`,
          gridTemplateRows: `repeat(${store.get('gridRows')}, 1fr)`,
          gridGap: `${store.get('gridGap')}px`,
          height: minHeight,
        }}
      >
        <CSSGrid />
        {/* <SVGGrid drag={drag} /> */}
        {fields.map(field => <Field field={field} key={field._stampa.key} />)}
        {draggedFieldId &&
          drag.over &&
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
