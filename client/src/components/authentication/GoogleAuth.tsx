import React, { Component } from "react";
import { connect } from "react-redux";

import AuthSlice, { IAuthProps, IAuthState } from "../../redux/AuthSlice";
import Config from "../../configs/Config";

//# Prop interface for this component
interface IGoogleAuthProps extends IAuthProps {}

class GoogleAuth extends Component<IGoogleAuthProps, {}> {
  componentDidMount() {
    gapi.load("client:auth2", () => {
      gapi.auth2
        .init({
          client_id: Config.GoogleAuthClientId,
          scope: "email"
        })
        .then(() => {
          this.props.LoadGAPIAuthClient(gapi.auth2.getAuthInstance());
          this.onAuthChanged(this.props.gAPIAuthClient!.isSignedIn.get());
          this.props.gAPIAuthClient!.isSignedIn.listen(this.onAuthChanged);
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
    isSignedIn ? this.props.SignIn() : this.props.SignOut();
  };

  onSignInClick = () => {
    this.props.gAPIAuthClient!.signIn();
  };

  onSignOutClick = () => {
    this.props.gAPIAuthClient!.signOut();
  };

  render() {
    return <div>{this.renderAuthButton()}</div>;
  }
}

const mapStateToProps = ({ AuthSlice }: { AuthSlice: IAuthState }) => {
  return {
    isSignedIn: AuthSlice.isSignedIn,
    userId: AuthSlice.userId,
    gAPIAuthClient: AuthSlice.gAPIAuthClient
  };
};

export default connect(
  mapStateToProps,
  AuthSlice.actions
)(GoogleAuth);
