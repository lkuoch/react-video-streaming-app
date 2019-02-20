import { PayloadAction, createSlice } from "redux-starter-kit";

//# AuthModule State Schema
export interface IAuthState {
  isSignedIn: boolean | null;
  userId: string | null;
  gAPIAuthInstance?: gapi.auth2.GoogleAuth | null;
}

//# AuthModule Availabe Prop Methods
export interface IAuthProps extends IAuthState {
  SIGN_IN: (action?: any) => void;
  SIGN_OUT: (action?: any) => void;
  INIT_GAPI_INSTANCE: (action?: gapi.auth2.GoogleAuth) => void;
}

const AuthModule = createSlice({
  //~ Slice name
  slice: "auth_module",

  //~ Initial slice state
  initialState: {
    isSignedIn: null,
    signInStatus: null,
    userId: null,
    gAPIAuthClient: null
  } as IAuthState,

  //~ Reducers
  reducers: {
    SIGN_IN: (state: IAuthState, _action: PayloadAction) => {
      state.isSignedIn = true;
      state.userId = state.gAPIAuthInstance!.currentUser.get().getId();
    },
    SIGN_OUT: (state: IAuthState, _action: PayloadAction) => {
      state.isSignedIn = false;
      state.userId = null;
    },
    INIT_GAPI_INSTANCE: (state: IAuthState, action: PayloadAction) => {
      state.gAPIAuthInstance = action.payload;
    }
  }
});

export default AuthModule;
