import React, { Component } from 'react';

import './FilestableActionsButton.css';

class FilestableActionsButton extends Component {
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
                    <button className="filestable_actions_button_action-icon" onClick={this.toggleMenu}><i className="material-icons">archive</i></button>
                    <button className="filestable_actions_button_action-icon" onClick={this.toggleMenu}><i className="material-icons">delete</i></button>
                    <button className="filestable_actions_button_action-icon" onClick={this.toggleMenu}><i className="material-icons">save_alt</i></button>
                    <button className="filestable_actions_button_action-icon" onClick={this.toggleMenu}><i className="material-icons">note_add</i></button>
                    <button className="filestable_actions_button_action-icon" onClick={this.toggleMenu}><i className="material-icons">create_new_folder</i></button>
                    <button className="filestable_actions_button_action-icon" onClick={this.toggleMenu}><i className="material-icons">visibility_off</i></button>
                </div>
                <button className="filestable_actions_button-icon" onClick={this.toggleMenu}><i className="material-icons">add</i></button>
            </div>
        );
    }
}

export default FilestableActionsButton;