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
