import React, { Component } from 'react';
import Markdown from './Markdown/Markdown';
import Image from './Image/Image';
import Text from './Text/Text';
import HTML from './HTML/HTML';
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
                            {!item.isContentLoaded && <LoadingSpinner />}
                            {
                                typeof item.type !== "undefined" && (
                                    (item.type === "markdown" && <Markdown file={item} addButton={this.addButton} />)
                                    || (item.type === "image" && <Image url={item.url} alt={item.name} addButton={this.addButton} />)
                                    || (item.type === "text" && <Text file={item} addButton={this.addButton} />)
                                    || (item.type === "html" && <HTML file={item} addButton={this.addButton} />)
                                    || (item.type === "zip" && <Zip file={item} addButton={this.addButton} />)
                                    || (item.type === "pdf" && <PDF file={item} addButton={this.addButton} />)
                                    || (item.type === "error" && <Error />)
                                )
                            }
                            <div className="cloud_preview_panel_item_actions_group">
                                {
                                    typeof item.actions !== "undefined" && item.actions.map((e, i, a) => (
                                        <button className="cloud_preview_panel_item_action" onClick={e.click} key={e.label}><i className="material-icons">{e.label}</i></button>
                                    ))
                                }
                            </div>
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