import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";

//* Global style sheet to use
import "semantic-ui-css/semantic.min.css";

import StreamCreate from "./streams/StreamCreate";
import StreamDelete from "./streams/StreamDelete";
import StreamEdit from "./streams/StreamEdit";
import StreamList from "./streams/StreamList";
import StreamShow from "./streams/StreamShow";
import Header from "./header/Header";

class App extends Component {
  render() {
    return (
      <div className="ui container">
        <BrowserRouter>
          <React.Fragment>
            <Header />
            <Route exact path="/" component={StreamList} />
            <Route
              exact
              path="/streams/new"
              component={() => <StreamCreate />}
            />
            <Route exact path="/streams/edit" component={StreamEdit} />
            <Route exact path="/streams/delete" component={StreamDelete} />
            <Route exact path="/streams/show" component={StreamShow} />
          </React.Fragment>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
