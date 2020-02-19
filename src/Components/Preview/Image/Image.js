import React, { Component } from 'react';

class Image extends Component {

    constructor(props) {
        super(props);

        this.state = {
            url: URL.createObjectURL(this.props.file.blob)
        }
    }

    render() {
        return (
            <div className="text-center">
                <a href={this.state.url}><img className="mh-100 mw-100 h-auto w-auto" src={this.state.url} alt={'preview ' + this.props.file.name + ' image file'} /></a>
            </div>
        );
    }
}

export default Image;