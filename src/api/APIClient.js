import axios from "axios";
import { store } from "../store";

export default class ApiClient {
  constructor() {
    this.identity = "http://identity";
    this.receiver = "http://receiver";
    this.feed = "http://feed";
  }

  fetchUserFeed() {
    return this.execRequest("get", this.feed + "/feed");
  }

  deleteLink(imageId) {
    return this.execRequest("delete", this.feed + "/links/" + imageId);
  }

  addComment(comment, imageId) {
    let payload = { imageId: imageId, comment: comment };
    return this.execRequest("post", this.feed + "/comments", payload);
  }

  userLogin(email, password) {
    let payload = { email: email, password: password };
    return this.execRequest("post", this.identity + "/v1/login", payload);
  }

  userSignup(email, password) {
    let payload = { email: email, password: password };
    return this.execRequest("post", this.identity + "/v1/signup", payload);
  }

  validateToekn(token) {
    return this.execRequest("get", this.identity + "/v1/token/" + token);
  }

  uploadImage(data) {
    return this.execRequest("post", this.receiver + "/upload", data, true);
  }

  addLike(imageId) {
    return this.execRequest("post", this.feed + "/likes/" + imageId);
  }

  execRequest(method, url, data = null, isFromData = false) {
    //Try to login the token from State
    let token = store.getState().loginReducer.token;
    // If not found in state (WTF?!) try to load it from localStorage
    if (!token) token = localStorage.getItem("token");
    let headers = { "X-NEMO-AUTH": token };
    // if (isFromData) headers["Content-Type"] = "multipart/form-data";
    return axios({
      method: method,
      url: url,
      headers: headers,
      data: data
    })
      .then(resData => {
        return Promise.resolve([null, resData]);
      })
      .catch(error => {
        return Promise.resolve([error]);
      });
  }
}
