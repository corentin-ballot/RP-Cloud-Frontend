import React, { Component } from 'react';

import { connect } from 'react-redux'
import { submitNewDir, hideNewDir } from '../../../../Redux/actions/files';

class FilestableNewDirItem extends Component {

    handleSubmitNewDirClick = (dirname) => {
        this.props.dispatch(submitNewDir(this.props.path, dirname));
    }

    handleCancelNewDirClick = () => {
        this.props.dispatch(hideNewDir());
    }

    render() {
        return (
            <li className="filestable_content_item">
                <div className="filestable_content_item_select"><i className="material-icons">create_new_folder</i></div>
                <form className="filestable_content_item_name">
                    <input name="newfile" className="filestable_content_item_name_rename" type="text" placeholder="New dir name" ref={el => this.dirname=el} />
                </form>
                <div className="filestable_content_item_icons">
                    <button className="filestable_content_item_icons_item" onClick={() => this.handleSubmitNewDirClick(this.dirname.value)}><i className="material-icons">done</i></button>
                    <button className="filestable_content_item_icons_item" onClick={() => this.handleCancelNewDirClick()}><i className="material-icons">clear</i></button>
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
  
export default connect(mapStateToProps)(FilestableNewDirItem);