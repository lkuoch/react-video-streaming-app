import DebugStore, { IDebugProps, IDebugState } from "../redux/DebugStore";
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

function RenderCounter(props: IProps) {
  //* Local render count
  const [renders, setRenders] = useState(0);

  //* Increment the renders whenever a `inputDebugEvent` changes
  useEffect(() => {
    setRenders(renders + 1);
  }, [props.inputDebugEvent]);

  return props.debugEnabled ? <Circle>{renders}</Circle> : null;
}

//# Map store state to component props
function mapStateToProps({ debug_store }: { debug_store: IDebugState }) {
  return {
    hasPermission: debug_store.hasPermission,
    debugEnabled: debug_store.debugEnabled
  };
}

//# Map store dispatch to component props
function mapDispatchToProps(dispatch: Function) {
  return {
    DEBUG_OFF: (payload: any) =>
      dispatch(DebugStore.actions.DEBUG_OFF(payload)),
    DEBUG_ON: (payload: any) => dispatch(DebugStore.actions.DEBUG_ON(payload)),
    SET_PERMISSION: (payload: any) =>
      dispatch(DebugStore.actions.SET_PERMISSION(payload))
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RenderCounter);
