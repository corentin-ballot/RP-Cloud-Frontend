import React, { Component } from 'react';

import './Breadcrumb.css';

class Breadcrumb extends Component {
    render() {
        return (
            <ul className="cloud_navigation_breadcrumb">
                {this.props.breadcrumb.map((item) => (
                    <li className="cloud_navigation_breadcrumb_item">
                        <a title={item.folderName} href={this.props.baseroute + item.route}>{item.folderName}</a>
                    </li>
                ))}
            </ul>
        );
    }
}

export default Breadcrumb;