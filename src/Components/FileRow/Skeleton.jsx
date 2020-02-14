import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { renameFile, toggleFileSelect, enableFileEditName, disableFileEditName, downloadFile } from '../../Redux/actions/navigation';
import { previewFile } from '../../Redux/actions/preview';
import { connect } from 'react-redux'

import ReadableOctets from '../../ReadableOctets';
import ReadableDate from '../../ReadableDate';
import Icon from '../icon';

class FileRow extends Component {

    render() {
        return (
            <tr className={this.props.file.selected ? 'bg-primary' : ''}>
                <td className="text-nowrap" onClick={() => this.handleSelectClick(this.props.file.selected)}>
                    {this.props.file.selected ? <input type="checkbox" id="select_all" checked={this.props.file.selected} style={{ marginLeft: this.props.file.selected ? '-15px' : '2px', opacity: this.props.file.selected ? '0' : '1' }} onChange={() => this.handleSelectClick(this.props.file.selected)} /> : <Icon icon="folder" />}
                </td>
                <td className="w-100">
                    {/* DIRECTORY */}
                    {(this.props.file.editName !== true && this.props.file.type === "dir") && (<Link to={this.props.file.url + window.location.hash}>{this.props.file.name}</Link>)}
                    {/* FILE */}
                    {(this.props.file.editName !== true && this.props.file.type !== "dir") && (<button className="btn btn-link p-0" onClick={() => this.handleFileClick()}>{this.props.file.name}</button>)}
                    {/* EDIT NAME */}
                    {(this.props.file.editName === true) && (
                        <form className="form-group m-0">
                            <div className="input-group">
                                <input type="text" className="form-control form-control-sm" placeholder="New filename" aria-label="New filename" defaultValue={this.props.file.url} ref={el => this.newurl = el} />
                                <div className="input-group-append">
                                    <button className="btn btn-sm btn-outline-secondary pt-0 pb-0" type="button" title="Confirm" onClick={() => this.handleSubmitEditNameClick(this.newurl.value)}><Icon style={{ fontSize: 18 }} icon="check"></Icon></button>
                                    <button className="btn btn-sm btn-outline-secondary pt-0 pb-0" type="button" title="Cancel" onClick={() => this.handleCancelEditNameClick()}><Icon style={{ fontSize: 18 }} icon="cross"></Icon></button>
                                </div>
                            </div>
                        </form>
                    )}
                </td>
                <td className="text-nowrap d-none d-sm-table-cell"><ReadableDate>{this.props.file.mtime}</ReadableDate></td>
                <td className="text-nowrap d-none d-sm-table-cell"><ReadableOctets>{this.props.file.size}</ReadableOctets></td>
            </tr>
        );
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
}

const mapStateToProps = (state) => {
    return {}
};

export default connect(mapStateToProps)(FileListItem);