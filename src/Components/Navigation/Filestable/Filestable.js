import React, { Component } from 'react';

import './Filestable.css';

class Filestable extends Component {
    render() {
        return (
            <div className="filestable">
                <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
                <header className="filestable_header">
                    <div className="filestable_header_select"><i class="material-icons">check_box_outline_blank</i></div>
                    <div className="filestable_header_name">Name</div>
                    <div className="filestable_header_icons"></div>
                    <div className="filestable_header_lastupdate">Last update</div>
                    <div className="filestable_header_size">Size</div>
                </header>
                <ol className="filestable_content">
                    {this.props.filestable.dirs.map((item) => (
                        <li className="filestable_content_item">
                            <div className="filestable_content_item_select"><i class="material-icons">folder_open</i></div>
                            <div className="filestable_content_item_name">{item.name}</div>
                            <div className="filestable_content_item_icons">
                                <button><i className="material-icons">mode_edit</i></button>
                                <button><i className="material-icons">done</i></button>
                                <button><i className="material-icons">clear</i></button>
                            </div>
                            <div className="filestable_content_item_lastupdate">{item.last_modif}</div>
                            <div className="filestable_content_item_size">-</div>
                        </li>
                    ))}
                    {this.props.filestable.files.map((item) => (
                        <li class="filestable_content_item">
                            <div className="filestable_content_item_select"><i class="material-icons">insert_drive_file</i></div>
                            <div className="filestable_content_item_name">{item.name}</div>
                            <div className="filestable_content_item_icons">
                                <a><i className="material-icons">file_download</i></a>
                                <button className="mdl-button"><i class="material-icons">mode_edit</i></button>
                                <button className="mdl-button"><i class="material-icons">done</i></button>
                                <button className="mdl-button"><i class="material-icons">clear</i></button>
                            </div>
                            <div className="filestable_content_item_lastupdate">{item.last_modif}</div>
                            <div className="filestable_content_item_size">{item.size}</div>
                        </li>
                    ))}
                </ol>
            </div>
        );
    }
}

export default Filestable;