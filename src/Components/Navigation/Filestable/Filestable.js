import React, { Component } from 'react';

import './Filestable.css';
import FilestableItem from './FilestableItem/FilestableItem.js';

class Filestable extends Component {
    render() {
        return (
            <div className="filestable">
                <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
                <header className="filestable_header">
                    <div className="filestable_header_select"><i class="material-icons">check_box_outline_blank</i></div>
                    <div className="filestable_header_name">Name</div>
                    <div className="filestable_header_icons"></div>
                    <div className="filestable_header_lastupdate">Last update</div>
                    <div className="filestable_header_size">Size</div>
                </header>
                <ol className="filestable_content">
                    {this.props.filestable.dirs.concat(this.props.filestable.files).map((item) => (
                        <FilestableItem file={item} key={item.url} />
                    ))}
                </ol>
            </div>
        );
    }
}

export default Filestable;