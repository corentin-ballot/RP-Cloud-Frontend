import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Navigation from './Components/Navigation/Navigation';

class App extends Component {
  state = {
    baseroute: "/cloud",
    filemanager: this.navigateTo(window.location.pathname.replace("/cloud", '')),
  }

  navigateTo(path) {
    if(path === "" || path === "/"){
      return {
        breadcrumb : [
          {route: '/', folderName: '.'},
        ],
        files: [
          {name:".","url":"/.",type:"dir",last_modif:"14/12/2017 20:15"},
          {name:"..","url":"/..",type:"dir",last_modif:"23/05/2018 19:08"},
          {name:"Documents","url":"/Documents",type:"dir",last_modif:"12/11/2017 15:33"},
          {name:"markdown_cheatsheet.md",type:"file",url:"/markdown_cheatsheet.md",size:"2,82 Ko",last_modif:"05/06/2018 19:02"},
          {name:"notes.md",type:"file",url:"/notes.md",size:"2,85 Ko",last_modif:"20/12/2017 8:53"},
          {name:"speedshare",type:"file",url:"/speedshare",size:"245 o",last_modif:"26/09/2017 8:51"}
        ],
      };
    } else {
      return {
        breadcrumb : [
          {route: '/', folderName: '.'},
          {route: '/Documents', folderName: 'Documents'},
        ],
        files: [
          {name:"Test","url":"/Documents/Test",type:"dir",last_modif:"12/11/2017 15:33"},
          {name:"speedshare",type:"file",url:"/speedshare",size:"245 o",last_modif:"26/09/2017 8:51"},
        ],
      };
    }
  }

  componentWillMount() {
    this.unlisten = this.props.history.listen((location, action) => {
      console.log("Route change (" + action + "). New location : " + location.pathname + location.search + location.hash);
      switch (action) {
        case 'PUSH' : // location pathname change
        /* TODO : update file table and breadcrumb on route change using ajax request */
        this.setState({ filemanager : this.navigateTo(location.pathname.replace(this.state.baseroute, '')) })
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
    const { filemanager, baseroute } = this.state
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">ReactApp</h1>
        </header>
        <div>
          <Navigation breadcrumb={filemanager.breadcrumb} files={filemanager.files} baseroute={baseroute} />
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;
