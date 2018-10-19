export const REFRESH_FILE_LIST = 'REFRESH_FILE_LIST';
export const RECEIVE_FILE_LIST = 'RECEIVE_FILE_LIST';
export const REQUEST_PATH = 'REQUEST_PATH';

export function requestPath() {
    return {
        type: REQUEST_PATH,
        loaded: false
    }
}

function receiveFiles(json) {
    dispatch ({
        type: RECEIVE_FILE_LIST,
        files: json
    });
    dispatch ({
        type: RECEIVE_PATH,
        loaded: true
    });
}

export function fetchFileList(path) {
    return dispatch => {
      dispatch(requestPath(path));
      return fetch(`http://localhost/web/app.php/api/cloud/navigate?path=${path}`)
        .then(response => response.json())
        .then(json => receiveFiles(json));
    }
}