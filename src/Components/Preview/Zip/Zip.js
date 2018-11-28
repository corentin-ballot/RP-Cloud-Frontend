import React, { Component } from 'react';

import { connect } from 'react-redux'

import './Zip.css';
import ReadableOctets from '../../Conversion/ReadableOctets/ReadableOctets';
import ReadableDate from '../../Conversion/ReadableDate/ReadableDate';

class Zip extends Component {

    componentWillMount() {
        //this.props.addButton(this.props.file, "extract", () => { });
    }

    render() {
        return (
            <div className="cloud_preview_panel_item_container">
                {this.props.file.content.map((e) => (
                    (e.type === "dir" && <ZipDir dir={e} />) || <ZipFile file={e} />
                ))}
            </div>
        );
    }
}

class ZipDir extends Component {

    state = {
        expanded: false
    }

    handleClick = () => {
        this.setState((prevState) => ({ expanded: !prevState.expanded }));
    }

    render() {
        return (
            <div aria-expanded={this.state.expanded} className="cloud_preview_panel_item_zip_dir">
                <button className="cloud_preview_panel_item_zip_dir_infos" onClick={this.handleClick}>
                    <span className="cloud_preview_panel_item_zip_dir_infos_icon"><i className="material-icons">{this.state.expanded ? "folder_open" : "folder"}</i></span>
                    <span className="cloud_preview_panel_item_zip_dir_infos_name">{this.props.dir.name}</span>
                </button>
                <div className="cloud_preview_panel_item_zip_dir_content">
                    {this.props.dir.content.map((e) => (
                        (e.type === "dir" && <ZipDir dir={e} />) || <ZipFile file={e} />
                    ))}
                </div>
            </div>
        );
    }
}

class ZipFile extends Component {
    render() {
        return (
            <div className="cloud_preview_panel_item_zip_file">

                <span className="cloud_preview_panel_item_zip_file_icon"><i className="material-icons">insert_drive_file</i></span>
                <span className="cloud_preview_panel_item_zip_file_name">{this.props.file.name}</span>
                <ReadableOctets className="cloud_preview_panel_item_zip_file_size">{this.props.file.size}</ReadableOctets>
                <ReadableDate className="cloud_preview_panel_item_zip_file_mtime">{this.props.file.mtime}</ReadableDate>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {}
};

export default connect(mapStateToProps)(Zip);