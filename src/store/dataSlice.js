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

    markInvoiceAsPaid: (state, action) => {
      state.appData.forEach((invoice) => {
        if (invoice.id === action.payload) {
          invoice.status = "paid";
        }
      });
    },
  },
});

export default dataSlice;
