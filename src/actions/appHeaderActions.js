import ApiClient from "../api/APIClient";
import { notification } from "antd";

export const SET_IMAGE_NAME = "SET_IMAGE_NAME";
export const SET_UPLOAD_MODAL_VISIBLE = "SET_UPLOAD_MODAL_VISIBLE";
export const setImageName = imageName => {
  return {
    type: SET_IMAGE_NAME,
    imageName: imageName
  };
};

export const setUploadModalVisible = visible => {
  return {
    type: SET_UPLOAD_MODAL_VISIBLE,
    visible: visible
  };
};
