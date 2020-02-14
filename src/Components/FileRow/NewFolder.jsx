import React, { Component } from 'react';

import { connect } from 'react-redux'
import { submitNewDir, hideNewDir } from '../../Redux/actions/navigation';

import Icon from '../Icon';

class NewDirRow extends Component {

    render() {
        return (
            <tr>
                <td className="text-nowrap"><Icon icon="folder"/></td>
                <td className="w-100">
                    <form className="form-group m-0">
                        <div className="input-group">
                            <input type="text" className="form-control form-control-sm" placeholder="New directory name" aria-label="New directory name" ref={el => this.newurl = el} />
                            <div className="input-group-append">
                                <button className="btn btn-sm btn-outline-secondary pt-0 pb-0" type="button" title="Confirm" onClick={() => this.handleSubmitNewDirClick(this.newurl.value)}><Icon style={{ fontSize: 18 }} icon="check"></Icon></button>
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
        this.props.dispatch(hideNewDir());
    }

    handleSubmitNewDirClick = (filename) => {
        this.props.dispatch(submitNewDir(this.props.path, filename));
    }
}

const mapStateToProps = (state) => {
    return {
        path: state.navigation.path
    }
};

export default connect(mapStateToProps)(NewDirRow);