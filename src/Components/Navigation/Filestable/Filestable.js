import React, { Component } from 'react';

import './Filestable.css';
import FilestableItem from './FilestableItem/FilestableItem.js';
import FilestableNewFileItem from './FilestableNewFileItem/FilestableNewFileItem.js';
import FilestableNewDirItem from './FilestableNewDirItem/FilestableNewDirItem.js';

class Filestable extends Component {
    state = {
        allSelected: false,
    }

    handleEditNameClick = (file) => {
        file.edit_name = true;
        this.setState({})
    }

    handleCancelEditNameClick = (file) => {
        file.edit_name = false;
        this.setState({})
    }

    handleSubmitEditNameClick = (file) => {
        file.edit_name = false;
        this.setState({})
    }

    handleSelectClick = (file) => {
        file.is_selected = typeof file.is_selected === undefined? true:!file.is_selected;
        this.setState({})
    }

    handleSelectAllClick = () => {
        this.setState(prevState => ({
            files : prevState.files.map((file) => {
                file.is_selected = !prevState.allSelected;
                return file;
            }),
            allSelected : !prevState.allSelected
        }));
    }

    render() {
        const { allSelected } = this.state
        return (
            <div className="filestable">
                <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
                <header className="filestable_header">
                    <div className="filestable_header_select" onClick={this.handleSelectAllClick}><i className="material-icons">{allSelected? "check_box":"check_box_outline_blank"}</i></div>
                    <div className="filestable_header_name">Name</div>
                    <div className="filestable_header_icons"></div>
                    <div className="filestable_header_lastupdate">Last update</div>
                    <div className="filestable_header_size">Size</div>
                </header>
                <ol className="filestable_content">
                    {this.props.displayNewFile && <FilestableNewFileItem />}
                    {this.props.displayNewDir && <FilestableNewDirItem />}
                    {this.props.files.map((item) => (
                        (item.name.charAt(0)!=="." || (item.name.charAt(0)==="." && this.props.displayHiddenFiles)) && <FilestableItem file={item} key={item.url} baseroute={this.props.baseroute} onSelect={this.handleSelectClick} onEditName={this.handleEditNameClick} onEditNameSubmit={this.handleSubmitEditNameClick} onEditNameCancel={this.handleCancelEditNameClick}/>
                    ))}
                </ol>
            </div>
        );
    }
}

export default Filestable;