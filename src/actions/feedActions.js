import ApiClient from "../api/APIClient";
import { notification } from "antd";
export const SET_FEED = "SET_FEED";
export const SET_CURRENT_IMAGE_ID = "SET_CURRENT_IMAGE_ID";
export const SET_COMMENT_MODAL_VISIBLE = "SET_COMMENT_MODAL_VISIBLE";
export const SET_COMMENT = "SET_COMMENT";

export const setComment = comment => {
  return {
    type: SET_COMMENT,
    comment: comment
  };
};

export const setCommentModalVisible = visible => {
  return {
    type: SET_COMMENT_MODAL_VISIBLE,
    visible: visible
  };
};

export const setCurrentImageId = imageId => {
  return {
    type: SET_CURRENT_IMAGE_ID,
    imageId: imageId
  };
};

export const setFeed = feed => {
  return {
    type: SET_FEED,
    feed: feed
  };
};

export function loadFeed() {
  return async (dispatch, getState) => {
    let err, resData;
    [err, resData] = await new ApiClient().fetchUserFeed();
    if (err) {
      notification.error({ message: "Error", description: err.message });
    } else {
      notification.success({
        message: "Success",
        description: "User feed is loaded"
      });
      dispatch(setFeed(resData.data));
    }
  };
}

export function addLike(imageId) {
  return async (dispatch, getState) => {
    let err, resData;
    [err, resData] = await new ApiClient().addLike(imageId);
    if (err) {
      notification.error({ message: "Error", description: err.message });
    } else {
      dispatch(loadFeed());
    }
  };
}

export function addComment(imageId) {
  return async (dispatch, getState) => {
    let { comment, currentImageId } = getState().feedReducer;

    let err, resData;
    [err, resData] = await new ApiClient().addComment(comment, currentImageId);
    if (err) {
      notification.error({ message: "Error", description: err.message });
    } else {
      dispatch(loadFeed());
    }
  };
}

export function deleteImage() {
  return async (dispatch, getState) => {
    let { currentImageId } = getState().feedReducer;
    let err, resData;
    [err, resData] = await new ApiClient().deleteLink(currentImageId);
    if (err) {
      notification.error({ message: "Error", description: err.message });
    } else {
      dispatch(loadFeed());
    }
  };
}
