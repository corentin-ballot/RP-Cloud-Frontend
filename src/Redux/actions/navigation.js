import { addNotification } from "./notifications";

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

        return fetch(`/api/cloud/browse?path=${path}`, { method: 'POST' })
            .then(response => response.json())
            .then(json => dispatch(receiveFileList(json)))
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
        return fetch(`/api/cloud/browse?path=${path}`, { method: 'POST' })
            .then(response => response.json())
            .then(json => dispatch(receiveRefreshFileList(json)));
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
        return fetch('/api/cloud/newdir', {
            method: 'POST',
            body: JSON.stringify({ dirname: name, path: path })
        }).then(response => response.json()).then((json) => {
            dispatch(refreshFileList(path));
            dispatch(addNotification(json.msg, json.detail));
        });
    }
}

export function submitNewFile(path, name) {
    return function action(dispatch) {
        dispatch(hideNewFile());
        return fetch('/api/cloud/newfile', {
            method: 'POST',
            body: JSON.stringify({ filename: name, path: path })
        }).then(response => response.json()).then((json) => {
            dispatch(refreshFileList(path));
            dispatch(addNotification(json.msg, json.detail));
        });
    }
}

export function renameFile(file, newUrl) {
    return function action(dispatch) {
        return fetch("/api/cloud/rename?fileurl=" + file.url + "&newurl=" + newUrl, { method: 'POST' })
            .then(response => response.json()).then((json) => {
                dispatch(refreshFileList(file.url.replace(file.name, '')));
                dispatch(addNotification(json.msg, json.detail));
            });
    }
}

export function uploadFiles(files, path) {
    return function action(dispatch) {
        let data = new FormData();
        data.append('path', path);
        data.append('files', files);

        fetch('/api/cloud/upload', {
            method: 'POST',
            body: data
        }).then(response => response.json()).then((json) => {
            dispatch(refreshFileList(path));
            dispatch(addNotification(json.msg, json.detail));
        });
    }
}

export function toggleHiddenFiles() {
    return {
        type: TOGGLE_HIDDEN_FILES
    }
}

export function compressFiles(urls, path) {
    return function action(dispatch) {
        fetch("/api/cloud/zip?files=" + JSON.stringify(urls) + "&path=" + path)
            .then(response => response.json()).then((json) => {
                dispatch(refreshFileList(path));
                dispatch(addNotification(json.msg, json.detail));
            });
    }
}

export function deleteFiles(urls, path) {
    return function action(dispatch) {
        fetch("/delete?files=" + JSON.stringify(urls), { method: 'POST' })
            .then(response => response.json()).then((json) => {
                dispatch(fetchFileList(path));
                dispatch(addNotification(json.msg, json.detail));
            });
    }
}