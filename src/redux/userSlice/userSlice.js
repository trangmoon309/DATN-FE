import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import AuthService from '../../api/authService'

const authService = new AuthService();

export const logUserIn = createAsyncThunk(
  "user/logUserIn",
  async (credentials) => {
    const response = authService.getToken(credentials.email, credentials.password);
    return response.data.success;
  }
);

export const getCurrentUser = createAsyncThunk(
  "user/getCurrentUser",
  async () => {
    const response = await authService.getCurrentUser();
    return response.data;
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState: {
    currentUser: null,
    admin:false,
    loggedIn: false,
    message: "",
  },
  reducers: {
    setCurrentUser: (state, action) => {
      state.currentUser = action.payload;
    },
    setLoggedInTrue: (state) => {
      state.loggedIn = true;
    },
    logCustomerOut: (state) => {
      state.currentUser = null;
    },
    setAdminTrue: (state) => {
      state.admin = true
    }
  },
  extraReducers: {
    [logUserIn.fulfilled]: (state, action) => {
      state.loggedIn = action.payload;
      if (action.payload === true) {
        state.message = "Logged in successfully";
        
      } else {
        state.message = "Can't logged in, please check the infos and try again";
      }
    },
    [getCurrentUser.fulfilled]: (state, action) => {
      console.log("hihi");
      console.log(action);
      state.currentUser = action.payload;
    },
  },
})   ;

export const {setCurrentUser, setLoggedInTrue, logCustomerOut, setAdminTrue} =
userSlice.actions;
export default userSlice.reducer;
