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

    render() {
        const { dropdown_open } = this.state
        return (
            <ul className="cloud_navigation_breadcrumb">
                {this.props.breadcrumb.map((item, i, breadcrumb) => {
                    if (breadcrumb.length - 1 === i) {
                        // last one
                        return (
                            <li className="cloud_navigation_breadcrumb_item" key={item.route}>
                                <button className="cloud_navigation_breadcrumb_item_dropdown" onClick={this.handleDropdownclick}>{i === 0 ? <i className="material-icons">cloud</i>:item.folderName}<i className="material-icons">keyboard_arrow_down</i></button>
                                <ul className="cloud_navigation_breadcrumb_item_dropdown_menu" aria-expanded={dropdown_open}>
                                    <li><button onClick={this.props.onClickDeleteFiles}>Delete files</button></li>
                                    <li><button onClick={this.props.onClickNewFile}>Add new file</button></li>
                                    <li><button onClick={this.props.onClickNewDir}>Add new folder</button></li>
                                    <li><button>Upload file</button></li>
                                    <li><button onClick={this.props.onClickToggleHiddenFiles}>Toggle hidden files</button></li>
                                </ul>
                            </li>
                        )
                    } else {
                        return (
                            <li className="cloud_navigation_breadcrumb_item" key={item.route}>
                                <Link title={item.folderName} to={this.props.baseroute + item.route + window.location.hash} className="cloud_navigation_breadcrumb_item_text">{i === 0 ? <i className="material-icons">cloud</i>:item.folderName}</Link>
                            </li>
                        )
                    }
                })}
            </ul>
        );
    }
}

export default Breadcrumb;