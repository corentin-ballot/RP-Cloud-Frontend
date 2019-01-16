import React, { Component } from 'react';

import { connect } from 'react-redux'
import { saveFile } from '../../../Redux/actions/preview';

import TextEditor from '../../TextEditor'

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
                <TextEditor lang="en" controlbar={typeof this.props.markdown !== 'undefined' ? this.props.markdown : false} allowfullscreen={false} allowpreview={false} allowsave={false} value={this.props.file.content} onChange={this.handleValueChange.bind(this)} onSave={this.handleSaveClick.bind(this)} />
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {}
};

export default connect(mapStateToProps)(Text);