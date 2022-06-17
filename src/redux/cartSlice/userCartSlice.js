import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import UserCartService from '../../api/userCartService'

const service = new UserCartService();

export const getUserCartList = createAsyncThunk(
  "userCart/getList",
  async (credentials) => {
    const currentUser = JSON.parse(localStorage.getItem("user"));
    const response = await service.getList(credentials.skipCount, currentUser.id);
    return response.data;
  }
);

export const createUserCart = createAsyncThunk(
  "userCart/create",
  async (name) => {
    const response = await service.create(name);
    return response.data;
  }
);

export const createPayment = createAsyncThunk(
  "userCart/createPayment",
  async (total) => {
    const response = await service.createPayment(total);
    return response.data;
  }
);

export const updateUserCart = createAsyncThunk(
  "userCart/update",
  async (credentials) => {
    const response = await service.update(credentials.userId, credentials.objects);
    return response.data;
  }
);

export const deleteUserCart = createAsyncThunk(
  "userCart/delete",
  async (id) => {
    const response = await service.delete(id);
    return response.data;
  }
);

export const userCartSlice = createSlice({
  name: "userCart",
  initialState: {
    items: [],
    deletedItem : null,
    totalItems : 0,
    totalAmounts : 0,
  },
  reducers: {
    setDeletedItem: (state,action) => {
      state.deletedItem = action.payload
    },
    clearItems: (state,action) => {
      state.items = [];
      state.totalAmounts = 0;
      state.totalItems = 0;
    },
    removeItem: (state,action) => {
      state.items = state.items.filter(x => action.payload.id !== x.id)
    },
    increaseItemAmount:(state,action) => {
      var item = state.items.find(x => action.payload.id == x.id)
      if(item != null){
        item.quantity = item.quantity + 1;
        const list = [...state.items];
        const targetIndex = state.items.findIndex(f=>f.id===action.payload.id); 
        list[targetIndex] = item;
        state.items = list;
        state.totalAmounts = state.totalAmounts + item.vehicle.depositPrice;
      }
    },
    decreaseItemAmount:(state,action) => {
      var item = state.items.find(x => action.payload.id == x.id)
      if(item != null){
        item.quantity = item.quantity - 1;
        if(item.quantity == 0){
          state.items = state.items.filter(x => x.id !== action.payload.id)
        }
        else{
          const list = [...state.items];
          const targetIndex = state.items.findIndex(f=>f.id===action.payload.id); 
          list[targetIndex] = item;
          state.items = list;
          state.totalAmounts = state.totalAmounts - item.vehicle.depositPrice;
        }
      }
    }
  },
  extraReducers: {
    [getUserCartList.fulfilled]: (state, action) => {
      state.items = action.payload.items;
      state.totalItems = action.payload.totalCount;
      action.payload.items.forEach(item => {
        state.totalAmounts = state.totalAmounts + item.vehicle.depositPrice;      
      });
    },
    [createUserCart.fulfilled]: (state, action) => {
      state.items.unshift(action.payload)
    },
    [updateUserCart.fulfilled]: (state, action) => {
      const list = [...state.items];
      const targetIndex = state.items.findIndex(f=>f.id===action.payload.id); 
      list[targetIndex] = action.payload;
      state.items = list;
    },
    [deleteUserCart.fulfilled]: (state, action) => {
      state.items = state.items.filter(x => x.id !== state.deletedItem)
    },
  },
});


export const {setDeletedItem, clearItems, removeItem, increaseItemAmount, decreaseItemAmount} =
userCartSlice.actions;
export default userCartSlice.reducer;
