import { createConnectedStore } from 'undux';

// Declare your store's initial state.
const initialState = {
  stampaFields: [],
  stampaBlockOptions: {},
  draggedBlockId: null,
  gridColumns: 12,
  gridRows: 5,
  gridGap: 5,
  rowHeight: 46,
  isBlockSelected: false,
  resizingBlock: false,
  blockPosition: {},
  resizeDirection: null,
  activeBlockKey: null,
};

/**
 * Is jest test?
 */
// if (global) {
//   initialState.draggedBlockId = 'test';
// }

// Create & export a store with an initial value.
export default createConnectedStore(initialState, null);
