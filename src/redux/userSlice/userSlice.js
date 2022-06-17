import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import AuthService from '../../api/authService'

const authService = new AuthService();

export const logUserIn = createAsyncThunk(
  "user/logUserIn",
  async (credentials) => {
    var res = await authService.getToken(credentials.email, credentials.password);
    return res.data;
});

export const getUserList = createAsyncThunk(
  "user/getUserList",
  async () => {
    var res = await authService.getList();
    return res.data;
});

export const getCurrentUser = createAsyncThunk(
  "user/getCurrentUser",
  async () => {
    const response = await authService.getCurrentUser();
    return response.data;
  }
);

export const getCurrentProfileImage = createAsyncThunk(
  "user/getCurrentProfileImage",
  async () => {
    const response = await authService.getAvatar();
    return response.data;
  }
);

export const registerUser = createAsyncThunk(
  "user/registerUser",
  async (credentials) => {
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

export const updateProfile = createAsyncThunk(
  "user/updateProfile",
  async (credentials) => {
    const response = await authService.update(credentials.name, 
      credentials.surname, 
      credentials.phoneNumber, 
      credentials.extraInfors);
    return response.data;
  }
);

export const updateAvatar = createAsyncThunk(
  "user/updateAvatar",
  async (file) => {
    const response = await authService.updateAvatar(file);
    return response.data;
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState: {
    allUsers:[],
    currentUser: null,
    admin:false,
    loggedIn: false,
    message: "",
  },
  reducers: {
    setCurrentUser: (state, action) => {
      state.currentUser = action.payload.user;
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
    },
    setAdminFalse: (state) => {
      state.admin = false
    }
  },
  extraReducers: {
    [logUserIn.fulfilled]: (state, action) => {
      state.loggedIn = action.payload != null;
    },
    [getCurrentUser.fulfilled]: (state, action) => {
      state.currentUser = action.payload;
      state.admin = action.payload.userRoles.length > 0 ?  (action.payload.userRoles[0].role.name == "admin" ? true : false) : false;
    },
    [getUserList.fulfilled]: (state, action) => {
      state.allUsers = action.payload.items;
    },
    [updateProfile.fulfilled]: (state, action) => {
      state.currentUser = action.payload;
    },
    [updateAvatar.fulfilled]: (state, action) => {
      state.currentUser = action.payload;
    },
  },
});

export const {setCurrentUser, setLoggedInTrue, logCustomerOut, setAdminTrue, setLoggedInFalse, setAdminFalse} =
userSlice.actions;
export default userSlice.reducer;
