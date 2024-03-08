import { configureStore } from "@reduxjs/toolkit";
import karyawanSlice from "@/features/karyawanSlice.js";

const store = configureStore({
  reducer: {
    karyawan: karyawanSlice,
  },
});

export default store;
