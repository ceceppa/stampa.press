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
  getBlockByKey: function(key) {},
  setBlocks: function(blocks) {},
  blockData: () => window.stampa && window.stampa.block,
};
