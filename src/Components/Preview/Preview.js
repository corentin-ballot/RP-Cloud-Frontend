import React, { Component } from 'react';
import Markdown from './Markdown/Markdown';
import Image from './Image/Image';
import Text from './Text/Text';
import HTML from './HTML/HTML';

import './Preview.css';

class Preview extends Component {

    handleTabClick = (file, index) => {
        this.props.preview.selectedFile = index;
        this.setState({});
    }

    handleCloseTabClick = (index) => {
        var encoded_arr = window.location.hash === "" ? "[]" : window.location.hash;
        var decoded_arr = decodeURIComponent(encoded_arr).replace('#','');
        var arr = JSON.parse(decoded_arr);
        arr.splice(index, 1);
        window.location.hash = encodeURIComponent(JSON.stringify(arr));

        if(this.state.activePanel >= arr.length) {
            this.setState({activePanel : arr.length-1});
        }
    }

    addButton = (file, label, callback) => {
        if(typeof file.preview === "undefined"){
            file.preview.actions = [{label: label, click: callback}];
        }else{
            if(typeof file.preview.actions === "undefined"){
                file.preview.actions = [{label: label, click: callback}];
            }else{
                file.preview.actions = [...file.preview.actions, {label: label, click: callback}];
            }
        }
        this.setState({});
    }

    render() {
        return (
            <div className="cloud_preview">
                <div className="cloud_preview_tabsbar" role="tablist">
                    {this.props.preview.files.map((item, index) => (
                        <div key={item.url} className="cloud_preview_tabsbar_item" aria-selected={index === this.props.preview.selectedFile}>
                            <button role="tab" className="cloud_preview_tabsbar_item_name" id={"preview-" + index} onClick={() => this.handleTabClick(item, index)} title={item.url}> {item.name} </button>
                            <button className="cloud_preview_tabsbar_item_close_btn material-icons" onClick={() => this.props.onCloseTab(item.url)}>close</button>
                        </div>
                    ))}
                </div>

                <div className="cloud_preview_panel">
                    {this.props.preview.files.map((item, index) => (
                        <div key={item.url} role="tabpanel" className="cloud_preview_panel_item" aria-labelledby={"preview-" + index} hidden={index !== this.props.preview.selectedFile} /*dangerouslySetInnerHTML={{__html: item.isLoaded ? item.content : 'Loading content, please wait...'}}*/>
                            {
                                typeof item.preview !== "undefined" && (
                                    (item.preview.type === "markdown" && <Markdown file={item} addButton={this.addButton} />)
                                 || (item.preview.type === "image" && <Image url={item.preview.url} alt={item.name} addButton={this.addButton} />)
                                 || (item.preview.type === "text" && <Text file={item} addButton={this.addButton} />)
                                 || (item.preview.type === "html" && <HTML file={item} addButton={this.addButton} />)
                                )
                            }
                            {
                                typeof item.preview !== "undefined" && typeof item.preview.actions !== "undefined" && item.preview.actions.map((e, i, a) => (
                                    <button className="cloud_preview_panel_item_action" onClick={e.click} key={e.label}>{e.label}</button>
                                ))
                            }
                        </div>
                    ))}
                </div>
            </div>
        );
    }
}

export default Preview;