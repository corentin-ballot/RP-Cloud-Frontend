import React, { Component } from 'react';

import { connect } from 'react-redux'
import { submitNewFile, hideNewFile } from '../../../../Redux/actions/files';

class FilestableNewFileItem extends Component {

    handleSubmitNewFileClick = (filename) => {
        this.props.dispatch(submitNewFile(this.props.path, filename));
    }

    handleCancelNewFileClick = () => {
        this.props.dispatch(hideNewFile());
    }

    render() {
        return (
            <li className="filestable_content_item">
                <div className="filestable_content_item_select"><i className="material-icons">note_add</i></div>
                <form className="filestable_content_item_name">
                    <input name="newfile" className="filestable_content_item_name_rename" type="text" placeholder="New file name" ref={el => this.filename=el} />
                </form>
                <div className="filestable_content_item_icons">
                    <button className="filestable_content_item_icons_item" onClick={() => this.handleSubmitNewFileClick(this.filename.value)}><i className="material-icons">done</i></button>
                    <button className="filestable_content_item_icons_item" onClick={() => this.handleCancelNewFileClick()}><i className="material-icons">clear</i></button>
                </div>
                <div className="filestable_content_item_lastupdate"></div>
                <div className="filestable_content_item_size"></div>
            </li>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        path: state.navigation.path
    }
};
  
export default connect(mapStateToProps)(FilestableNewFileItem);