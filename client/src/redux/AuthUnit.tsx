import { createSlice } from "redux-starter-kit";

//# AuthUnit State Schema
export interface IAuthState {
  isSignedIn: boolean | null;
  userId: string | null;
  gAPIAuthInstance?: gapi.auth2.GoogleAuth | null;
}

//# AuthUnit Availabe Prop Methods
export interface IAuthProps extends IAuthState {
  SIGN_IN: (action?: any) => void;
  SIGN_OUT: (action?: any) => void;
  INIT_GAPI_INSTANCE: (action?: gapi.auth2.GoogleAuth) => void;
}

const AuthUnit = createSlice({
  //~ Slice name
  slice: "AUTH_UNIT",

  //~ Initial slice state
  initialState: {
    isSignedIn: null,
    signInStatus: null,
    userId: null,
    gAPIAuthClient: null
  } as IAuthState,

  //~ Reducers
  reducers: {
    SIGN_IN: (state, action) => {
      state.isSignedIn = true;
      state.userId = state.gAPIAuthInstance!.currentUser.get().getId();
    },
    SIGN_OUT: (state, action) => {
      state.isSignedIn = false;
      state.userId = null;
    },
    INIT_GAPI_INSTANCE: (state, action) => {
      state.gAPIAuthInstance = action.payload;
    }
  }
});

export default AuthUnit;
