import { data } from "../data";
import { createSlice } from "@reduxjs/toolkit";

const dataSlice = createSlice({
  name: "appData",
  initialState: {
    appData: data,
  },
  reducers: {},
});

export default dataSlice;
