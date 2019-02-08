import {
  Field,
  FormErrors,
  InjectedFormProps,
  WrappedFieldMetaProps,
  reduxForm
} from "redux-form";
import React, { Component } from "react";

interface IProps {
  title?: string;
  description?: string;
}

class StreamCreate extends Component<IProps & InjectedFormProps, any> {
  renderError({ error, touched }: WrappedFieldMetaProps) {
    if (touched && error) {
      return (
        <div className="ui error message">
          <div className="header">{error[0]}</div>
          <p>{error[1]}</p>
        </div>
      );
    } else {
      return null;
    }
  }

  renderField = ({ input, label, type, meta }: any) => {
    console.log(meta);

    const className = `field ${meta.error && meta.touched ? "error" : ""}`;
    return (
      <div className={className}>
        <label>{label}</label>
        <div className="ui fluid input">
          <input {...input} placeholder={label} type={type} />
        </div>
        {this.renderError(meta)}
      </div>
    );
  };

  onSubmit(formValues: IProps) {
    console.log(formValues);
  }

  render() {
    const { submitting, handleSubmit, pristine } = this.props;

    return (
      <form onSubmit={handleSubmit(this.onSubmit)} className="ui error form">
        <div className="ui segment">
          <Field
            name="title"
            type="text"
            component={this.renderField}
            label="Enter Title"
          />
          <Field
            name="description"
            type="text"
            component={this.renderField}
            label="Enter Description"
          />
        </div>

        <div className="ui">
          <button
            type="submit"
            disabled={pristine || submitting}
            className="ui button submit yellow"
          >
            Submit
          </button>
        </div>
      </form>
    );
  }
}

interface IFormErrors {
  title?: string[];
}

//~ Validate form values
const validate = (formValues: IProps): IFormErrors & FormErrors => {
  if (!formValues.title) {
    return {
      title: ["You must enter a title", "Error description"]
    } as IFormErrors;
  }

  return [];
};

export default reduxForm<any, any>({
  form: "streamCreate",
  validate
})(StreamCreate);
