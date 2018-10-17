import React, { Component } from 'react';

import './Filestable.css';
import FilestableItem from './FilestableItem/FilestableItem.js';
import FilestableNewFileItem from './FilestableNewFileItem/FilestableNewFileItem.js';
import FilestableNewDirItem from './FilestableNewDirItem/FilestableNewDirItem.js';
import LoadingSpinner from '../../LoadingSpinner/LoadingSpinner.js';

class Filestable extends Component {
    state = {
        allSelected: false,
    }

    handleEditNameClick = (file) => {
        file.edit_name = true;
        this.setState({})
    }

    handleCancelEditNameClick = (file) => {
        file.edit_name = false;
        this.setState({})
    }

    handleSubmitEditNameClick = (file, newurl) => {
        fetch("http://localhost/web/app.php/api/cloud/renamefile?fileurl=" + file.url + "&newurl=" + newurl, {method: 'GET'})
        .then(function(res){
          return res.json();
        })
        .then(
          (json) => {
            file.edit_name = false;
            this.setState({});
            // TODO: update file table
          },
          (error) => {
            file.edit_name = false;
            this.setState({});
            // TODO: display error
          }
        )
    }

    handleSelectClick = (file) => {
        file.is_selected = typeof file.is_selected === undefined? true:!file.is_selected;
        this.setState({})
    }

    handleSelectAllClick = (files) => {
        files = files.map((file) => {
            file.is_selected = !this.state.allSelected;
            return file;
        });

        this.setState({allSelected : !this.state.allSelected})
    }

    handleSubmitNewDirClick = (dirname) => {
        fetch('http://localhost/web/app.php/api/cloud/newfolder', { // Your POST endpoint
            method: 'POST',
            body: JSON.stringify({foldername: dirname, path: window.location.pathname.replace(this.props.baseroute, '')})
        }).then(() => {
            // TODO : Reload file list
        });
        this.props.onClickCancelNewDir();
    }

    handleSubmitNewFileClick = (filename) => {
        window.location.pathname.replace(this.props.baseroute, '')
        fetch('http://localhost/web/app.php/api/cloud/newfile', { // Your POST endpoint
            method: 'POST',
            body: JSON.stringify({filename: filename, path: window.location.pathname.replace(this.props.baseroute, '')})
        }).then(() => {
            // TODO : Reload file list
        });
        this.props.onClickCancelNewFile();
    }

    render() {
        const { allSelected } = this.state
        return (
            <div className="filestable">
                <header className="filestable_header">
                    <div className="filestable_header_select" onClick={() => this.handleSelectAllClick(this.props.files)}><i className="material-icons">{allSelected? "check_box":"check_box_outline_blank"}</i></div>
                    <div className="filestable_header_name">Name</div>
                    <div className="filestable_header_icons"></div>
                    <div className="filestable_header_lastupdate">Last update</div>
                    <div className="filestable_header_size">Size</div>
                </header>
                <ol className="filestable_content">
                    {!this.props.contentLoaded && <li className="filestable_content_item"><LoadingSpinner /></li>}
                    {this.props.contentLoaded && this.props.displayNewFile && <FilestableNewFileItem onClickSubmit={this.handleSubmitNewFileClick} onClickCancel={this.props.onClickCancelNewFile} />}
                    {this.props.contentLoaded && this.props.displayNewDir && <FilestableNewDirItem onClickSubmit={this.handleSubmitNewDirClick} onClickCancel={this.props.onClickCancelNewDir} />}
                    {this.props.contentLoaded && this.props.files.map((item) => (
                        (item.name.charAt(0)!=="." || (item.name.charAt(0)==="." && this.props.displayHiddenFiles)) && <FilestableItem file={item} key={item.url} baseroute={this.props.baseroute} onSelect={this.handleSelectClick} onEditName={this.handleEditNameClick} onEditNameSubmit={this.handleSubmitEditNameClick} onEditNameCancel={this.handleCancelEditNameClick} onClickFile={this.props.onClickFile} onClickDownload={this.handleDownloadFileClick} />
                    ))}
                </ol>
            </div>
        );
    }
}

export default Filestable;