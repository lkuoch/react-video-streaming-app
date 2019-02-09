import Debugger from "../../util/Debugger";
import GoogleAuth from "../authentication/GoogleAuth";
import { Link } from "react-router-dom";
import React from "react";

const Header = () => {
  return (
    <div className="ui secondary pointing menu">
      <Debugger />
      <Link to="/" className="item">
        Streamer
      </Link>
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
