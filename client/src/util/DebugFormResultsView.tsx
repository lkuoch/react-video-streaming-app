import DebugUnit, { IDebugProps, IDebugState } from "../redux/DebugUnit";
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

const mapStateToProps = ({ debug_unit }: { debug_unit: IDebugState }) => {
  return {
    hasPermission: debug_unit.hasPermission,
    debugEnabled: debug_unit.debugEnabled
  };
};

export default connect(
  mapStateToProps,
  DebugUnit.actions
)(DebugFormResultsView);
