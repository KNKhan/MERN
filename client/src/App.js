import React, { useState } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./App.css";
import Login from "./Login/Login";
import Dashboard from "./Dashboard/Dashboard";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      token: false,
      userJWT: ""
    };
  }

  tokenSet = token => {
    if(token !== undefined) {
      this.setState({ userJWT: token, token: !this.state.token });
    }   
  };

  render() {
    return (
      <div>
        {!this.state.token ? (
          <Login tokenSet={this.tokenSet} />
        ) : (
          <BrowserRouter>
            <Switch>
              <Route path="/">
                <Dashboard />
              </Route>
            </Switch>
          </BrowserRouter>
        )}
      </div>
    );
  }
}

export default App;
