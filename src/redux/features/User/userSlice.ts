import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IUserState } from "../../../Interface";
import {
  changeUserPassword,
  createUser,
  deleteUserAddress,
  fetchUserDetails,
  loginUser,
  updateUserAddress,
  updateUserInfo,
} from "./userAPI";
import { RootState } from "../../store";
import {
  IAddressFrom,
  IUpdateData,
  IUserPasswordChange,
  LoginData,
  UserData,
} from "./interface";

const initialState: IUserState = {
  isUserAuthenticated: false,
  isUserLoading: false,
  userError: null,
  user: null,
  userMessage: "",
};

export const createUserAsync = createAsyncThunk(
  "user/createUserAsync",
  async (userData: UserData) => {
    const res: any = await createUser(userData);
    return res.data;
  }
);

export const loginUserAsync = createAsyncThunk(
  "user/loginUserAsync",
  async (loginData: LoginData) => {
    const res: any = await loginUser(loginData);
    return res.data;
  }
);

export const fetchUserDetailsAsync = createAsyncThunk(
  "user/fetchUserDetails",
  async () => {
    const res: any = await fetchUserDetails();
    return res.data;
  }
);

export const updateUserInfoAsync = createAsyncThunk(
  "user/updateUserInfo",
  async (updateData: IUpdateData) => {
    const res: any = await updateUserInfo(updateData);
    return res.data;
  }
);

export const updateUserAddressAsync = createAsyncThunk(
  "user/updateUserAddress",
  async (address: IAddressFrom) => {
    const res: any = await updateUserAddress(address);
    return res.data;
  }
);

export const deleteUserAddressAsync = createAsyncThunk(
  "user/deleteUserAddress",
  async (addressId: string) => {
    const res: any = await deleteUserAddress(addressId);
    return res.data;
  }
);

export const changeUserPasswordAsync = createAsyncThunk(
  "user/changeUserPassword",
  async ({
    confirmNewPassword,
    currentPassword,
    newPassword,
  }: IUserPasswordChange) => {
    const res: any = await changeUserPassword({
      confirmNewPassword,
      currentPassword,
      newPassword,
    });
    return res.data;
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    clearUserError: (state) => {
      state.userError = null;
    },
    clearUserMessage: (state) => {
      state.userMessage = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createUserAsync.pending, (state) => {
        state.isUserAuthenticated = false;
        state.isUserLoading = true;
      })
      .addCase(createUserAsync.fulfilled, (state, action) => {
        state.isUserLoading = false;
        state.userMessage = action.payload.message;
      })
      .addCase(createUserAsync.rejected, (state, action) => {
        state.isUserLoading = false;
        state.userError = action.error.message
          ? action.error.message
          : "Something went wrong";
      })
      .addCase(loginUserAsync.pending, (state) => {
        state.isUserAuthenticated = false;
        state.isUserLoading = true;
      })
      .addCase(loginUserAsync.fulfilled, (state, action) => {
        state.isUserLoading = false;
        state.user = action.payload.user;
        state.userMessage = action.payload.message;
        state.isUserAuthenticated = true;
      })
      .addCase(loginUserAsync.rejected, (state, action) => {
        state.isUserLoading = false;
        console.log(action.error.message);
        state.userError = action.error.message
          ? action.error.message
          : "Something went wrong";
      })
      .addCase(fetchUserDetailsAsync.pending, (state) => {
        state.isUserAuthenticated = false;
        state.isUserLoading = true;
      })
      .addCase(fetchUserDetailsAsync.fulfilled, (state, action) => {
        state.isUserLoading = false;
        state.user = action.payload.user;
        state.isUserAuthenticated = true;
      })
      .addCase(fetchUserDetailsAsync.rejected, (state, action) => {
        state.isUserLoading = false;
        state.userError = action.error.message
          ? action.error.message
          : "Something went wrong";
      })
      .addCase(updateUserInfoAsync.pending, (state) => {
        state.isUserLoading = true;
      })
      .addCase(updateUserInfoAsync.fulfilled, (state, action) => {
        state.isUserLoading = false;
        state.user = action.payload.user;
      })
      .addCase(updateUserInfoAsync.rejected, (state, action) => {
        state.isUserLoading = false;
        state.userError = action.error.message
          ? action.error.message
          : "Something went wrong";
      })
      .addCase(updateUserAddressAsync.pending, (state) => {
        // state.isUserLoading = true;
      })
      .addCase(updateUserAddressAsync.fulfilled, (state, action) => {
        // state.isUserLoading = false;
        state.user = action.payload.user;
        state.userMessage = action.payload.message;
      })
      .addCase(updateUserAddressAsync.rejected, (state, action) => {
        // state.isUserLoading = false;
        state.userError = action.error.message
          ? action.error.message
          : "Something went wrong";
      })
      .addCase(deleteUserAddressAsync.pending, (state) => {
        // state.isUserLoading = true;
      })
      .addCase(deleteUserAddressAsync.fulfilled, (state, action) => {
        // state.isUserLoading = false;
        state.user = action.payload.user;
        state.userMessage = action.payload.message;
      })
      .addCase(deleteUserAddressAsync.rejected, (state, action) => {
        // state.isUserLoading = false;
        state.userError = action.error.message
          ? action.error.message
          : "Something went wrong";
      })
      .addCase(changeUserPasswordAsync.pending, (state) => {
        state.isUserLoading = true;
      })
      .addCase(changeUserPasswordAsync.fulfilled, (state, action) => {
        state.isUserLoading = false;
        state.userMessage = action.payload.message;
      })
      .addCase(changeUserPasswordAsync.rejected, (state, action) => {
        // state.isUserLoading = false;
        state.userError = action.error.message
          ? action.error.message
          : "Something went wrong";
      });
  },
});

export const selectUser = (state: RootState) => state.userState.user;
export const selectIsUserAuthenticate = (state: RootState) =>
  state.userState.user;
export const selectUserMessage = (state: RootState) =>
  state.userState.userMessage;
export const selectIsUserLoading = (state: RootState) =>
  state.userState.isUserLoading;
export const selectUserError = (state: RootState) => state.userState.userError;

export const { clearUserError, clearUserMessage } = userSlice.actions;

export default userSlice.reducer;
