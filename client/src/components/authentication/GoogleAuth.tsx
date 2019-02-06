import React, { Component } from "react";
import { connect } from "react-redux";

import AuthUnit, { IAuthProps, IAuthState } from "../../redux/AuthUnit";
import Config from "../../configs/Config";

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

const mapStateToProps = ({ AuthUnit }: { AuthUnit: IAuthState }) => {
  return {
    isSignedIn: AuthUnit.isSignedIn,
    userId: AuthUnit.userId,
    gAPIAuthInstance: AuthUnit.gAPIAuthInstance
  };
};

export default connect(
  mapStateToProps,
  //# Can use object destructuring below or `AuthUnit.actions` instead
  {
    SIGN_IN: AuthUnit.actions.SIGN_IN,
    SIGN_OUT: AuthUnit.actions.SIGN_OUT,
    INIT_GAPI_INSTANCE: AuthUnit.actions.INIT_GAPI_INSTANCE
  }
)(GoogleAuth);
