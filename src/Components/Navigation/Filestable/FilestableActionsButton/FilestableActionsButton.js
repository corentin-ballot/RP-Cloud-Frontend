import React, { Component } from 'react';

import './FilestableActionsButton.css';

class FilestableActionsButton extends Component {
    state = {
        hidden: true
    }

    toggleMenu = () => {
        this.setState(prevState => ({
            hidden: !prevState.hidden
        }));
    }
    
    handleDownloadfilesClick = () => {
        this.toggleMenu();
        this.onClickDownloadFiles();
    }
    handleCompressfilesClick = () => {
        this.toggleMenu();
        this.props.onClickZipFiles();
    }
    handleDeletefilesClick = () => {
        this.toggleMenu();
        this.props.onClickDeleteFiles();
    }
    handleNewFileClick = () => {
        this.toggleMenu();
        this.props.onClickNewFile();
    }
    handleNewDirClick = () => {
        this.toggleMenu();
        this.props.onClickNewDir();
    }
    handleToggleHiddenFilesClick = () => {
        this.toggleMenu();
        this.props.onClickToggleHiddenFiles();
    }

    render() {
        return (
            <div className="filestable_actions_button-container" aria-expanded={!this.state.hidden}>
                <div className="filestable_actions_button_actions-container">
                    <button className="filestable_actions_button_action-icon" title="Compress files (zip)" onClick={this.handleCompressfilesClick}><i className="material-icons">archive</i></button>
                    <button className="filestable_actions_button_action-icon" title="Delete files" onClick={this.handleDeletefilesClick}><i className="material-icons">delete</i></button>
                    <button className="filestable_actions_button_action-icon" title="Download files (as zip)" onClick={this.handleDownloadfilesClick}><i className="material-icons">save_alt</i></button>
                    <button className="filestable_actions_button_action-icon" title="New file" onClick={this.handleNewFileClick}><i className="material-icons">note_add</i></button>
                    <button className="filestable_actions_button_action-icon" title="New folder" onClick={this.handleNewDirClick}><i className="material-icons">create_new_folder</i></button>
                    <button className="filestable_actions_button_action-icon" title="Toggle hidden files" onClick={this.handleToggleHiddenFilesClick}><i className="material-icons">visibility_off</i></button>
                </div>
                <button className="filestable_actions_button-icon" onClick={this.toggleMenu}><i className="material-icons">add</i></button>
            </div>
        );
    }
}

export default FilestableActionsButton;