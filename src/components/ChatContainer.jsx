import React, { Component } from "react";
import PostMessage from "./PostMessage";
const axios = require("axios");

export default class ChatContainer extends Component {
  state = {
    messages: [],
    value: ""
  };

  stream = new EventSource("http://localhost:4000/stream");

  componentDidMount() {
    this.stream.onmessage = event => {
      const { data } = event;

      const action = JSON.parse(data);
      console.log("action test:", action);

      const { type, payload } = action;

      if (type === "MESSAGES") {
        this.setState({ messages: payload });
      }

      if (type === "MESSAGE") {
        const messages = [...this.state.messages, payload];

        this.setState({ messages });
      }
    };
  }
  onSubmit = async event => {
    event.preventDefault();
    try {
      const response = await axios.post("http://localhost:4000/message", {
        text: this.state.value
      });
      console.log("response test:", response);
    } catch (error) {
      console.log(error);
    }
  };

  onChange = event => {
    const { value } = event.target;

    this.setState({ value });
  };

  clear = () => {
    console.log("clear test");
    this.setState({ value: "" });
  };

  render() {
    console.log("render state test:", this.state);
    const paragraphs = this.state.messages.map(message => (
      <p key={message.id}>{message.text}</p>
    ));

    return (
      <div>
        <PostMessage
          message={this.state.value}
          onSubmit={this.onSubmit}
          onChange={this.onChange}
        />
        {paragraphs}
      </div>
    );
  }
}
