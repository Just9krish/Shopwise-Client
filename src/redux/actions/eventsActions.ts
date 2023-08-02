import { Dispatch } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import { API_URL } from "../../constant";

export const getShopAllEvents =
  (sellerId: string) => async (dispatch: Dispatch) => {
    try {
      dispatch({ type: "getShopAllEvents" });

      const { data } = await axios.get(API_URL.GET_SHOP_EVENTS(sellerId), {
        withCredentials: true,
      });

      dispatch({ type: "getShopAllEventsSuccess", payload: data.events });
    } catch (error: AxiosError | any) {
      dispatch({
        type: "getShopAllEventsFail",
        payload: error.response?.data?.message || error.message,
      });
    }
  };

export const deleteEvent =
  (eventId: string, shopId: string) => async (dispatch: Dispatch) => {
    try {
      dispatch({ type: "deleteEventRequest" });

      const { data } = await axios.delete(
        API_URL.DELETE_SHOP_EVENT(shopId, eventId),
        {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true,
        }
      );

      dispatch({
        type: "deleteEventSuccess",
        payload: { message: data.message, eventId },
      });
    } catch (error: AxiosError | any) {
      console.log(error);
      dispatch({
        type: "deleteEventFail",
        payload: error.response?.data?.message || error.message,
      });
    }
  };

export const getAllEvents = () => async (dispatch: Dispatch) => {
  try {
    dispatch({ type: "getALLEvents" });

    const { data } = await axios.get(API_URL.GET_ALL_EVENTS);
    dispatch({ type: "getAllEventsSuccess", payload: data });
  } catch (error: AxiosError | any) {
    console.log(error);
    dispatch({
      type: "getAllEventsError",
      payload: error.response?.data?.message || error.message,
    });
  }
};
