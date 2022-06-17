import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import UserTransactionService from '../../api/userTransactionService'

const service = new UserTransactionService();

export const getUserTransactionList = createAsyncThunk(
  "userTransaction/getList",
  async (credentials) => {
    const response = await service.getList(credentials.skipCount, credentials.searchRequest);
    return response.data;
  }
);

export const createUserTransaction = createAsyncThunk(
  "userTransaction/create",
  async (object) => {
    const response = await service.create(object);
    return response.data;
  }
);

function formatDate(date) {
  var d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

  if (month.length < 2) 
      month = '0' + month;
  if (day.length < 2) 
      day = '0' + day;

  return [year, month, day].join('-');
}

export const paymentSuccess = createAsyncThunk(
  "userTransaction/paymentSuccess",
  async (credentials) => {
    var paymenPayPalId = credentials.paymentId;
    var payerIDPayPalId = credentials.PayerID;

    var receivedDate = JSON.parse(localStorage.getItem("receivedDate"));
    var totalDay = JSON.parse(localStorage.getItem("totalDays"));
    var userCarts = JSON.parse(localStorage.getItem("cart"));
    const currentUser = JSON.parse(localStorage.getItem("user"));
    var userTransactionVehicles = [];
    userCarts.forEach(item => userTransactionVehicles.push({
      "vehicleId": item.vehicleId,
      "amount": item.quantity,
      "reviewRideQuality": 0,
      "reviewEngineQuality": 0,
      "reviewNote": ""
    }));

    var object = {
      "userId": currentUser.id,
      "paymenPayPalId": paymenPayPalId,
      "payerIDPayPalId": payerIDPayPalId,
      "code": "string",
      "receivedVehicleDate": receivedDate.data,
      "returnedVehicleDate": "2022-06-15T18:16:41.167Z",
      "depositDate": formatDate(Date.now()),
      "cancelDate": "2022-06-15T18:16:41.167Z",
      "payingDate": "2022-06-15T18:16:41.167Z",
      "totalCost": 0,
      "depositCosted": 0,
      "totalDays": totalDay.data,
      "cancelReason": "string",
      "reviewServiceQuality": 0,
      "costStatus": 0,
      "rentalStatus": 0,
      "userTransactionVehicles": userTransactionVehicles
    }
    const response = await service.create(object);
    return response.data;
  }
);

export const updateUserTransaction = createAsyncThunk(
  "userTransaction/update",
  async (object) => {
    const response = await service.update(object);
    return response.data;
  }
);

export const deleteUserTransaction = createAsyncThunk(
  "userTransaction/delete",
  async (id) => {
    const response = await service.delete(id);
    return response.data;
  }
);

export const getSummary = createAsyncThunk(
  "userTransaction/getSummary",
  async () => {
    const response = await service.summary();
    return response.data;
  }
);

export const userTransactionSlice = createSlice({
  name: "userTransaction",
  initialState: {
    items: [],
    deletedItem : null,
    totalUserTransaction : 0,
    summary:{}
  },
  reducers: {
    setDeletedItem: (state,action) => {
      state.deletedItem = action.payload
    }
  },
  extraReducers: {
    [getSummary.fulfilled]: (state, action) => {
      state.summary = action.payload;
    },
    [getUserTransactionList.fulfilled]: (state, action) => {
      state.items = action.payload.items;
      state.totalUserTransaction = action.payload.totalCount;
    },
    [createUserTransaction.fulfilled]: (state, action) => {
      state.items.unshift(action.payload)
    },
    [updateUserTransaction.fulfilled]: (state, action) => {
      const list = [...state.items];
      const targetIndex = state.items.findIndex(f=>f.id===action.payload.id); 
      list[targetIndex] = action.payload;
      state.items = list;
    },
    [deleteUserTransaction.fulfilled]: (state, action) => {
      state.items = state.items.filter(x => x.id !== state.deletedItem)
    },
  },
});


export const {setDeletedItem} =
userTransactionSlice.actions;
export default userTransactionSlice.reducer;
