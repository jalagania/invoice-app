import { createSlice } from "@reduxjs/toolkit";

const invoiceDetailsPageSlice = createSlice({
  name: "invoiceDetails",
  initialState: {
    invoiceDetailsPageVisible: false,
    invoiceID: "",
  },
  reducers: {
    showInvoiceDetailsPage: (state) => {
      state.invoiceDetailsPageVisible = true;
    },

    hideInvoiceDetailsPage: (state) => {
      state.invoiceDetailsPageVisible = false;
    },

    setInvoiceID: (state, action) => {
      state.invoiceID = action.payload;
    },
  },
});

export default invoiceDetailsPageSlice;
