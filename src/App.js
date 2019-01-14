import React, { Component } from 'react';
import './App.css';
import Navigation from './Components/Navigation/Navigation';
import Notifications from './Components/Notifications/Notifications';
import Preview from './Components/Preview/Preview';
import { connect } from 'react-redux'
import { fetchFileList } from './Redux/actions/navigation'

class App extends Component {

  componentWillMount() {
    // init breadcrumb & file list
    this.props.dispatch(fetchFileList(this.props.location.pathname));

    this.unlisten = this.props.history.listen((location, action) => {
      console.log("Route change (" + action + "). New location : " + location.pathname + location.search + location.hash);
      switch (action) {
        case 'PUSH': // location pathname change
          this.props.dispatch(fetchFileList(location.pathname));
          break;
        case 'POP': // location hash change
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
        <div className="cloud">
          <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
          <Navigation aria-expanded={ this.props.preview.length <= 0 } />
          <Preview aria-expanded={ this.props.preview.length > 0 } />
          <Notifications />
        </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    preview: state.preview.fileList
  }
};

export default connect(mapStateToProps)(App);