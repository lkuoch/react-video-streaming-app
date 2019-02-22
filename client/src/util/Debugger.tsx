import DebugModule, { IDebugProps, IDebugState } from "../redux/DebugModule";

import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

//# Debug text
const debugMeta = {
  title: "Debug 🐞"
};

//# Render debug button
const DebugButton = (props: IDebugProps) => {
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
};

//# Map store state to component props
const mapStateToProps = ({ debug_module }: { debug_module: IDebugState }) => {
  return {
    hasPermission: debug_module.hasPermission,
    debugEnabled: debug_module.debugEnabled
  };
};

//# Map store dispatch to component props
const mapDispatchToProps = (dispatch: any) => {
  return {
    DEBUG_OFF: (payload: any) =>
      dispatch(DebugModule.actions.DEBUG_OFF(payload)),
    DEBUG_ON: (payload: any) => dispatch(DebugModule.actions.DEBUG_ON(payload)),
    SET_PERMISSION: (payload: any) =>
      dispatch(DebugModule.actions.SET_PERMISSION(payload))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DebugButton);
