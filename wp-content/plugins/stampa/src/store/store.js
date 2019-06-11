import { createConnectedStore } from 'undux';

// Declare your store's initial state.
const initialState = {
  stampaFields: [],
  stampaBlockOptions: {
    hasBackgroundOption: false,
  },
  draggedFieldId: null,
  gridColumns: 12,
  gridRows: 5,
  gridGap: 5,
  rowHeight: 46,
  gridShow: true,
  isBlockSelected: false,
  resizingBlock: false,
  blockPosition: {},
  resizeDirection: null,
  activeBlockKey: null,
};

// Create & export a store with an initial value.
export default createConnectedStore(initialState, null);
