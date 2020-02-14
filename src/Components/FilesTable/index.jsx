import React, { Component } from 'react';
import Dropzone from 'react-dropzone'

import FileRow from '../FileRow';
import NewFileRow from '../FileRow/NewFile';
import NewDirRow from '../FileRow/NewFolder';

// import SkeletonFileRow from '../../skeleton/file_row';


import { selectAllFiles, compressFiles, deleteFiles, uploadFiles, enableFileEditName, downloadFile } from '../../Redux/actions/navigation';

import { connect } from 'react-redux'

class FilesTable extends Component {
    state = {
        allSelected: false,
    }

    render() {
        const selectedFiles = this.props.fileList.filter(file => file.selected);
        return (
            <div className={this.props.className + " overflow-hidden h-100 container-fluid flex-grow-1 flex-shrink-1 position-relative"}>
            <Dropzone className="overflow-auto h-100 position-static" onDrop={this.onDrop.bind(this)} disableClick ref={(node) => { this.props.dropzone.ref = node; }}>
                <table className="table table-hover h-auto">
                    <thead className="sticky-top bg-white shadow-sm" style={{zIndex:999}}>
                        <tr>
                            <th scope="col" onClick={() => this.handleSelectAllClicked(this.state.allSelected)}>
                                <input type="checkbox" id="select_all" checked={this.state.allSelected} style={{ marginLeft: "2px" }} onChange={() => this.handleSelectAllClicked(this.state.allSelected)}/>
                            </th>
                            <th scope="col w-100">Name</th>
                            <th scope="col" className="d-none d-sm-table-cell">Modified</th>
                            <th scope="col" className="d-none d-sm-table-cell">Size</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* Skeleton */}
                        {/* {!this.props.isFileListLoaded && <FileListSkeletonItems />} */}
                        {/* New file form */}
                        {this.props.isFileListLoaded && this.props.displayNewFile && <NewFileRow />}
                        {/* New dir form */}
                        {this.props.isFileListLoaded && this.props.displayNewDir && <NewDirRow />}
                        {/* Files */}
                        {this.props.isFileListLoaded && this.props.fileList.filter((f) => f.name.includes(this.props.filter)).sort((a,b) => {
                            if(a.type==="dir"&&b.type==="dir")
                                return this.props.sort.dir==="ASC"?a[this.props.sort.prop]>b[this.props.sort.prop]:a[this.props.sort.prop]<b[this.props.sort.prop];
                            else if(a.type==="dir")
                                return this.props.sort.dir==="DSC";
                            else if(b.type==="dir")
                                return this.props.sort.dir==="ASC";
                            else return this.props.sort.dir==="ASC"?a[this.props.sort.prop]>b[this.props.sort.prop]:a[this.props.sort.prop]<b[this.props.sort.prop]
                        }).map((item) => (
                            /*(item.name.charAt(0) !== "." || (item.name.charAt(0) === "." && this.props.displayHiddenFiles)) &&*/ <FileRow file={item} key={item.url} />
                        ))}
                    </tbody>
                    <tfoot className="position-absolute mw-100 overflow-auto" style={{ bottom: selectedFiles.length>0 ? 0 : -50, opacity: selectedFiles.length>0 ? 1:0, left: 0, right: 0, transition: 'all ease .5s' }}>
                        <tr className="d-flex justify-content-sm-center pl-0 pr-0 pt-2 pb-2">
                            <td>
                                <button className="btn btn-secondary ml-2" onClick={() => this.handleEditNameClick()}>Rename</button>
                                <button className="btn btn-secondary ml-2" onClick={() => this.handleDownloadfilesClick()}>Download</button>
                                <button className="btn btn-secondary ml-2" onClick={() => this.handleCompressfilesClick()}>Compress</button>
                                <button className="btn btn-danger ml-2 mr-2" onClick={() => this.handleDeletefilesClick()}>Delete</button>
                            </td>
                        </tr>
                    </tfoot>
                    <caption className="mb-5">{`${selectedFiles.length} of ${this.props.fileList.length} selected ${this.props.fileList.length > 1 ? 'files' : 'file'} in `}<code>{this.props.path}</code></caption>
                </table>
            </Dropzone>
            </div>
        );
    }

    handleSelectAllClicked = (curVal) => {
        this.props.dispatch(selectAllFiles(!curVal));
        this.setState({allSelected: !curVal});
    }

    handleEditNameClick = () => {
        this.props.fileList.filter(file => file.selected).forEach(file => this.props.dispatch(enableFileEditName(file)));
    }

    handleDownloadfilesClick = () => {
        let n = this.props.fileList.filter(file => file.selected).length;
        if (n === 1) this.props.dispatch(downloadFile(this.props.file));
        else {
            // TODO compress files and download archive
            //this.props.dispatch(compressFiles(this.props.fileList.filter((e) => e.selected).map((e) => e.url), this.props.path));
        }
    }

    handleCompressfilesClick = () => {
        this.props.dispatch(compressFiles(this.props.fileList.filter((e) => e.selected).map((e) => e.url), this.props.path));
    }

    handleDeletefilesClick = () => {
        this.props.dispatch(deleteFiles(this.props.fileList.filter((e) => e.selected).map((e) => e.url), this.props.path));
    }

    onDrop(files) {
        this.props.dispatch(uploadFiles(files, this.props.path));
    }
}

const mapStateToProps = (state) => {
    return {
        fileList: state.navigation.fileList,
        isFileListLoaded: state.navigation.isFileListLoaded,
        displayHiddenFiles: state.navigation.displayHiddenFiles,
        displayNewDir: state.navigation.displayNewDir,
        displayNewFile: state.navigation.displayNewFile,
        path: state.navigation.path,
        filter: state.navigation.filter,
        sort: state.navigation.sort
    }
};

export default connect(mapStateToProps)(FilesTable);