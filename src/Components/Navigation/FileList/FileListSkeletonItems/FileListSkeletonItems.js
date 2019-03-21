import React, { Component } from 'react';

import ReadableOctets from '../../../Conversion/ReadableOctets/ReadableOctets';
import ReadableDate from '../../../Conversion/ReadableDate/ReadableDate';

import './FileListSkeletonItems.css';
import LoadingSpinner from '../../../LoadingSpinner/LoadingSpinner';

class FileListSkeletonItems extends Component {

    generateName(minlength, maxlength) {
        let length = Math.floor(Math.random() * maxlength) + minlength;
        var text = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

        for (var i = 0; i < length; i++)
            text += possible.charAt(Math.floor(Math.random() * possible.length));

        return text;
    }

    generateDate() {
        let max = Date.now(), min = Date.now() * 0.99;
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    generateSize() {
        return Math.floor(Math.random() * 10000) + 0;
    }

    generateDirNumber(itemCount) {
        return Math.floor(Math.random() * (itemCount / 2));
    }

    render() {
        const itemCount = 6, dirNumber = this.generateDirNumber(itemCount);
        return (
            <div className="skeleton_screen">
                {[...Array(itemCount)].map((e, i) =>
                    <li className="filestable_content_item --skeleton">
                        <div className="filestable_content_item_select"><i className="material-icons">{i > dirNumber ? 'insert_drive_file' : 'folder'}</i></div>
                        <div className="filestable_content_item_name">{this.generateName(4, 30)}</div>
                        <div className="filestable_content_item_icons">
                            {i > dirNumber && <button className="filestable_content_item_icons_item"><i className="material-icons">file_download</i></button>}
                            <button className="filestable_content_item_icons_item"><i className="material-icons">mode_edit</i></button>
                        </div>

                        <ReadableOctets className="filestable_content_item_size">{i > dirNumber ? this.generateSize() : 'NaN'}</ReadableOctets>
                        <ReadableDate className="filestable_content_item_lastupdate">{this.generateDate()}</ReadableDate>
                    </li>
                )}
                <div className="skeleton_screen__spinner"><LoadingSpinner /></div>
            </div>
        );
    }
}

export default FileListSkeletonItems;