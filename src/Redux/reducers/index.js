import { combineReducers } from 'redux';

import { navigation } from './navigation'
import { preview } from './preview'
import { notifications } from './notifications'

export default combineReducers({
    navigation,
    preview,
    notifications
});