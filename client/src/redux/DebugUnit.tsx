//* All debugging methods come in here

import { PayloadAction, createSlice } from "redux-starter-kit";

//# Debug Unit State Schema
export interface IDebugState {
  hasPermission: boolean;
  debugEnabled: boolean;
}

//# DebugUnit Available Prop Methods
export interface IDebugProps extends IDebugState {
  SET_PERMISSION: (action?: any) => void;
  DEBUG_ON: (action?: any) => void;
  DEBUG_OFF: (action?: any) => void;
}

const DebugUnit = createSlice({
  //~ Slice name
  slice: "debug_unit",

  //~ Initial slice state
  initialState: {
    hasPermission: true,
    debugEnabled: false
  } as IDebugState,

  //~ Reducers
  reducers: {
    DEBUG_ON: (state: IDebugState, _action: PayloadAction) => {
      state.debugEnabled = true;
    },
    DEBUG_OFF: (state: IDebugState, _action: PayloadAction) => {
      state.debugEnabled = false;
    },
    SET_PERMISSION: (state: IDebugState, action: PayloadAction) => {
      state.hasPermission = action.payload;
    }
  }
});

export default DebugUnit;
