//* All debugging methods come in here
import streams from "../apis/streams";
import { PayloadAction, createSlice } from "redux-starter-kit";

//# Debug Unit State Schema
export interface IApiState {}

//# StreamApiModule Available Props
export interface IApiProps extends IApiState {
  CREATE_STREAM: (action?: any) => void;
}

const StreamApiModule = createSlice({
  //~ Slice name
  slice: "stream_api_module",

  //~ Initial slice state
  initialState: {} as IApiState,

  //~ Reducers
  reducers: {
    CREATE_STREAM: (state: IApiState, action: PayloadAction) => {
      streams.post("/streams", action.payload);
    }
  }
});

export default StreamApiModule;
