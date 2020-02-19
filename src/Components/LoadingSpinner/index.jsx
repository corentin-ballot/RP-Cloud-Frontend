import React, { Component } from 'react';

class LoadingSpinner extends Component {
    render() {
        return (
            <div class="spinner-border text-primary d-block mx-auto my-3" role="status">
                <span class="sr-only">Loading...</span>
            </div>
        );
    }
}

export default LoadingSpinner;