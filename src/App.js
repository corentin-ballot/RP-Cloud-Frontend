import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Breadcrumb from './Components/Breadcrumb/Breadcrumb';
import Filestable from './Components/Filestable/Filestable';

class App extends Component {
  state = {
    breadcrumb: this.getBreadcrumb(),
    filestable: this.getFilesinfos(),
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

  getFilesinfos() {
    return {
      "dirs":[
        {name:".","url":"/.",last_modif:"14/12/2017 20:15"},
        {name:"..","url":"/..",last_modif:"23/05/2018 19:08"},
        {name:"Documents","url":"/Documents",last_modif:"12/11/2017 15:33"}
      ],
      "files":[
        {name:"markdown_cheatsheet.md",type:"file",url:"/markdown_cheatsheet.md",size:"2,82 Ko",last_modif:"05/06/2018 19:02"},
        {name:"notes.md",type:"file",url:"/notes.md",size:"2,85 Ko",last_modif:"20/12/2017 8:53"},
        {name:"notes.md",type:"file",url:"/notes.md",size:"2,85 Ko",last_modif:"20/12/2017 8:53"},
        {name:"notes.md",type:"file",url:"/notes.md",size:"2,85 Ko",last_modif:"20/12/2017 8:53"},
        {name:"notes.md",type:"file",url:"/notes.md",size:"2,85 Ko",last_modif:"20/12/2017 8:53"},
        {name:"notes.md",type:"file",url:"/notes.md",size:"2,85 Ko",last_modif:"20/12/2017 8:53"},
        {name:"notes.md",type:"file",url:"/notes.md",size:"2,85 Ko",last_modif:"20/12/2017 8:53"},
        {name:"notes.md",type:"file",url:"/notes.md",size:"2,85 Ko",last_modif:"20/12/2017 8:53"},
        {name:"notes.md",type:"file",url:"/notes.md",size:"2,85 Ko",last_modif:"20/12/2017 8:53"},
        {name:"notes.md",type:"file",url:"/notes.md",size:"2,85 Ko",last_modif:"20/12/2017 8:53"},
        {name:"notes.md",type:"file",url:"/notes.md",size:"2,85 Ko",last_modif:"20/12/2017 8:53"},
        {name:"notes.md",type:"file",url:"/notes.md",size:"2,85 Ko",last_modif:"20/12/2017 8:53"},
        {name:"notes.md",type:"file",url:"/notes.md",size:"2,85 Ko",last_modif:"20/12/2017 8:53"},
        {name:"notes.md",type:"file",url:"/notes.md",size:"2,85 Ko",last_modif:"20/12/2017 8:53"},
        {name:"notes.md",type:"file",url:"/notes.md",size:"2,85 Ko",last_modif:"20/12/2017 8:53"},
        {name:"notes.md",type:"file",url:"/notes.md",size:"2,85 Ko",last_modif:"20/12/2017 8:53"},
        {name:"notes.md",type:"file",url:"/notes.md",size:"2,85 Ko",last_modif:"20/12/2017 8:53"},
        {name:"speedshare",type:"file",url:"/speedshare",size:"245 o",last_modif:"26/09/2017 8:51"}
      ]
    };
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
          <Filestable filestable={filestable} />
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;
