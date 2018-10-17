import React, { Component } from 'react';

import './LoadingSpinner.css';

class LoadingSpinner extends Component {
    render() {
        return (
            <div class="lds-dual-ring"></div>
        );
    }
}

export default LoadingSpinner;