import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux'

import './style.css';

class Breadcrumb extends Component {

    render() {
        return (
            <ul className="breadcrumb">
                {this.props.breadcrumb.map((item, i, breadcrumb) => {
                    return (
                        <li className="breadcrumb_item" key={item.route}>
                            <Link title={item.folderName} to={(i === 0 ? '/' : item.route) + window.location.hash} className="breadcrumb_item_text">
                                {i === 0 ? <i className="material-icons">cloud</i> : item.folderName}
                            </Link>
                        </li>
                    )
                })}
            </ul>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        breadcrumb: state.navigation.breadcrumb
    }
};

export default connect(mapStateToProps)(Breadcrumb);