import { createConnectedStore } from 'undux';

// Declare your store's initial state.
const initialState = {
  dragElementId: null,
  stampaBlock: {},
};

// Create & export a store with an initial value.
export default createConnectedStore(initialState, null);
