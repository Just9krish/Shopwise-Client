import { createReducer } from "@reduxjs/toolkit";
import { IUserState } from "../../Interface";

const initialState: IUserState = {
  isUserAuthenticated: false,
  isUserLoading: false,
  userError: null,
  user: {
    _id: "",
    name: "",
    email: "",
    role: "",
    avatar: "",
    addresses: [],
    primaryPhoneNumber: "",
    secondaryPhoneNumber: "",
  },
  userMessage: "",
};

export const userReducer = createReducer(initialState, {
  LoadUserRequest: (state) => {
    state.isUserLoading = true;
  },
  LoadUserSuccess: (state, action) => {
    state.isUserAuthenticated = true;
    state.isUserLoading = false;
    state.user = action.payload;
  },
  LoadUserFail: (state, action) => {
    (state.isUserLoading = false),
      (state.userError = action.error),
      (state.isUserAuthenticated = false);
  },

  // update user
  UpdateUserInfoRequest: (state, action) => {
    state.isUserLoading = true;
  },

  UpdateUserInfoSuccess: (state, action) => {
    state.isUserLoading = false;
    state.user = action.payload;
  },
  UpdateUserInfoFailure: (state, action) => {
    state.isUserLoading = false;
    state.userError = action.payload;
  },

  // update user address
  // UpdateUserAddressrequest: (state, action) => {
  //   state.isUserLoading = true;
  // },

  UpdateUserAddressSuccess: (state, action) => {
    // state.isUserLoading = false;
    console.log(action.payload);
    state.user = action.payload.user;
    state.userMessage = action.payload.userMessage;
  },

  UpdateUserAddressFailure: (state, action) => {
    state.isUserLoading = false;
    state.userError = action.payload;
  },

  // delete address
  DeleteUserAddressRequest: (state) => {},

  DeleteUserAddressSuccess: (state, action) => {
    state.user = action.payload.user;
    state.userMessage = action.payload.userMessage;
  },

  DeleteUserAddressFailure: (state, action) => {
    state.userMessage = action.payload;
  },

  ClearuserMessage: (state) => {
    state.userMessage = "";
  },
  // clear error
  ClearErrors: (state) => {
    state.userError = null;
  },
});
