import React, { Component } from 'react';
import './App.css';
import Notifications from './Components/Notifications/Notifications';
import { connect } from 'react-redux'
import { fetchFileList } from './Redux/actions/navigation'

import Breadcrumb from './Components/Breadcrumb';
import Preview from './Components/Preview';
import FileList from './Components/FileList/FileList';

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
      <section className="cloud">
        <header className="cloud_header">
          <Breadcrumb />
        </header>
        <main className="cloud_main">
          <section className="cloud_navigation" aria-expanded={this.props.preview.length <= 0}>
            <FileList />
          </section>
          <section className="cloud_preview" aria-expanded={this.props.preview.length > 0}>
            <Preview />
          </section>

          <div className="cloud_notifications"><Notifications /></div>
        </main>
      </section>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    preview: state.preview.fileList
  }
};

export default connect(mapStateToProps)(App);