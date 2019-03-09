import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import {
  CREATE_STREAM,
  IStreamApiProps,
  IStreamApiState
} from "../../redux/StreamApiStore";
import StreamForm from "./StreamForm";

//# Form values expected on submit
interface IFormValues {
  title?: string;
  description?: string;
}

//# Props available to component
interface IProps extends IStreamApiProps, IStreamApiState {}

//# Renders form
function StreamCreate(props: IProps) {
  //* Callback when submitting form
  const onSubmit = (formValues: IFormValues) => {
    props.CREATE_STREAM(formValues);
  };

  //* Render
  const render = () => {
    return (
      <div>
        <h3>Create a Stream</h3>
        <StreamForm onSubmit={onSubmit} />
      </div>
    );
  };

  return <>{render()}</>;
}

//# Map store dispatch to component props
function mapDispatchToProps(dispatch: Function) {
  return {
    CREATE_STREAM: (payload: any) => dispatch(CREATE_STREAM(payload))
  };
}

export default connect(
  null,
  mapDispatchToProps
)(StreamCreate);
