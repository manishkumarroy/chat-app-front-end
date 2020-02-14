import React, { Component } from "react";

export default class PostMessage extends Component {
  render() {
    return (
      <div>
        <form onSubmit={this.props.onSubmit}>
          <input
            onChange={this.props.onChange}
            type="text"
            value={this.props.value}
            placeholder="new message"
          />

          <button>submit</button>
        </form>

        <button onClick={this.clear}>Clear</button>
      </div>
    );
  }
}
