import React, { Component } from 'react';

import './LoadingSpinner.css';

class LoadingSpinner extends Component {
    render() {
        return (
            <div className="lds-dual-ring"></div>
        );
    }
}

export default LoadingSpinner;