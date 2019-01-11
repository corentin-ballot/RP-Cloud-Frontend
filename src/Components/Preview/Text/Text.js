import React, { Component } from 'react';

import { connect } from 'react-redux'
import { saveFile } from '../../../Redux/actions/preview';

import './Text.css';

class Text extends Component {

    handleSaveClick = () => {
        this.props.dispatch(saveFile(this.props.file.url, this.content.value));
    }

    handleValueChange = () => {
        this.props.file.content = this.content.value;
        this.setState({});
    }

    componentWillMount() {
        this.props.addButton(this.props.file, "save", this.handleSaveClick);
    }

    render() {
        return (
            <div className="cloud_preview_panel_item_container">
                <textarea className="cloud_preview_panel_item_textedit" wrap="off" ref={el => this.content = el} defaultValue={this.props.file.content} onChange={this.handleValueChange}></textarea>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {}
};

export default connect(mapStateToProps)(Text);