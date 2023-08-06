import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IDeleteEventData, IEventState } from "./interface";
import { deleteShopEvent, getAllEvents, getShopAllEvents } from "./eventAPI";
import { RootState } from "../../store";

const initialState: IEventState = {
  isEventsLoading: true,
  allEvents: [],
  shopEvents: [],
  eventError: null,
  eventMessage: "",
};

export const getAllEventsAsync = createAsyncThunk(
  "event/getAllEvents",
  async () => {
    const response: any = await getAllEvents();
    return response.data;
  }
);

export const getShopAllEventsAsync = createAsyncThunk(
  "event/getShopAllEvents",
  async (shopId: string) => {
    const response: any = await getShopAllEvents(shopId);
    return response.data;
  }
);

export const deleteShopEventAsync = createAsyncThunk(
  "event/deleteShopEvent",
  async ({ shopId, eventId }: IDeleteEventData) => {
    const response: any = await deleteShopEvent({ shopId, eventId });
    return response.data;
  }
);

export const eventSlice = createSlice({
  name: "event",
  initialState,
  reducers: {
    clearEventMessage: (state) => {
      state.eventMessage = "";
    },
    clearEventError: (state) => {
      state.eventError = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllEventsAsync.pending, (state) => {
        state.isEventsLoading = true;
      })
      .addCase(getAllEventsAsync.fulfilled, (state, action) => {
        state.isEventsLoading = false;
        state.allEvents = action.payload;
      })
      .addCase(getAllEventsAsync.rejected, (state, action) => {
        state.isEventsLoading = false;
        state.eventError = action.error.message
          ? action.error.message
          : "Something went wrong";
      })
      .addCase(getShopAllEventsAsync.pending, (state) => {
        state.isEventsLoading = true;
      })
      .addCase(getShopAllEventsAsync.fulfilled, (state, action) => {
        state.isEventsLoading = false;
        state.shopEvents = action.payload.events;
      })
      .addCase(getShopAllEventsAsync.rejected, (state, action) => {
        state.isEventsLoading = false;
        state.eventError = action.error.message
          ? action.error.message
          : "Something went wrong";
      })
      .addCase(deleteShopEventAsync.pending, (state) => {
        state.isEventsLoading = true;
      })
      .addCase(deleteShopEventAsync.fulfilled, (state, action) => {
        state.isEventsLoading = false;
        state.eventMessage = action.payload.message;
        const deletedEventId = action.payload.eventId;
        state.allEvents = state.allEvents.filter(
          (event) => event._id !== deletedEventId
        );
      })
      .addCase(deleteShopEventAsync.rejected, (state, action) => {
        state.isEventsLoading = false;
        state.eventError = action.error.message
          ? action.error.message
          : "Something went wrong";
      });
  },
});

export const selectAllEvents = (state: RootState) => state.eventState.allEvents;
export const selectEventLoading = (state: RootState) =>
  state.eventState.isEventsLoading;
export const selectEventError = (state: RootState) =>
  state.eventState.eventError;
export const selectEventMessage = (state: RootState) =>
  state.eventState.eventMessage;
export const selectShopEvents = (state: RootState) =>
  state.eventState.shopEvents;

export const { clearEventError, clearEventMessage } = eventSlice.actions;

export default eventSlice.reducer;
