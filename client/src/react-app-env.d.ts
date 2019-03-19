/// <reference types="react-scripts" />

//! TODO (REMOVE)
import { IStreamApiProps, IStreamApiState } from "./redux/StreamApiStore";
import { RouteComponentProps } from "react-router";

declare namespace RVSA {
  // #region ===[ AuthStore.tsx ]===
  export interface IAuthStoreState {
    isSignedIn: boolean | null;
    userId: string | null;
    gAPIAuthInstance?: gapi.auth2.GoogleAuth | null;
  }

  export interface IAuthStoreReducers {
    SIGN_IN: () => void;
    SIGN_OUT: () => void;
    INIT_GAPI_INSTANCE: (payload?: gapi.auth2.GoogleAuth) => void;
  }
  // #endregion

  // #region ===[ GoogleAuth.tsx ]===
  export interface IGoogleAuthProps
    extends IAuthStoreReducers,
      IAuthStoreState {}
  // #endregion

  // #region ===[ DebugStore.tsx ]===
  export interface IDebugStoreState {
    hasPermission: boolean;
    debugEnabled: boolean;
  }

  export interface IDebugStoreProps {
    SET_PERMISSION: (payload?: any) => void;
    DEBUG_ON: () => void;
    DEBUG_OFF: () => void;
  }
  // #endregion

  declare namespace Streams {
    interface _BaseStreamsProps extends RouteComponentProps {}

    // #region ===[ StreamCreate.tsx ] ===
    export interface IStreamCreateFormValues {
      title?: string;
      description?: string;
    }

    export interface IStreamCreateProps
      extends IStreamApiProps,
        IStreamApiState,
        _BaseStreamsProps {}
    // #endregion

    // #region ===[ StreamEdit.tsx ] ===
    export interface IStreamEditState {
      stream: IStreamApiState;
    }

    export interface IStreamEditProps
      extends IStreamEditState,
        IStreamApiProps,
        _BaseStreamsProps {}

    // #endregion
  }
}
