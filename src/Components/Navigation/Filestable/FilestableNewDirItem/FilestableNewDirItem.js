import React, { Component } from 'react';

class FilestableNewDirItem extends Component {
    render() {
        return (
            <li className="filestable_content_item">
                <div className="filestable_content_item_select"><i className="material-icons">create_new_folder</i></div>
                <form className="filestable_content_item_name">
                    <input name="newfile" className="filestable_content_item_name_rename" type="text" placeholder="New dir name" ref={el => this.dirname=el} />
                </form>
                <div className="filestable_content_item_icons">
                    <button className="filestable_content_item_icons_item" onClick={() => this.props.onClickSubmit(this.dirname.value)}><i className="material-icons">done</i></button>
                    <button className="filestable_content_item_icons_item" onClick={this.props.onClickCancel}><i className="material-icons">clear</i></button>
                </div>
                <div className="filestable_content_item_lastupdate"></div>
                <div className="filestable_content_item_size"></div>
            </li>
        );
    }
}

export default FilestableNewDirItem;