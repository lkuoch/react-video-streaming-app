import DebugModule, { IDebugProps, IDebugState } from "../redux/DebugModule";
import React, { Component } from "react";

import { FormSpy } from "react-final-form";
import { connect } from "react-redux";

//# Results view of the form
const DebugFormResultsView = (props: IDebugProps) => {
  return props.debugEnabled ? (
    <FormSpy subscription={{ values: true }}>
      {({ values }) => <pre>{JSON.stringify(values, undefined, 2)}</pre>}
    </FormSpy>
  ) : null;
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
)(DebugFormResultsView);
