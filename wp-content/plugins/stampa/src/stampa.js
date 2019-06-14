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
export default {
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
