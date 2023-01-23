import { createSlice } from "@reduxjs/toolkit";

const modalDeleteSLice = createSlice({
  name: "modalDelete",
  initialState: {
    modalDeleteVisible: false,
  },
  reducers: {
    openModalDelete: (state) => {
      state.modalDeleteVisible = true;
    },

    closeModalDelete: (state) => {
      state.modalDeleteVisible = false;
    },
  },
});

export default modalDeleteSLice;
