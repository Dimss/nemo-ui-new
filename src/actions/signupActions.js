import ApiClient from "../api/APIClient";
import { push } from "react-router-redux";
import { notification } from "antd";
export const SET_EMAIL = "SET_EMAIL";
export const SET_PASSWORD = "SET_PASSWORD";

export const setEmail = (email) => {
  return {
    type: SET_EMAIL,
    email: email
  };
};

export const setPassword = (password) => {
  return {
    type: SET_PASSWORD,
    password: password
  };
};

export function signup() {
  return async (dispatch, getState) => {
    let err, resData;
    let { email, password } = getState().loginReducer;
    // Exec API call
    [err, resData] = await new ApiClient().userSignup(email, password);
    if (err) {
      console.log("error");
      notification.error({ message: "Error", description: err.message });
    } else {
      notification.success({
        message: "Success",
        description: "You've successful registered"
      });
      dispatch(push("/login"));
      // dispatch(setToken(resData.data.data.token));
      // dispatch(setUserIdentity(resData.data.data.userIdentity));
      // dispatch(setAuthenticated(true));
      // if (resData.data.data.userIdentity.role === "admin")
      //   dispatch(setShowAdminMenu("block"));
      // dispatch(push("/join"));
      // dispatch(
      //   showMessage(
      //     "success",
      //     `Welcome ${resData.data.data.userIdentity.username}`
      //   )
      // );
    }
  };
}
