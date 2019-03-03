import _ from "lodash";
import {
  create_stream,
  fetch_stream,
  fetch_streams,
  edit_stream,
  delete_stream
} from "./Types";

//* Execute Stream Api actions
export default (state: any = {}, action: any) => {
  switch (action.type) {
    case fetch_stream:
      return { ...state, [action.payload.id]: action.payload };

    case fetch_streams:
      return { ...state, ..._.mapKeys(action.payload, "id") };

    case create_stream:
      return { ...state, [action.payload.id]: action.payload };

    case edit_stream:
      return { ...state, [action.payload.id]: action.payload };

    case delete_stream:
      return _.omit(state, action.payload);

    default:
      return state;
  }
};
