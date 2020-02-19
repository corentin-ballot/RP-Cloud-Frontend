import React, { Component } from 'react';

import logo from './network-error.svg';

class Error extends Component {

    render() {
        return (
            <img src={logo} alt="Error" />
        );
    }
}

export default Error;