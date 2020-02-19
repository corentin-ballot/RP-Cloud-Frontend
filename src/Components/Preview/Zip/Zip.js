import React, { Component } from 'react';

import { connect } from 'react-redux'

import ReadableOctets from '../../../Components/ReadableOctets';

class Zip extends Component {

    state = { zip: [] }

    process(entries) {
        let array = [];
        let contents = [];
        for (const entry of entries) {
            if (!entry.directory) {
                // eslint-disable-next-line
                let splitname = entry.filename.split(/\/(?=[^\/]+$)/);
                // create file obj
                let file = { name: splitname[splitname.length - 1], type: "file", size: entry.uncompressedSize, mtime: entry.lastModDateRaw * 100000, entry };
                // create dir if needed
                if (splitname.length > 1 && typeof contents[splitname[0]] === "undefined")
                    createDir(splitname[0]);
                // add file obj to parent dir
                splitname.length > 1 ? contents[splitname[0]].push(file) : array.push(file);
            }
        }
        this.setState({ zip: array });


        function createDir(dirname) {
            // eslint-disable-next-line
            let splitname = dirname.split(/\/(?=[^\/]+$)/);

            // create dir obj
            let dir = { name: splitname[splitname.length - 1], type: "dir", content: [] };
            // save content attribute reference
            contents[dirname] = dir.content;
            // create dir if needed
            if (splitname.length > 1 && typeof contents[splitname[0]] === "undefined")
                createDir(splitname[0]);
            // add dir obj to parent dir
            splitname.length > 1 ? contents[splitname[0]].push(dir) : array.push(dir);
        }
    }

    tmp() {
        let _this = this;
        // use a BlobReader to read the zip from a Blob object
        window.zip.createReader(new window.zip.BlobReader(this.props.file.blob), function (reader) {

            // get all entries from the zip
            reader.getEntries(function (entries) {
                if (entries.length) {
                    _this.process(entries);
                }
            });

            // Close reader after 30 seconds
            window.setTimeout(function () { reader.close(); }, 30000);
        }, function (error) {
            // onerror callback
        });
    }

    componentWillMount() {
        this.tmp();
    }

    render() {
        return (
            <div>
                {this.state.zip.map((e) => (
                    (e.type === "dir" && <ZipDir dir={e} />) || <ZipFile file={e} />
                ))}
            </div>
        );
    }
}

class ZipDir extends Component {

    state = {
        expanded: false
    }

    handleClick = () => {
        this.setState((prevState) => ({ expanded: !prevState.expanded }));
    }

    render() {
        return (
            <div aria-expanded={this.state.expanded}>
                <button className="btn btn-light w-100 text-left" onClick={this.handleClick}>
                    <span className="mr-2"><Icon icon="folder"/></span>
                    <span className="mr-2">{this.props.dir.name}</span>
                </button>
                <div className="ml-3 pl-3 border-left">
                    {this.props.dir.content.map((e) => (
                        (e.type === "dir" && <ZipDir dir={e} />) || <ZipFile file={e} />
                    ))}
                </div>
            </div>
        );
    }
}

class ZipFile extends Component {
    render() {
        return (
            <div className="d-flex align-items-center p-1">
                <Icon className="mr-2" icon="text_file"/>
                <span className="flex-grow-1 mr-2">{this.props.file.name}</span>
                <ReadableOctets className="mr-2">{this.props.file.size}</ReadableOctets>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {}
};

export default connect(mapStateToProps)(Zip);