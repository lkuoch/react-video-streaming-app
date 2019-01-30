import { createSlice } from "redux-starter-kit";

//# AuthSlice State Schema
interface IAuthState {
  isSignedIn: boolean | null;
  userId: string | null;
}

const AuthSlice = createSlice({
  //~ Slice name
  slice: "AuthSlice",

  //~ Initial slice state
  initialState: {
    isSignedIn: null,
    userId: null
  } as IAuthState,

  //~ Reducers
  reducers: {
    signIn: (state, action) => {
      state.isSignedIn = true;
      state.userId = action.payload;
    },
    signOut: (state, action) => {
      state.isSignedIn = false;
      state.userId = null;
    }
  }
});

export default AuthSlice;
