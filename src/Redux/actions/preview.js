import { addNotification } from "./notifications";

export const ADD_PREVIEW_FILE = 'ADD_PREVIEW_FILE';
export const REMOVE_PREVIEW_FILE = 'REMOVE_PREVIEW_FILE';
export const REQUEST_PREVIEW_CONTENT = 'REQUEST_PREVIEW_CONTENT';
export const RECEIVE_PREVIEW_CONTENT = 'RECEIVE_PREVIEW_CONTENT';
export const UPDATE_PREVIEW_TAB = 'UPDATE_PREVIEW_TAB';

export function previewFile(file) {
    return function action(dispatch) {
        dispatch(addPreviewFile(file));
        fetch("/api/cloud/preview?fileurl=" + file.url, { method: 'POST' })
            .then(response => response.json())
            .then((json) => {
                dispatch(receivePreviewContent(file, json));
                if (typeof json.content !== 'string') dispatch(addNotification(json.msg, json.detail));
            });
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

function receivePreviewContent(file, json) {
    return {
        type: RECEIVE_PREVIEW_CONTENT,
        json,
        file
    }
}

export function selectPreview(index) {
    return {
        type: UPDATE_PREVIEW_TAB,
        index
    }
}

export function saveFile(fileurl, content) {
    return function action(dispatch) {
        fetch("/api/cloud/savetextfile", { method: 'POST', body: JSON.stringify({ fileurl: fileurl, content: content }) })
            .then(response => response.json())
            .then((json) => {
                if (typeof json.content !== 'string') dispatch(addNotification(json.msg, json.detail));
            });
    }
}