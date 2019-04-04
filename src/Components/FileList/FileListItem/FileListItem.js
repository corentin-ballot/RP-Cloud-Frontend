import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { renameFile, toggleFileSelect, enableFileEditName, disableFileEditName, downloadFile } from '../../../Redux/actions/navigation';
import { previewFile } from '../../../Redux/actions/preview';
import { connect } from 'react-redux'

import ReadableOctets from '../../ReadableOctets';
import ReadableDate from '../../ReadableDate';

import './FileListItem.css';

class FileListItem extends Component {
    handleEditNameClick = () => {
        this.props.dispatch(enableFileEditName(this.props.file));
    }

    handleCancelEditNameClick = () => {
        this.props.dispatch(disableFileEditName(this.props.file));
    }

    handleSubmitEditNameClick = (newurl) => {
        this.props.dispatch(renameFile(this.props.file, newurl));
    }

    handleSelectClick = () => {
        this.props.dispatch(toggleFileSelect(this.props.file));
    }

    handleFileClick = () => {
        this.props.dispatch(previewFile(this.props.file));
    }

    handleDownloadClick = () => {
        this.props.dispatch(downloadFile(this.props.file));
    }

    render() {
        return (
            <li className="filestable_content_item">
                <div className="filestable_content_item_select" onClick={() => this.handleSelectClick()}><i className="material-icons">{this.props.file.selected ? "check_box" : (this.props.file.type === "dir" ? "folder" : "insert_drive_file")}</i></div>
                {(this.props.file.editName !== true) && (this.props.file.type === "dir" ? (<Link to={this.props.file.url + window.location.hash} className="filestable_content_item_name">{this.props.file.name}</Link>) : (<div className="filestable_content_item_name" onClick={() => this.handleFileClick()}>{this.props.file.name}</div>))}
                {(this.props.file.editName === true) && (<form className="filestable_content_item_name">
                    <input name="newfile" className="filestable_content_item_name_rename" id={"rename-" + this.props.file.url} type="text" defaultValue={this.props.file.url} ref={el => this.newurl = el} />
                </form>)}
                <div className="filestable_content_item_icons">
                    {(this.props.file.editName !== true) && this.props.file.type !== "dir" && <button className="filestable_content_item_icons_item" onClick={() => this.handleDownloadClick(this.props.file.url)} ><i className="material-icons">file_download</i></button>}
                    {(this.props.file.editName !== true) && <button className="filestable_content_item_icons_item" onClick={() => this.handleEditNameClick()}><i className="material-icons">mode_edit</i></button>}
                    {(this.props.file.editName === true) && <button className="filestable_content_item_icons_item" onClick={() => this.handleSubmitEditNameClick(this.newurl.value)}><i className="material-icons">done</i></button>}
                    {(this.props.file.editName === true) && <button className="filestable_content_item_icons_item" onClick={() => this.handleCancelEditNameClick()}><i className="material-icons">clear</i></button>}
                </div>

                <ReadableOctets className="filestable_content_item_size">{this.props.file.size}</ReadableOctets>
                <ReadableDate className="filestable_content_item_lastupdate">{this.props.file.mtime}</ReadableDate>
            </li>
        );
    }
}

const mapStateToProps = (state) => {
    return {}
};

export default connect(mapStateToProps)(FileListItem);