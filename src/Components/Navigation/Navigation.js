import React, { Component } from 'react';
import Dropzone from 'react-dropzone'

import Breadcrumb from './Breadcrumb/Breadcrumb';
import Filestable from './Filestable/Filestable';

import './Navigation.css';

class Navigation extends Component {
    state = {
        displayHiddenFiles: false,
        displayNewFile: false,
        displayNewDir: false,
    }

    handleToggleHiddenFilesClick = () => {
        this.setState(prevState => ({
            displayHiddenFiles: !prevState.displayHiddenFiles
        }));
    }

    handleNewFileClick = () => {
        this.setState(prevState => ({
            displayNewFile: !prevState.displayNewFile
        }));
    }

    handleCancelNewFileClick = () => {
        this.setState({displayNewFile: false});
    }

    handleNewDirClick = () => {
        this.setState(prevState => ({
            displayNewDir: !prevState.displayNewDir
        }));
    }

    handleCancelNewDirClick = () => {
        this.setState({displayNewDir: false});
    }

    handleZipSelectedFilesClick = () => {
        const selected = this.props.files.filter((e) => {
            return e.is_selected;
        }).map((e) => {
            return e.url;
        });
        const path = "/";

        fetch("http://localhost/web/app.php/api/cloud/zip?files=" + JSON.stringify(selected) + "&path=" + path)
        .then(function(res){
            return res.json();
        })
        .then(function(json){
            console.log(json);
        })
    }

    handleDeleteSelectedFilesClick = () => {
        const selected = this.props.files.filter((e) => {
            return e.is_selected;
        }).map((e) => {
            return e.url;
        });

        fetch("http://localhost/web/app.php/api/cloud/delete?files=" + JSON.stringify(selected))
        .then(function(res){
            return res.json();
        })
        .then(function(json){
            console.log(json);
        })
    }

    onDrop(files) {
        files.forEach(file => {
            let data = new FormData();
            data.append('path', window.location.pathname.replace(this.props.baseroute, ''));
            data.append('file', file);

            fetch('http://localhost/web/app.php/api/cloud/uploadfile', { // Your POST endpoint
                method: 'POST',
                body: data
            }).then(
                // TODO : Reload file list
            );
        });

    }

    render() {
        const { displayHiddenFiles, displayNewFile, displayNewDir } = this.state;
        return (
            <div className="cloud_navigation">
                <Breadcrumb breadcrumb={this.props.breadcrumb} baseroute={this.props.baseroute} />

                <Dropzone className="cloud_navigation_dropzone" onDrop={this.onDrop.bind(this)} disableClick ref={(node) => { this.dropzoneRef = node; }}>
                    <Filestable files={this.props.files} baseroute={this.props.baseroute} displayHiddenFiles={displayHiddenFiles} displayNewFile={displayNewFile} displayNewDir={displayNewDir} onClickCancelNewDir={this.handleCancelNewDirClick} onClickCancelNewFile={this.handleCancelNewFileClick} onClickFile={this.props.onPreviewFile} contentLoaded={this.props.contentLoaded} DropdownRef={this.dropzoneRef} onClickToggleHiddenFiles={this.handleToggleHiddenFilesClick} onClickNewFile={this.handleNewFileClick} onClickNewDir={this.handleNewDirClick} onClickZipFiles={this.handleZipSelectedFilesClick} onClickDeleteFiles={this.handleDeleteSelectedFilesClick} />
                </Dropzone>
            </div>
        );
    }
}

export default Navigation;