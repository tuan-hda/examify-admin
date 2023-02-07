import { createAsyncThunk, createSlice, isAnyOf } from '@reduxjs/toolkit';
import axios, { AxiosInstance } from 'axios';
import {
  changeAvatarService,
  changePasswordService,
  getUserInfoService,
  logOutService,
  signInService,
  updateUserInfoService,
} from 'api/auth/auth';

export type userType = {
  userId?: number;
  email?: string;
  firstName?: string;
  lastName?: string;
  avt?: string;
  banner?: string;
  accumulatedPoints?: number;
  phoneNumber?: string;
  dateOfBirth?: string;
  description?: string;
  joinedCourses?: number;
  ownFlashcard?: number;
  rank?: string;
  roleName?: string;
};

type authStateType = {
  user: userType;
  loading: boolean;
  accessToken: string;
  error: string;
};

const initialState: authStateType = {
  user: {},
  loading: false,
  accessToken: '',
  error: '',
};

export const signIn = createAsyncThunk(
  'auth/signIn',
  async ({ email, password }: { email: string; password: string }, thunkAPI) => {
    try {
      const response = await signInService(email, password);
      console.log('Sign in successfully');
      return response.data;
    } catch (err) {
      if (axios.isAxiosError(err)) {
        console.log(err);
        return thunkAPI.rejectWithValue(err?.response?.status);
      }
    }
  }
);

export const logOut = createAsyncThunk(
  'auth/logOut',
  async (axiosPrivate: AxiosInstance, thunkAPI) => {
    try {
      await logOutService(axiosPrivate);
    } catch (err) {
      if (axios.isAxiosError(err)) {
        return thunkAPI.rejectWithValue(err?.response?.status);
      }
    }
  }
);

export const getUserInfo = createAsyncThunk(
  'auth/getUserInfo',
  async (axiosPrivate: AxiosInstance, thunkAPI) => {
    try {
      const response = await getUserInfoService(axiosPrivate);
      console.log('Get user info successfully');
      return response.data;
    } catch (err) {
      console.log(err);
      if (axios.isAxiosError(err)) {
        return thunkAPI.rejectWithValue(err?.response?.status || 'ECONNABORTED');
      }
    }
  }
);

export const updateUserInfo = createAsyncThunk(
  'auth/updateUserInfo',
  async (
    {
      axiosPrivate,
      firstName,
      lastName,
      dateOfBirth,
      phoneNumber,
      description,
    }: {
      axiosPrivate: AxiosInstance;
      firstName: string;
      lastName: string;
      dateOfBirth: string;
      phoneNumber: string;
      description: string;
    },
    thunkAPI
  ) => {
    try {
      await updateUserInfoService(
        axiosPrivate,
        firstName,
        lastName,
        dateOfBirth,
        phoneNumber,
        description
      );
      return 'Update user info successfully';
    } catch (err) {
      if (axios.isAxiosError(err)) {
        return thunkAPI.rejectWithValue(err?.response?.status);
      }
    }
  }
);

export const changePassword = createAsyncThunk(
  'auth/changePassword',
  async (
    {
      axiosPrivate,
      oldPassword,
      newPassword,
    }: { axiosPrivate: AxiosInstance; oldPassword: string; newPassword: string },
    thunkAPI
  ) => {
    try {
      await changePasswordService(axiosPrivate, oldPassword, newPassword);
      return 'Change password successfully';
    } catch (err) {
      if (axios.isAxiosError(err)) {
        return thunkAPI.rejectWithValue(err?.response?.status);
      }
    }
  }
);

export const changeAvatar = createAsyncThunk(
  'auth/changeAvatar',
  async (
    { axiosPrivate, newImageUrl }: { axiosPrivate: AxiosInstance; newImageUrl: string },
    thunkAPI
  ) => {
    try {
      await changeAvatarService(axiosPrivate, newImageUrl);
      return 'Change avatar successfully';
    } catch (err) {
      if (axios.isAxiosError(err)) {
        return thunkAPI.rejectWithValue(err?.response?.status);
      }
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAccessToken: (state, action) => {
      state.accessToken = action.payload;
    },
    resetState: (state) => {
      state = initialState;
    },
  },
  extraReducers: (builder) => {
    // Sign in
    builder.addCase(signIn.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload.user;
      state.accessToken = action.payload.accessToken;
      state.error = '';
    });

    // Logout
    builder.addCase(logOut.fulfilled, (state) => {
      state.user = {};
      state.accessToken = '';
      state.loading = false;
      state.error = '';
    });

    // Logout
    builder.addCase(logOut.rejected, (state, action) => {
      state.user = {};
      state.accessToken = '';
      state.loading = false;
      state.error = '';
      console.log(action.payload);
    });

    // Get user info
    builder.addCase(getUserInfo.fulfilled, (state, action) => {
      state.loading = false;
      state.user = {
        ...state.user,
        ...action.payload.data,
      };
      state.error = '';
    });

    const pendingList: any = [
      signIn.pending,
      logOut.pending,
      getUserInfo.pending,
      updateUserInfo.pending,
      changePassword.pending,
      changeAvatar.pending,
    ];
    const emptyFulfilledList: any = [
      updateUserInfo.fulfilled,
      changePassword.fulfilled,
      changeAvatar.fulfilled,
    ];
    const rejectedList: any = [
      signIn.rejected,
      getUserInfo.rejected,
      updateUserInfo.rejected,
      changePassword.rejected,
      changeAvatar.rejected,
    ];

    builder.addMatcher(isAnyOf(...pendingList), (state) => {
      state.loading = true;
      state.error = '';
    });
    builder.addMatcher(isAnyOf(...emptyFulfilledList), (state, action) => {
      state.loading = false;
      state.error = '';
      console.log(action.payload);
    });
    builder.addMatcher(isAnyOf(...rejectedList), (state, action) => {
      state.loading = false;
      state.error = action.payload;
      console.log(action.payload);
    });
  },
});

export const { setAccessToken, resetState } = authSlice.actions;

export default authSlice.reducer;
