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
          return groups[group][block];
        }
      }
    }

    return null;
  },
  setCellXY: (x, y) => {
    cellCoords.column = x + 1;
    cellCoords.row = y + 1;
  },
  getCellXY: () => cellCoords,
};
