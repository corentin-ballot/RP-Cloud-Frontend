import React, { Component } from 'react';

class Dropdown extends Component {
    state = {
        id: '_' + Math.random().toString(36).substr(2, 9),
        open: false,
    }

    toggleState = () => {
        this.setState(prevState => ({
            open: !prevState.open
        }));
    }

    render() {
        const { open } = this.state
        const Tag = this.props.tag||"div";
        
        let btn = {...this.props.btn};
        if(!btn.attrs) btn.attrs = {};
        if(!btn.attrs.className) btn.attrs.className = '';
        if(!btn.attrs.className.includes('dropdown-toggle'))btn.attrs.className=`dropdown-toggle ${btn.attrs.className}`;

        const id = btn.attrs.id||this.state.id;
        const BtnTag = this.props.btn.tag||"div";
        return (
            <Tag {...this.props} className={`dropdown${open? " show":""}${this.props.className? ` ${this.props.className}`:""}`} onClick={() => this.toggleState()}>
                <BtnTag id={id} data-toggle="dropdown" aria-haspopup="true" aria-expanded={open} {...btn.attrs}>{btn.text}</BtnTag>
                <div className={`dropdown-menu${open? " show":""}${this.props.direction==="right"? " dropdown-menu-right":""}`} aria-labelledby={id}>
                    {this.props.children}
                </div>
            </Tag>
        );
    }
}

export default Dropdown;