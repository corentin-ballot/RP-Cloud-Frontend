import React, { Component } from 'react';

import './HTML.css';

class HTML extends Component {

    componentWillMount() {
        console.log(this.props);
    }

    render() {
        return (
            <div>
                <div dangerouslySetInnerHTML={{__html: this.props.file.content}}></div>
            </div>
        );
    }
}

export default HTML;