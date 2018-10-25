import React, { Component } from 'react';

import './FileList.css';
import FileListItem from './FileListItem/FileListItem';
import FileListActionsButton from './FileListActionsButton/FileListActionsButton.js';
import FileListNewFileItem from './FileListNewFileItem/FileListNewFileItem.js';
import FileListNewDirItem from './FileListNewDirItem/FileListNewDirItem.js';
import LoadingSpinner from '../../LoadingSpinner/LoadingSpinner.js';


import { selectAllFiles, toggleHiddenFiles, toggleNewDir, toggleNewFile, compressFiles, deleteFiles, uploadFiles } from '../../../Redux/actions/navigation';

import { connect } from 'react-redux'

class FileList extends Component {
    state = {
        allSelected: false,
    }

    handleSelectAllClick = () => {
        this.props.dispatch(selectAllFiles(!this.state.allSelected));

        this.setState(prevState => ({
            allSelected: !prevState.allSelected
        }));
    }


    handleToggleHiddenFilesClick = () => {
        this.props.dispatch(toggleHiddenFiles());
    }
    render() {
        const { allSelected } = this.state
        return (
            <div className="filestable">
                <header className="filestable_header">
                    <div className="filestable_header_select" onClick={() => this.handleSelectAllClick()}>
                        <i className="material-icons">{allSelected? "check_box":"check_box_outline_blank"}</i>
                    </div>
                    <div className="filestable_header_name">Name</div>
                    <FileListActionsButton>
                        <button className="filestable_actions_button_action-icon" title="Compress files (zip)" onClick={this.handleCompressfilesClick}><i className="material-icons">archive</i></button>
                        <button className="filestable_actions_button_action-icon" title="Delete files" onClick={this.handleDeletefilesClick}><i className="material-icons">delete</i></button>
                        <button className="filestable_actions_button_action-icon" title="Upload files" onClick={this.handleUploadFilesClick}><i className="material-icons">cloud_upload</i></button>
                        <button className="filestable_actions_button_action-icon" title="New file" onClick={this.handleNewFileClick}><i className="material-icons">note_add</i></button>
                        <button className="filestable_actions_button_action-icon" title="New folder" onClick={this.handleNewDirClick}><i className="material-icons">create_new_folder</i></button>
                        <button className="filestable_actions_button_action-icon" title="Toggle hidden files" onClick={this.handleToggleHiddenFilesClick}><i className="material-icons">visibility_off</i></button>
                    </FileListActionsButton>
                </header>
                <ol className="filestable_content">
                    {!this.props.isFileListLoaded && <li className="filestable_content_item"><LoadingSpinner /></li>}
                    {this.props.isFileListLoaded && this.props.displayNewFile && <FileListNewFileItem />}
                    {this.props.isFileListLoaded && this.props.displayNewDir && <FileListNewDirItem />}
                    {this.props.isFileListLoaded && this.props.fileList.map((item) => (
                        (item.name.charAt(0)!=="." || (item.name.charAt(0)==="." && this.props.displayHiddenFiles)) && <FileListItem file={item} key={item.url} />
                    ))}
                </ol>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        fileList: state.navigation.fileList,
        isFileListLoaded: state.navigation.isFileListLoaded,
        displayHiddenFiles: state.navigation.displayHiddenFiles,
        displayNewDir: state.navigation.displayNewDir,
        displayNewFile: state.navigation.displayNewFile,
    }
};
  
export default connect(mapStateToProps)(FileList);