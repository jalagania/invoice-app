import { data } from "../data";
import { createSlice } from "@reduxjs/toolkit";

const dataSlice = createSlice({
  name: "appData",
  initialState: {
    appData: data,
  },
  reducers: {
    deleteInvoice: (state, action) => {
      state.appData = state.appData.filter(
        (invoice) => invoice.id !== action.payload
      );
    },
  },
});

export default dataSlice;
