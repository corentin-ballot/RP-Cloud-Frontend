import React, { Component } from 'react';

import './Image.css';

class Image extends Component {

    render() {
        return (
            <div className="cloud_preview_panel_item_image">
                <a href={this.props.url}><img src={this.props.url} alt={this.props.alt} /></a>
            </div>
        );
    }
}

export default Image;