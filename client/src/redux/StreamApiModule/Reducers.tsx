import _ from "lodash";

import {
  _CREATE_STREAM,
  _FETCH_STREAM,
  _FETCH_STREAMS,
  _EDIT_STREAM,
  _DELETE_STREAM
} from "./Types";

export default (state: any = {}, action: any) => {
  switch (action.type) {
    case _FETCH_STREAM:
      return { ...state, [action.payload.id]: action.payload };

    case _FETCH_STREAMS:
      return { ...state, ..._.mapKeys(action.payload, "id") };

    case _CREATE_STREAM:
      return { ...state, [action.payload.id]: action.payload };

    case _EDIT_STREAM:
      return { ...state, [action.payload.id]: action.payload };

    case _DELETE_STREAM:
      return _.omit(state, action.payload);

    default:
      return state;
  }
};
