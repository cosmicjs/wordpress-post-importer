import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  getParam(param) {
    var urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <p>When uploaded to your Cosmic JS Bucket, these keys are available in the URL:</p>
          <p>Bucket Slug: <code style={{ color: '#00AFD7' }}>{this.getParam('bucket_slug')}</code></p>
          <p>Bucket Read Key: <code style={{ color: '#00AFD7' }}>{this.getParam('read_key')}</code></p>
          <p>Bucket Write Key: <code style={{ color: '#00AFD7' }}>{this.getParam('write_key')}</code></p>
        </header>
      </div>
    );
  }
}

export default App;
