import React, { Component } from 'react';
import Dropzone from 'react-dropzone'

import Breadcrumb from './Breadcrumb/Breadcrumb';
import Filestable from './Filestable/Filestable';

import './Navigation.css';

class Navigation extends Component {

    onDrop(files) {
        
    }

    render() {
        return (
            <div className="cloud_navigation">
                <Breadcrumb />

                {/*<Dropzone className="cloud_navigation_dropzone" onDrop={this.onDrop.bind(this)} disableClick>
                    <Filestable />
                </Dropzone>*/}
            </div>
        );
    }
}

export default Navigation;