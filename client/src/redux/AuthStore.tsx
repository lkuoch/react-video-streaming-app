import { PayloadAction, createSlice } from "redux-starter-kit";

const AuthStore = createSlice({
  //~ Slice name
  slice: "auth_store",

  //~ Initial slice state
  initialState: {
    isSignedIn: null,
    userId: null,
    gAPIAuthInstance: null
  } as RVSA.IAuthStoreState,

  //~ Reducers
  reducers: {
    //* Set user status to signed in
    SIGN_IN: (state: RVSA.IAuthStoreState) => {
      state.isSignedIn = true;
      state.userId = state.gAPIAuthInstance!.currentUser.get().getId();
    },

    //* Set user status to signed out
    SIGN_OUT: (state: RVSA.IAuthStoreState) => {
      state.isSignedIn = false;
      state.userId = null;
    },

    //* Initialise a global instance of the Google API
    INIT_GAPI_INSTANCE: (
      state: RVSA.IAuthStoreState,
      action: PayloadAction
    ) => {
      state.gAPIAuthInstance = action.payload;
    }
  }
});

export default AuthStore;
