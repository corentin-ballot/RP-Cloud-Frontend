import React, { Component } from 'react';

class ReadableDate extends Component {
    render() {
        return (
            <span {...this.props}>
                {(this.props.children === '' || typeof this.props.children === 'undefined') ? '' : new Intl.DateTimeFormat('fr-FR', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' }).format(this.props.children)}
            </span >
        );
    }
}

export default ReadableDate;