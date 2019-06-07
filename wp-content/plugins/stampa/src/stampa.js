/**
 * Helpers functions
 */
let cellCoords = {
  column: 0,
  row: 0,
};

export default {
  getBlocks: () => (window.stampa && window.stampa.blocks) || [],
  getBlockById: function(id) {
    const groups = this.getBlocks();

    for (const group in groups) {
      for (const block in groups[group]) {
        if (block === id) {
          return Object.assign({}, groups[group][block]);
        }
      }
    }

    return null;
  },
  /**
   * no need to bother the "store" to store this informations, as that
   * would cause a re-render
   */
  setCellXY: (x, y) => {
    cellCoords.startColumn = x + 1;
    cellCoords.startRow = y + 1;
  },
  getCellXY: () => cellCoords,
};
