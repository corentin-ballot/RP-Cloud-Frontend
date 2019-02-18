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
          this.props.dispatch(fetchFileList(location.pathname));
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
        <Navigation aria-expanded={this.props.preview.length <= 0} />
        <Preview aria-expanded={this.props.preview.length > 0} />
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