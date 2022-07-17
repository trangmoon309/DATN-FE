import axios from "axios";
import {API_URL, UserTransactionEndpoint} from "./config"
import _ from "lodash";
import { toast } from "react-toastify";

export default class UserTransactionService{

  getCurrentToken = () => {
    return localStorage.getItem("_token");
  };

  summary = async() => {
    
    return await axios
      .request({
        url: `${UserTransactionEndpoint.UserTransaction}/${UserTransactionEndpoint.Summary}`,
        method: "get",
        baseURL: `${API_URL}`,
        withCredentials: true,
      })
      .then((response) => {
        return Promise.resolve(response);
      })
      .catch((err) => Promise.reject(err));
  }

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

    if(searchRequest.searchDate !== null) {
      parameters["searchDate"] = searchRequest.searchDate;
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

  getTransactionVehicleList = async(skipCount, searchRequest) => {
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

    if(searchRequest.receiveDate !== null) {
      parameters["receiveDate"] = searchRequest.receiveDate;
    }

    if(searchRequest.retunrnDate !== null) {
      parameters["retunrnDate"] = searchRequest.retunrnDate;
    }
    
    return await axios
      .request({
        url: '/user-transaction-vehicles/by-condition',
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
    var reqData = object;
    return await axios
      .request({
        url: `${UserTransactionEndpoint.UserTransaction}`,
        method: "post",
        baseURL: `${API_URL}`,
        withCredentials: true,
        data: reqData
      })
      .then((response) => {
        toast.success("Successfully created! ");
        localStorage.removeItem("receivedDate");
        localStorage.removeItem("totalDays");
        localStorage.removeItem("cart");
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
      "paymenPayPalId": object.paymenPayPalId,
      "payerIDPayPalId": object.payerIDPayPalId,
      "code": object.code,
      "receivedVehicleDate": object.receivedVehicleDate,
      "returnedVehicleDate": object.returnedVehicleDate,
      "depositDate": object.depositDate,
      "cancelDate": object.cancelDate,
      "payingDate": object.payingDate,
      "totalCost": object.totalCost,
      "depositCosted": object.depositCosted,
      "totalDays": object.totalDays,
      "cancelReason": object.cancelReason,
      "reviewServiceQuality": object.reviewServiceQuality,
      "costStatus": object.costStatus,
      "rentalStatus": object.rentalStatus,
      "userTransactionVehicles": object.userTransactionVehicles
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