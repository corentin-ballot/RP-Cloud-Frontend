import React, { Component } from 'react';

import { connect } from 'react-redux'
import { saveFile } from '../../../Redux/actions/preview';

import Editor from 'for-editor'

import './Text.css';

class Text extends Component {

    handleSaveClick = () => {
        this.props.dispatch(saveFile(this.props.file.url, this.props.file.content));
    }

    handleValueChange = (value) => {
        this.props.file.content = value;
        this.setState({});
    }

    componentWillMount() {
        this.props.addButton(this.props.file, "save", this.handleSaveClick);
    }

    render() {
        return (
            <div className="cloud_preview_panel_item_container">
                <Editor style="height: 100%;border: none;" value={this.props.file.content} onChange={this.handleValueChange.bind(this)} onSave={this.handleSaveClick.bind(this)} />
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {}
};

export default connect(mapStateToProps)(Text);