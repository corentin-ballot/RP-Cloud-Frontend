import React, { Component } from 'react';

class ReadableOctets extends Component {
    humanFileSize(size) {
        var i = Math.floor(Math.log(size) / Math.log(1024));
        return isNaN(size) ? '' : (size === 0) ? '0 B' : (size / Math.pow(1024, i)).toFixed(2) * 1 + ' ' + ['B', 'kB', 'MB', 'GB', 'TB'][i];
    };

    render() {
        return (
            <span {...this.props}>
                {this.humanFileSize(this.props.children)}
            </span >
        );
    }
}

export default ReadableOctets;