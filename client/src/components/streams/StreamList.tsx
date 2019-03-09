import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import {
  FETCH_STREAMS,
  IStreamApiProps,
  IStreamApiState
} from "../../redux/StreamApiStore";

//# Redux store state available
interface IStreamListState {
  streams: IStreamApiState[];
  currentUserId: string;
  isSignedIn: boolean;
}

//# Props available to component
interface IProps extends IStreamListState, IStreamApiProps {}

//# Render stream list
function StreamList(props: IProps) {
  //* On mount
  useEffect(() => {
    props.FETCH_STREAMS();
  }, []);

  //* Render `Delete` and `Edit` buttons
  const renderAdmin = (stream: IStreamApiState) => {
    //~ Only the user who created the stream should be able to see these buttons
    if (stream.userId === props.currentUserId) {
      return (
        <div className="right floated content">
          <button className="ui button basic red">Delete</button>
          <Link
            className="ui button basic teal"
            to={`/streams/edit/${stream.id}`}
          >
            Edit
          </Link>
        </div>
      );
    }

    //~ Default
    return null;
  };

  //* Render Create Stream button
  const renderCreateStream = () => {
    if (props.isSignedIn) {
      return (
        <div style={{ textAlign: "right" }}>
          <Link to="/streams/new" className="ui button primary">
            Create Stream
          </Link>
        </div>
      );
    }

    //~ Default
    return null;
  };

  //* Construct a list of stream items
  const renderList = () => {
    return props.streams.map((stream: IStreamApiState) => {
      return (
        <div className="item" key={stream.id}>
          {renderAdmin(stream)}
          <i className="large middle aligned icon camera" />
          <div className="content">
            {stream.title}
            <div className="description">{stream.description}</div>
          </div>
        </div>
      );
    });
  };

  return (
    <>
      <h2>Streams</h2>
      <div className="ui celled list">{renderList()}</div>
      {renderCreateStream()}
    </>
  );
}

//# Map store state to component props
function mapStateToProps(state: any): IStreamListState {
  return {
    //* Turn stream object into array
    streams: Object.values(state.stream_api_store),
    currentUserId: state.auth_store.userId,
    isSignedIn: state.auth_store.isSignedIn
  };
}

//# Map store dispatch to component props
function mapDispatchToProps(dispatch: Function) {
  return {
    FETCH_STREAMS: () => dispatch(FETCH_STREAMS())
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StreamList);
