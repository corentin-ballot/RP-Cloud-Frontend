import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { connect } from 'react-redux'
import { toggleNewDir, toggleNewFile } from '../../Redux/actions/navigation';

import Dropdown from '../Dropdown';

class Breadcrumb extends Component {
    render() {
        const last_item=this.props.data[this.props.data.length-1];
        return (
            <>
                <div className="d-inline-block overflow-auto" style={{scrollbarWidth: 'thin',}}>
                    <ol aria-label="breadcrumb" className="breadcrumb flex-nowrap overflow-auto mb-0 pl-0 pr-0 bg-transparent" style={{width:"max-content"}}>
                        {/* ITEMS */}
                        {this.props.data.map((item, index) => {
                            return (index===this.props.data.length-1)?<li className="breadcrumb-item text-nowrap" key={item.route}></li>:<li className="breadcrumb-item text-nowrap" key={item.route}><Link to={`${item.route}${window.location.hash}`} className="breadcrumb-item text-nowrap">{!item.route?"Home":item.folderName}</Link></li>
                        })}
                    </ol>
                </div>
                {/* LAST ITEM */}
                {this.props.data.length && <Dropdown className="breadcrumb-item active text-nowrap mr-auto d-inline-block" aria-current="page" tag="div" btn={{text:!last_item.route?"Home":last_item.folderName, tag: "button", attrs:{className:"btn btn-outline-primary"}}} direction={!last_item.route?"left":"right"}>
                    <button className="dropdown-item" onClick={() => this.handleNewFileClicked()}>New file</button>
                    <button className="dropdown-item" onClick={() => this.handleNewDirClicked()}>New folder</button>
                    <div className="dropdown-divider"></div>
                    <button className="dropdown-item" onClick={() => this.handleUploadFilesClicked()}>Upload file</button>
                </Dropdown>}
            </>
        );
    }

    handleUploadFilesClicked = () => {
        this.props.dropzone.ref.open();
    }

    handleNewDirClicked = () => {
        this.props.dispatch(toggleNewDir());
    }

    handleNewFileClicked = () => {
        this.props.dispatch(toggleNewFile());
    }
}

const mapStateToProps = (state) => {return {}};
  
export default connect(mapStateToProps)(Breadcrumb);