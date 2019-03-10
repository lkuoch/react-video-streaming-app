import React, { useEffect } from "react";
import { connect } from "react-redux";
import { RouteComponentProps } from "react-router-dom";
import _ from "lodash";
import {
  FETCH_STREAM,
  EDIT_STREAM,
  IStreamApiProps,
  IStreamApiState
} from "../../redux/StreamApiStore";
import StreamForm, { IFormValues } from "./StreamForm";

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

  const onSubmit = (formValues: IFormValues) => {
    let payload = {
      id: (props.match.params as any).id,
      formValues
    };
    props.EDIT_STREAM(payload);
  };

  //* Render content
  const render = () => {
    if (!props.stream) {
      return <div>...Loading</div>;
    }

    return (
      <div>
        <h3>Edit a Stream</h3>
        <StreamForm
          initialValues={_.pick(props.stream, "title", "description")}
          onSubmit={onSubmit}
        />
      </div>
    );
  };

  return <>{render()}</>;
}

function mapStateToProps(state: any, ownProps: any): IStreamEditState {
  return {
    stream: state.stream_api_store[ownProps.match.params.id]
  };
}

function mapDispatchToProps(dispatch: Function) {
  return {
    FETCH_STREAM: (payload: number) => dispatch(FETCH_STREAM(payload)),
    EDIT_STREAM: (payload: any) => dispatch(EDIT_STREAM(payload))
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StreamEdit);
