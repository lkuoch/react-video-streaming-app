import streams from "../apis/streams";
import _ from "lodash";
import { PayloadAction, createSlice } from "redux-starter-kit";

//# Debug Unit State Schema
export interface IStreamApiState {
  streamList: any;
}

//# StreamApiModule Available Props
export interface IStreamApiProps extends IStreamApiState {
  CREATE_STREAM: (action?: any) => void;
  FETCH_STREAM: (action?: any) => void;
  FETCH_STREAMS: (action?: any) => void;
  EDIT_STREAM: (action?: any) => void;
  DELETE_STREAM: (action?: any) => void;
}

const StreamApiModule = createSlice({
  //~ Slice name
  slice: "stream_api_module",

  //~ Initial slice state
  initialState: {} as IStreamApiState,

  //~ Reducers
  reducers: {
    //* Creates a stream
    CREATE_STREAM: (state: IStreamApiState, action: PayloadAction) => {
      streams.post("/streams", action.payload);

      return { ...state, [action.payload.id]: action.payload };
    },

    //* Fetches a single stream
    FETCH_STREAM: (state: IStreamApiState, action: PayloadAction) => {
      streams.get(`/streams/${action.payload.id}`);

      return { ...state, [action.payload.id]: action.payload };
    },

    //* Fetches all streams
    FETCH_STREAMS: (state: IStreamApiState, action: PayloadAction) => {
      //* Wait for server to resolve response
      streams.get("/streams").then(res => {
        // let data = _.mapKeys(res.data, "id");
        // state.streamList = data;
      });
    },

    //* Edit a single stream <- Given an iD + formValue
    EDIT_STREAM: (state: IStreamApiState, action: PayloadAction) => {
      streams.put(`/streams/${action.payload.id}`, action.payload.formValues);

      return { ...state, [action.payload.id]: action.payload };
    },

    //* Delete a single stream <- Given an iD
    DELETE_STREAM: (state: IStreamApiState, action: PayloadAction) => {
      streams.delete(`/streams/${action.payload.id}`);

      _.omit(state, action.payload);
    }
  }
});

// May need to just create a reducer

export default StreamApiModule;
