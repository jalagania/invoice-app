import { configureStore } from "@reduxjs/toolkit";
import dataSlice from "./dataSlice";
import invoicesPageSlice from "./invoicesPageSlice";
import invoiceDetailsPageSlice from "./invoiceDetailsPageSlice";
import modalDeleteSLice from "./modalDeleteSlice";
import addInvoiceSlice from "./addInvoiceSlice";
import editInvoiceSlice from "./editInvoiceSlice";

export const store = configureStore({
  reducer: {
    data: dataSlice.reducer,
    invoicesPage: invoicesPageSlice.reducer,
    invoiceDetailsPage: invoiceDetailsPageSlice.reducer,
    modalDelete: modalDeleteSLice.reducer,
    addInvoicePage: addInvoiceSlice.reducer,
    editInvoicePage: editInvoiceSlice.reducer,
  },
});
