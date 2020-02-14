import React from 'react';

class App extends React.Component {
  state = {
    messages: []
  }

  stream = new EventSource('http://localhost:4000/stream')

  componentDidMount () {
    this.stream.onmessage = event => {
      console.log('event test:', event)

      const { data } = event
      console.log('data test:', data)

      const action = JSON.parse(data)
      console.log('action test:', action)

      const { type, payload } = action

      if (type === 'MESSAGES') {
        this.setState({ messages: payload })
      }

      if (type === 'MESSAGE') {
        const messages = [
          ...this.state.messages,
          payload
        ]

        this.setState({ messages })
      }
    }
  }

  render () {
    const paragraphs = this
      .state
      .messages
      .map(message => <p
        key={message.id}
      >
        {message.text}
      </p>)

    return <div>{paragraphs}</div>
  }
}

export default App;
