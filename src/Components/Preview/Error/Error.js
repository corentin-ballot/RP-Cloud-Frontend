import React, { Component } from 'react';

import './Error.css';

import logo from './network-error.svg';

class Error extends Component {

    componentWillMount() {
        console.log(this.props);
    }

    render() {
        return (
            <div className="cloud_preview_panel_item_error">
                <img src={logo} alt="Error" />
            </div>
        );
    }
}

export default Error;