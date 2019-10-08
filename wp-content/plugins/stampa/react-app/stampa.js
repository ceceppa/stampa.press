/**
 * Helpers functions
 *
 * Some of this functions are used to avoid unnecessary re-render of the APP.
 * For example: the information about the start position of the block, stored
 * when dragging the field, does not affect the app itself, unless until the drop
 * ends.
 * So, for this reason we can store the information extenally without using any state/store.
 *
 */
const stampaUtils = {
  /**
   * Get the postID passed via PHP
   */
  getPostID() {
    return stampa.post_ID;
  },
  /**
   * The rest URL
   */
  getRestURL() {
    return stampa.rest_url;
  },
  /**
   * The fields loaded via PHP
   */
  getFields: () => (window.stampa && window.stampa.fields) || [],
  /**
   * Return the field matching the given ID.
   *
   * @param {string} id the field id
   */
  getFieldById: function(id) {
    const fields = this.getFields();

    for (const group in fields) {
      for (const field in fields[group]) {
        if (field === id) {
          return Object.assign({}, fields[group][field]);
        }
      }
    }

    return null;
  },
  /**
   * Get the block data (used in edit-mode)
   */
  getStampaBlocks: () => window.stampa && window.stampa.block,
  /**
   * Specify which resize action the user is performing:
   * - width
   * - height
   * - both
   *
   * @param {resize} resize width, height, both
   */
  setResizeDirection: function(resize) {
    this.resizeDirection = resize;
  },
  /**
   * Set the resizing status
   *
   * @param {bool} status is it resizing?
   */
  setResizing: function(status) {
    this.resizingStatus = status;
  },
  /**
   * Get the resize direction
   */
  getResizeDirection: function() {
    return this.resizeDirection;
  },
  isResizing: function() {
    return this.resizingStatus;
  },
  /**
   * Store the start position of the field during dragging and resizing
   *
   * @param {object} position the field position
   */
  setFieldPosition: function(position) {
    this.fieldPosition = position;
  },

  /**
   * Returns the start position of the block
   */
  getFieldPosition: function() {
    return this.fieldPosition;
  },
  setDraggedFieldId(fieldId) {
    this.draggedFieldId = fieldId;
  },
  getDraggedFieldId() {
    return this.draggedFieldId || null;
  },

  setDraggedField(field) {
    this.draggedField = field;
  },
  getDraggedField() {
    return this.draggedField;
  },
  setDraggedFieldGroup(fieldGroup) {
    this.draggedFieldGroup = fieldGroup;
  },
  getDraggedFieldGroup() {
    return this.draggedFieldGroup;
  },
  /**
   * Delete the active block
   *
   * This function is used by both FieldOptions & App.js
   */
  deleteActiveField: store => {
    const toastData = store.get('toast');
    const stampaFields = store.get('stampaFields');
    const activeFieldKey = store.get('activeFieldKey');
    const activeField = stampaUtils.findFieldByKey(
      stampaFields,
      activeFieldKey
    );

    toastData.message =
      '<strong>Delete:</strong> ' + (activeField.title || activeField.name);
    toastData.button1 = 'Yes';
    toastData.button2 = 'No';
    toastData.button1Callback = () => {
      const fields = stampaUtils.removeFieldFromItsParent(
        activeField,
        stampaFields
      );

      store.set('stampaFields')(fields);
      store.set('activeFieldKey')(null);

      toastData.button2Callback();
    };

    toastData.button2Callback = () => {
      toastData.message = null;
      store.set('toast')(toastData);
    };
    store.set('toast')(toastData);
  },
  sanitizeVariableName: function(str) {
    str = str.toLowerCase();

    var from = 'àáäâèéëêìíïîòóöôùúüûñç';
    var to = 'aaaaeeeeiiiioooouuuunc';

    for (var i = 0, l = from.length; i < l; i++) {
      str = str.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));
    }

    return str
      .replace(/\W/g, '_')
      .replace(/\s+/g, '_')
      .replace(/^\d+/g, '');
  },
  findFieldByKey(fields, fieldKey) {
    for (let field of fields) {
      if (field.key == fieldKey) {
        return field;
      }

      if (Array.isArray(field.fields)) {
        const found = this.findFieldByKey(field.fields, fieldKey);

        if (found) {
          return found;
        }
      }
    }

    return null;
  },
  removeFieldFromItsParent(fieldToRemove, fields) {
    for (let index in fields) {
      const child = fields[index];

      if (child.key === fieldToRemove.key) {
        fields.splice(index, 1);

        break;
      }

      if (Array.isArray(child.fields)) {
        stampaUtils.removeFieldFromItsParent(fieldToRemove, child.fields);
      }
    }

    return fields;
  },
};

export default stampaUtils;
