import React, { Component } from 'react';
import './App.css';
import Navigation from './Components/Navigation/Navigation';
import Preview from './Components/Preview/Preview';
import { connect } from 'react-redux'
import { fetchFileList } from './Redux/actions/files'

import { Link } from 'react-router-dom';

class App extends Component {

  componentWillMount() {
    // init breadcrumb & file list
    this.props.dispatch(fetchFileList(this.props.location.pathname));

    this.unlisten = this.props.history.listen((location, action) => {
      console.log("Route change (" + action + "). New location : " + location.pathname + location.search + location.hash);
      switch (action) {
        case 'PUSH' : // location pathname change
        this.props.dispatch(fetchFileList(location.pathname));
        // TODO : dispatch REQUEST_FILE_LIST and RECEIVE_FILE_LIST on received
        break;
        case 'POP' : // location hash change
        // TODO : dispatch ( ADD_PREVIEW_FILE, REQUEST_PREVIEW_CONTENT and RECEIVE_PREVIEW_CONTENT on received ) or REMOVE_PREVIEW_FILE
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
        <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons"/>

        <div className="cloud">
          <Navigation />
          {/*<Preview />*/}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  // Don't need data ?
  return {}
};

export default connect(mapStateToProps)(App);