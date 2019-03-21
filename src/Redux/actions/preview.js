import { addNotification } from "./notifications";

export const ADD_PREVIEW_FILE = 'ADD_PREVIEW_FILE';
export const REMOVE_PREVIEW_FILE = 'REMOVE_PREVIEW_FILE';
export const REQUEST_PREVIEW_CONTENT = 'REQUEST_PREVIEW_CONTENT';
export const RECEIVE_PREVIEW_CONTENT = 'RECEIVE_PREVIEW_CONTENT';
export const UPDATE_PREVIEW_TAB = 'UPDATE_PREVIEW_TAB';

export function previewFile(file) {
    return function action(dispatch) {
        dispatch(addPreviewFile(file));
        fetch('/api/cloud/file?url=' + file.url, { method: 'GET' })
            .then(response => {
                if (response.ok) {
                    // response.json().then((json) => { dispatch(receivePreviewContent(file, json)); });
                    response.blob().then((blob) => { dispatch(receivePreviewContent(file, blob)); });
                } else {
                    response.text().then((text) => { dispatch(receivePreviewContent(file, { type: 'error' })); dispatch(addNotification(response.statusText, text)) });
                }
            })
    }
}

export function closePreviewFile(url) {
    return {
        type: REMOVE_PREVIEW_FILE,
        url
    }
}

function addPreviewFile(file) {
    return {
        type: ADD_PREVIEW_FILE,
        file
    }
}

function receivePreviewContent(file, blob) {
    return {
        type: RECEIVE_PREVIEW_CONTENT,
        blob,
        file
    }
}

export function selectPreview(index) {
    return {
        type: UPDATE_PREVIEW_TAB,
        index
    }
}

export function saveFile(path, content) {
    return function action(dispatch) {
        fetch('/api/cloud/file', {
            method: 'PUT',
            body: JSON.stringify({ url: path, content: content })
        }).then(response => {
            if (response.ok) {
                response.json().then((json) => { dispatch(addNotification(json.msg, json.detail)) });
            } else {
                response.text().then((text) => { dispatch(addNotification(response.statusText, text)) });
            }
        })
    }
}