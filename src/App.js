import React, { Component } from 'react';

import { connect } from 'react-redux'
import Dropdown from './Components/Dropdown';
import Breadcrumb from './Components/Breadcrumb';
import FilesTable from './Components/FilesTable';

import Preview from './Components/Preview';

import { fetchFileList, sortFilesBy, filterFiles } from './Redux/actions/navigation';
import Notifications from './Components/Notifications';

class App extends Component {
    componentWillMount() {
        // init breadcrumb & file list
        this.props.dispatch(fetchFileList(this.props.location.pathname));
    
        this.unlisten = this.props.history.listen((location, action) => {
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
    this.dropzone={}
    return (
      <section className="container-fluid h-100">
        <div className="row h-100">
          {/* SIDEBAR */}
          {/* <div className="col-12 col-lg-3 col-xl-2 bg-secondary p-3" style={{boxShadow:'2px 0px 2px 0px rgba(0, 0, 0, 0.34) !important'}}></div> */}

          {/* MAIN CONTENT */}
          <main className="col-12 -col-lg-9 -col-xl-10 overflow-hidden h-100 position-static d-flex flex-column">
            {/* NAVBAR */}
            <nav className="navbar navbar-expand navbar-light pl-0 pr-0">
              <div className="collapse navbar-collapse row">
                <div className="overflow-visible d-flex align-items-center pl-3 pr-3" style={{maxWidth:"100vw"}}>
                  <Breadcrumb data={this.props.breadcrumb} dropzone={this.dropzone}/>
                </div>
                <div className="navbar-collapse -col-12 -col-lg-4">
                  <ul className="navbar-nav ml-auto">
                    <Dropdown className="nav-item" tag="li" btn={{text:"Sort", tag: "button", attrs:{className:"nav-link btn btn-link"}}}>
                        <button className="dropdown-item" onClick={() => this.handleSortByName()}>By name</button>
                        <button className="dropdown-item" onClick={() => this.handleSortBySize()}>By size</button>
                        <button className="dropdown-item" onClick={() => this.handleSortByDate()}>By date</button>
                    </Dropdown>
                  </ul>
                  <form className="form-inline my-2 my-md-0 pl-3 pr-3">
                    <input className="form-control" type="filter" placeholder="Filter" aria-label="Filter" onChange={(e) => this.handleFilterChanged(e)}/>
                  </form>
                </div>
              </div>
            </nav>

            {/* FILES TABLE */}
            <div className="row flex-grow-1 flex-shrink-1 overflow-hidden">
                <FilesTable className={`${this.props.preview.length?"col-xl-4 d-none d-xl-block":"col-xl-12"}`} dropzone={this.dropzone}/>
                <div className={this.props.preview.length?"col-12 col-xl-8 h-100 overflow-auto d-flex flex-column":"w-0 overflow-hidden"}>
                    <Preview />
                </div>
            </div>

            {/* NOTIFICATIONS */}
            <Notifications />
          </main>
        </div>
      </section>
    );
    }

    handleSortByName = () => {
        this.props.dispatch(sortFilesBy('name'));
    }

    handleSortBySize = () => {
        this.props.dispatch(sortFilesBy('size'));
    }

    handleSortByDate = () => {
        this.props.dispatch(sortFilesBy('mtime'));
    }

    handleFilterChanged = (e) => {
        this.props.dispatch(filterFiles(e.target.value));

    }
}

const mapStateToProps = (state) => {
  return {
    preview: state.preview.fileList,
    breadcrumb: state.navigation.breadcrumb
  }
};

export default connect(mapStateToProps)(App);