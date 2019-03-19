import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { CREATE_STREAM } from "../../redux/StreamApiStore";
import StreamForm from "./StreamForm";
import { RVSA } from "../../react-app-env";

//! Renders form
function StreamCreate(props: RVSA.Streams.IStreamCreateProps) {
  //* Callback when submitting form
  const onSubmit = (formValues: RVSA.Streams.IStreamCreateFormValues) => {
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
