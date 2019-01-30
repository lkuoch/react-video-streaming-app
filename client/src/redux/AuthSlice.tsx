import { createSlice } from "redux-starter-kit";

//# AuthSlice State Schema
export interface IAuthState {
  isSignedIn: boolean | null;
  userId: string | null;
  gAPIAuthClient?: gapi.auth2.GoogleAuth | null;
}

//# AuthSlice Availabe Prop Methods
export interface IAuthProps extends IAuthState {
  SignIn: (action?: any) => void;
  SignOut: (action?: any) => void;
  LoadGAPIAuthClient: (action?: gapi.auth2.GoogleAuth) => void;
}

const AuthSlice = createSlice({
  //~ Slice name
  slice: "AuthSlice",

  //~ Initial slice state
  initialState: {
    isSignedIn: null,
    signInStatus: null,
    userId: null,
    gAPIAuthClient: null
  } as IAuthState,

  //~ Reducers
  reducers: {
    SignIn: (state, action) => {
      state.isSignedIn = true;
      state.userId = state.gAPIAuthClient!.currentUser.get().getId();
    },
    SignOut: (state, action) => {
      state.isSignedIn = false;
      state.userId = null;
    },
    LoadGAPIAuthClient: (state, action) => {
      state.gAPIAuthClient = action.payload;
    }
  }
});

export default AuthSlice;
