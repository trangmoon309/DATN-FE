import axios from "axios";
import {API_URL, UserCartEndpoint} from "./config"
import _ from "lodash";
import { toast } from "react-toastify";

export default class UserCartService{

  getCurrentToken = () => {
    return localStorage.getItem("_token");
  };

  getList = async(skipCount, userId, rentDate) => {
    var parameters = {
      "skipCount": skipCount,
      "maxResultCount": 1000
    };

    if(rentDate != null){
      parameters['rentDate'] = rentDate;
    }
    
    return await axios
      .request({
        url: `${UserCartEndpoint.UserCart}/${UserCartEndpoint.GetByUser}/${userId}`,
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
        "vehicleId": object.vehicleId,
        "quantity": object.quantity,
        "rentDate": object.rentDate,
    };
    return await axios
      .request({
        url: `${UserCartEndpoint.UserCart}`,
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

  createPayment = async (total) => {
    return await axios
      .request({
        url: `${UserCartEndpoint.CreatePayment}?total=${total}`,
        method: "post",
        baseURL: `${API_URL}`,
        withCredentials: true
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

  update = async (userId, object) => {
    var reqData = [];
    object.forEach(item => reqData.push({
      "id": item.id,
      "userId": item.userId,
      "vehicleId": item.vehicleId,
      "quantity": item.quantity,
      "rentDate": object.rentDate
    }));
    return await axios
      .request({
        url: `${UserCartEndpoint.UserCart}/${userId}`,
        method: "put",
        baseURL: `${API_URL}`,
        withCredentials: true,
        data: reqData
      })
      .then((response) => {
        //toast.success("Successfully updated! ") 
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
        url: `${UserCartEndpoint.UserCart}/${id}`,
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