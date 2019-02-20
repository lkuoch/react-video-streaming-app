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

  //* Whenever, the local state is changed we will sync it with the global redux state
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

const mapStateToProps = ({ debug_module }: { debug_module: IDebugState }) => {
  return {
    hasPermission: debug_module.hasPermission,
    debugEnabled: debug_module.debugEnabled
  };
};

export default connect(
  mapStateToProps,
  DebugModule.actions
)(DebugButton);
