import React, { Component } from "react";
import { connect } from "react-redux";
import { FETCH_STREAMS } from "../../redux/StreamApiModule/Actions";

class StreamList extends Component<any, {}> {
  componentDidMount() {
    this.props.FETCH_STREAMS();
  }

  render() {
    return <div>Stream List Works</div>;
  }
}

export default connect(
  null,
  { FETCH_STREAMS }
)(StreamList);
