import React, { Component } from "react";
import { connect } from "react-redux";

import AuthSlice from "../redux/AuthSlice";

import Config from "../../configs/Config";

class GoogleAuth extends Component<any, any> {
  //* Class props
  auth: gapi.auth2.GoogleAuth | null = null;

  componentDidMount() {
    gapi.load("client:auth2", () => {
      gapi.auth2
        .init({
          client_id: Config.GoogleAuthClientId,
          scope: "email"
        })
        .then(() => {
          this.auth = gapi.auth2.getAuthInstance();
          this.onAuthChanged(this.auth.isSignedIn.get());
          this.auth.isSignedIn.listen(this.onAuthChanged);
        });
    });
  }

  renderAuthButton() {
    //* Still initialising - display nothing
    if (this.props.isSignedIn === null) {
    } else if (this.props.isSignedIn) {
      return (
        <button
          className="ui red google basic button"
          onClick={this.onSignOutClick}
        >
          <i className="google icon" />
          <span>Sign Out</span>
        </button>
      );
    } else {
      return (
        <button
          className="ui blue google basic button"
          onClick={this.onSignInClick}
        >
          <i className="google icon" />
          <span>Sign In with Google</span>
        </button>
      );
    }
  }

  onAuthChanged = (isSignedIn: boolean) => {
    isSignedIn
      ? this.props.signIn(this.auth!.currentUser.get().getId())
      : this.props.signOut();
  };

  onSignInClick = () => {
    this.auth!.signIn();
  };

  onSignOutClick = () => {
    this.auth!.signOut();
  };

  render() {
    return <div>{this.renderAuthButton()}</div>;
  }
}

const mapStateToProps = (state: any) => {
  console.log(state);
  return {
    isSignedIn: state.Auth.isSignedIn,
    userId: state.Auth.userId
  };
};

export default connect(
  mapStateToProps,
  AuthSlice.actions
)(GoogleAuth);
