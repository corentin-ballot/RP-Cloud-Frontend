import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import './Components/Navigation';
import Navigation from './Components/Navigation/Navigation';

class App extends Component {
  render() {
    const { breadcrumb, filestable, baseroute } = this.state
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">ReactApp</h1>
        </header>
        <div>
          <Navigation />
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;
