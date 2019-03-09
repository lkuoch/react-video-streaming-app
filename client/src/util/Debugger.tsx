import DebugStore, { IDebugProps, IDebugState } from "../redux/DebugStore";

import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

//# Debug text
const debugMeta = {
  title: "Debug 🐞"
};

//# Render debug button
function DebugButton(props: IDebugProps) {
  //* Track locally whether or not the debug is on or off
  const [debugEnabled, setDebugEnabled] = useState(false);

  //* Whenever the local state is changed we will sync it with the global redux state
  useEffect(() => {
    debugEnabled ? props.DEBUG_ON() : props.DEBUG_OFF();
  }, [debugEnabled]);

  return (
    <button
      className={"ui toggle button " + (debugEnabled ? "active" : "")}
      onClick={() => setDebugEnabled(!debugEnabled)}
    >
      {debugMeta.title}
    </button>
  );
}

//# Map store state to component props
function mapStateToProps({ debug_store }: { debug_store: IDebugState }) {
  return {
    hasPermission: debug_store.hasPermission,
    debugEnabled: debug_store.debugEnabled
  };
}

//# Map store dispatch to component props
function mapDispatchToProps(dispatch: Function) {
  return {
    DEBUG_OFF: (payload: any) =>
      dispatch(DebugStore.actions.DEBUG_OFF(payload)),
    DEBUG_ON: (payload: any) => dispatch(DebugStore.actions.DEBUG_ON(payload)),
    SET_PERMISSION: (payload: any) =>
      dispatch(DebugStore.actions.SET_PERMISSION(payload))
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DebugButton);
