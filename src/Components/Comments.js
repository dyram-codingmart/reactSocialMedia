import React, { Component } from "react";
import "../App.css";

export class Comments extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      comment: "",
      comments: [],
      like: 0,
      likeText: "Like",
      color: "black"
    };
  }

  componentDidMount = () => {
    this.getDetails();
    window.addEventListener("beforeunload", this.componentCleanup);
  };

  componentWillUnmount = () => {
    this.componentCleanup();
    window.removeEventListener("beforeunload", this.componentCleanup);
  };

  componentCleanup = () => {
    console.log("cleanup state : ", this.state);
  };

  getComlikes = () => {
    let data1 = JSON.parse(localStorage.getItem("comments"));
    this.setState({
      comments: data1.comments,
      like: data1.like,
      color: data1.color,
      likeText: data1.likeText
    });
  };

  getDetails = () => {
    let data = JSON.parse(localStorage.getItem("cardPosts"));
    let data1 = JSON.parse(localStorage.getItem("comments"));
    this.setState({
      username: data.username,
      comments: data1.comments,
      like: data1.like,
      color: data1.color,
      likeText: data1.likeText
    });
    this.getComlikes();
  };

  likePost = e => {
    let like = this.state.like;
    if (like === 0)
      this.setState({ like: 1, likeText: "Unlike", color: "blue" });
    else this.setState({ like: 0, likeText: "Like", color: "black" });
    localStorage.setItem("comments", JSON.stringify(this.state));
  };

  toggleComment = e => {
    let commentBox = this.commentElement;
    if (commentBox.style.display === "none") commentBox.style.display = "block";
    else commentBox.style.display = "none";
  };

  change = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  addComment = async e => {
    let comm = this.state.comments;
    await this.setState(
      { comments: [...comm, this.state.comment] },
      this.props.onSubmit(this.state.comments)
    );
    await this.setState({ comment: "" });
    console.log("lslsls =>>>>", this.state);
    localStorage.setItem("comments", JSON.stringify(this.state));
  };

  delCom = (e, index) => {
    let commz = this.state.comments;
    commz.splice(index, 1);
    this.setState({ comments: commz });
    localStorage.setItem("comments", JSON.stringify(this.state));
  };

  render() {
    return (
      <div>
        <div className="likesCounter">
          <svg viewBox="0 0 22 22" width="17" color={this.state.color}>
            <path
              fill="currentColor"
              d="M1 21h4V9H1v12zm22-11c0-1.1-.9-2-2-2h-6.31l.95-4.57.03-.32c0-.41-.17-.79-.44-1.06L14.17 1 7.59 7.59C7.22 7.95 7 8.45 7 9v10c0 1.1.9 2 2 2h9c.83 0 1.54-.5 1.84-1.22l3.02-7.05c.09-.23.14-.47.14-.73v-2z"
            />
          </svg>
          &nbsp;&nbsp;
          {this.state.like}
        </div>
        <div className="reactBar">
          &nbsp;&nbsp;
          <button className="likeButton" onClick={e => this.likePost(e)}>
            {this.state.likeText}
          </button>
          &nbsp;&nbsp;
          <button
            className="commentButton"
            onClick={e => this.toggleComment(e)}
          >
            Comment
          </button>
        </div>
        <div className="comments">
          {this.state.comments.map((comms, index) => (
            <div className="postComs">
              <h6>{this.state.username}</h6>
              <p>{comms}</p>
              <br />
              <button
                className="postsDelIcon"
                style={{
                  marginLeft: "auto",
                  fontSize: "20px",
                  background: "none"
                }}
                onClick={e => {
                  this.delCom(e, index);
                }}
              >
                <svg className="commentDelIcon" viewBox="0 0 25 25" width="30">
                  <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" />
                </svg>
              </button>
            </div>
          ))}
        </div>
        <div
          className="commentBox"
          ref={comment => (this.commentElement = comment)}
          style={{ display: "none" }}
        >
          <input
            type="text"
            placeholder="Type your comment here....."
            value={this.state.comment}
            onChange={e => {
              this.change(e);
            }}
            name="comment"
          ></input>
          <br />
          <br />
          <button
            onClick={e => {
              this.addComment(e);
            }}
          >
            Add Comment
          </button>
        </div>
      </div>
    );
  }
}

export default Comments;
