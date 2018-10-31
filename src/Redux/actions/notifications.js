export const ADD_NOTIFICATION = 'ADD_NOTIFICATION';
export const REMOVE_NOTIFICATION = 'REMOVE_NOTIFICATION';

export function addNotification(shortText, longText) {
    return {
        type: ADD_NOTIFICATION,
        notification: { id: Date.now(), shortText: shortText, longText: longText }
    }
}

export function removeNotification(notification) {
    return {
        type: REMOVE_NOTIFICATION,
        notification
    }
}