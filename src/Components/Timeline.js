import React, { Component } from "react";
import { Comments } from "./Comments";

export class Timeline extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      posts: [],
      comms: []
    };
  }

  getDetails = () => {
    let data = JSON.parse(localStorage.getItem("cardPosts"));
    this.setState(
      {
        username: data.username,
        posts: data.posts
      },
      console.log(this.state)
    );
  };

  componentDidMount = () => {
    this.getDetails();
  };

  onSubmit = fields => {
    this.setState({ comms: fields });
  };

  render() {
    return (
      <div>
        <div>
          <h1>Welcome to your Timeline, {this.state.username}</h1>
        </div>

        <div className="timelinePosts">
          {this.state.posts.map((postz, index) => (
            <div className="timePostsDiv">
              <img
                alt="yoyoyoyoyoyo"
                src={postz.img}
                style={{ width: "20%" }}
              ></img>
              <h1>{postz.postDesc}</h1>
              <pre>{postz.postTags}</pre>
              <Comments
                onSubmit={fields => {
                  this.onSubmit(fields);
                }}
              />
              <br />
              <br />
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default Timeline;
