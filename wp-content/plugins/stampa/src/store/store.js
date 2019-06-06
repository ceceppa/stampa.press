import { createConnectedStore } from 'undux';

// Declare your store's initial state.
const initialState = {
  draggedBlockId: null,
  stampaBlock: {},
  gridColumns: 12,
  gridRows: 5,
  gridGap: 5,
  blockColumn: 0,
  blockRows: 1,
  blockColumns: 1,
  blockRow: 0,
  storeSelected: null,
};

/**
 * Is jest test?
 */
if (global) {
  initialState.draggedBlockId = 'test';
}

// Create & export a store with an initial value.
export default createConnectedStore(initialState, null);
