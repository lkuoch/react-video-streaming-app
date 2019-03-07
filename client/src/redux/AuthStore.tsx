import { PayloadAction, createSlice } from "redux-starter-kit";

//# AuthStore State Schema
export interface IAuthState {
  isSignedIn: boolean | null;
  userId: string | null;
  gAPIAuthInstance?: gapi.auth2.GoogleAuth | null;
}

//# AuthStore Availabe Prop Methods
export interface IAuthReducers {
  SIGN_IN: (action?: any) => void;
  SIGN_OUT: (action?: any) => void;
  INIT_GAPI_INSTANCE: (action?: gapi.auth2.GoogleAuth) => void;
}

const AuthStore = createSlice({
  //~ Slice name
  slice: "auth_store",

  //~ Initial slice state
  initialState: {
    isSignedIn: null,
    userId: null,
    gAPIAuthInstance: null
  } as IAuthState,

  //~ Reducers
  reducers: {
    //* Set user status to signed in
    SIGN_IN: (state: IAuthState, action: PayloadAction) => {
      state.isSignedIn = true;
      state.userId = action.payload;
    },

    //* Set user status to signed out
    SIGN_OUT: (state: IAuthState, _action: PayloadAction) => {
      state.isSignedIn = false;
      state.userId = null;
    },

    //* Initialise a global instance of the Google API
    INIT_GAPI_INSTANCE: (state: IAuthState, action: PayloadAction) => {
      state.gAPIAuthInstance = action.payload;
    }
  }
});

export default AuthStore;
