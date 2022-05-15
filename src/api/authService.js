import axios from "axios";
import {API_URL_IDENTITY_API, API_URL_TOKEN, UserEndpoint} from "./config"
import _ from "lodash";

export default class AuthService{

  getCurrentToken = () => {
    return localStorage.getItem("_token");
  };

  getToken = async (username, password) => {
    var reqData = {
      "username": username,
      "password": password,
      "grant_type": "password",
      "scope": "ApiManagement"
    };
  
    let query = Object.keys(reqData).map(function(key) {
      return encodeURIComponent(key) + '=' + encodeURIComponent(reqData[key])}).join('&');
  
    return await axios
      .request({
        url: `${API_URL_TOKEN}`,
        method: "post",
        headers: {
          'Authorization': 'Basic QXBpTWFuYWdlbWVudF9BcHA6MXEydzNlKg==',
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        withCredentials: true,
        data: query
      })
      .then((response) => {
        if (response.data.access_token) {
          const { access_token } = response.data;
          localStorage.setItem("_token", access_token);
        }
        return Promise.resolve(response.data);
      })
      .catch((err) => Promise.reject(err));
  };

  getCurrentUser = async() => {
    return await axios
      .request({
        url: `${UserEndpoint.Profile}`,
        method: "get",
        baseURL: `${API_URL_IDENTITY_API}`,
        headers: {
          Authorization: `Bearer ${this.getCurrentToken()}`,
        },
        withCredentials: true,
      })
      .then((response) => {
        if (_.get(response, "data.errors")) return Promise.reject(response.data.errors);
        localStorage.setItem("user", JSON.stringify(response.data));
        // Trả response thôi để bắt được fulfilled
        return Promise.resolve(response);
      })
      .catch((err) => Promise.reject(err));
  }

  register = (username, email, password) => {
    return axios.post(API_URL_IDENTITY_API + "signup", {
      username,
      email,
      password,
    });
  };

  logout = () => {
    localStorage.removeItem("user");
  };
}


        // auth: {
        //   username: "ApiManagement_App", // This is the client_id
        //   password: "1q2w3e*" // This is the client_secret
        // },