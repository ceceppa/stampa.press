/**
 * This code is part of "Grid.js" and has been splitted to keep the code
 * more organised and clean
 */
import shortid from 'shortid';

import stampa from '../stampa';

let oldX, oldY, gridArea;

function updateDragData(
  element,
  boundingClientRect,
  gridColumns,
  gridRows,
  setDragCallback
) {
  const { cellX, cellY } = calculateCellXY(
    element,
    boundingClientRect,
    gridColumns,
    gridRows
  );

  if (
    !Number.isNaN(cellX) &&
    !Number.isNaN(cellY) &&
    (cellX != oldX || cellY != oldY)
  ) {
    oldX = cellX;
    oldY = cellY;

    const dragData = {
      column: cellX,
      row: cellY,
      over: true,
    };

    gridArea = getGridArea(dragData);
    setDragCallback(dragData);

    return gridArea;
  }

  return null;
}

function calculateCellXY(element, boundingClientRect, gridColumns, gridRows) {
  const x = element.clientX - boundingClientRect.x;
  const y = element.clientY - boundingClientRect.y;
  const cellWidth = boundingClientRect.width / gridColumns;
  const cellHeight = boundingClientRect.height / gridRows;

  return {
    cellX: Math.ceil(x / cellWidth),
    cellY: Math.ceil(y / cellHeight),
  };
}
function getGridArea(drag) {
  if (stampa.isResizing()) {
    return getResizingArea(drag);
  }

  return getOccupiedArea(drag);
}

function getResizingArea(drag) {
  let { startRow, startColumn, endRow, endColumn } = stampa.getFieldPosition();

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
    return `${startRow} / ${startColumn} / ${endRow} / ${endColumn}`;
  }
}

function getOccupiedArea(drag) {
  let endRow = drag.row;
  let endColumn = drag.column;

  const draggedFieldId = stampa.getDraggedFieldId();
  // draggedFieldId starts with _ when dragging an element from the grid
  if (draggedFieldId && draggedFieldId[0] == '_') {
    const position = stampa.getFieldPosition();

    drag.row -= position.offsetX;
    drag.column -= position.offsetY;
    endRow += position.endRow - position.offsetX;
    endColumn += position.endColumn - position.offsetY;
  } else {
    const field = stampa.getDraggedField();

    if (field.defaultSize) {
      endRow += field.defaultSize.rows;
      endColumn += field.defaultSize.columns;
    }
  }

  return `${drag.row} / ${drag.column} / ${endRow} / ${endColumn}`;
}

function updateFieldPosition(draggedFieldId, drag, store) {
  stampa.setDraggedFieldGroup(null);

  if (drag.column == null || drag.row == null) {
    resetResizeData(store);

    return;
  }

  const fields = store.get('stampaFields');
  for (let field of fields) {
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
        field._stampa.endColumn = drag.column - field._stampa.startColumn + 1;
      }

      if (resizeHeight && drag.row >= field._stampa.startRow) {
        field._stampa.endRow = drag.row - field._stampa.startRow + 1;
      }

      break;
    }

    store.set('stampaFields')(fields);
  }

  resetResizeData(store);
}

function resetResizeData(store) {
  stampa.setResizeDirection(null);
  stampa.setDraggedFieldId(null);
  stampa.setDraggedField(null);
}

function addNewField(parentField, draggedFieldId, drag, store) {
  const fields = store.get('stampaFields');
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

  if (field.defaultSize) {
    field._stampa.endColumn = field.defaultSize.columns;
    field._stampa.endRow = field.defaultSize.rows;
  }

  field._values = {};

  /**
   * All the checkbox option set by default to "false" have to create
   * an empty record in field._values, otherwise it will automatically fallback
   * to the default "value"
   */
  for (let option of field.options) {
    if (option.type == 'checkbox' && option.checked == false) {
      field._values[option.name] = '';
    } else {
      field._values[option.name] = option.value;
    }
  }

  if (parentField) {
    for (let field of fields) {
      if (field.stampa._key == parentField._stampa.key) {
        if (field.fields == null) {
          field.fields = [];
        }

        field.fields.push(field);
        break;
      }
    }

    store.set('stampaFields')(fields);
  } else {
    store.set('stampaFields')([...fields, field]);
  }

  // Set the last block as "active"
  store.set('activeFieldKey')(field._stampa.key);
  stampa.setDraggedField(null);
  stampa.setDraggedFieldId(null);
  stampa.setDraggedFieldGroup(null);
}

export { gridArea, updateDragData, updateFieldPosition, addNewField };
