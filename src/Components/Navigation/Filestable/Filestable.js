import React, { Component } from 'react';

import './Filestable.css';
import FilestableItem from './FilestableItem/FilestableItem.js';

class Filestable extends Component {
    state = {
        allSelected: false,
        files: this.getFilesinfos(),
    }

    getFilesinfos() {
        return ([
            {name:".","url":"/.",type:"dir",last_modif:"14/12/2017 20:15"},
            {name:"..","url":"/..",type:"dir",last_modif:"23/05/2018 19:08"},
            {name:"Documents","url":"/Documents",type:"dir",last_modif:"12/11/2017 15:33"},
            {name:"markdown_cheatsheet.md",type:"file",url:"/markdown_cheatsheet.md",size:"2,82 Ko",last_modif:"05/06/2018 19:02"},
            {name:"notes.md",type:"file",url:"/notes.md",size:"2,85 Ko",last_modif:"20/12/2017 8:53"},
            {name:"speedshare",type:"file",url:"/speedshare",size:"245 o",last_modif:"26/09/2017 8:51"}
        ].map((item, i, breadcrumb) => {
            if(item.type === "dir")
                item.url = this.props.baseroute + item.url;
            return item;
        }));
    }

    handleEditNameClick = (file) => {
        file.edit_name = true;
        this.setState({})
    }

    handleCancelEditNameClick = (file) => {
        file.edit_name = false;
        this.setState({})
    }

    handleSubmitEditNameClick = (file) => {
        file.edit_name = false;
        this.setState({})
    }

    handleSelectClick = (file) => {
        file.is_selected = typeof file.is_selected === undefined? true:!file.is_selected;
        this.setState({})
    }

    handleSelectAllClick = () => {
        this.setState(prevState => ({
            files : prevState.files.map((file) => {
                file.is_selected = !prevState.allSelected;
                return file;
            }),
            allSelected : !prevState.allSelected
        }));
    }

    render() {
        const { files, allSelected } = this.state
        return (
            <div className="filestable">
                <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
                <header className="filestable_header">
                    <div className="filestable_header_select" onClick={this.handleSelectAllClick}><i className="material-icons">{allSelected? "check_box":"check_box_outline_blank"}</i></div>
                    <div className="filestable_header_name">Name</div>
                    <div className="filestable_header_icons"></div>
                    <div className="filestable_header_lastupdate">Last update</div>
                    <div className="filestable_header_size">Size</div>
                </header>
                <ol className="filestable_content">
                    {files.map((item) => (
                        (item.name.charAt(0)!="." || (item.name.charAt(0)=="." && this.props.displayHiddenFiles)) && <FilestableItem file={item} key={item.url} onSelect={this.handleSelectClick} onEditName={this.handleEditNameClick} onEditNameSubmit={this.handleSubmitEditNameClick} onEditNameCancel={this.handleCancelEditNameClick}/>
                    ))}
                </ol>
            </div>
        );
    }
}

export default Filestable;