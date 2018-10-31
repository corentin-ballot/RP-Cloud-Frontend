const initialNotificationsState = {
    notifications: []
};

export const notifications = (state = initialNotificationsState, action) => {
    switch (action.type) {
        case 'ADD_NOTIFICATION':
            return {
                ...state,
                notifications: [...state.notifications, action.notification]
            };
        case 'REMOVE_NOTIFICATION':
            return {
                ...state,
                notifications: state.notifications.filter((e) => e.id !== action.notification.id)
            };
        default:
            return state;
    }
};