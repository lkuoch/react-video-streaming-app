//# Public Interfaces for other components

export interface IStreamApiState {}

export interface IStreamApiProps extends IStreamApiState {
  CREATE_STREAM: (action?: any) => void;
  FETCH_STREAM: (action?: any) => void;
  FETCH_STREAMS: (action?: any) => void;
  EDIT_STREAM: (action?: any) => void;
  DELETE_STREAM: (action?: any) => void;
}
