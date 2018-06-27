import React, { Component } from 'react';

import Breadcrumb from './Breadcrumb/Breadcrumb';
import Filestable from './Filestable/Filestable';

import './Navigation.css';

class Navigation extends Component {
    state = {
        breadcrumb: this.getBreadcrumb(),
        baseroute: "/cloud",
        displayHiddenFiles: false,
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

    handleToggleHiddenFilesClick = () => {
        this.setState(prevState => ({
            displayHiddenFiles: !prevState.displayHiddenFiles
        }));
    }

    render() {
        const { breadcrumb, baseroute, displayHiddenFiles } = this.state
        return (
            <div className="cloud_navigation">
              <Breadcrumb breadcrumb={breadcrumb} baseroute={baseroute} onClickToggleHiddenFiles={this.handleToggleHiddenFilesClick} />
              <Filestable displayHiddenFiles={displayHiddenFiles} />
            </div>
        );
    }
}

export default Navigation;