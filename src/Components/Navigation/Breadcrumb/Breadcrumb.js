import React, { Component } from 'react';

import { Link } from 'react-router-dom';

import './Breadcrumb.css';

class Breadcrumb extends Component {
    state = {
        dropdown_open: false,
    }

    handleDropdownclick = () => {
        this.setState((prevState) => {return {dropdown_open: !prevState.dropdown_open}})
    }

    handleDownloadfilesClick = () => {
        this.props.DropdownRef.open();
    }

    render() {
        return (
            <ul className="cloud_navigation_breadcrumb">
                {this.props.breadcrumb.map((item, i, breadcrumb) => {
                    return (
                        <li className="cloud_navigation_breadcrumb_item" key={item.route}>
                            <Link title={item.folderName} to={(i === 0 ? '/' : item.route) + window.location.hash} className="cloud_navigation_breadcrumb_item_text">{i === 0 ? <i className="material-icons">cloud</i>:item.folderName}</Link>
                        </li>
                    )
                })}
            </ul>
        );
    }
}

export default Breadcrumb;