import { createConnectedStore } from 'undux';

// Declare your store's initial state.
const initialState = {
  stampaBlockTitle: '',
  stampaFields: [],
  stampaBlockOptions: {
    hasBackgroundOption: false,
    cssClassName: null,
    fullWidth: true,
    icon: 'welcome-write-blog',
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
  activeFieldKey: null,
  activeFieldId: null,
  searchFilter: '',
  showFieldTypeHint: false,
  toast: {
    message: null,
    button1: null,
    button1Callback: null,
    button2: null,
    button2Callback: null,
    autoHide: false,
  },
};

// Create & export a store with an initial value.
export default createConnectedStore(initialState, null);
