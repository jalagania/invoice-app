import { createSlice } from "@reduxjs/toolkit";

const invoicesPageSlice = createSlice({
  name: "invoicesPage",
  initialState: {
    invoicesPageVisible: true,
  },
  reducers: {
    showInvoicesPage: (state) => {
      state.invoicesPageVisible = true;
    },

    hideInvoicesPage: (state) => {
      state.invoicesPageVisible = false;
    },
  },
});

export default invoicesPageSlice;
