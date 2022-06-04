import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import VehicleLineService from '../../api/vehicleLineService'

const service = new VehicleLineService();

export const getVehicleLineList = createAsyncThunk(
  "vehicleLine/getList",
  async (credentials) => {
    const response = await service.getList(credentials.keyWord, credentials.skipCount);
    return response.data;
  }
);

export const createVehicleLine = createAsyncThunk(
  "vehicleLine/create",
  async (name) => {
    const response = await service.create(name);
    return response.data;
  }
);

export const updateVehicleLine = createAsyncThunk(
  "vehicleLine/update",
  async (credentials) => {
    const response = await service.update(credentials);
    return response.data;
  }
);

export const deleteVehicleLine = createAsyncThunk(
  "vehicleLine/delete",
  async (id) => {
    const response = await service.delete(id);
    return response.data;
  }
);

export const vehicleLineSlice = createSlice({
  name: "vehicleLine",
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
    [getVehicleLineList.fulfilled]: (state, action) => {
      state.items = action.payload.items;
      state.totalVehicleLine = action.payload.totalCount;
    },
    [createVehicleLine.fulfilled]: (state, action) => {
      state.items.unshift(action.payload)
    },
    [updateVehicleLine.fulfilled]: (state, action) => {
      const list = [...state.items];
      const targetIndex = state.items.findIndex(f=>f.id===action.payload.id); 
      list[targetIndex] = action.payload;
      state.items = list;
    },
    [deleteVehicleLine.fulfilled]: (state, action) => {
      state.items = state.items.filter(x => x.id !== state.deletedItem)
    },
  },
});


export const {setDeletedItem} =
vehicleLineSlice.actions;
export default vehicleLineSlice.reducer;
