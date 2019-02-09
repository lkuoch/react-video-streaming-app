import DebugUnit, { IDebugProps, IDebugState } from "../redux/DebugUnit";
import React, { Component } from "react";

import { connect } from "react-redux";
import styled from "styled-components";

// Styles
const size = 30;
const Circle = styled.i`
  position: absolute;
  top: 0;
  right: 0;
  font-style: normal;
  text-align: center;
  height: ${size}px;
  width: ${size}px;
  line-height: ${size}px;
  border-radius: ${size / 2}px;
  border: 1px solid #ddd;
  background: #eee;
`;

class RenderCounter extends Component<IDebugProps, any> {
  renders = 0;

  render() {
    return this.props.debugEnabled ? (
      <Circle>{(this.renders += 1)}</Circle>
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
)(RenderCounter);
