import AuthStore from "../../redux/AuthStore";
import React, { Component } from "react";

import Config from "../../configs/Config";
import { connect } from "react-redux";

class GoogleAuth extends Component<RVSA.IGoogleAuthProps, {}> {
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

//# Map store state to component props
const mapStateToProps = ({
  auth_store
}: {
  auth_store: RVSA.IAuthStoreState;
}) => {
  return {
    isSignedIn: auth_store.isSignedIn,
    userId: auth_store.userId,
    gAPIAuthInstance: auth_store.gAPIAuthInstance
  };
};

//# Map store dispatch to component props
const mapDispatchToProps = (dispatch: Function): RVSA.IAuthStoreReducers => {
  return {
    SIGN_IN: () => dispatch(AuthStore.actions.SIGN_IN()),
    SIGN_OUT: () => dispatch(AuthStore.actions.SIGN_OUT()),
    INIT_GAPI_INSTANCE: (payload: any) =>
      dispatch(AuthStore.actions.INIT_GAPI_INSTANCE(payload))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GoogleAuth);
