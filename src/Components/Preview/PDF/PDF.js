import React, { Component } from 'react';

import './PDF.css';

class PDF extends Component {

    render() {
        return (
                <embed className="cloud_preview_panel_item_pdf" src={this.props.file.url} alt="pdf" pluginspage="http://www.adobe.com/products/acrobat/readstep2.html"></embed>
        );
    }
}

export default PDF;