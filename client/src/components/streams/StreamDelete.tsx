import React, { useEffect } from "react";
import Modal from "../Modal";
import History from "../../browser/History";
import { Link, RouteComponentProps } from "react-router-dom";
import { connect } from "react-redux";
import {
  FETCH_STREAM,
  DELETE_STREAM,
  IStreamApiProps,
  IStreamApiState
} from "../../redux/StreamApiStore";

interface IStreamDeleteState {
  stream: IStreamApiState;
}

interface IProps
  extends IStreamApiProps,
    IStreamDeleteState,
    RouteComponentProps {}

function StreamDelete(props: IProps) {
  const urlID = (props.match.params as any).id;

  //* On mount
  useEffect(() => {
    props.FETCH_STREAM(urlID);
  }, []);

  //* Modal content message
  const renderModalContent = () => {
    //~ Default message
    if (!props.stream) {
      return "Are you sure you want to delete this stream?";
    }

    return `Are you sure you want to delete "${props.stream.title}"`;
  };

  //* Props passed to `Modal` component
  const modalContent = {
    header: "Delete Stream",
    content: renderModalContent(),
    actions: (
      <>
        <button
          onClick={() => props.DELETE_STREAM(urlID)}
          className="ui button inverted red"
        >
          Delete
        </button>
        <Link to="/" className="ui button standard">
          Cancel
        </Link>
      </>
    )
  };

  return (
    <Modal modalContent={modalContent} onDismiss={() => History.push("/")} />
  );
}

function mapStateToProps(state: any, ownProps: any) {
  return {
    stream: state.stream_api_store[ownProps.match.params.id]
  };
}

function mapDispatchToProps(dispatch: Function) {
  return {
    FETCH_STREAM: (payload: number) => dispatch(FETCH_STREAM(payload)),
    DELETE_STREAM: (payload: number) => dispatch(DELETE_STREAM(payload))
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StreamDelete);
