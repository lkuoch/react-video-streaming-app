import React, { Component } from "react";
import { connect } from "react-redux";
import { FETCH_STREAMS } from "../../redux/StreamApiModule";

class StreamList extends Component<any, {}> {
  componentDidMount() {
    this.props.FETCH_STREAMS();
  }

  renderList() {
    return this.props.streams.map((stream: any) => {
      return (
        <div className="item" key={stream.id}>
          <i className="large middle aligned icon camera" />
          <div className="content">
            {stream.title}
            <div className="description">{stream.description}</div>
          </div>
        </div>
      );
    });
  }

  render() {
    return (
      <>
        <h2>Streams</h2>
        <div className="ui celled list">{this.renderList()}</div>
      </>
    );
  }
}

const mapStateToProps = (state: any) => {
  return {
    //* Turn stream object into array
    streams: Object.values(state.streams)
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    FETCH_STREAMS: () => dispatch(FETCH_STREAMS())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StreamList);
