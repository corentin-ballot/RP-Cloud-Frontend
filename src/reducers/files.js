export const fileList = (state = [], action) => {
    switch (action.type) {
      case 'RECEIVE_FILE_LIST':
        return [
            action.files
          ];
      case 'ADD_FILE':
        return [
            ...state,action.file
          ];
      case 'TOGGLE_FILE_SELECT':
        return state.map(file =>
          (file.url === action.url)
            ? {...file, selected: !file.selected}
            : file
        );
      default:
        return state;
    }
};

export const files = (state = [], action) => {
    switch (action.type) {
      case 'REQUEST_PATH':
        return [
            ...state,action.path, action.loaded
        ];
      case 'RECEIVE_PATH':
        return [
            ...state, action.loaded
        ];
      default:
        return state;
    }
}