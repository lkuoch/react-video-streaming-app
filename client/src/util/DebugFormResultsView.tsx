import DebugStore, { IDebugProps, IDebugState } from "../redux/DebugStore";
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
const mapStateToProps = ({ debug_store }: { debug_store: IDebugState }) => {
  return {
    hasPermission: debug_store.hasPermission,
    debugEnabled: debug_store.debugEnabled
  };
};

//# Map store dispatch to component props
const mapDispatchToProps = (dispatch: Function) => {
  return {
    DEBUG_OFF: (payload: any) =>
      dispatch(DebugStore.actions.DEBUG_OFF(payload)),
    DEBUG_ON: (payload: any) => dispatch(DebugStore.actions.DEBUG_ON(payload)),
    SET_PERMISSION: (payload: any) =>
      dispatch(DebugStore.actions.SET_PERMISSION(payload))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DebugFormResultsView);
