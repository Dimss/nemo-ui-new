import {
  SET_IMAGE_NAME,
  SET_UPLOAD_MODAL_VISIBLE
} from "../actions/appHeaderActions";

const defaultState = {
  imageName: "",
  uploadModalVisible: false
};

const appHeaderReducer = (state = defaultState, action) => {
  switch (action.type) {
    case SET_UPLOAD_MODAL_VISIBLE:
      return Object.assign({}, state, { uploadModalVisible: action.visible });
    case SET_IMAGE_NAME:
      return Object.assign({}, state, { imageName: action.imageName });
    default:
      return state;
  }
};

export default appHeaderReducer;
