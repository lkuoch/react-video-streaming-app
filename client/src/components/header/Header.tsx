import Debugger from "../../util/Debugger";
import GoogleAuth from "../authentication/GoogleAuth";
import { Link } from "react-router-dom";
import React from "react";

const Header = () => {
  return (
    <div className="ui secondary pointing menu">
      <Debugger />
      <div className="ui labeled button">
        <Link to="/streams/new" className="ui red button">
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
};

export default Header;
