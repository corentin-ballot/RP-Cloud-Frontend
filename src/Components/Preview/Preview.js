import React, { Component } from 'react';
import Image from './Image/Image';
import Text from './Text/Text';
import PDF from './PDF/PDF';
import Error from './Error/Error';
import Zip from './Zip/Zip';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner.js';

import { connect } from 'react-redux'
import { selectPreview, closePreviewFile } from '../../Redux/actions/preview';

import './Preview.css';

class Preview extends Component {

    handleTabClick = (file, index) => {
        this.props.dispatch(selectPreview(index));
    }

    handleCloseTabClick = (url) => {
        this.props.dispatch(closePreviewFile(url));
    }

    addButton = (file, label, callback) => {
        if (typeof file.actions === "undefined") {
            file.actions = [{ label: label, click: callback }];
        } else {
            if (typeof file.actions === "undefined") {
                file.actions = [{ label: label, click: callback }];
            } else {
                file.actions = [...file.actions, { label: label, click: callback }];
            }
        }
        this.setState({});
    }

    render() {
        return (
            <div className="cloud_preview" {...this.props}>
                <div className="cloud_preview_tabsbar" role="tablist">
                    {this.props.previewFiles.map((item, index) => (
                        <div key={item.url} className="cloud_preview_tabsbar_item" aria-selected={index === this.props.activePreview}>
                            <button role="tab" className="cloud_preview_tabsbar_item_name" id={"preview-" + index} onClick={() => this.handleTabClick(item, index)} title={item.url}> {item.name} </button>
                            <button className="cloud_preview_tabsbar_item_close_btn material-icons" onClick={() => this.handleCloseTabClick(item.url)}>close</button>
                        </div>
                    ))}
                </div>

                <div className="cloud_preview_panel">
                    {this.props.previewFiles.map((item, index) => (
                        <div key={item.url} role="tabpanel" className="cloud_preview_panel_item" aria-labelledby={"preview-" + index} hidden={index !== this.props.activePreview}>
                            {
                                (typeof item.blob != 'undefined' && (
                                    (item.blob.type.match(/^image\/.*/) && <Image file={item} />)
                                    || (item.blob.type.match(/^text\/.*/) && <Text file={item} />)
                                    || (item.blob.type === "application/pdf" && <PDF file={item} />)
                                    || (item.blob.type === "application/zip" && <Zip file={item} />)
                                )) || ((item.isContentLoaded && <Error />) || <LoadingSpinner />)
                            }
                        </div>
                    ))}
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        previewFiles: state.preview.fileList,
        activePreview: state.preview.activePreview
    }
};

export default connect(mapStateToProps)(Preview);