/**
 * Helpers functions
 */
let cellCoords = {
  column: 0,
  row: 0,
};

export default {
  getFields: () => (window.stampa && window.stampa.fields) || [],
  getFieldById: function(id) {
    const groups = this.getFields();

    for (const group in groups) {
      for (const field in groups[group]) {
        if (field === id) {
          return Object.assign({}, groups[group][field]);
        }
      }
    }

    return null;
  },
  getFieldByKey: function(key) {},
  getStampaBlocks: () => window.stampa && window.stampa.stampa,
  setResizeDirection: function(resize) {
    this.resizeDirection = resize;
  },
  setResizing: function(status) {
    this.resizingStatus = status;
  },
  getResizeDirection: function() {
    return this.resizeDirection;
  },
  isResizing: function() {
    return this.resizingStatus;
  },
  setFieldPosition: function(position) {
    this.fieldPosition = position;
  },
  getFieldPosition: function() {
    return this.fieldPosition;
  },
};
