import axios from "axios";
import {API_URL_IDENTITY_API, API_URL_TOKEN, API_URL, UserEndpoint, ProfileImageEndpoint} from "./config"
import _ from "lodash";
import { toast } from "react-toastify";

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
        return Promise.resolve(response);
      })
      .catch((err) =>{
        toast.error("Can't logged in, please check the infos and try again");
        return Promise.reject(err);
      });
  };

  getList = async() => {
    var reqData = {
      "skipCount": 1,
      "maxResultCount": 10,
    }
    return await axios
      .request({
        url: `${UserEndpoint.GetUserList}`,
        method: "get",
        baseURL: `${API_URL}`,
        withCredentials: true,
        data: reqData
      })
      .then((response) => {
        return Promise.resolve(response);
      })
      .catch((err) => Promise.reject(err));
  }

  getCurrentUser = async() => {
    return await axios
      .request({
        url: `${UserEndpoint.Profile}`,
        method: "get",
        baseURL: `${API_URL}`,
        headers: {
          Authorization: `Bearer ${this.getCurrentToken()}`,
        },
        withCredentials: true,
      })
      .then((response) => {
        if (_.get(response, "data.errors")) return Promise.reject(response.data.errors);
        // Trả response thôi để bắt được fulfilled
        return Promise.resolve(response);
      })
      .catch((err) => Promise.reject(err));
  }

  register = async (username, email, password, firstName, lastName, phoneNumber, extraInfors) => {
    var reqData = {
      "username": username,
      "password": password,
      "email": email,
      "firstName": firstName,
      "lastName": lastName,
      "phoneNumber": phoneNumber,
      "extraInfors": {
        "age": extraInfors.age,
        "address": extraInfors.address,
        "avatarId": extraInfors.avatarId,
        "idNumber": extraInfors.idNumber,
        "driverLicense": extraInfors.driverLicense,
        "gender": extraInfors.gender,
      }
    };
    return await axios
      .request({
        baseURL: `${API_URL}`,
        url: `${UserEndpoint.Register}`,
        method: "post",
        withCredentials: true,
        data: reqData
      })
      .then((response) => {
        toast.success("Successfully register! ") 
        return Promise.resolve(response);
      })
      .catch((err) =>{
        toast.error(err.response.data.validationErrors[0].message);
        return Promise.reject(err);
      });
  };

  update = async (firstName, lastName, phoneNumber, extraInfors) => {
    var reqData = {
      "firstName": firstName,
      "lastName": lastName,
      "phoneNumber": phoneNumber,
      "extraInfors": {
        "age": extraInfors.age,
        "address": extraInfors.address,
        "avatarId": extraInfors.avatarId,
        "idNumber": extraInfors.idNumber,
        "driverLicense": extraInfors.driverLicense,
        "gender": extraInfors.gender,
      }
    };
    return await axios
      .request({
        baseURL: `${API_URL}`,
        url: `${UserEndpoint.Profile}`,
        method: "PUT",
        headers: {
          Authorization: `Bearer ${this.getCurrentToken()}`,
        },
        withCredentials: true,
        data: reqData
      })
      .then((response) => {
        toast.success("Successfully updated! ") 
        localStorage.setItem("user", JSON.stringify(response.data));
        return Promise.resolve(response);
      })
      .catch((err) =>{
        return Promise.reject(err);
      });
  };

  updateAvatar = async (imageFile) => {
    var bodyFormData = new FormData();
    bodyFormData.append('file', imageFile); 
    return await axios
      .request({
        baseURL: `${API_URL}`,
        url: `${UserEndpoint.ProfileAvatar}`,
        method: "PUT",
        headers: {
          Authorization: `Bearer ${this.getCurrentToken()}`,
          "Content-Type": "multipart/form-data"
        },
        withCredentials: true,
        data: bodyFormData
      })
      .then((response) => {
        toast.success("Successfully avatar updated! ") 
        localStorage.setItem("user", JSON.stringify(response.data));
        return Promise.resolve(response);
      })
      .catch((err) =>{
        return Promise.reject(err);
      });
  };

  getAvatar = async() => {
    const name = '3a0408fe-0fa6-a2c0-8dc4-8f89b13ecff0';
    return await axios
      .request({
        url: `${ProfileImageEndpoint.GetProfileImage}/${name}`,
        method: "get",
        baseURL: `${API_URL}`,
        withCredentials: true,
      })
      .then((response) => {
        return Promise.resolve(response);
      })
      .catch((err) => Promise.reject(err));
  }

  logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("_token");
  };
}


        // auth: {
        //   username: "ApiManagement_App", // This is the client_id
        //   password: "1q2w3e*" // This is the client_secret
        // },