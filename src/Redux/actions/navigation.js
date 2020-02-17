import { addNotification } from "./notifications";
import { saveAs } from 'file-saver';

export const RECEIVE_FILE_LIST = 'RECEIVE_FILE_LIST';
export const REQUEST_FILE_LIST = 'REQUEST_FILE_LIST';
export const ENABLE_FILE_EDIT_NAME = 'ENABLE_FILE_EDIT_NAME';
export const DISABLE_FILE_EDIT_NAME = 'DISABLE_FILE_EDIT_NAME';
export const TOGGLE_SELECT_FILE = 'TOGGLE_SELECT_FILE';
export const SELECT_ALL_FILES = 'SELECT_ALL_FILES';
export const TOGGLE_NEW_DIR = 'TOGGLE_NEW_DIR';
export const TOGGLE_NEW_FILE = 'TOGGLE_NEW_FILE';
export const HIDE_NEW_DIR = 'HIDE_NEW_DIR';
export const HIDE_NEW_FILE = 'HIDE_NEW_FILE';
export const REFRESH_FILE_LIST = 'REFRESH_FILE_LIST';
export const TOGGLE_HIDDEN_FILES = 'TOGGLE_HIDDEN_FILES';
export const UPDATE_FILTER = 'UPDATE_FILTER';
export const SORT_BY = 'SORT_BY';

function pathToBreadcrumb(path) {
    return (path.slice(-1) === '/' ? path.substring(0, path.length - 1) : path).split('/').map((item, index, array) => {
        return { route: array.filter((x, y) => y <= index).join('/'), folderName: item }
    });
}

function requestFileList(path) {
    return {
        type: REQUEST_FILE_LIST,
        breadcrumb: pathToBreadcrumb(path),
        path
    }
}

function receiveFileList(json) {
    return {
        type: RECEIVE_FILE_LIST,
        fileList: json.sort((a, b) => {
            if (a.type === b.type) {
                if (a.firstname < b.firstname) return -1;
                if (a.firstname > b.firstname) return 1;
                return 0;
            } else if (a.type === "dir" && b.type === "file") return -1;
            else return 1;
        })
    };
}

export function fetchFileList(path) {
    return function action(dispatch) {
        dispatch(requestFileList(path));

        return fetch(`${process.env.REACT_APP_API_DIRECTORY}?url=${path}`, {
            method: 'GET'
        }).then(response => {
            if (response.ok) {
                response.json().then((json) => dispatch(receiveFileList(json)));
            } else {
                response.text().then((text) => { dispatch(receiveFileList([])); dispatch(addNotification(response.statusText, text)) });
            }
        })
    }
}

function receiveRefreshFileList(json) {
    return {
        type: REFRESH_FILE_LIST,
        //fileList: json.dirs.map((e, i, a) => { e.type = 'dir'; return e; }).concat(json.files)
        fileList: json.sort((a, b) => {
            if (a.type === "dir" && b.type === "file") return 1;
            if (a.type === b.type) {
                if (a.firstname < b.firstname) return -1;
                if (a.firstname > b.firstname) return 1;
                return 0;
            } else if (a.type === "dir" && b.type === "file") return 1;
            else return -1;
        })
    }
}

export function refreshFileList(path) {
    return function action(dispatch) {
        return fetch(`${process.env.REACT_APP_API_DIRECTORY}?url=${path}`, {
            method: 'GET'
        }).then(response => {
            if (response.ok) {
                response.json().then((json) => dispatch(receiveRefreshFileList(json)));
            } else {
                response.text().then((text) => { dispatch(receiveFileList([])); dispatch(addNotification(response.statusText, text)) });
            }
        })
    }
}

export function toggleFileSelect(file) {
    return {
        type: TOGGLE_SELECT_FILE,
        file
    }
}

export function selectAllFiles(selectStatus) {
    return {
        type: SELECT_ALL_FILES,
        selectStatus
    }
}

export function enableFileEditName(file) {
    return {
        type: ENABLE_FILE_EDIT_NAME,
        file
    }
}

export function disableFileEditName(file) {
    return {
        type: DISABLE_FILE_EDIT_NAME,
        file
    }
}

export function toggleNewDir() {
    return {
        type: TOGGLE_NEW_DIR,
    }
}

export function toggleNewFile() {
    return {
        type: TOGGLE_NEW_FILE,
    }
}

export function hideNewDir() {
    return {
        type: HIDE_NEW_DIR,
    }
}

export function hideNewFile() {
    return {
        type: HIDE_NEW_FILE,
    }
}

export function submitNewDir(path, name) {
    return function action(dispatch) {
        dispatch(hideNewDir());
        return fetch(process.env.REACT_APP_API_DIRECTORY, {
            method: 'POST',
            body: JSON.stringify({ url: path + '/' + name })
        }).then(response => {
            if (response.ok) {
                response.json().then((json) => { dispatch(refreshFileList(path)); dispatch(addNotification(json.msg, json.detail)); });
            } else {
                response.text().then((text) => { dispatch(receiveFileList([])); dispatch(addNotification(response.statusText, text)) });
            }
        })
    }
}

export function submitNewFile(path, name) {
    return function action(dispatch) {
        dispatch(hideNewFile());
        return fetch(process.env.REACT_APP_API_FILE, {
            method: 'POST',
            body: JSON.stringify({ url: path + '/' + name })
        }).then(response => {
            if (response.ok) {
                response.json().then((json) => { dispatch(refreshFileList(path)); dispatch(addNotification(json.msg, json.detail)); });
            } else {
                response.text().then((text) => { dispatch(receiveFileList([])); dispatch(addNotification(response.statusText, text)) });
            }
        })
    }
}

export function renameFile(file, newUrl) {
    return function action(dispatch) {
        return fetch(process.env.REACT_APP_API_FILE, {
            method: 'PUT',
            body: JSON.stringify({ url: file.url, newurl: newUrl })
        }).then(response => {
            if (response.ok) {
                response.json().then((json) => { dispatch(refreshFileList(file.url.replace(file.name, ''))); dispatch(addNotification(json.msg, json.detail)); });
            } else {
                response.text().then((text) => { dispatch(receiveFileList([])); dispatch(addNotification(response.statusText, text)) });
            }
        })
    }
}

export function uploadFiles(files, path) {
    return function action(dispatch) {
        let data = new FormData();
        data.append('url', path);
        files.forEach(function(file, index) {
            data.append('file-'+index, file, file.name)
        });
        fetch(process.env.REACT_APP_API_FILE, {
            method: 'POST',
            body: data
        }).then(response => {
            if (response.ok) {
                response.json().then((json) => { dispatch(refreshFileList(path)); dispatch(addNotification(json.msg, json.detail)); });
            } else {
                response.text().then((text) => { dispatch(receiveFileList([])); dispatch(addNotification(response.statusText, text)) });
            }
        })
    }
}

export function toggleHiddenFiles() {
    return {
        type: TOGGLE_HIDDEN_FILES
    }
}

export function compressFiles(files, path) {
    return function action(dispatch) {
        fetch(process.env.REACT_APP_API_ZIP, {
            method: 'POST',
            body: JSON.stringify({ url: path, files: files })
        }).then(response => {
            if (response.ok) {
                response.json().then((json) => { dispatch(refreshFileList(path)); dispatch(addNotification(json.msg, json.detail)); });
            } else {
                response.text().then((text) => { dispatch(receiveFileList([])); dispatch(addNotification(response.statusText, text)) });
            }
        })
    }
}

export function deleteFiles(urls, path) {
    return function action(dispatch) {
        for (let url in urls) {

            fetch(process.env.REACT_APP_API_FILE, {
                method: 'DELETE',
                body: JSON.stringify({ url: url })
            }).then(response => {
                if (response.ok) {
                    response.json().then((json) => { dispatch(refreshFileList(path)); dispatch(addNotification(json.msg, json.detail)); });
                } else {
                    response.text().then((text) => { dispatch(receiveFileList([])); dispatch(addNotification(response.statusText, text)) });
                }
            })
        }
    }
}

export function downloadFile(file) {
    return function action(dispatch) {
        fetch(process.env.REACT_APP_API_FILE + '?url=' + file.url, {
            method: 'GET'
        }).then(response => {
            if (response.ok) {
                response.blob().then(blob => saveAs(blob, file.name));
            } else {
                response.text().then((text) => { dispatch(addNotification(response.statusText, text)) });
            }
        });
    }
}

export function sortFilesBy(prop) {
    return {
        type: SORT_BY,
        prop
    }
}

export function filterFiles(filter) {
    return {
        type: UPDATE_FILTER,
        filter
    }
}