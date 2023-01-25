import { configureStore } from "@reduxjs/toolkit";
import dataSlice from "./dataSlice";
import invoicesPageSlice from "./invoicesPageSlice";
import invoiceDetailsPageSlice from "./invoiceDetailsPageSlice";
import modalDeleteSLice from "./modalDeleteSlice";
import addEditInvoiceSlice from "./addEditInvoiceSlice";

export const store = configureStore({
  reducer: {
    data: dataSlice.reducer,
    invoicesPage: invoicesPageSlice.reducer,
    invoiceDetailsPage: invoiceDetailsPageSlice.reducer,
    modalDelete: modalDeleteSLice.reducer,
    addEditInvoicePage: addEditInvoiceSlice.reducer,
  },
});
