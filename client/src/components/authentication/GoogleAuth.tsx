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
          this.props.LoadGAPIAuthInstance(gapi.auth2.getAuthInstance());
          this.onAuthChanged(this.props.gAPIAuthInstace!.isSignedIn.get());
          this.props.gAPIAuthInstace!.isSignedIn.listen(this.onAuthChanged);
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
    this.props.gAPIAuthInstace!.signIn();
  };

  onSignOutClick = () => {
    this.props.gAPIAuthInstace!.signOut();
  };

  render() {
    return <div>{this.renderAuthButton()}</div>;
  }
}

const mapStateToProps = ({ AuthSlice }: { AuthSlice: IAuthState }) => {
  return {
    isSignedIn: AuthSlice.isSignedIn,
    userId: AuthSlice.userId,
    gAPIAuthInstace: AuthSlice.gAPIAuthInstace
  };
};

export default connect(
  mapStateToProps,
  //# Can use object destructuring below or `AuthSlice.actions` instead
  {
    SignIn: AuthSlice.actions.SignIn,
    SignOut: AuthSlice.actions.SignOut,
    LoadGAPIAuthInstance: AuthSlice.actions.LoadGAPIAuthInstance
  }
)(GoogleAuth);
