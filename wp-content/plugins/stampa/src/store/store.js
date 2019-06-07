import { createConnectedStore } from 'undux';

// Declare your store's initial state.
const initialState = {
  stampaBlocks: [],
  draggedBlockId: null,
  gridColumns: 12,
  gridRows: 5,
  gridGap: 5,
  isBlockSelected: false,
  resizingBlock: false,
  blockPosition: {},
  resizeDirection: null,
  activeBlock: null,
};

/**
 * Is jest test?
 */
// if (global) {
//   initialState.draggedBlockId = 'test';
// }

// Create & export a store with an initial value.
export default createConnectedStore(initialState, null);
