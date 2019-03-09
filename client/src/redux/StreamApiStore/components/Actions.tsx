import Endpoint from "./Endpoint";
import {
  create_stream,
  fetch_stream,
  fetch_streams,
  edit_stream,
  delete_stream
} from "./Types";
import History from "../../../browser/History";

//* Creates a stream
export const CREATE_STREAM = (formValues: any) => async (
  dispatch: Function,
  getState: Function
) => {
  const { userId } = getState().auth_store;
  const response = await Endpoint.post("/streams", {
    ...formValues,
    userId
  });

  dispatch({
    type: create_stream,
    payload: response.data
  });

  //~ Navigate back to home page
  History.push("/");
};

//* Fetches a single stream
export const FETCH_STREAM = (id: number) => async (dispatch: Function) => {
  const response = await Endpoint.get(`/streams/${id}`);

  dispatch({
    type: fetch_stream,
    payload: response.data
  });
};

//* Fetches all streams
export const FETCH_STREAMS = () => async (dispatch: Function) => {
  const response = await Endpoint.get("/streams");

  dispatch({
    type: fetch_streams,
    payload: response.data
  });
};

//* Edit a single stream
export const EDIT_STREAM = (payload: any) => async (dispatch: Function) => {
  //~ Merge changes
  const response = await Endpoint.patch(
    `/streams/${payload.id}`,
    payload.formValues
  );

  dispatch({
    type: edit_stream,
    payload: response.data
  });

  //~ Navigate back to home page
  History.push("/");
};

//* Delete a single stream
export const DELETE_STREAM = (id: number) => async (dispatch: Function) => {
  await Endpoint.delete(`/streams/${id}`);

  dispatch({
    type: delete_stream,
    payload: id
  });
};
