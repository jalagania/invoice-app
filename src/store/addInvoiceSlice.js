import { createSlice } from "@reduxjs/toolkit";

const addInvoiceSlice = createSlice({
  name: "addInvoicePage",
  initialState: {
    addInvoicePageVisible: false,
  },
  reducers: {
    showAddInvoicePage: (state) => {
      state.addInvoicePageVisible = true;
    },

    hideAddInvoicePage: (state) => {
      state.addInvoicePageVisible = false;
    },
  },
});

export default addInvoiceSlice;
