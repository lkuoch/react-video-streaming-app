import Endpoint from "./Endpoint";
import {
  create_stream,
  fetch_stream,
  fetch_streams,
  edit_stream,
  delete_stream
} from "./Types";

//* Creates a stream
export const CREATE_STREAM = (formValues: any) => async (dispatch: any) => {
  const response = await Endpoint.post("/streams", formValues);

  dispatch({
    type: create_stream,
    payload: response.data
  });
};

//* Fetches a single stream
export const FETCH_STREAM = (id: Number) => async (dispatch: any) => {
  const response = await Endpoint.get(`/streams/${id}`);

  dispatch({
    type: fetch_stream,
    payload: response.data
  });
};

//* Fetches all streams
export const FETCH_STREAMS = () => async (dispatch: any) => {
  const response = await Endpoint.get("/streams");

  dispatch({
    type: fetch_streams,
    payload: response.data
  });
};

//* Edit a single stream
export const EDIT_STREAM = (id: Number, formValues: any) => async (
  dispatch: any
) => {
  const response = await Endpoint.put(`/streams/${id}`, formValues);

  dispatch({
    type: edit_stream,
    payload: response.data
  });
};

//* Delete a single stream
export const DELETE_STREAM = (id: Number) => async (dispatch: any) => {
  await Endpoint.delete(`/streams/${id}`);

  dispatch({
    type: delete_stream,
    payload: id
  });
};
