import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import UserCartService from '../../api/userCartService'

const service = new UserCartService();

export const getUserCartList = createAsyncThunk(
  "userCart/getList",
  async (credentials) => {
    const response = await service.getList(credentials.keyWord, credentials.skipCount);
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

export const updateUserCart = createAsyncThunk(
  "userCart/update",
  async (credentials) => {
    const response = await service.update(credentials);
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
    totalVehicleLine : 0,
  },
  reducers: {
    setDeletedItem: (state,action) => {
      state.deletedItem = action.payload
    }
  },
  extraReducers: {
    [getUserCartList.fulfilled]: (state, action) => {
      state.items = action.payload.items;
      state.totalVehicleLine = action.payload.totalCount;
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


export const {setDeletedItem} =
userCartSlice.actions;
export default userCartSlice.reducer;
