import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import VehicleService from '../../api/vehicleService'

const service = new VehicleService();

export const getVehicleList = createAsyncThunk(
  "vehicle/getList",
  async (credentials) => {
    const response = await service.getList(credentials.keyWord, credentials.skipCount, credentials.vehicleTypeId, credentials.vehicleLineId);
    return response.data;
  }
);

export const createVehicle = createAsyncThunk(
  "vehicle/create",
  async (credentials) => {
    const response = await service.create(credentials);
    return response.data;
  }
);

export const updateVehicle = createAsyncThunk(
  "vehicle/update",
  async (credentials) => {
    const response = await service.update(credentials);
    return response.data;
  }
);

export const updateImgs = createAsyncThunk(
  "vehicle/updateImgs",
  async (credentials) => {
    const response = await service.updateImages(credentials.vehicleId,credentials.files);
    return response.data;
  }
);

export const deleteVehicle = createAsyncThunk(
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
    currentVehicle: null
  },
  reducers: {
    setDeletedItem: (state,action) => {
      state.deletedItem = action.payload
    },
    setCurrentVehicle: (state, action) => {
      state.currentVehicle = action.payload;
    },
  },
  extraReducers: {
    [getVehicleList.fulfilled]: (state, action) => {
      state.items = action.payload.items;
      state.totalVehicle = action.payload.totalCount;
    },
    [createVehicle.fulfilled]: (state, action) => {
      state.items.unshift(action.payload)
    },
    [updateVehicle.fulfilled]: (state, action) => {
      const list = [...state.items];
      const targetIndex = state.items.findIndex(f=>f.id===action.payload.id); 
      list[targetIndex] = action.payload;
      state.items = list;
    },
    [deleteVehicle.fulfilled]: (state, action) => {
      state.items = state.items.filter(x => x.id !== state.deletedItem)
    },
  },
});


export const {setDeletedItem, setCurrentVehicle} =
vehicleSlice.actions;
export default vehicleSlice.reducer;
