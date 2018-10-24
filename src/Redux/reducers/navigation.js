const initialNavigationState = {
  fileList: [],
  isFileListLoaded: true,
  previewFileList: [],
  breadcrumb: [],
  displayHiddenFiles: false,
  displayNewDir: false,
  displayNewFile: false,
  path: '/'
};

export const navigation = (state = initialNavigationState, action) => {
  switch (action.type) {
    case 'RECEIVE_FILE_LIST':
      return {
        ...state,
        fileList: action.fileList,
        isFileListLoaded: true
      };
    case 'REFRESH_FILE_LIST':
      return {
        ...state,
        fileList: action.fileList.map(function(e,i,a) {
          return {...state.fileList.filter((function(elem, index, self) {
            return index === self.map((element) => element.url).indexOf(e.url);
          }))[0], ...e}
        })
      }
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
    case 'SELECT_ALL_FILES' :
      return {
        ...state,
        fileList: state.fileList.map(file => ({...file, selected: action.selectStatus}))
      }
    case 'REQUEST_FILE_LIST':
      return {
        ...state,
        breadcrumb: action.breadcrumb,
        path: action.path,
        isFileListLoaded: false
      };
    case 'ENABLE_FILE_EDIT_NAME':
      return {
        ...state,
        fileList: state.fileList.map(file => (file.url === action.file.url) ? {...file, editName: true} : file)
      }
    case 'DISABLE_FILE_EDIT_NAME':
      return {
        ...state,
        fileList: state.fileList.map(file => (file.url === action.file.url) ? {...file, editName: false} : file)        
      }
    case 'DISPLAY_NEW_DIR':
      return {
        ...state,
        displayNewDir: true
      }
    case 'DISPLAY_NEW_FILE':
      return {
        ...state,
        displayNewFile: true
      }
    case 'HIDE_NEW_DIR':
      return {
        ...state,
        displayNewDir: false
      }
    case 'HIDE_NEW_FILE':
      return {
        ...state,
        displayNewFile: false
      }  
    default:
      return state;
  }
};