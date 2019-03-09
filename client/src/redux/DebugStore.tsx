//* All debugging methods come in here

import { PayloadAction, createSlice } from "redux-starter-kit";

//# Debug Unit State Schema
export interface IDebugState {
  hasPermission: boolean;
  debugEnabled: boolean;
}

//# DebugStore Available Prop Methods
export interface IDebugProps extends IDebugState {
  SET_PERMISSION: (payload?: any) => void;
  DEBUG_ON: (payload?: any) => void;
  DEBUG_OFF: (payload?: any) => void;
}

const DebugStore = createSlice({
  //~ Slice name
  slice: "debug_store",

  //~ Initial slice state
  initialState: {
    hasPermission: true,
    debugEnabled: false
  } as IDebugState,

  //~ Reducers
  reducers: {
    //* Debug mode is on
    DEBUG_ON: (state: IDebugState, _action: PayloadAction) => {
      state.debugEnabled = true;
    },

    //* Debug mode is off
    DEBUG_OFF: (state: IDebugState, _action: PayloadAction) => {
      state.debugEnabled = false;
    },

    //* Sets whether or not the user has permission to access debug control
    SET_PERMISSION: (state: IDebugState, action: PayloadAction) => {
      state.hasPermission = action.payload;
    }
  }
});

export default DebugStore;
