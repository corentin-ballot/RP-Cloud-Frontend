import React, { Component } from 'react';

import './Filestable.css';
import FilestableItem from './FilestableItem/FilestableItem.js';
import FilestableActionsButton from './FilestableActionsButton/FilestableActionsButton.js';
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
        fetch("https://corentin-ballot.duckdns.org/api/cloud/renamefile?fileurl=" + file.url + "&newurl=" + newurl, {method: 'GET'})
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
        fetch('https://corentin-ballot.duckdns.org/api/cloud/newfolder', { // Your POST endpoint
            method: 'POST',
            body: JSON.stringify({foldername: dirname, path: window.location.pathname.replace(this.props.baseroute, '')})
        }).then(() => {
            // TODO : Reload file list
        });
        this.props.onClickCancelNewDir();
    }

    handleSubmitNewFileClick = (filename) => {
        window.location.pathname.replace(this.props.baseroute, '')
        fetch('https://corentin-ballot.duckdns.org/api/cloud/newfile', { // Your POST endpoint
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
                    <FilestableActionsButton DropdownRef={this.dropzoneRef} onClickToggleHiddenFiles={this.props.onClickToggleHiddenFiles} onClickNewFile={this.props.onClickNewFile} onClickNewDir={this.props.onClickNewDir} onClickZipFiles={this.props.onClickZipFiles} onClickDeleteFiles={this.props.onClickDeleteFiles} />
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