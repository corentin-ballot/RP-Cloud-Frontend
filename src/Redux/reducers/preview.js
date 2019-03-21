const initialPreviewState = {
  fileList: [],
  activePreview: 0
}

export const preview = (state = initialPreviewState, action) => {
  switch (action.type) {
    case 'ADD_PREVIEW_FILE':
      return state.fileList.map(file => file.url).indexOf(action.file.url) === -1 ? {
        ...state,
        fileList: [...state.fileList, { url: action.file.url, name: action.file.name }],
        activePreview: state.fileList.length
      } : {
          ...state,
          activePreview: state.fileList.map(file => file.url).indexOf(action.file.url)
        }
    case 'REMOVE_PREVIEW_FILE':
      return {
        ...state,
        fileList: state.fileList.filter(file => file.url !== action.url),
        activePreview: state.fileList.map(file => file.url).indexOf(action.url) <= state.activePreview ? state.activePreview === 0 ? state.activePreview : state.activePreview - 1 : state.activePreview
      }
    case 'REQUEST_PREVIEW_CONTENT':
      return {
        ...state,
        fileList: state.fileList.map(file => (file.url === action.file.url) ? { ...file, isContentLoaded: false } : file)
      }
    case 'RECEIVE_PREVIEW_CONTENT':
      return {
        ...state,
        fileList: state.fileList.map(file => (file.url === action.file.url) ? { ...file, blob: action.blob, isContentLoaded: true } : file)
      }
    case 'UPDATE_PREVIEW_TAB':
      return {
        ...state,
        activePreview: action.index
      }
    default:
      return state;
  }
};