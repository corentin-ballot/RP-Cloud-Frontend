export const REFRESH_FILE_LIST = 'REFRESH_FILE_LIST';
export const RECEIVE_FILE_LIST = 'RECEIVE_FILE_LIST';

export const REQUEST_FILE_LIST = 'REQUEST_FILE_LIST';

function pathToBreadcrumb(path) {
    return (path.slice(-1)==='/'? path.substring(0, path.length - 1):path).split('/').map((item, index, array) => {
        return {route:array.filter((x, y) => y <= index).join('/'), folderName: item}
    });
}

export function requestPath(path) {
    return {
        type: REQUEST_FILE_LIST,
        breadcrumb: pathToBreadcrumb(path)
    }
}

function receiveFiles(json) {
    return {
        type: RECEIVE_FILE_LIST,
        files: json
    };
}

export function fetchFileList(path) {
    return dispatch => {
      dispatch(requestPath(path));
      return fetch(`http://localhost/web/app.php/api/cloud/navigate?path=${path}`)
        .then(response => response.json())
        .then(json => dispatch(receiveFiles(json)));
    }
}

export function uploadFiles(files) {
    files.forEach(file => {
        let data = new FormData();
        data.append('path', window.location.pathname.replace(this.props.baseroute, ''));
        data.append('file', file);

        fetch('http://localhost/web/app.php/api/cloud/uploadfile', {
            method: 'POST',
            body: data
        }).then(
            // TODO : Reload file list or add new files 
        );
    });
}