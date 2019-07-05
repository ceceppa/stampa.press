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
  const field = stampa.findFieldByKey(fields, draggedFieldId);
  updateFieldSizeOrPosition(field, dragData);

  if (parentField) {
    checkAndUpdateFieldParent(field, fields, parentField);
  }

  resetResizeData(store);
  store.set('stampaFields')(fields);
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
    field.position.startRow = dragData.row;
    field.position.startColumn = dragData.column;
  }

  if (resizeWidth && dragData.column >= field.position.startColumn) {
    field.position.endColumn = dragData.column - field.position.startColumn + 1;
  }

  if (resizeHeight && dragData.row >= field.position.startRow) {
    field.position.endRow = dragData.row - field.position.startRow + 1;
  }
}

function checkAndUpdateFieldParent(field, fields, parentField) {
  if (isFieldChildOf(field, parentField)) {
    return;
  }
  removeFieldFromCurrentParent(field, fields);

  const parent = stampa.findFieldByKey(fields, parentField.key);
  if (!Array.isArray(parent.fields)) {
    parent.fields = [];
  }

  parent.fields.push(field);
}

function isFieldChildOf(field, parentField) {
  if (!Array.isArray(parentField.fields)) {
    return false;
  }

  for (let child of parentField.fields) {
    if (child.key == field.key) {
      return true;
    }
  }

  return false;
}

function removeFieldFromCurrentParent(fieldToRemove, fields) {
  for (let index in fields) {
    const child = fields[index];

    if (child.key == fieldToRemove.key) {
      fields.splice(index, 1);

      break;
    }

    if (Array.isArray(child.fields)) {
      removeFieldFromCurrentParent(fieldToRemove, child.fields);
    }
  }
}

function resetResizeData() {
  stampa.setResizeDirection(null);
  stampa.setDraggedFieldId(null);
  stampa.setDraggedField(null);
}

function addNewField(parentField, draggedFieldId, dragData, store) {
  const fields = store.get('stampaFields');
  const sourceField = stampa.getFieldById(draggedFieldId);

  /**
   * When adding a new field, we're going to store only relevant data like:
   * - position
   * - values
   * - id
   * - key
   * - etc...
   *
   * We don't save other all the other informations because this might change
   * during the devolpemnt or in future release of the app, and we need flexibility.
   */
  const uniqueFieldName = generateUniqueName(draggedFieldId, fields);
  const newField = setupFieldStampaData(
    uniqueFieldName,
    sourceField,
    draggedFieldId,
    dragData
  );

  setupFieldValuesData(newField, sourceField);

  if (parentField) {
    addNewFieldAsChildOf(parentField, newField, store);
  } else {
    store.set('stampaFields')([...fields, newField]);
  }

  // Set the last block as "active"
  store.set('activeFieldId')(newField.id);
  store.set('activeFieldKey')(newField.key);
  stampa.setDraggedField(null);
  stampa.setDraggedFieldId(null);
  stampa.setDraggedFieldGroup(null);
}

/**
 * When dragging a new item we want make sure that its name is unique, as
 * this property is used to generate the variable name of the field.
 * So, having multiple fields with the same name would make them "linked" together
 * and we don't want that.
 *
 * @param {*} fields
 * @param {*} id
 */
function generateUniqueName(fieldName, fields) {
  for (let field of fields) {
    if (field.name == fieldName) {
      const re = new RegExp('\\d+$');
      const match = fieldName.match(re);

      if (match) {
        fieldName = fieldName.replace(/\d+$/, '');

        fieldName += +match[0] + 1;
      } else {
        fieldName += '1';
      }

      return generateUniqueName(fieldName, fields);
    }
  }
  return fieldName;
}

function setupFieldStampaData(
  fieldName,
  sourceField,
  draggedFieldId,
  dragData
) {
  const newFieldData = {
    id: draggedFieldId,
    key: `_${shortid.generate()}`,
    name: fieldName,
    group: sourceField.group.toLowerCase(),
    position: {
      startColumn: dragData.column,
      startRow: dragData.row,
      endColumn: 1,
      endRow: 1,
    },
  };

  if (sourceField.defaultSize) {
    newFieldData.position.endColumn = sourceField.defaultSize.columns;
    newFieldData.position.endRow = sourceField.defaultSize.rows;
  }

  return newFieldData;
}

function setupFieldValuesData(newField, sourceField) {
  newField.values = {};

  /**
   * All the checkbox option set by default to "false" have to create
   * an empty record in field._values, otherwise it will automatically fallback
   * to the default "value"
   */
  for (let option of sourceField.options) {
    if (option.type == 'checkbox' && option.checked == false) {
      newField.values[option.name] = '';
    } else {
      newField.values[option.name] = option.value;
    }
  }
}

function addNewFieldAsChildOf(parentField, newField, store) {
  const fields = store.get('stampaFields');

  appendChildToParent(parentField.key, fields, newField);

  store.set('stampaFields')(fields);
}

function appendChildToParent(parentKey, fields, newField) {
  const field = stampa.findFieldByKey(fields, parentKey);

  if (field) {
    if (!Array.isArray(field.fields)) {
      field.fields = [];
    }

    field.fields.push(newField);
  }
}

export { gridArea, updateDragData, updateField, addNewField };
