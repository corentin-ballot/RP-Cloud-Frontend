import React, { Component } from 'react';

import './Preview.css';

class Preview extends Component {
    state = {
        activePanel: 0,
    }

    handleTabClick = (index) => {
        this.setState({activePanel : index});
    }

    render() {
        const { activePanel} = this.state

        return (
            <div className="cloud_preview">
                <div className="cloud_preview_tabsbar" role="tablist">
                    {this.props.preview.map((item, index) => (
                        <button role="tab" className="cloud_preview_tabsbar_item" id={"preview-" + index} aria-selected={index === activePanel} onClick={() => this.handleTabClick(index)} title={item.u + item.n}>{item.n}</button>
                    ))}
                </div>

                <div className="cloud_preview_panel">
                    {this.props.preview.map((item, index) => (
                        <div role="tabpanel" className="cloud_preview_panel_item" aria-labelledby={"preview-" + index} hidden={index !== activePanel}>{index + " : " + item.content}</div>
                    ))}
                </div>
            </div>
        );
    }
}

export default Preview;