import React, { Component } from "react";
import { Field, reduxForm, InjectedFormProps } from "redux-form";
import { compose } from "redux";

interface IProps {
  title?: string;
  description?: string;
}

class StreamCreate extends Component<IProps & InjectedFormProps, any> {
  renderField({ input, label, type, meta: { touched, error } }: any) {
    // Render form field
    return (
      <div className="field">
        <label>{label}</label>
        <div className="ui fluid input">
          <input {...input} placeholder={label} type={type} />
        </div>
      </div>
    );
  }

  onSubmit(formValues: IProps) {
    console.log(formValues);
  }

  render() {
    const { submitting, handleSubmit, pristine } = this.props;

    return (
      <form onSubmit={handleSubmit(this.onSubmit)} className="ui form">
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

export default reduxForm<any, any>({
  form: "streamCreate"
})(StreamCreate);
