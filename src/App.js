import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Navigation from './Components/Navigation/Navigation';

class App extends Component {
  componentWillMount() {
    this.unlisten = this.props.history.listen((location, action) => {
      console.log("Route change (" + action + "). New location : " + location.pathname + location.search + location.hash);
      switch (action) {
        case 'PUSH' : // location pathname change
        /* TODO : update file table and breadcrumb on route change using ajax request */
        break;
        case 'POP' : // location hash change
        /* TODO : update file preview */
        break;
        default: break;
      }
    });
  }
  componentWillUnmount() {
      this.unlisten();
  }

  render() {
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
