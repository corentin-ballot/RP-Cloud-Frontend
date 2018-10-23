import React, { Component } from 'react';

import './FileList.css';
import FileListItem from './FileListItem/FileListItem';
import FileListNewFileItem from './FileListNewFileItem/FileListNewFileItem.js';
import FileListNewDirItem from './FileListNewDirItem/FileListNewDirItem.js';
import LoadingSpinner from '../../LoadingSpinner/LoadingSpinner.js';

import { selectAllFiles } from '../../../Redux/actions/navigation';

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

    render() {
        const { allSelected } = this.state
        return (
            <div className="filestable">
                <header className="filestable_header">
                    <div className="filestable_header_select" onClick={() => this.handleSelectAllClick()}>
                        <i className="material-icons">{allSelected? "check_box":"check_box_outline_blank"}</i>
                    </div>
                    <div className="filestable_header_name">Name</div>
                    <div className="filestable_header_icons"></div>
                    <div className="filestable_header_lastupdate">Last update</div>
                    <div className="filestable_header_size">Size</div>
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