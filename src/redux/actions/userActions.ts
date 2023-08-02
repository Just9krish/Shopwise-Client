import { Action, Dispatch } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import { IUser } from "../../Interface";
import { API_URL } from "../../constant";

interface IFrom extends IUser {
  password: string;
}

type addressFrom = {
  country: string;
  state: string;
  address1: string;
  address2: string;
  address3: string;
  zipcode: string;
  addressType: string;
};

export const loadUser = () => async (dispatch: Dispatch<Action>) => {
  try {
    dispatch({ type: "LoadUserRequest" });

    const { data } = await axios.get(API_URL.GET_USER_INFO, {
      withCredentials: true,
    });

    dispatch({ type: "LoadUserSuccess", payload: data.user });
  } catch (error: AxiosError | any) {
    dispatch({
      type: "LoadUserFail",
      payload: error.response?.data?.message || error.message,
    });
  }
};

export const updateUserInfo =
  (form: IFrom) => async (dispatch: Dispatch<Action>) => {
    try {
      dispatch({ type: "UpdateUserInfoRequest" });
      const { data } = await axios.put(API_URL.UPDATE_USER, form, {
        withCredentials: true,
      });
      dispatch({ type: "UpdateUserInfoSuccess", payload: data.user });
    } catch (error: AxiosError | any) {
      dispatch({
        type: "UpdateUserInfoFailure",
        payload: error.response?.data?.message || error.message,
      });
    }
  };

// update user address
export const updateUserAddress =
  (form: addressFrom) => async (dispatch: Dispatch<Action>) => {
    try {
      const { data } = await axios.post(API_URL.ADD_USER_ADDRESS, form, {
        withCredentials: true,
      });
      dispatch({ type: "UpdateUserAddressSuccess", payload: data });
    } catch (error: AxiosError | any) {
      dispatch({
        type: "UpdateUserAddressFailure",
        payload: error.response?.data?.message || error.message,
      });
    }
  };

// Delete user address
export const deleteUserAddress =
  (id: string) => async (dispatch: Dispatch<Action>) => {
    try {
      const { data } = await axios.delete(API_URL.DELETE_USER_ADDRESS(id), {
        withCredentials: true,
      });

      dispatch({ type: "DeleteUserAddressSuccess", payload: data });
    } catch (error: AxiosError | any) {
      dispatch({
        type: "DeleteUserAddressFailure",
        payload: error.response?.data?.message || error.message,
      });
    }
  };
