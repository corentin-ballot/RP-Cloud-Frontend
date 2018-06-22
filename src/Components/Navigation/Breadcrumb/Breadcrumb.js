import React, { Component } from 'react';

import './Breadcrumb.css';

class Breadcrumb extends Component {
    render() {
        return (
            <ul className="cloud_navigation_breadcrumb">
                {this.props.breadcrumb.map((item, i, breadcrumb) => {
                    if (breadcrumb.length - 1 === i) {
                        // last one
                        return (
                            <li className="cloud_navigation_breadcrumb_item" key={item.route}>
                                <button className="cloud_navigation_breadcrumb_item_dropdown">{item.folderName}<i class="material-icons">keyboard_arrow_down</i></button>
                                <ul className="cloud_navigation_breadcrumb_item_dropdown_menu">
                                    <li>Download files</li>
                                    <li>Delete files</li>
                                    <li>Add new file</li>
                                    <li>Add new folder</li>
                                    <li>Upload file</li>
                                    <li>Hide hidden files</li>
                                    <li>Show hidden files</li>
                                </ul>
                            </li>
                        )
                    } else {
                        return (
                            <li className="cloud_navigation_breadcrumb_item" key={item.route}>
                                <a title={item.folderName} href={this.props.baseroute + item.route}>{item.folderName}</a>
                            </li>
                        )
                    }
                })}
            </ul>
        );
    }
}

export default Breadcrumb;