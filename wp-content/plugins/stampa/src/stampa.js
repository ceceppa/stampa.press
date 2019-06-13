/**
 * Helpers functions
 */
let cellCoords = {
  column: 0,
  row: 0,
};

export default {
  getPostID() {
    return stampa.post_ID;
  },
  getRestURL() {
    return stampa.rest_url;
  },
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
  /**
   * Delete the active block
   *
   * This function is used by both FieldOptions & App.js
  */
  deleteActiveBlock: store => {
    const activeBlockKey = store.get('activeBlockKey');
    const blocks = store
      .get('stampaFields')
      .filter(block => block._stampa.key !== activeBlockKey);

    store.set('stampaFields')(blocks);
    store.set('activeBlockKey')(null);
  },
};
