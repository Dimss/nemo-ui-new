import {
  SET_AUTHENTICATED,
  SET_EMAIL,
  SET_PASSWORD,
  SET_UID,
  SET_TOKEN
} from "../actions/loginActions";

const defaultState = {
  username: "",
  password: "",
  token: "",
  uId: "",
  authenticated: false
};

const loginReducer = (state = defaultState, action) => {
  switch (action.type) {
    case SET_TOKEN:
      localStorage.setItem("token", action.token);
      return Object.assign({}, state, { token: action.token });
    case SET_UID:
      localStorage.setItem("uId", action.uId);
      return Object.assign({}, state, { uId: action.uId });
    case SET_EMAIL:
      return Object.assign({}, state, { email: action.email });
    case SET_PASSWORD:
      return Object.assign({}, state, { password: action.password });
    case SET_AUTHENTICATED:
      return Object.assign({}, state, { authenticated: action.authenticated });
    default:
      return state;
  }
};

export default loginReducer;
