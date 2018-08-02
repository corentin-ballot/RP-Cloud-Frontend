import React, { Component } from 'react';
import ReactMarkdown from 'react-markdown';

import Text from '../Text/Text';

import './Markdown.css';

class Markdown extends Component {
    state = {
        preview_mode: true,
        preview_content: this.props.file.preview.content,
    }

    handleSwapClick = () => {
        console.log(this.state.preview_mode);
        this.setState(prevState => (
            {preview_mode: !prevState.preview_mode, preview_content: this.props.file.preview.content}
        ));
    }

    render() {
        return (
            <div>
                <button onClick={this.handleSwapClick}>Preview/Edit</button>
                <div style={this.state.preview_mode ? {display: 'none'} : {display: 'block'}}>
                    <Text  content={this.props.file.preview.content} file={this.props.file} />
                </div>
                <div className="modal-markdown-textpreview" style={this.state.preview_mode ? {display: 'block'} : {display: 'none'}}>
                    <ReactMarkdown source={this.state.preview_content} skipHtml={false} escapeHtml={false} />
                </div>
            </div>
        );
    }
}

export default Markdown;