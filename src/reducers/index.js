import { combineReducers } from 'redux';
import {fileList, files} from './files';

export default combineReducers({
    fileList,
    files
});