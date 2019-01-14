import React, { Component } from 'react';

class ReadableDate extends Component {
    timeDifference(current, previous) {
        var msPerMinute = 60 * 1000;
        var msPerHour = msPerMinute * 60;
        var msPerDay = msPerHour * 24;
        var msPerMonth = msPerDay * 30;
        var msPerYear = msPerDay * 365;

        var elapsed = current - previous;

        if (elapsed < msPerMinute) {
            return Math.round(elapsed / 1000) + ((elapsed / 1000) < 2 ? ' second' : ' seconds') + ' ago';
        } else if (elapsed < msPerHour) {
            return Math.round(elapsed / msPerMinute) + ((elapsed / msPerMinute) < 2 ? ' minute' : ' minutes') + ' ago';
        } else if (elapsed < msPerDay) {
            return Math.round(elapsed / msPerHour) + ((elapsed / msPerHour) < 2 ? ' hour' : ' hours') + ' ago';
        } else if (elapsed < msPerMonth) {
            return Math.round(elapsed / msPerDay) + ((elapsed / msPerDay) < 2 ? ' day' : ' days') + ' ago';
        } else if (elapsed < msPerYear) {
            return Math.round(elapsed / msPerMonth) + ((elapsed / msPerMonth) < 2 ? ' month' : ' months') + ' ago';
        } else {
            return Math.round(elapsed / msPerYear) + ((elapsed / msPerYear) < 2 ? ' year' : ' years') + ' ago';
        }
    }

    render() {
        return (
            <span {...this.props} title={(this.props.children === '' || typeof this.props.children === 'undefined') ? '' : new Intl.DateTimeFormat('fr-FR', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' }).format(this.props.children)}>
                {this.timeDifference(Date.now(), this.props.children)}
            </span >
        );
    }
}

export default ReadableDate;