import React, { Component } from "react";
import "../App.css";

export class Details extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      description: "",
      tags: ""
    };
  }

  getDetails = () => {
    let data = JSON.parse(localStorage.getItem("loggedInUser"));
    console.log(data);
    this.setState({ username: data.username, password: data.password }, () => {
      console.log("Logged In User : ", this.state);
    });
  };

  componentDidMount() {
    this.getDetails();
  }

  change = e => {
    this.setState({ [e.target.name]: e.target.value });
    console.log(this.state);
  };

  imageUpload = e => {
    const file = e.target.files[0];
    getBase64(file).then(base64 => {
      localStorage["fileBase64"] = base64;
      console.debug("file stored", base64);
    });
  };

  onSubmit = e => {
    localStorage.setItem("cardDetails", JSON.stringify(this.state));
  };

  render() {
    return (
      <div>
        <h1>
          <em>
            Welcome to your page, Please enter your details,{" "}
            {this.state.username}
          </em>
        </h1>
        <form action="/card" className="forms">
          <label>Username : </label>
          {this.state.username}
          <br />
          <br />
          <label>Description </label>
          <input
            name="description"
            type="text"
            value={this.state.description}
            onChange={e => this.change(e)}
          ></input>
          <br />
          <br />
          <label>
            Select Tags &nbsp;&nbsp;
            <select
              name="tags"
              value={this.state.tags}
              onChange={e => this.change(e)}
            >
              <option value="sun">Sun</option>
              <option value="picoftheday">PicOfTheDay</option>
              <option value="summer">Summer</option>
              <option value="newyear2k20">New Year 2020</option>
              <option value="winter">Winter</option>
              <option value="codingmart">Codingmart</option>
              <option value="fall">Fall</option>
            </select>
          </label>
          <br />
          <br />
          <label>Upload Image &nbsp;&nbsp;</label>
          <input
            type="file"
            name="image"
            onChange={e => this.imageUpload(e)}
          ></input>
          <br />
          <br />
          <button onClick={e => this.onSubmit(e)}>Submit</button>
        </form>
      </div>
    );
  }
}

const getBase64 = file => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
    reader.readAsDataURL(file);
  });
};

export default Details;
