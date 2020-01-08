import React from "react";
import "../App.css";

class Login extends React.Component {
  state = {
    username: "",
    password: ""
  };

  change = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();
    console.log("State of login ==> ", this.state);
    let userz = JSON.parse(localStorage.getItem("users"));
    console.log(userz);
    let usr = userz.filter(user => {
      return user.username === this.state.username;
    });
    console.log("USR : ", usr);
    if (usr.length > 0 && usr[0].password === this.state.password) {
      console.log("valid");
      localStorage.setItem("loggedInUser", JSON.stringify(this.state));
      this.routeElement.click();
    } else {
      console.log("invalid");
    }
  };

  render() {
    return (
      <div className="forms">
        <h1>
          <em>Login Page</em>
        </h1>
        <br />
        <br />
        <form>
          <label>Username&nbsp;&nbsp;&nbsp;</label>
          <input
            type="text"
            name="username"
            value={this.state.username}
            onChange={e => this.change(e)}
          />
          <br />
          <br />
          <label>Password&nbsp;&nbsp;&nbsp;</label>
          <input
            name="password"
            type="password"
            value={this.state.password}
            onChange={e => this.change(e)}
          />
          <br />
          <br />
          <button onClick={e => this.onSubmit(e)}>Login</button>
        </form>
        <br />
        <br />
        <form action="/">
          <button type="submit">Sign-Up</button>
        </form>
        <form id="hiddenRouteLogin" action="/details">
          <button ref={button => (this.routeElement = button)} type="submit">
            Redirect
          </button>
        </form>
      </div>
    );
  }
}

export default Login;
