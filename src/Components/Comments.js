import React, { Component } from "react";
import "../App.css";

export class Comments extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      comment: "",
      comments: [],
      like: 0
    };
  }

  componentDidMount = () => {
    this.setState({ like: "0" });
  };

  incrementCounter = e => {
    this.setState({ like: parseInt(this.state.like) + 1 });
  };

  toggleComment = e => {
    let commentBox = this.commentElement;
    if (commentBox.style.display === "none") commentBox.style.display = "block";
    else commentBox.style.display = "none";
  };

  change = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  addComment = e => {
    let comm = this.state.comments;
    this.setState(
      { comments: [...comm, this.state.comment] },
      this.props.onSubmit(this.state.comments)
    );
  };

  delCom = (e, index) => {
    let commz = this.state.comments;
    commz.splice(index, 1);
    this.setState({ comments: commz });
  };

  render() {
    return (
      <div>
        <div className="likesCounter">{this.state.like}</div>
        <div className="reactBar">
          &nbsp;&nbsp;
          <button
            className="likeButton"
            onClick={e => this.incrementCounter(e)}
          >
            Like
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
                &times;
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
