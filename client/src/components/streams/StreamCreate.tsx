import { Field, Form } from "react-final-form";

import DebugFormResultsView from "../../util/DebugFormResultsView";
import React, { useState, useEffect } from "react";
import RenderCounter from "../../util/RenderCounter";

import { store } from "../../index";

interface IProps {
  title?: string;
  description?: string;
}

//# Simulate processing - sleep for the desired amount of time
const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

//# Callback when submitting form
const onSubmit = async (values: IProps) => {
  await sleep(300);
  console.log("form submitted");
};

interface IError {
  short: string;
  long?: string;
}

//# Validators
const mandatoryField = (value: any) => {
  if (value) return undefined;

  return {
    short: "Mandatory field validation failed",
    long: "This is a mandatory field"
  } as IError;
};

const numericField = (value: any) => {
  if (isNaN(value)) {
    return {
      short: "Numeric field validation failed",
      long: "This is a numeric field"
    };
  }

  return undefined;
};

const nCharsLongField = (input: number) => (value: any) => {
  if (value.toString().length < input) {
    return {
      short: "Character limit field failed",
      long: `Value should be greater than ${input} characters long`
    };
  }

  return undefined;
};

const minNumValueField = (input: number) => (value: any) => {
  if (isNaN(value) || value < input) {
    return {
      short: "Number error",
      long: `Entered number ${value} should be greater than ${input}.`
    };
  }

  return undefined;
};

const composeValidators = (...validators: any) => (value: any) =>
  validators.reduce(
    (error: any, validator: any) => error || validator(value),
    undefined
  );

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

const fieldSubscriptions = () => {
  return {
    value: true,
    active: true,
    error: true,
    touched: true
  };
};

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

const renderField = ({ input, label, type, id, meta }: any) => {
  const className = `field ${meta.error && meta.touched ? "error" : ""}`;

  //* Debug states
  const [debugOn, setDebugOn] = useState(false);
  const [debugEvent, setDebugEvent] = useState({});

  //* Poll for global store setting the debugEnabled flag
  useEffect(() => {
    setDebugOn(store.getState().debug_unit.debugEnabled);
  }, [store.getState().debug_unit.debugEnabled]);

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

const StreamCreate = () => {
  return (
    <div className="CreateStreamForm">
      <Form
        onSubmit={onSubmit}
        subscription={{ submitting: true, pristine: true }}
        render={({ handleSubmit, reset, submitting, pristine, values }) => (
          <form onSubmit={handleSubmit} className="ui error form">
            <Field
              name="title"
              label="Enter Title"
              type="text"
              id="1"
              validate={composeValidators(mandatoryField, nCharsLongField(5))}
              component={renderField}
            />
            <Field
              name="description"
              label="Enter Description"
              type="text"
              id="2"
              validate={composeValidators(mandatoryField, nCharsLongField(10))}
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

export default StreamCreate;
