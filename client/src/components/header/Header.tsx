import Debugger from "../../util/Debugger";
import GoogleAuth from "../authentication/GoogleAuth";
import { Link } from "react-router-dom";
import React from "react";

function Header() {
  const showDebug = () => {
    //! TODO: Hookup debug state and only show debug if user has permission
    return <Debugger />;
  };

  return (
    <div className="ui secondary pointing menu">
      {showDebug()}
      <div className="ui labeled button">
        <Link to="/" className="ui teal button">
          Streams
        </Link>
      </div>
      <div className="ui labeled button">
        <Link to="/streams/new" className="ui primary button">
          Create Stream
        </Link>
      </div>
      <div className="right menu">
        <Link to="/" className="item">
          All Streams
        </Link>
      </div>
      <GoogleAuth />
    </div>
  );
}

export default Header;
