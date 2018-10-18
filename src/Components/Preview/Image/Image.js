import React, { Component } from 'react';

import './Image.css';

class Image extends Component {

    render() {
        return (
            <div>
                <img src={this.props.url} alt={this.props.alt} />
            </div>
        );
    }
}

export default Image;