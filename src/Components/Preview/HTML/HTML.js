import React, { Component } from 'react';

import './HTML.css';

class HTML extends Component {

    render() {
        return (
            <div>
                <div dangerouslySetInnerHTML={{__html: this.props.content}}></div>
            </div>
        );
    }
}

export default HTML;