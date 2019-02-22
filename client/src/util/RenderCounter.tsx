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
)(RenderCounter);
