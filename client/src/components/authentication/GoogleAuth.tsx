import AuthModule, { IAuthProps, IAuthState } from "../../redux/AuthModule";
import React, { Component } from "react";

import Config from "../../configs/Config";
import { connect } from "react-redux";

//# Prop interface for this component
interface IProps extends IAuthProps {}

class GoogleAuth extends Component<IProps, {}> {
  componentDidMount() {
    gapi.load("client:auth2", () => {
      gapi.auth2
        .init({
          client_id: Config.GoogleAuthClientId,
          scope: "email"
        })
        .then(() => {
          this.props.INIT_GAPI_INSTANCE(gapi.auth2.getAuthInstance());
          this.onAuthChanged(this.props.gAPIAuthInstance!.isSignedIn.get());
          this.props.gAPIAuthInstance!.isSignedIn.listen(this.onAuthChanged);
        });
    });
  }

  renderAuthButton() {
    //* Still initialising - display nothing
    if (this.props.isSignedIn === null) {
      return null;
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
    isSignedIn ? this.props.SIGN_IN() : this.props.SIGN_OUT();
  };

  onSignInClick = () => {
    this.props.gAPIAuthInstance!.signIn();
  };

  onSignOutClick = () => {
    this.props.gAPIAuthInstance!.signOut();
  };

  render() {
    return <div>{this.renderAuthButton()}</div>;
  }
}

const mapStateToProps = ({ auth_module }: { auth_module: IAuthState }) => {
  return {
    isSignedIn: auth_module.isSignedIn,
    userId: auth_module.userId,
    gAPIAuthInstance: auth_module.gAPIAuthInstance
  };
};

export default connect(
  mapStateToProps,
  //# Can use object destructuring below or `AuthModule.actions` instead
  {
    SIGN_IN: AuthModule.actions.SIGN_IN,
    SIGN_OUT: AuthModule.actions.SIGN_OUT,
    INIT_GAPI_INSTANCE: AuthModule.actions.INIT_GAPI_INSTANCE
  }
)(GoogleAuth);
