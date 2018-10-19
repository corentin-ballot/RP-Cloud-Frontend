const initialState = {
  fileList: [],
  isFileListLoaded: true,
  previewFileList: []
};

export const fileList = (state = initialState, action) => {
  switch (action.type) {
    case 'RECEIVE_FILE_LIST':
      return {
        ...state,
        fileList: action.fileList,
        isFileListLoaded: true
      };
    case 'ADD_FILE':
      return {
        ...state,
        fileList: [...state.fileList, action.file]
      };
    case 'REMOVE_FILE':
      return {
        ...state,
        fileList: state.fileList.filter(file => file.url !== action.file.url)
      };
    case 'TOGGLE_SELECT_FILE':
      return {
        ...state,
        fileList: state.fileList.map(file => (file.url === action.file.url) ? {...file, selected: !file.selected} : file)
      };
    case 'REQUEST_FILE_LIST':
      return {
        ...state,
        isFileListLoaded: false
      };
    default:
      return state;
  }
};

export const previewFileList = (state = [], action) => {
  switch (action.type) {
    case 'ADD_PREVIEW_FILE':
      return {
        ...state,
        previewFileList: [...state.previewFileList, {url: action.file.url, name: action.file.name}]
      }
    case 'REMOVE_PREVIEW_FILE':
      return {
        ...state,
        previewFileList: state.previewFileList.filter(file => file.url !== action.file.url)
      }
    case 'ADD_PREVIEW_CONTENT':
      return {
        ...state,
        previewFileList: state.previewFileList.map(file => (file.url === action.file.url) ? {...file, content: action.file.content} : file)
      }
    default:
      return state;
  }
};

export default fileList;