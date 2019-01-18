import {
  SET_FEED,
  SET_CURRENT_IMAGE_ID,
  SET_COMMENT,
  SET_COMMENT_MODAL_VISIBLE
} from "../actions/feedActions";

const defaultState = {
  feed: [],
  currentImageId: null,
  comment: "",
  commentModalVisible: false
};

const feedReducer = (state = defaultState, action) => {
  switch (action.type) {
    case SET_COMMENT_MODAL_VISIBLE:
      return Object.assign({}, state, { commentModalVisible: action.visible });    
    case SET_COMMENT:
      return Object.assign({}, state, { comment: action.comment });
    case SET_CURRENT_IMAGE_ID:
      console.log(action.imageId);
      return Object.assign({}, state, { currentImageId: action.imageId });
    case SET_FEED:
      return Object.assign({}, state, { feed: action.feed });
    default:
      return state;
  }
};

export default feedReducer;
