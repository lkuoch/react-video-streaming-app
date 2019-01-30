import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";

//* Global style sheet to use
import "semantic-ui-css/semantic.min.css";

import StreamCreate from "./streams/StreamCreate";
import StreamDelete from "./streams/StreamDelete";
import StreamEdit from "./streams/StreamEdit";
import StreamList from "./streams/StreamList";
import StreamShow from "./streams/StreamShow";
import Header from "./Header";

class App extends Component {
  render() {
    return (
      <div className="ui container">
        <BrowserRouter>
          <React.Fragment>
            <Header />
            <Route path="/" exact component={StreamList} />
            <Route path="/streams/new" exact component={StreamCreate} />
            <Route path="/streams/edit" exact component={StreamEdit} />
            <Route path="/streams/delete" exact component={StreamDelete} />
            <Route path="/streams/show" exact component={StreamShow} />
          </React.Fragment>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
