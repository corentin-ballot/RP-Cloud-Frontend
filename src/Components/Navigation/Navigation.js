import React, { Component } from 'react';

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
    render() {
        const { displayHiddenFiles, displayNewFile, displayNewDir } = this.state
        return (
            <div className="cloud_navigation">
                <Breadcrumb breadcrumb={this.props.breadcrumb} baseroute={this.props.baseroute} onClickToggleHiddenFiles={this.handleToggleHiddenFilesClick} onClickNewFile={this.handleNewFileClick} onClickNewDir={this.handleNewDirClick} />
                <Filestable files={this.props.files} baseroute={this.props.baseroute} displayHiddenFiles={displayHiddenFiles} displayNewFile={displayNewFile} displayNewDir={displayNewDir} onClickCancelNewDir={this.handleCancelNewDirClick} onClickCancelNewFile={this.handleCancelNewFileClick} onClickFile={this.props.onPreviewFile} />
            </div>
        );
    }
}

export default Navigation;