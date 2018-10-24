import { combineReducers } from 'redux';

import {navigation} from './navigation'
import {preview} from './preview'

export default combineReducers({
    navigation,
    preview
});