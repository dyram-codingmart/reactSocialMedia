import React, { Component } from "react";
import "../App.css";
import { upload } from "../actions";
import { connect } from "react-redux";
export class Card extends Component {
  constructor(props) {
    super(props);

    this.store = this.props.store;

    this.state = {
      username: "",
      password: "",
      description: "",
      tags: "",
      postDesc: "",
      postTags: "",
      image: "",
      posts: []
    };
  }

  getDetails = () => {
    let data = JSON.parse(localStorage.getItem("cardDetails"));
    console.log(data);
    this.setState({
      username: data.username,
      password: data.password,
      description: data.description,
      tags: data.tags
    });
  };

  componentDidMount() {
    this.getDetails();
    this.props.upload("ok");
  }

  change = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    let post = {
      postDesc: this.state.postDesc,
      postTags: this.state.postTags,
      img: this.props.image
    };
    this.setState(
      { posts: [...this.state.posts, post] },
      this.setState({ postDesc: "", postTags: "", image: "" })
    );
  };

  toggleModal = e => {
    let modal = this.modalElement;
    if (modal.style.display === "none") modal.style.display = "block";
    else modal.style.display = "none";
  };

  goTimeline = e => {
    localStorage.setItem("cardPosts", JSON.stringify(this.state));
    this.timeline.click();
  };

  imageUpload = e => {
    const file = e.target.files[0];
    getBase64(file).then(base64 => {
      this.props.upload(base64);
    });
  };

  delPost = (e, index) => {
    let postz = this.state.posts;
    postz.splice(index, 1);
    this.setState({ posts: postz });
  };

  render() {
    return (
      <div>
        <div className="cardHeader">
          <h1>Welcome, {this.state.username}</h1>
          <form action="/timeline">
            <button
              className="redirectButton"
              onClick={e => this.goTimeline(e)}
              ref={timeline => (this.timeline = timeline)}
            >
              Timeline
            </button>
          </form>
        </div>

        <div className="display">
          <button className="linkButton" onClick={e => this.toggleModal(e)}>
            Add Post
          </button>

          <img
            alt=""
            id="proPic"
            src={localStorage.getItem("fileBase64")}
          ></img>
        </div>

        <div
          ref={modal => (this.modalElement = modal)}
          className="modal"
          id="postModal"
          style={{ display: "none" }}
        >
          <div className="popup">
            <h2>New Post</h2>
            <button
              id="closeButton"
              onClick={e => this.toggleModal(e)}
              className="close"
            >
              &times;
            </button>
            <div className="content">
              <input
                type="text"
                placeholder="Post description"
                className="inputs"
                name="postDesc"
                value={this.state.postDesc}
                onChange={e => this.change(e)}
              ></input>
              <br />
              <br />
              <input
                type="text"
                placeholder="Enter Tags"
                className="inputs"
                id="modalTags"
                name="postTags"
                value={this.state.postTags}
                onChange={e => this.change(e)}
              ></input>
              <br />
              <br />
              <label style={{ color: "black" }}>
                Upload Image ---> &nbsp;&nbsp;
              </label>
              <input
                style={{ width: "60%" }}
                type="file"
                name="image"
                onChange={e => this.imageUpload(e)}
              ></input>
              <br />
              <br />
              <button onClick={e => this.onSubmit()} id="modalPostButton">
                Post
              </button>
            </div>
          </div>
        </div>

        <div className="posts">
          {this.state.posts.map((postz, index) => (
            <div className="postsDiv">
              <img alt="yoyoyoyoyoyo" src={postz.img}></img>
              <h1>{postz.postDesc}</h1>
              <pre>{postz.postTags}</pre>
              <button
                onClick={e => this.delPost(e, index)}
                className="postsDelIcon"
              >
                &times;
              </button>
            </div>
          ))}
        </div>
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

const mapStateToProps = state => {
  return {
    image: state.image
  };
};

export default connect(mapStateToProps, { upload })(Card);
