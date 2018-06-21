import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Breadcrumb from './Components/Breadcrumb/Breadcrumb';
import Filestable from './Components/Filestable/Filestable';

class App extends Component {

  render() {
    const { breadcrumb, filestable, baseroute } = this.state
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">ReactApp</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;
