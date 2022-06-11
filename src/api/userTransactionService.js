import axios from "axios";
import {API_URL, UserTransactionEndpoint} from "./config"
import _ from "lodash";
import { toast } from "react-toastify";

export default class UserTransactionService{

  getCurrentToken = () => {
    return localStorage.getItem("_token");
  };

  getList = async(skipCount, searchRequest) => {
    var parameters = {
      "skipCount": skipCount,
      "maxResultCount": 10
    };

    if(searchRequest.userId !== null) {
      parameters["userId"] = searchRequest.userId;
    }

    if(searchRequest.keyWord !== null) {
      parameters["keyWord"] = searchRequest.keyWord;
    }

    if(searchRequest.costStatus !== null) {
      parameters["costStatus"] = searchRequest.costStatus;
    }

    if(searchRequest.rentalStatus !== null) {
      parameters["rentalStatus"] = searchRequest.rentalStatus;
    }
    
    return await axios
      .request({
        url: `${UserTransactionEndpoint.UserTransaction}`,
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
        "userId": object.userId,
        "receivedVehicleDate": object.receivedVehicleDate,
        "returnedVehicleDate": object.returnedVehicleDate,
        "totalCost": object.totalCost,
        "cancelReason": object.cancelReason,
        "reviewServiceQuality": object.reviewServiceQuality,
        "costStatus": object.costStatus,
        "rentalStatus": object.rentalStatus,
    };
    return await axios
      .request({
        url: `${UserTransactionEndpoint.UserTransaction}`,
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
        "userId": object.userId,
        "code": object.code,
        "receivedVehicleDate": object.receivedVehicleDate,
        "returnedVehicleDate": object.returnedVehicleDate,
        "totalCost": object.totalCost,
        "depositCosted": object.depositCosted,
        "totalDays": object.totalDays,
        "cancelReason": object.cancelReason,
        "reviewServiceQuality": object.reviewServiceQuality,
        "costStatus": object.costStatus,
        "rentalStatus": object.rentalStatus,
        "userTransactionVehicles": object.userTransactionVehicles,
    };
    return await axios
      .request({
        url: `${UserTransactionEndpoint.UserTransaction}/${object.id}`,
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
        url: `${UserTransactionEndpoint.UserTransaction}/${id}`,
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