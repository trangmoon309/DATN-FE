import axios from "axios";
import {API_URL, VehicleEndpoint} from "./config"
import _ from "lodash";
import { toast } from "react-toastify";

export default class VehicleService{

  getCurrentToken = () => {
    return localStorage.getItem("_token");
  };

  getList = async(keyWord, skipCount) => {
    var parameters = {
      "skipCount": skipCount,
      "maxResultCount": 10
    };

    if(keyWord !== null) {
      parameters["keyWord"] = keyWord;
    }
    
    return await axios
      .request({
        url: `${VehicleEndpoint.Vehicle}`,
        method: "get",
        baseURL: `${API_URL}`,
        withCredentials: true,
        params:parameters
      })
      .then((response) => {
        return Promise.resolve(response);
      })
      .catch((err) => Promise.reject(err));
  }

  create = async (name) => {
    return await axios
      .request({
        url: `${VehicleEndpoint.Vehicle}`,
        method: "post",
        baseURL: `${API_URL}`,
        withCredentials: true,
        data: name
      })
      .then((response) => {
        toast.success("Successfully created! ") 
        return Promise.resolve(response);
      })
      .catch((err) =>{
        toast.error(err.response.data.validationErrors[0].message);
        return Promise.reject(err);
      });
  };

  update = async (object) => {
    var reqData = {
      "code": object.code,
      "name": object.name,
    }
    return await axios
      .request({
        url: `${VehicleEndpoint.Vehicle}/${object.id}`,
        method: "put",
        baseURL: `${API_URL}`,
        withCredentials: true,
        data: reqData
      })
      .then((response) => {
        toast.success("Successfully updated! ") 
        return Promise.resolve(response);
      })
      .catch((err) =>{
        toast.error(err.response.data.validationErrors[0].message);
        return Promise.reject(err);
      });
  };

  delete = async (id) => {
    return await axios
      .request({
        url: `${VehicleEndpoint.Vehicle}/${id}`,
        method: "delete",
        baseURL: `${API_URL}`,
        withCredentials: true,
      })
      .then((response) => {
        toast.success("Successfully deleted! ") 
        return Promise.resolve(response);
      })
      .catch((err) =>{
        toast.error(err.response.data.validationErrors[0].message);
        return Promise.reject(err);
      });
  };
}


        // auth: {
        //   username: "ApiManagement_App", // This is the client_id
        //   password: "1q2w3e*" // This is the client_secret
        // },