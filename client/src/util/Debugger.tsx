import DebugUnit, { IDebugProps, IDebugState } from "../redux/DebugUnit";

import React from "react";
import { connect } from "react-redux";

class Debugger extends React.Component<IDebugProps, any> {
  toggleDebug = () => {
    this.props.debugEnabled ? this.props.DEBUG_OFF() : this.props.DEBUG_ON();
  };

  render() {
    // TODO (Set up permissions)
    return (
      <button
        className={
          "ui toggle button " + (this.props.debugEnabled ? "active" : "")
        }
        onClick={() => this.toggleDebug()}
      >
        Debug 🐞
      </button>
    );
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
)(Debugger);
