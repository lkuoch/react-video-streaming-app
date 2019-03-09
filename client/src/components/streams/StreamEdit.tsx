import React, { useEffect } from "react";
import { connect } from "react-redux";
import { RouteComponentProps } from "react-router-dom";
import {
  FETCH_STREAM,
  IStreamApiProps,
  IStreamApiState
} from "../../redux/StreamApiStore";

interface IStreamEditState {
  stream: IStreamApiState;
}

interface IProps
  extends IStreamEditState,
    IStreamApiProps,
    RouteComponentProps {}

function StreamEdit(props: IProps) {
  //* On mount
  useEffect(() => {
    props.FETCH_STREAM((props.match.params as any).id);
  }, []);

  //* Render content
  const render = () => {
    if (!props.stream) {
      return <div>...Loading</div>;
    }

    return <div>{props.stream.title}</div>;
  };

  return <>{render()}</>;
}

function mapStateToProps(state: any, ownProps: any): IStreamEditState {
  return {
    stream: state.stream_api_store[ownProps.match.params.id]
  };
}

//# Map store dispatch to component props
function mapDispatchToProps(dispatch: Function) {
  return {
    FETCH_STREAM: (payload: number) => dispatch(FETCH_STREAM(payload))
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StreamEdit);
