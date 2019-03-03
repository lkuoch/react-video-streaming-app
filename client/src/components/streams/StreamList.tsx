import React, { Component } from "react";
import { connect } from "react-redux";
import { FETCH_STREAMS } from "../../redux/StreamApiModule";

class StreamList extends Component<any, {}> {
  componentDidMount() {
    this.props.FETCH_STREAMS();
  }

  render() {
    return <div>Stream List Works</div>;
  }
}

const mapStateToProps = null;

const mapDispatchToProps = (dispatch: any) => {
  return {
    FETCH_STREAMS: () => dispatch(FETCH_STREAMS())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StreamList);
