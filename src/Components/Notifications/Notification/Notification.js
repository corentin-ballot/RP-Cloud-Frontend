import React, { Component } from 'react';
import { connect } from 'react-redux'

import { removeNotification } from '../../../Redux/actions/notifications';

import './Notification.css';

class Notification extends Component {

    state = {
        open: false
    }

    handleNotificationCloseClicked = (notification) => {
        this.props.dispatch(removeNotification(notification));
    }

    handleTitleClicked = () => {
        this.setState((prevState) => {
            return {
                open: !prevState.open
            }
        });
    }

    render() {
        return (
            <div className="cloud_notifications_item" aria-expanded={this.state.open}>
                <div className="cloud_notifications_item_header">
                    <button className="cloud_notifications_item_header_text" onClick={() => this.handleTitleClicked()} title={this.props.data.text} dangerouslySetInnerHTML={{ __html: (this.props.data.shortText || '') }}></button>
                    <button className="cloud_notifications_item_header_close" onClick={() => this.handleNotificationCloseClicked(this.props.data)}><i className="material-icons">close</i></button>
                </div>
                <div className="cloud_notifications_item_body" dangerouslySetInnerHTML={{ __html: (this.props.data.longText || '') }}></div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {}
};

export default connect(mapStateToProps)(Notification);