import React, { Component } from 'react';

import './LoadingSpinner.css';

class LoadingSpinner extends Component {
    render() {
        return (
            <div class="lds-dual-ring">
                <div class="lds-ripple"><div></div><div></div></div>
            </div>
        );
    }
}

export default LoadingSpinner;