import React, { Component } from 'react';

import './FilestableItem.css';

class FilestableItem extends Component {
    render() {
        return (
            <li className="filestable_content_item">
                <div className="filestable_content_item_select" onClick={() => this.props.onSelect(this.props.file)}><i className="material-icons">{this.props.file.is_selected? "check_box":(this.props.file.type === "dir"? "folder_open":"insert_drive_file")}</i></div>
                <div className="filestable_content_item_name">{this.props.file.name}</div>
                <div className="filestable_content_item_icons">
                    {this.props.file.type !== "dir" && <a className="filestable_content_item_icons_item"><i className="material-icons">file_download</i></a> }
                    {(this.props.file.edit_name !== true) && <button className="filestable_content_item_icons_item" onClick={() => this.props.onEditName(this.props.file)}><i className="material-icons">mode_edit</i></button>}
                    {(this.props.file.edit_name === true ) && <button className="filestable_content_item_icons_item" onClick={() => this.props.onEditNameSubmit(this.props.file)}><i className="material-icons">done</i></button>}
                    {(this.props.file.edit_name === true ) && <button className="filestable_content_item_icons_item" onClick={() => this.props.onEditNameCancel(this.props.file)}><i className="material-icons">clear</i></button>}
                </div>
                <div className="filestable_content_item_lastupdate">{this.props.file.last_modif}</div>
                <div className="filestable_content_item_size">{typeof this.props.file.size === undefined? "-":this.props.file.size}</div>
            </li>
        );
    }
}

export default FilestableItem;