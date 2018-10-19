import { combineReducers } from 'redux';
import {fileList, previewFileList} from './files'

export default combineReducers({
    fileList,
    previewFileList
});