//* All debugging methods come in here

import { PayloadAction, createSlice } from "redux-starter-kit";

const DebugStore = createSlice({
  //~ Slice name
  slice: "debug_store",

  //~ Initial slice state
  initialState: {
    hasPermission: true,
    debugEnabled: false
  } as RVSA.IDebugStoreState,

  //~ Reducers
  reducers: {
    //* Debug mode is on
    DEBUG_ON: (state: RVSA.IDebugStoreState) => {
      state.debugEnabled = true;
    },

    //* Debug mode is off
    DEBUG_OFF: (state: RVSA.IDebugStoreState) => {
      state.debugEnabled = false;
    },

    //* Sets whether or not the user has permission to access debug control
    SET_PERMISSION: (state: RVSA.IDebugStoreState, action: PayloadAction) => {
      state.hasPermission = action.payload;
    }
  }
});

export default DebugStore;
