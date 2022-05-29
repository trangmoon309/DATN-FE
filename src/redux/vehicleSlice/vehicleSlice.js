import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import VehicleService from '../../api/vehicleService'

const service = new VehicleService();

export const getList = createAsyncThunk(
  "vehicle/getList",
  async (credentials) => {
    const response = await service.getList(credentials.keyWord, credentials.skipCount);
    return response.data;
  }
);

export const createvehicle = createAsyncThunk(
  "vehicle/create",
  async (name) => {
    const response = await service.create(name);
    return response.data;
  }
);

export const updatevehicle = createAsyncThunk(
  "vehicle/update",
  async (credentials) => {
    const response = await service.update(credentials);
    return response.data;
  }
);

export const deletevehicle = createAsyncThunk(
  "vehicle/delete",
  async (id) => {
    const response = await service.delete(id);
    return response.data;
  }
);

export const vehicleSlice = createSlice({
  name: "vehicle",
  initialState: {
    items: [],
    deletedItem : null,
    totalVehicle : 0,
  },
  reducers: {
    setDeletedItem: (state,action) => {
      state.deletedItem = action.payload
    }
  },
  extraReducers: {
    [getList.fulfilled]: (state, action) => {
      state.items = action.payload.items;
      state.totalVehicle = action.payload.totalCount;
    },
    [createvehicle.fulfilled]: (state, action) => {
      state.items.unshift(action.payload)
    },
    [updatevehicle.fulfilled]: (state, action) => {
      const list = [...state.items];
      const targetIndex = state.items.findIndex(f=>f.id===action.payload.id); 
      list[targetIndex] = action.payload;
      state.items = list;
    },
    [deletevehicle.fulfilled]: (state, action) => {
      state.items = state.items.filter(x => x.id !== state.deletedItem)
    },
  },
});


export const {setDeletedItem} =
vehicleSlice.actions;
export default vehicleSlice.reducer;
