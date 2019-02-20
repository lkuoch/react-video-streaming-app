import DebugModule, { IDebugProps, IDebugState } from "../redux/DebugModule";
import React, { useState, Component, useEffect } from "react";

import { connect } from "react-redux";
import styled from "styled-components";

//* Styles
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

//# Prop interface for this component
interface IProps extends IDebugProps {
  //* From StreamCreate
  inputDebugEvent: Object;
}

const RenderCounter = (props: IProps) => {
  //* Local render count
  const [renders, setRenders] = useState(0);

  //* Increment the renders whenever a `inputDebugEvent` changes
  useEffect(() => {
    setRenders(renders + 1);
  }, [props.inputDebugEvent]);

  return props.debugEnabled ? <Circle>{renders}</Circle> : null;
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
)(RenderCounter);
