import React, { Component } from "react";
import { Field, reduxForm, InjectedFormProps } from "redux-form";

interface IProps extends InjectedFormProps {}

class StreamCreate extends Component<any> {
  renderInput(formProps: any) {
    return <input {...formProps.input.value} />;
  }

  render() {
    return (
      <form>
        <label>Title </label>
        <Field name="title" component={this.renderInput} />
        <br />
        <br />
        <label>Description </label>
        <Field name="description" component={this.renderInput} />
      </form>
    );
  }
}

export default reduxForm<any, any>({
  form: "StreamCreate"
})(StreamCreate);
