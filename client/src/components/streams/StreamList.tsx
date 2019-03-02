import React, { Component } from "react";
import { connect } from "react-redux";
import StreamApiModule, {
  IStreamApiProps,
  IStreamApiState
} from "../../redux/StreamApiModule";

//# Prop interface for this component
interface IProps extends IStreamApiProps {}

class StreamList extends Component<IProps, {}> {
  componentDidMount() {
    this.props.FETCH_STREAMS();
    console.log(this.props);
  }

  render() {
    return <div>StreamList Works!</div>;
  }
}

const mapStateToProps = ({
  stream_api_module
}: {
  stream_api_module: IStreamApiState;
}) => {
  return {
    streamList: stream_api_module.streamList
  };
};

//# Map store dispatch to component props
const mapDispatchToProps = (dispatch: any) => {
  return {
    FETCH_STREAMS: (payload: any) =>
      dispatch(StreamApiModule.actions.FETCH_STREAMS(payload))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StreamList);
