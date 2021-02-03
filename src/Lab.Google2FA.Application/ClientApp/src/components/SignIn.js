import React, { Component } from 'react';
import QRCode from 'qrcode.react';

export class SignIn extends Component {
  static displayName = SignIn.name;

  constructor(props) {
    super(props);
    this.state = { currentCount: 0 };
    this.incrementCounter = this.incrementCounter.bind(this);
  }

  incrementCounter() {
    this.setState({
      currentCount: this.state.currentCount + 1
    });
  }

  render() {
    return (
      <div>
        <h1>SignIn</h1>

        <p>This is a simple example of a React component.</p>

        <p aria-live="polite">SignIn count: <strong>{this.state.currentCount}</strong></p>

        <button className="btn btn-primary" onClick={this.incrementCounter}>Increment</button>
        <QRCode value="http://facebook.github.io/react/" />
      </div>
    );
  }
}
