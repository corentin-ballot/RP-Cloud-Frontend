import React, { Component } from 'react';

class PDF extends Component {

    constructor(props) {
        super(props);

        this.state = {
            url: URL.createObjectURL(this.props.file.blob)
        }
    }

    render() {
        return (
            <embed className="h-100 w-100" src={this.state.url} alt="pdf" pluginspage="http://www.adobe.com/products/acrobat/readstep2.html"></embed>
        );
    }
}

export default PDF;