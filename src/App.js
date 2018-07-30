import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Navigation from './Components/Navigation/Navigation';
import Preview from './Components/Preview/Preview';

class App extends Component {
  state = {
    baseroute: "/cloud",
    breadcrumb: [],
    files: [],
    preview: {},
  }

  updateBreadcrumb(path) {
    this.setState({
      breadcrumb: path.split('/').map((item, index, array) => {
        return {route:array.filter((x, y) => y <= index).join('/'), folderName: item}
      })
    });
  }

  updateFileList(path) {
    this.setState({isLoaded: false});

    fetch("http://localhost/web/app.php/api/cloud/navigate?path=" + path, {method: 'GET'})
    .then(function(res){ return res.json(); })
    .then(
      (json) => {
        this.setState({
          isLoaded: true,
          files : json.dirs.map((e,i,a) => {e.type='dir'; return e;}).concat(json.files)
        });
      },
      (error) => {
        this.setState({
          isLoaded: true,
          error
        });
      }
    )
    //
  }

  navigateTo(path) {
    this.updateBreadcrumb(path);
    this.updateFileList(path);
  }

  initPreviewItems() {
    var encoded_arr = window.location.hash === "" ? "[]" : window.location.hash;
    var decoded_arr = decodeURIComponent(encoded_arr).replace('#','');
    var arr = JSON.parse(decoded_arr).map((e, i, a) => {return {url: e, name: e.split('/')[e.split('/').length -1]}});
    this.setState({preview: {files:arr, selectedFile: 0}}, () => {
      this.loadFilesContent();
    });
  }

  addPreviewItem = (filePath) => {
    if(this.state.preview.files.filter((e) => e.url === filePath).length <= 0) {
      this.setState(prevState => ({
        preview: {...prevState.preview, files:[...prevState.preview.files, {url: filePath, name: filePath.split('/')[filePath.split('/').length -1]}], selectedFile: this.state.preview.files.length}
      }), () => {
        this.updateHash();
        this.loadFilesContent();
      });
    } else {
      this.setState(prevState => ({
        preview: {...prevState.preview, selectedFile: prevState.preview.files.indexOf(prevState.preview.files.filter((e) => e.url === filePath)[0])}
      }));
    }
  }

  removePreviewItem = (filePath) => {
    this.setState(prevState => ({
      preview: {...prevState.preview, files:prevState.preview.files.filter((e) => e.url !== filePath), selectedFile: prevState.preview.selectedFile < prevState.preview.files.length -1 ? prevState.preview.selectedFile:prevState.preview.files.length-2 },
    }), () => {
      this.updateHash();
    });
  }

  loadFilesContent = () => {
    this.state.preview.files.forEach((e,i,a) => {
      if(typeof e.content === 'undefined' && typeof e.isLoaded === 'undefined') {
        e.isLoaded = false;
        this.setState({});

        fetch("http://localhost/web/app.php/api/cloud/filecontent?fileurl=" + e.url, {method: 'GET'})
        .then(function(res){
          return res.json();
        })
        .then(
          (json) => {
            e.isLoaded = true;
            e.content = json.content;
            this.setState({});
          },
          (error) => {
            e.isLoaded = true;
            e.content = error;
            this.setState({});
          }
        )
      } else {
        // content is loaded or loading, nothing to do.
      }
    });
  }

  updateHash = () => {
    window.location.hash = typeof this.state.preview.files !== 'undefined' && this.state.preview.files.length > 0 ? encodeURIComponent(JSON.stringify(this.state.preview.files.map((e) => {return e.url}))) : "";
  }

  componentWillMount() {
    this.unlisten = this.props.history.listen((location, action) => {
      console.log("Route change (" + action + "). New location : " + location.pathname + location.search + location.hash);
      switch (action) {
        case 'PUSH' : // location pathname change
        this.navigateTo(location.pathname.replace(this.state.baseroute, ''));
        break;
        case 'POP' : // location hash change
        //this.updatePreviewItems();
        break;
        default: break;
      }
    });

    this.navigateTo(window.location.pathname.replace(this.state.baseroute, ''));
    this.initPreviewItems();
  }
  componentWillUnmount() {
      this.unlisten();
  }

  render() {
    const { files, breadcrumb, baseroute, preview } = this.state
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">ReactApp</h1>
        </header>
        <div className="cloud">
          <Navigation breadcrumb={breadcrumb} files={files} baseroute={baseroute} onPreviewFile={this.addPreviewItem} />
          <Preview preview={preview} onCloseTab={this.removePreviewItem} />
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;
