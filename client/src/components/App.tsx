//* Global style sheet to use

import "semantic-ui-css/semantic.min.css";

import { BrowserRouter, Route } from "react-router-dom";
import React, { Component } from "react";

import Header from "./header/Header";
import StreamCreate from "./streams/StreamCreate";
import StreamDelete from "./streams/StreamDelete";
import StreamEdit from "./streams/StreamEdit";
import StreamList from "./streams/StreamList";
import StreamShow from "./streams/StreamShow";

//! TODO Pass Debug context to everything
const DebugContext = React.createContext(null);

const App = () => {
  return (
    <div className="ui container">
      <BrowserRouter>
        <React.Fragment>
          <Header />
          <Route exact path="/" component={StreamList} />
          <Route exact path="/streams/new" component={StreamCreate} />
          <Route exact path="/streams/edit" component={StreamEdit} />
          <Route exact path="/streams/delete" component={StreamDelete} />
          <Route exact path="/streams/show" component={StreamShow} />
        </React.Fragment>
      </BrowserRouter>
    </div>
  );
};

export default App;
