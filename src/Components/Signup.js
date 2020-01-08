import React from "react";
import "../App.css";

class Signup extends React.Component {
  state = {
    username: "",
    password: ""
  };

  change = e => {
    this.setState({ [e.target.name]: e.target.value });
    console.log(this.state);
  };

  onSubmit = e => {
    e.preventDefault();
    this.props.onSubmit(this.state);
    this.setState({
      username: "",
      password: ""
    });
  };

  render() {
    return (
      <div className="forms">
        <h1>
          <em>Sign-up Page</em>
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
            type="password"
            name="password"
            value={this.state.password}
            onChange={e => this.change(e)}
          />
          <br />
          <br />
          <button onClick={e => this.onSubmit(e)}>Signup</button>
        </form>
        <br />
        <br />
        <form id="loginForm" action="/login">
          <button type="submit">Login</button>
        </form>
      </div>
    );
  }
}

export default Signup;
