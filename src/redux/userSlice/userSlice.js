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
      state.admin = false;
      state.loggedIn = true;
      var res = state.currentUser;
      if(res.userRoles != null && res.userRoles.length > 0){
        res.userRoles.forEach(x => {
          if(x.role != null && x.role.name == 'admin'){
            state.admin = true;
            return;
          }
        })
      }
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
    setAdminFlag: (state, action) => {
      state.admin = action.payload.isAdmin
    }
  },
  extraReducers: {
    [logUserIn.fulfilled]: (state, action) => {
      state.loggedIn = true;
    },
    [getCurrentUser.fulfilled]: (state, action) => {
      state.currentUser = action.payload;
      state.admin = false;
      state.loggedIn = true;
      localStorage.setItem("user", JSON.stringify(state.currentUser));

      var res = action.payload;
      if(res.userRoles != null && res.userRoles.length > 0){
        res.userRoles.forEach(x => {
          if(x.role != null && x.role.name == 'admin'){
            state.admin = true;
            return;
          }
        })
      }
    },
    [getUserList.fulfilled]: (state, action) => {
      state.allUsers = action.payload.items;
    },
    [updateProfile.fulfilled]: (state, action) => {
      state.currentUser = action.payload;
      state.admin = false;
      state.loggedIn = true;
      localStorage.setItem("user", JSON.stringify(state.currentUser));

      var res = action.payload;
      if(res.userRoles != null && res.userRoles.length > 0){
        res.userRoles.forEach(x => {
          if(x.role != null && x.role.name == 'admin'){
            state.admin = true;
            return;
          }
        })
      }
    },
    [updateAvatar.fulfilled]: (state, action) => {
      state.currentUser = action.payload;
    },
    [registerUser.fulfilled]: (state, action) => {
      state.currentUser = action.payload;
      state.admin = false;
      state.loggedIn = true;
      localStorage.setItem("user", JSON.stringify(state.currentUser));
      var res = action.payload;
      if(res.userRoles != null && res.userRoles.length > 0){
        res.userRoles.forEach(x => {
          if(x.role != null && x.role.name == 'admin'){
            state.admin = true;
            return;
          }
        })
      }
    },
  },
});

export const {setCurrentUser, setLoggedInTrue, logCustomerOut, setLoggedInFalse, setAdminFlag} =
userSlice.actions;
export default userSlice.reducer;
