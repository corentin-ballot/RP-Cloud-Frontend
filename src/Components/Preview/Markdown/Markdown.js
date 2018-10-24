import React, { Component } from 'react';
import ReactMarkdown from 'react-markdown';

import Text from '../Text/Text';

import './Markdown.css';

class Markdown extends Component {
    state = {
        preview_mode: true,
        preview_content: this.props.file.content,
    }

    handleSwapClick = () => {
        this.setState(prevState => (
            {preview_mode: !prevState.preview_mode, preview_content: this.props.file.content}
        ));
    };

    componentWillMount() {
        this.props.addButton(this.props.file, "code", this.handleSwapClick);
    }

    render() {
        return (
            <div>
                <div style={this.state.preview_mode ? {display: 'none'} : {display: 'block'}}>
                    <Text file={this.props.file} addButton={this.props.addButton} />
                </div>
                <div className="modal-markdown-textpreview" style={this.state.preview_mode ? {display: 'block'} : {display: 'none'}}>
                    <ReactMarkdown source={this.state.preview_content} skipHtml={false} escapeHtml={false} />
                </div>
            </div>
        );
    }
}

export default Markdown;