import React, { Component } from "react";

class QueryWindow extends Component {
  render() {
    var {
      author,
      publishedAt,
      title,
      url,
      urlToImage,
      content
    } = this.props.currentState;

    return content ? (
      <div className="col-4 title-container">
        <div className="col-3 queryWindow load">
          <a href={url}>
            <h2>{title}</h2>
          </a>
          <p style={{ fontSize: "12px" }}>{publishedAt}</p>
          <img className="currentPic" src={urlToImage} />
          <p style={{ fontSize: "12px" }}>{author}</p>
          <p>{content}</p>
        </div>
      </div>
    ) : null;
  }
}

export default QueryWindow;
