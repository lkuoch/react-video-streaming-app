import { createAction } from "redux-starter-kit";
import Endpoint from "./Endpoint";
import {
  _CREATE_STREAM,
  _FETCH_STREAM,
  _FETCH_STREAMS,
  _EDIT_STREAM,
  _DELETE_STREAM
} from "./Types";
import streams from "../../apis/streams";

export const CREATE_STREAM = (formValues: any) => async (dispatch: any) => {
  const response = await Endpoint.post("/streams", formValues);

  dispatch({
    type: _CREATE_STREAM,
    payload: response.data
  });
};

export const FETCH_STREAMS = () => async (dispatch: any) => {
  const response = await Endpoint.get("/streams");

  dispatch({
    type: _FETCH_STREAMS,
    payload: response.data
  });
};

export const FETCH_STREAM = (id: Number) => async (dispatch: any) => {
  const response = await Endpoint.get(`/streams/${id}`);

  dispatch({
    type: _FETCH_STREAM,
    payload: response.data
  });
};

export const EDIT_STREAM = (id: Number, formValues: any) => async (
  dispatch: any
) => {
  const response = await Endpoint.put(`/streams/${id}`, formValues);

  dispatch({
    type: _EDIT_STREAM,
    payload: response.data
  });
};

export const DELETE_STREAM = (id: Number) => async (dispatch: any) => {
  await streams.delete(`/streams/${id}`);

  dispatch({
    type: _DELETE_STREAM,
    payload: id
  });
};
