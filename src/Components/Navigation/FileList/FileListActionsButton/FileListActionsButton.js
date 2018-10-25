import React, { Component } from 'react';

import './FileListActionsButton.css';

class FileListActionsButton extends Component {
    state = {
        hidden: true
    }

    toggleMenu = () => {
        this.setState(prevState => ({
            hidden: !prevState.hidden
        }));
    }

    render() {
        return (
            <div className="filestable_actions_button-container" aria-expanded={!this.state.hidden}>
                <div className="filestable_actions_button_actions-container">
                    {this.props.children}
                </div>
                <button className="filestable_actions_button-icon" onClick={this.toggleMenu}><i className="material-icons">add</i></button>
            </div>
        );
    }
}

export default FileListActionsButton;