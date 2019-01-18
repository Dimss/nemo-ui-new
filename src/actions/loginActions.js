import ApiClient from "../api/APIClient";
import { notification } from "antd";
import { push } from "react-router-redux";

export const SET_AUTHENTICATED = "SET_AUTHENTICATED";
export const SET_EMAIL = "SET_EMAIL";
export const SET_PASSWORD = "SET_PASSWORD";
export const SET_TOKEN = "SET_TOKEN";
export const SET_UID = "SET_UID";

export const setAuthenticated = authenticated => {
  return {
    type: SET_AUTHENTICATED,
    authenticated: authenticated
  };
};

export const setEmail = email => {
  return {
    type: SET_EMAIL,
    email: email
  };
};

export const setPassword = password => {
  return {
    type: SET_PASSWORD,
    password: password
  };
};

export const setToken = token => {
  return {
    type: SET_TOKEN,
    token: token
  };
};

export const setUid = uId => {
  return {
    type: SET_UID,
    uId: uId
  };
};

export function loadUserIdentity() {
  return async (dispatch, getState) => {
    let token = localStorage.getItem("token");
    if (!token) {
      dispatch(push("/login"));
    }
    let err, resData;
    // Exec API call
    [err, resData] = await new ApiClient().validateToekn(token);
    if (err) {
      notification.error({
        message: "Unable validate token",
        description: err.message
      });
      dispatch(setAuthenticated(false));
      dispatch(push("/login"));
    } else {
      if (resData.data.data.valid) {
        dispatch(setAuthenticated(true));
        dispatch(push("/feed"));
      } else {
        notification.warning({
          message: "Your session is expired, please login"
        });
        dispatch(setAuthenticated(false));
        dispatch(push("/login"));
      }
    }
  };
}

export function logout() {
  return async (dispatch, getState) => {
    localStorage.removeItem("uId");
    localStorage.removeItem("token");
    dispatch(setAuthenticated(false));
  };
}

export function execLogin() {
  return async (dispatch, getState) => {
    let err, resData;
    let { email, password } = getState().loginReducer;
    // Exec API call
    [err, resData] = await new ApiClient().userLogin(email, password);
    if (err) {
      notification.error({
        message: "Error, bad email or password",
        description: err.message
      });
    } else {
      notification.success({
        message: "Welcom " + resData.data.data.email
      });
      dispatch(setToken(resData.data.data.token));
      dispatch(setUid(resData.data.data.email));
      dispatch(setAuthenticated(true));
      dispatch(push("/home"));
    }
  };
}
