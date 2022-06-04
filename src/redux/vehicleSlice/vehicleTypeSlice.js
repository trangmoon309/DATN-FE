import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import VehicleTypeService from '../../api/vehicleTypeService'

const service = new VehicleTypeService();

export const getVehicleTypeList = createAsyncThunk(
  "vehicleType/getList",
  async (credentials) => {
    const response = await service.getList(credentials.keyWord, credentials.skipCount);
    return response.data;
  }
);

export const createVehicleType = createAsyncThunk(
  "vehicleType/create",
  async (credentials) => {
    const response = await service.create(credentials);
    return response.data;
  }
);

export const updateVehicleType = createAsyncThunk(
  "vehicleType/update",
  async (credentials) => {
    const response = await service.update(credentials);
    return response.data;
  }
);

export const deleteVehicleType = createAsyncThunk(
  "vehicleType/delete",
  async (id) => {
    const response = await service.delete(id);
    return response.data;
  }
);

export const vehicleTypeSlice = createSlice({
  name: "vehicleType",
  initialState: {
    items: [],
    deletedItem : null,
    totalVehicleTypes : 0,
  },
  reducers: {
    setDeletedItem: (state,action) => {
      state.deletedItem = action.payload
    }
  },
  extraReducers: {
    [getVehicleTypeList.fulfilled]: (state, action) => {
      state.items = action.payload.items;
      state.totalVehicleTypes = action.payload.totalCount;
    },
    [createVehicleType.fulfilled]: (state, action) => {
      state.items.unshift(action.payload)
    },
    [updateVehicleType.fulfilled]: (state, action) => {
      const list = [...state.items];
      const targetIndex = state.items.findIndex(f=>f.id===action.payload.id); 
      list[targetIndex] = action.payload;
      state.items = list;
    },
    [deleteVehicleType.fulfilled]: (state, action) => {
      state.items = state.items.filter(x => x.id !== state.deletedItem)
    },
  },
});


export const {setDeletedItem} =
vehicleTypeSlice.actions;
export default vehicleTypeSlice.reducer;
