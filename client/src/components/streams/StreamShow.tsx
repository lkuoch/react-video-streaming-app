import React from "react";
import { connect } from "react-redux";
import { RouteComponentProps } from "react-router-dom";
import flv from "flv.js";
import {
  FETCH_STREAM,
  IStreamApiProps,
  IStreamApiState
} from "../../redux/StreamApiStore";
import FlvJs from "flv.js";

interface IStreamShowState {
  stream: IStreamApiState;
}

interface IProps
  extends IStreamApiProps,
    IStreamApiState,
    IStreamShowState,
    RouteComponentProps {}

interface IStreamShowState {
  stream: IStreamApiState;
}

class StreamShow extends React.Component<IProps, any> {
  //* `this` props
  videoRef: any;
  player: FlvJs.Player | null;

  constructor(props: IProps) {
    super(props);

    this.videoRef = React.createRef();
    this.player = null;
  }

  componentDidMount() {
    const { id } = this.props.match.params as any;
    this.props.FETCH_STREAM(id);
    this.buildPlayer(id);
  }

  componentDidUpdate() {
    const { id } = this.props.match.params as any;
    this.buildPlayer(id);
  }

  componentWillUnmount() {
    this.player!.destroy();
  }

  buildPlayer = (id: any) => {
    if (this.player || !this.props.stream) {
      return;
    }

    //~ Create flash player
    this.player = flv.createPlayer({
      type: "flv",
      url: `http://localhost:8000/live/${id}.flv`
    });
    this.player.attachMediaElement(this.videoRef.current);
    this.player.load();
  };

  renderStream = () => {
    if (!this.props.stream) {
      return <div>Loading...</div>;
    }

    //~ Render stream details
    const { title, description } = this.props.stream;
    return (
      <div>
        <video ref={this.videoRef} style={{ width: "100%" }} controls />
        <h1>{title}</h1>
        <h5>{description}</h5>
      </div>
    );
  };

  render() {
    return <>{this.renderStream()}</>;
  }
}

function mapStateToProps(state: any, ownProps: any) {
  return {
    stream: state.stream_api_store[ownProps.match.params.id]
  };
}

function matchDispatchToProps(dispatch: Function) {
  return {
    FETCH_STREAM: (payload: number) => dispatch(FETCH_STREAM(payload))
  };
}

export default connect(
  mapStateToProps,
  matchDispatchToProps
)(StreamShow);
