import { createConnectedStore } from 'undux';

// Declare your store's initial state.
const initialState = {
  draggedElementId: null,
  stampaBlock: {},
  gridColumns: 12,
  gridRows: 5,
  gridGap: 5,
};

/**
 * Is jest test?
 */
if (global) {
  initialState.draggedElementId = 'test';
}

// Create & export a store with an initial value.
export default createConnectedStore(initialState, null);
