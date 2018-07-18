import React, { Component } from 'react';

import './Preview.css';

class Preview extends Component {
    state = {
        activePanel: 0,
    }

    handleTabClick = (index) => {
        this.setState({activePanel : index});
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

    render() {
        const { activePanel} = this.state

        return (
            <div className="cloud_preview">
                <div className="cloud_preview_tabsbar" role="tablist">
                    {this.props.preview.map((item, index) => (
                        <div key={item.u} className="cloud_preview_tabsbar_item" aria-selected={index === activePanel}>
                            <button role="tab" className="cloud_preview_tabsbar_item_name" id={"preview-" + index} onClick={() => this.handleTabClick(index)} title={item.u}> {item.n} </button>
                            <button className="cloud_preview_tabsbar_item_close_btn material-icons" onClick={() => this.handleCloseTabClick(index)}>close</button>
                        </div>
                    ))}
                </div>

                <div className="cloud_preview_panel">
                    {this.props.preview.map((item, index) => (
                        <div key={item.u} role="tabpanel" className="cloud_preview_panel_item" aria-labelledby={"preview-" + index} hidden={index !== activePanel}>{item.isLoaded ? "pending..." : item.content}</div>
                    ))}
                </div>
            </div>
        );
    }
}

export default Preview;