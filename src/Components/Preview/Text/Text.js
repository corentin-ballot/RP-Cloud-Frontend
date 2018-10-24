import React, { Component } from 'react';

import './Text.css';

class Text extends Component {

    handleSaveClick = () => {
        fetch("http://localhost/web/app.php/api/cloud/savetextfile", {method: 'POST', body: JSON.stringify({fileurl: this.props.file.url, content: this.content.value})});
    }

    handleValueChange = () => {
        this.props.file.content = this.content.value;
        this.setState({});
    }

    componentWillMount() {
        this.props.addButton(this.props.file, "save", this.handleSaveClick);
        console.log(this.props);
    }

    render() {
        return (
            <div>
                <textarea className="cloud_preview_panel_item_textedit" ref={el => this.content=el} defaultValue={this.props.file.content} onChange={this.handleValueChange}></textarea>
            </div>
        );
    }
}

export default Text;