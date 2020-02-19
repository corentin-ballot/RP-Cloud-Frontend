import React, { Component } from 'react';

import { connect } from 'react-redux'
import { saveFile } from '../../../Redux/actions/preview';

import TextEditor from '../../TextEditor'

class Text extends Component {

    handleSaveClick = () => {
        this.props.dispatch(saveFile(this.props.file.url, this.props.file.content));
    }

    handleValueChange = (value) => {
        this.props.file.content = value;
        this.setState({});
    }

    componentWillMount() {
        let _this = this;
        var reader = new FileReader();
        reader.onload = function () {
            _this.handleValueChange(reader.result);
        }
        reader.readAsText(this.props.file.blob);
    }

    render() {
        return (
            <TextEditor lang="en" controlbar={this.props.file.url.match(/\.md$/)} allowfullscreen={true} allowpreview={this.props.file.url.match(/\.(md|html|htm)$/)} allowsave={true} value={this.props.file.content} onChange={this.handleValueChange.bind(this)} onSave={this.handleSaveClick.bind(this)} />
        );
    }
}

const mapStateToProps = (state) => {
    return {}
};

export default connect(mapStateToProps)(Text);