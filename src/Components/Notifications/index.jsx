import React, { Component } from 'react';
import { connect } from 'react-redux'

import { removeNotification } from '../../Redux/actions/notifications';

class Notifications extends Component {

    render() {
        return (
            <div style={{position: "absolute", bottom: 0, right: 0}}>
                {this.props.notifications.map((n) => (
                    <div class="toast" role="alert" aria-live="assertive" aria-atomic="true" key={n.id}>
                        <div class="toast-header">
                            <strong class="mr-auto">{n.shortText}</strong>
                            {/* <small class="text-muted">just now</small> */}
                            <button type="button" class="ml-2 mb-1 close" data-dismiss="toast" aria-label="Close" onClick={(n) => this.handleCloseClicked(n)}>
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="toast-body">
                            {n.longText}
                        </div>
                    </div>
                ))}
            </div>
        );
    }

    handleCloseClicked = (notification) => {
        this.props.dispatch(removeNotification(notification));
    }
}

const mapStateToProps = (state) => {
    return {
        notifications: state.notifications.notifications
    }
};

export default connect(mapStateToProps)(Notifications);