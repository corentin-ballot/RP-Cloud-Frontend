import React, { Component } from 'react';

import { connect } from 'react-redux'
import { submitNewFile, hideNewFile } from '../../Redux/actions/navigation';

import Icon from '../Icon';

class NewFileRow extends Component {

    render() {
        return (
            <tr>
                <td className="text-nowrap"><Icon icon="text_file"/></td>
                <td className="w-100">
                    <form className="form-group m-0">
                        <div className="input-group">
                            <input type="text" className="form-control form-control-sm" placeholder="New file name" aria-label="New file name" ref={el => this.newurl = el} />
                            <div className="input-group-append">
                                <button className="btn btn-sm btn-outline-secondary pt-0 pb-0" type="button" title="Confirm" onClick={() => this.handleSubmitNewFileClick(this.newurl.value)}><Icon style={{ fontSize: 18 }} icon="check"></Icon></button>
                                <button className="btn btn-sm btn-outline-secondary pt-0 pb-0" type="button" title="Cancel" onClick={() => this.handleCancelClick()}><Icon style={{ fontSize: 18 }} icon="cross"></Icon></button>
                            </div>
                        </div>
                    </form>
                </td>
                <td className="text-nowrap d-none d-sm-table-cell">{/* NO UPDATE DATE YET */}</td>
                <td className="text-nowrap d-none d-sm-table-cell">{/* NO SIZE YET */}</td>
            </tr>
        );
    }

    handleCancelClick = () => {
        this.props.dispatch(hideNewFile());
    }

    handleSubmitNewFileClick = (filename) => {
        this.props.dispatch(submitNewFile(this.props.path, filename));
    }
}

const mapStateToProps = (state) => {
    return {
        path: state.navigation.path
    }
};

export default connect(mapStateToProps)(NewFileRow);