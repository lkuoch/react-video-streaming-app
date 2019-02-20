//* All debugging methods come in here
import streams from "../apis/streams";
import { PayloadAction, createSlice } from "redux-starter-kit";

//# Debug Unit State Schema
export interface IApiState {}

//# ApiModule Available Props
export interface IApiProps extends IApiState {
  CREATE_STREAM: (action?: any) => void;
}

const ApiModule = createSlice({
  //~ Slice name
  slice: "api_module",

  //~ Initial slice state
  initialState: {} as IApiState,

  //~ Reducers
  reducers: {
    CREATE_STREAM: (state: IApiState, action: PayloadAction) => {
      // TODO: Lesson 237-238, yeah boi
    }
  }
});

export default ApiModule;
