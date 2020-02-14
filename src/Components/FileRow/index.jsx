import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { renameFile, toggleFileSelect, disableFileEditName } from '../../Redux/actions/navigation';
import { previewFile } from '../../Redux/actions/preview';
import { connect } from 'react-redux'

import ReadableOctets from '../ReadableOctets';
import ReadableDate from '../ReadableDate';
import Icon from '../Icon';

class FileRow extends Component {

    render() {
        const selected = this.props.file.selected;
        return (
            <tr className={this.props.file.selected ? 'bg-light' : ''} onClick={() => this.handleSelectClick(selected)}>
                <td className="text-nowrap">
                    {!this.props.file.selected && <Icon icon={this.props.file.type==="dir"?"folder":"text_file"} />}
                    <input type="checkbox" id="select_all" checked={this.props.file.selected} style={{ marginLeft: this.props.file.selected ? '2px' : '-15px', opacity: this.props.file.selected ? '1' : '0' }} onChange={() => {}} />
                </td>
                <td className="w-100">
                    {/* DIRECTORY */}
                    {(this.props.file.editName !== true && this.props.file.type === "dir") && (<Link className="text-nowrap" to={this.props.file.url + window.location.hash} onClick={(e) => {e.stopPropagation();e.nativeEvent.stopImmediatePropagation();}}>{this.props.file.name}</Link>)}
                    {/* FILE */}
                    {(this.props.file.editName !== true && this.props.file.type !== "dir") && (<button className="btn btn-link p-0 text-nowrap" onClick={(e) => this.handleFileClick(e)}>{this.props.file.name}</button>)}
                    {/* EDIT NAME */}
                    {(this.props.file.editName === true) && (
                        <form className="form-group m-0">
                            <div className="input-group">
                                <input type="text" className="form-control form-control-sm" placeholder="New filename" aria-label="New filename" defaultValue={this.props.file.url} ref={el => this.newurl = el} />
                                <div className="input-group-append">
                                    <button className="btn btn-sm btn-outline-secondary pt-0 pb-0" type="button" title="Confirm" onClick={(e) => this.handleSubmitEditNameClick(e,this.newurl.value)}><Icon style={{ fontSize: 18 }} icon="check"></Icon></button>
                                    <button className="btn btn-sm btn-outline-secondary pt-0 pb-0" type="button" title="Cancel" onClick={(e) => this.handleCancelEditNameClick(e)}><Icon style={{ fontSize: 18 }} icon="cross"></Icon></button>
                                </div>
                            </div>
                        </form>
                    )}
                </td>
                <td className="text-nowrap d-none d-sm-table-cell text-right"><ReadableDate>{this.props.file.mtime}</ReadableDate></td>
                <td className="text-nowrap d-none d-sm-table-cell text-right"><ReadableOctets>{this.props.file.size}</ReadableOctets></td>
            </tr>
        );
    }

    handleCancelEditNameClick = (e) => {
        e.stopPropagation();
        e.nativeEvent.stopImmediatePropagation();
        this.props.dispatch(disableFileEditName(this.props.file));
    }

    handleSubmitEditNameClick = (e,newurl) => {
        e.stopPropagation();
        e.nativeEvent.stopImmediatePropagation();
        this.props.dispatch(renameFile(this.props.file, newurl));
    }

    handleSelectClick = (curVal) => {
        this.props.dispatch(toggleFileSelect(this.props.file));
        this.setState({});
    }

    handleFileClick = (e) => {
        e.stopPropagation();
        e.nativeEvent.stopImmediatePropagation();
        this.props.dispatch(previewFile(this.props.file));
    }
}

const mapStateToProps = (state) => {
    return {}
};

export default connect(mapStateToProps)(FileRow);