import React from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Login from "./Components/Login";
import Signup from "./Components/Signup";

class App extends React.Component {
  state = {
    fields: {},
    users: []
  };

  onSubmit = fields => {
    this.setState({ fields });
    let users = this.state.users;
    this.setState({ users: [...users, fields] });
    console.log("App component got : ", fields);
    console.log("Users : ", users);
    this.saveToLocal(users);
  };

  saveToLocal = users => {
    localStorage.setItem("users", JSON.stringify(users));
  };

  render() {
    return (
      <Router>
        <div className="App">
          <Switch>
            <Route
              path="/"
              exact
              component={() => (
                <Signup onSubmit={fields => this.onSubmit(fields)} />
              )}
            />
            <Route
              path="/login"
              component={() => <Login />}
            />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
