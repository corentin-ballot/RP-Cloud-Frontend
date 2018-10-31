import React, { Component } from 'react';
import { connect } from 'react-redux'

import Notification from './Notification/Notification';

import './Notifications.css';

class Notifications extends Component {

    render() {
        return (
            <div className="cloud_notifications">
                {this.props.notifications.map((e) => (
                    <Notification data={e} key={e.id} />
                ))}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        notifications: state.notifications.notifications
    }
};
  
export default connect(mapStateToProps)(Notifications);