import { Field, Form } from "react-final-form";

import DebugFormResultsView from "../../util/DebugFormResultsView";
import StreamApiModule, {
  IStreamApiProps,
  IStreamApiState
} from "../../redux/StreamApiModule";
import React, { useState, useEffect } from "react";
import RenderCounter from "../../util/RenderCounter";

import { GeneralValidators as GV } from "../form_validators/GeneralValidators";

import { connect } from "react-redux";

import { store } from "../../index";

//# Form values expected on submit
interface IFormValues {
  title?: string;
  description?: string;
}

//# Props available to component
interface IProps extends IStreamApiProps {}

//# Error values expected
interface IError {
  short: string;
  long?: string;
}

//# Simulate processing - sleep for the desired amount of time in ms
const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

//# Callback when submitting form
const onSubmit = (formValues: IFormValues, props: IProps) => {
  sleep(300);
  console.log(formValues, props, "form submitted");

  // Submit
  props.CREATE_STREAM(formValues);
};

//# Combine validators
const composeValidators = (...validators: any) => (value: any) =>
  validators.reduce(
    (error: any, validator: any) => error || validator(value),
    undefined
  );

//# Msmoize utility function
const simpleMemoize = (fn: Function) => {
  let lastArg: any, lastResult: any;
  return (arg: any) => {
    if (arg !== lastArg) {
      lastArg = arg;
      lastResult = fn(arg);
    }

    return lastResult;
  };
};

//# Renders form field error
const renderError = ({ error, touched }: { error: IError; touched: any }) => {
  return (
    error &&
    touched && (
      <div className="ui error message">
        <div className="header">{error.short}</div>
        <p>{error.long}</p>
      </div>
    )
  );
};

//# Renders form field
const renderField = ({ input, label, type, id, meta }: any) => {
  const className = `field ${meta.error && meta.touched ? "error" : ""}`;

  //* Debug states
  const [debugOn, setDebugOn] = useState(false);
  const [debugEvent, setDebugEvent] = useState({});

  //* Poll for global store setting the debugEnabled flag
  useEffect(() => {
    setDebugOn(store.getState().debug_module.debugEnabled);
  }, [store.getState().debug_module.debugEnabled]);

  //* Conditionally insert debug counter if applicable
  let renderDebugCounter = debugOn ? (
    <RenderCounter inputDebugEvent={debugEvent} />
  ) : null;

  return (
    <div className={className} key={id}>
      <label>{label}</label>
      <div className="ui fluid input" onChange={e => setDebugEvent(e)}>
        <input {...input} placeholder={label} type={type} />
        {renderDebugCounter}
      </div>
      {renderError(meta)}
    </div>
  );
};

//# Renders form
const StreamCreate = (props: IProps) => {
  return (
    <div className="CreateStreamForm">
      <Form
        subscription={{ submitting: true, pristine: true }}
        onSubmit={val => onSubmit(val, props)}
        render={({ handleSubmit, reset, submitting, pristine, values }) => (
          <form className="ui error form" onSubmit={handleSubmit}>
            <Field
              name="title"
              label="Enter Title"
              type="text"
              id="1"
              validate={composeValidators(
                GV.mandatoryField,
                GV.nCharsLongField(5)
              )}
              component={renderField}
            />
            <Field
              name="description"
              label="Enter Description"
              type="text"
              id="2"
              validate={composeValidators(
                GV.mandatoryField,
                GV.nCharsLongField(10)
              )}
              component={renderField}
            />

            <div className="ui">
              <button
                type="submit"
                disabled={pristine || submitting}
                className="ui button submit yellow"
              >
                Submit
              </button>

              <DebugFormResultsView />
            </div>
          </form>
        )}
      />
    </div>
  );
};

//# Map store state to component props
const mapStateToProps = null;

//# Map store dispatch to component props
const mapDispatchToProps = (dispatch: any) => {
  return {
    CREATE_STREAM: (payload: any) =>
      dispatch(StreamApiModule.actions.CREATE_STREAM(payload))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StreamCreate);
