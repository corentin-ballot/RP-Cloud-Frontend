import React, { Component } from 'react';
import Image from './Image/Image';
import Text from './Text/Text';
import PDF from './PDF/PDF';
import Error from './Error/Error';
import Zip from './Zip/Zip';
import LoadingSpinner from '../../Components/LoadingSpinner';

import { connect } from 'react-redux'
import { selectPreview, closePreviewFile } from '../../Redux/actions/preview';

class Preview extends Component {

    handleTabClick = (file, index) => {
        this.props.dispatch(selectPreview(index));
    }

    handleCloseTabClick = (e, url) => {
        e.stopPropagation();
        e.nativeEvent.stopImmediatePropagation();
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
            <>
                <header className="sticky-top -shadow-sm bg-white" style={{ zIndex: 100 }}>
                    <ol className="nav nav-tabs" role="tablist">
                        {this.props.previewFiles.map((item, index) => (
                            <li key={item.url} className="nav-item" role="tab" aria-selected={index === this.props.activePreview}>
                                <button role="tab" className={`nav-link${index === this.props.activePreview ? " active" : ""} bg-transparent`} id={"preview-" + index} onClick={() => this.handleTabClick(item, index)} title={item.url}>
                                    {item.name}
                                    <button className="ml-2 mb-1 close" aria-label="Close" onClick={(e) => this.handleCloseTabClick(e, item.url)}>
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </button>
                            </li>
                        ))}
                    </ol>
                </header>

                <main style={{borderLeft: "1px solid #dee2e6",borderRight: "1px solid #dee2e6"}}>
                    {this.props.previewFiles.map((item, index) => (
                        <div key={item.url} role="tabpanel" className="" aria-labelledby={"preview-" + index} hidden={index !== this.props.activePreview}>
                            {
                                (typeof item.blob != 'undefined' && (
                                    (item.blob.type.match(/^image\/.*/) && <Image file={item} />)
                                    || (item.blob.type.match(/^(text\/.*|inode\/x-empty)/) && <Text file={item} />)
                                    || (item.blob.type === "application/pdf" && <PDF file={item} />)
                                    || (item.blob.type === "application/zip" && <Zip file={item} />)
                                )) || ((item.isContentLoaded && <Error />) || <LoadingSpinner />)
                            }
                        </div>
                    ))}
                </main>
            </>
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