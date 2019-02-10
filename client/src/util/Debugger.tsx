import DebugUnit, { IDebugProps, IDebugState } from "../redux/DebugUnit";

import React from "react";
import { connect } from "react-redux";

//# Debug text
const debugMeta = {
  title: "Debug 🐞"
};

//* Render debug button
const DebugButton = (props: IDebugProps) => {
  const { debugEnabled } = props;

  return (
    <button
      className={"ui toggle button " + (debugEnabled ? "active" : "")}
      onClick={() => toggleDebugButton(props)}
    >
      {debugMeta.title}
    </button>
  );
};

const toggleDebugButton = (props: IDebugProps) => {
  props.debugEnabled ? props.DEBUG_OFF() : props.DEBUG_ON();
};

const mapStateToProps = ({ debug_unit }: { debug_unit: IDebugState }) => {
  return {
    hasPermission: debug_unit.hasPermission,
    debugEnabled: debug_unit.debugEnabled
  };
};

export default connect(
  mapStateToProps,
  DebugUnit.actions
)(DebugButton);
