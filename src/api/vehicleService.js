import axios from "axios";
import {API_URL, VehicleEndpoint} from "./config"
import _ from "lodash";
import { toast } from "react-toastify";

export default class VehicleService{

  getCurrentToken = () => {
    return localStorage.getItem("_token");
  };

  getList = async(keyWord, skipCount, vehicleTypeId, vehicleLineId) => {
    var parameters = {
      "skipCount": skipCount,
      "maxResultCount": 10
    };

    if(keyWord !== null) {
      parameters["keyWord"] = keyWord;
    }

    if(vehicleTypeId !== null) {
      parameters["vehicleTypeId"] = vehicleTypeId;
    }

    if(vehicleLineId !== null) {
      parameters["vehicleLineId"] = vehicleLineId;
    }
    
    return await axios
      .request({
        url: `${VehicleEndpoint.Vehicle}/${VehicleEndpoint.GetListByCondition}`,
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

  getList2 = async(keyWord, skipCount, vehicleTypeId, vehicleLineId) => {
    var parameters = {
      "skipCount": skipCount,
      "maxResultCount": 1000
    };

    if(keyWord !== null) {
      parameters["keyWord"] = keyWord;
    }

    if(vehicleTypeId !== null) {
      parameters["vehicleTypeId"] = vehicleTypeId;
    }

    if(vehicleLineId !== null) {
      parameters["vehicleLineId"] = vehicleLineId;
    }
    
    return await axios
      .request({
        url: `${VehicleEndpoint.Vehicle}/${VehicleEndpoint.GetListByCondition}`,
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
      "vehicleTypeId": object.vehicleTypeId,
      "vehicleLineId": object.vehicleLineId,
      "code": object.code,
      "name": object.name,
      "color": object.color,
      "kilometerTravel": object.kilometerTravel,
      "licensePlate": object.licensePlate,
      "rentalPrice": object.rentalPrice,
      "depositPrice": object.depositPrice,
      "vehicleProperties": object.vehicleProperties,
    }
    return await axios
      .request({
        url: `${VehicleEndpoint.Vehicle}`,
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

  updateImages = async (vehicleId, imageFiles) => {
    var bodyFormData = new FormData();
    imageFiles.forEach(file=>{
      bodyFormData.append("images", file);
    });

    return await axios
      .request({
        baseURL: `${API_URL}`,
        url: `${VehicleEndpoint.Vehicle}/${vehicleId}/${VehicleEndpoint.UploadImages}`,
        method: "POST",
        headers: {
          Authorization: `Bearer ${this.getCurrentToken()}`,
          "Content-Type": "multipart/form-data"
        },
        withCredentials: true,
        data: bodyFormData
      })
      .then((response) => {
        toast.success("Successfully images updated! ") 
        return Promise.resolve(response);
      })
      .catch((err) =>{
        return Promise.reject(err);
      });
  };

  update = async (object) => {
    var reqData = {
      "vehicleTypeId": object.vehicleTypeId,
      "vehicleLineId": object.vehicleLineId,
      "code": object.code,
      "name": object.name,
      "color": object.color,
      "kilometerTravel": object.kilometerTravel,
      "licensePlate": object.licensePlate,
      "rentalPrice": object.rentalPrice,
      "depositPrice": object.depositPrice,
      "vehicleProperties": object.vehicleProperties,
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