import axios from "axios";
import {API_URL, VehicleTypeEndpoint} from "./config"
import _ from "lodash";
import { toast } from "react-toastify";

export default class VehicleTypeService{

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
        url: `${VehicleTypeEndpoint.VehicleType}`,
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

  create = async (object) => {
    var reqData = {
      "name": object.name,
      "vehicleTypeDetails": object.vehicleTypeDetails
    }
    return await axios
      .request({
        url: `${VehicleTypeEndpoint.VehicleType}`,
        method: "post",
        baseURL: `${API_URL}`,
        withCredentials: true,
        data: reqData
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
      "vehicleTypeDetails": object.vehicleTypeDetails
    }
    return await axios
      .request({
        url: `${VehicleTypeEndpoint.VehicleType}/${object.id}`,
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
        url: `${VehicleTypeEndpoint.VehicleType}/${id}`,
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