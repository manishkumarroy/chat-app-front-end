import React from "react";
import axios from "axios";
import ChatContainer from "./components/ChatContainer";

class App extends React.Component {
  render() {
    return (
      <div>
        <ChatContainer />
      </div>
    );
  }
}

export default App;
