import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import AuthService from '../../api/authService'

const authService = new AuthService();

export const logUserIn = createAsyncThunk(
  "user/logUserIn",
  async (credentials) => {
    var res = await authService.getToken(credentials.email, credentials.password);
    return res.data;
});

export const getCurrentUser = createAsyncThunk(
  "user/getCurrentUser",
  async () => {
    const response = await authService.getCurrentUser();
    return response.data;
  }
);

export const registerUser = createAsyncThunk(
  "user/registerUser",
  async (credentials) => {
    console.log("credentials");
    console.log(credentials);
    const response = await authService.register(credentials.username, 
      credentials.email, 
      credentials.password, 
      credentials.firstName, 
      credentials.lastName, 
      credentials.phoneNumber, 
      credentials.extraInfors);
    return response.data;
  }
);

export const udpateProfile = createAsyncThunk(
  "user/udpateProfile",
  async (credentials) => {
    const response = await authService.update(credentials.name, 
      credentials.surname, 
      credentials.phoneNumber, 
      credentials.extraInfors);
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
    setLoggedInFalse: (state) => {
      state.loggedIn = false;
    },
    logCustomerOut: (state) => {
      state.currentUser = null;
      localStorage.removeItem("_token");
      localStorage.removeItem("user");
    },
    setAdminTrue: (state) => {
      state.admin = true
    }
  },
  extraReducers: {
    [logUserIn.fulfilled]: (state, action) => {
      state.loggedIn = action.payload != null;
    },
    [getCurrentUser.fulfilled]: (state, action) => {
      state.currentUser = action.payload;
    },
    [udpateProfile.fulfilled]: (state, action) => {
      state.currentUser = action.payload;
      localStorage.setItem("user", JSON.stringify(action.payload));
    },
  },
});

export const {setCurrentUser, setLoggedInTrue, logCustomerOut, setAdminTrue, setLoggedInFalse} =
userSlice.actions;
export default userSlice.reducer;
