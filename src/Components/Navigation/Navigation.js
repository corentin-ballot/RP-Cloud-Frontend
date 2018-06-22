import React, { Component } from 'react';

import Breadcrumb from './Breadcrumb/Breadcrumb';
import Filestable from './Filestable/Filestable';

import './Navigation.css';

class Navigation extends Component {
    state = {
        breadcrumb: this.getBreadcrumb(),
        baseroute: "/cloud",
    }

    getBreadcrumb() {
        return [
            {route: '/', folderName: '.'},
            {route: '/Documents', folderName: 'Documents'},
            {route: '/Documents/Cours', folderName: 'Cours'},
            {route: '/Documents/Cours/M2', folderName: 'M2'},
            {route: '/Documents/Cours/M2/S1', folderName: 'S1'},
            {route: '/Documents/Cours/M2/S1/WEB-IHM', folderName: 'WEB-IHM'},
        ];
    }

    render() {
        const { breadcrumb, baseroute } = this.state
        return (
            <div className="cloud_navigation">
              <Breadcrumb breadcrumb={breadcrumb} baseroute={baseroute} />
              <Filestable />
            </div>
        );
    }
}

export default Navigation;