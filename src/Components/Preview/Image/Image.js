import React, { Component } from 'react';

import './Image.css';

class Image extends Component {

    constructor(props) {
        super(props);

        this.state = {
            url: URL.createObjectURL(this.props.file.blob)
        }
    }

    render() {
        return (
            <div className="cloud_preview_panel_item_image">
                <a href={this.state.url}><img src={this.state.url} alt={'preview ' + this.props.file.name + ' image file'} /></a>
            </div>
        );
    }
}

export default Image;