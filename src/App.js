import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Breadcrumb from './Components/Breadcrumb/Breadcrumb';
import Filestable from './Components/Filestable/Filestable';

class App extends Component {
  state = {
    breadcrumb: this.getBreadcrumb(),
    baseroute: "/cloud",
  }

  getBreadcrumb() {
    return [
      {route: '/', folderName: '.'},
      {route: '/Documents', folderName: 'Documents'},
      {route: '/Documents/Cours', folderName: 'Cours'},
      {route: '/Documents/Cours/M2', folderName: 'M2'},
      {route: '/Documents/Cours/M2/S1', folderName: 'S1'},
      {route: '/Documents/Cours/M2/S1/WEB-IHM', folderName: 'WEB-IHM'},
    ];
  }

  render() {
    const { breadcrumb, filestable, baseroute } = this.state
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">ReactApp</h1>
        </header>
        <div style={{display: "flex", flexDirection: "column",}}>
          <Breadcrumb breadcrumb={breadcrumb} baseroute={baseroute} />
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;
