import { createSlice } from "@reduxjs/toolkit";

const addEditInvoiceSlice = createSlice({
  name: "addInvoicePage",
  initialState: {
    addInvoicePageVisible: false,
    editInvoicePageVisible: false,
    addEditInvoicePageVisible: false,
  },
  reducers: {
    showAddInvoicePage: (state) => {
      state.addInvoicePageVisible = true;
    },

    hideAddInvoicePage: (state) => {
      state.addInvoicePageVisible = false;
    },

    showEditInvoicePage: (state) => {
      state.editInvoicePageVisible = true;
    },

    hideEditInvoicePage: (state) => {
      state.editInvoicePageVisible = false;
    },

    showAddEditInvoicePage: (state) => {
      state.addEditInvoicePageVisible = true;
    },

    hideAddEditInvoicePage: (state) => {
      state.addEditInvoicePageVisible = false;
    },
  },
});

export default addEditInvoiceSlice;
