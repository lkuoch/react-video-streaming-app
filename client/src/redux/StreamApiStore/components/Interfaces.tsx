//# Public Interfaces for other components

export interface IStreamApiState {
  title: string;
  description: string;
  userId?: string;
  id: number;
}

export interface IStreamApiProps {
  CREATE_STREAM: (payload?: any) => void;
  FETCH_STREAM: (payload?: any) => void;
  FETCH_STREAMS: (payload?: any) => void;
  EDIT_STREAM: (payload?: any) => void;
  DELETE_STREAM: (payload?: any) => void;
}
