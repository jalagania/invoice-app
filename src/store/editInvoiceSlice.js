import { createSlice } from "@reduxjs/toolkit";

const editInvoiceSlice = createSlice({
  name: "editInvoicePage",
  initialState: {
    editInvoicePageVisible: false,
  },
  reducers: {
    showEditInvoicePage: (state) => {
      state.editInvoicePageVisible = true;
    },

    hideEditInvoicePage: (state) => {
      state.editInvoicePageVisible = false;
    },
  },
});

export default editInvoiceSlice;
