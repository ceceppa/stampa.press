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

function updateField(parentField, draggedFieldId, dragData, store) {
  stampa.setDraggedFieldGroup(null);

  if (dragData.column == null || dragData.row == null) {
    resetResizeData(store);

    return;
  }

  const fields = store.get('stampaFields');
  const field = getField(draggedFieldId, fields);

  updateFieldSizeOrPosition(field, dragData);

  if (parentField) {
    checkAndUpdateFieldParent(field, fields, parentField);
  }

  store.set('stampaFields')(fields);
  resetResizeData(store);
}

function getField(draggedFieldId, fields) {
  for (let field of fields) {
    if (field._stampa.key == draggedFieldId) {
      return field;
    }

    if (Array.isArray(field.fields)) {
      return getField(draggedFieldId, field.fields);
    }
  }
}

function updateFieldSizeOrPosition(field, dragData) {
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
    field._stampa.startRow = dragData.row;
    field._stampa.startColumn = dragData.column;
  }

  if (resizeWidth && dragData.column >= field._stampa.startColumn) {
    field._stampa.endColumn = dragData.column - field._stampa.startColumn + 1;
  }

  if (resizeHeight && dragData.row >= field._stampa.startRow) {
    field._stampa.endRow = dragData.row - field._stampa.startRow + 1;
  }
}

function checkAndUpdateFieldParent(field, fields, parentField) {
  if (isFieldChildOf(field, parentField)) {
    return;
  }

  removeFieldFromCurrentParent(field, fields);

  if (!Array.isArray(parentFields.fields)) {
    parentField.fields = [];
  }

  parentField.fields.push(field);
}

function isFieldChildOf(field, parentField) {
  for (let child of parentField.fields) {
    if (child._stampa.key == field._stampa.key) {
      return true;
    }
  }

  return false;
}

function removeFieldFromCurrentParent(field, fields) {
  for (let index in fields) {
    const child = fields[index];

    if (child._stampa.key == field._stampa.key) {
      fields.splice(index, 1);

      break;
    }

    if (Array.isArray(field.fields)) {
      removeFieldFromCurrentParent(field, fields);
    }
  }
}

function resetResizeData(store) {
  stampa.setResizeDirection(null);
  stampa.setDraggedFieldId(null);
  stampa.setDraggedField(null);
}

function addNewField(parentField, draggedFieldId, drag, store) {
  const fields = store.get('stampaFields');
  const field = stampa.getFieldById(draggedFieldId);

  setupFieldStampaData(field, draggedFieldId, drag);
  setupFieldValuesData(field);

  if (parentField) {
    addNewFieldAsChildOf(parentField, field, store);
  } else {
    store.set('stampaFields')([...fields, field]);
  }

  // Set the last block as "active"
  store.set('activeFieldKey')(field._stampa.key);
  stampa.setDraggedField(null);
  stampa.setDraggedFieldId(null);
  stampa.setDraggedFieldGroup(null);
}

function setupFieldStampaData(field, draggedFieldId, drag) {
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
}

function setupFieldValuesData(field) {
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
}

function addNewFieldAsChildOf(parentField, field, store) {
  const fields = appendChildToParent(
    parentField._stampa.key,
    store.get('stampaFields'),
    field
  );

  store.set('stampaFields')(fields);
}

function appendChildToParent(parentKey, fields, newField) {
  for (let field of fields) {
    if (field._stampa.key == parentKey) {
      if (field.fields == null) {
        field.fields = [];
      }

      field.fields.push(newField);
      break;
    }

    if (Array.isArray(field.fields)) {
      appendChildToParent(parentKey, field.fields, newField);
    }
  }

  return fields;
}

export { gridArea, updateDragData, updateField, addNewField };
