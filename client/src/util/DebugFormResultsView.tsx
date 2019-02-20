import DebugModule, { IDebugProps, IDebugState } from "../redux/DebugModule";
import React, { Component } from "react";

import { FormSpy } from "react-final-form";
import { connect } from "react-redux";

class DebugFormResultsView extends Component<IDebugProps, any> {
  render() {
    return this.props.debugEnabled ? (
      <FormSpy subscription={{ values: true }}>
        {({ values }) => <pre>{JSON.stringify(values, undefined, 2)}</pre>}
      </FormSpy>
    ) : null;
  }
}

const mapStateToProps = ({ debug_module }: { debug_module: IDebugState }) => {
  return {
    hasPermission: debug_module.hasPermission,
    debugEnabled: debug_module.debugEnabled
  };
};

export default connect(
  mapStateToProps,
  DebugModule.actions
)(DebugFormResultsView);
