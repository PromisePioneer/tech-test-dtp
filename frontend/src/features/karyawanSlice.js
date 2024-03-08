import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import apiCall from "@/service/apiCall.js";

const initialState = {
  karyawan: null,
  loading: false,
  error: null,
  karyawanDetail: null,
  detailLoading: false,
  success: null,
  formError: null,
  formSuccess: false,
  formLoading: false,
  additionalLoading: false,
  detailPengalamanKerja: null,
  detailPendidikan: null,
};

export const fetchKaryawan = createAsyncThunk(
  "karyawan/fetchKaryawan",
  async () => {
    const response = await apiCall.get("/karyawan");
    return response.data;
  },
);

export const karyawanNextPage = createAsyncThunk(
  "karyawan/nextPage",
  async (_, { getState }) => {
    const { karyawan } = getState();
    const response = await apiCall.get(`${karyawan.karyawan.next_page_url}`);
    return response.data;
  },
);

export const karyawanPrevPage = createAsyncThunk(
  "karyawan/prevPage",
  async (_, { getState }) => {
    const { karyawan } = getState();
    const response = await apiCall.get(`${karyawan.karyawan.prev_page_url}`);
    return response.data;
  },
);

export const karyawanSearch = createAsyncThunk(
  "karyawan/search",
  async (search, { rejectWithValue }) => {
    const response = await apiCall.get(`/karyawan/search?search=${search}`);
    return response.data;
  },
);

export const karyawanDetail = createAsyncThunk(
  "karyawan/karyawanDetail",
  async (id) => {
    const response = await apiCall.get(`karyawan/${id}`);
    return response.data;
  },
);

export const karyawanStore = createAsyncThunk(
  "karyawan/store",
  async (data, { rejectWithValue }) => {
    try {
      const response = await apiCall.post("karyawan/", data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);

export const karyawanUpdate = createAsyncThunk(
  "karyawan/update",
  async ({ ...data }, { rejectWithValue }) => {
    try {
      const response = await apiCall.post(`karyawan/${data.id}`, data.formData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);

export const listPengalamanKerja = createAsyncThunk(
  "karyawan/pengalamanKerja",
  async (id) => {
    const response = await apiCall.get(`karyawan/pengalaman/${id}`);
    return response.data;
  },
);

export const listPendidikan = createAsyncThunk(
  "karyawan/pendidikan",
  async (id) => {
    const response = await apiCall.get(`karyawan/pendidikan/${id}`);
    return response.data;
  },
);

export const karyawanDestroy = createAsyncThunk(
  "karyawan/delete",
  async (id, { rejectWithValue }) => {
    const response = await apiCall.delete(`karyawan/${id}`);
    if (response.status !== 200) {
      return rejectWithValue(response);
    }

    return response.data;
  },
);

const karyawanSlice = createSlice({
  name: "karyawan",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchKaryawan.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchKaryawan.fulfilled, (state, action) => {
        state.loading = false;
        state.karyawan = action.payload;
        state.formSuccess = false;
        state.error = null;
        state.formError = null;
        state.success = false;
      })
      .addCase(karyawanPrevPage.pending, (state) => {
        state.loading = true;
      })
      .addCase(karyawanPrevPage.fulfilled, (state, action) => {
        state.loading = false;
        state.karyawan = action.payload;
        state.error = null;
      })
      .addCase(karyawanNextPage.pending, (state) => {
        state.loading = true;
      })
      .addCase(karyawanNextPage.fulfilled, (state, action) => {
        state.loading = false;
        state.karyawan = action.payload;
        state.error = null;
      })
      .addCase(karyawanDetail.pending, (state) => {
        state.detailLoading = true;
      })
      .addCase(karyawanDetail.fulfilled, (state, action) => {
        state.detailLoading = false;
        state.karyawanDetail = action.payload;
        state.error = null;
        sessionStorage.setItem(
          "karyawanDetail",
          JSON.stringify(action.payload),
        );
      })
      .addCase(karyawanDetail.rejected, (state, action) => {
        state.detailLoading = false;
        state.karyawanDetail = action.payload;
        state.error = action.error;
        sessionStorage.removeItem("karyawanDetail");
      })
      .addCase(karyawanSearch.pending, (state) => {
        state.loading = true;
      })
      .addCase(karyawanSearch.fulfilled, (state, action) => {
        state.loading = false;
        state.karyawan = action.payload;
      })
      .addCase(karyawanStore.pending, (state) => {
        state.formLoading = true;
      })
      .addCase(karyawanStore.fulfilled, (state) => {
        state.formSuccess = true;
        state.formLoading = false;
        state.formError = null;
      })
      .addCase(karyawanStore.rejected, (state, action) => {
        state.formLoading = false;
        state.formSuccess = false;
        state.formError = action.payload;
      })
      .addCase(karyawanUpdate.pending, (state) => {
        state.formLoading = true;
        state.formError = null;
      })
      .addCase(karyawanUpdate.fulfilled, (state) => {
        state.formSuccess = true;
        state.formLoading = false;
        state.formError = null;
      })
      .addCase(karyawanUpdate.rejected, (state, action) => {
        state.formSuccess = false;
        state.formLoading = false;
        state.formError = action.payload;
      })
      .addCase(listPengalamanKerja.pending, (state) => {
        state.additionalLoading = true;
      })
      .addCase(listPengalamanKerja.fulfilled, (state, action) => {
        state.additionalLoading = false;
        state.detailPengalamanKerja = action.payload;
      })
      .addCase(listPengalamanKerja.rejected, (state) => {
        state.additionalLoading = false;
        state.detailPengalamanKerja = null;
      })
      .addCase(listPendidikan.pending, (state) => {
        state.additionalLoading = true;
      })
      .addCase(listPendidikan.fulfilled, (state, action) => {
        state.additionalLoading = false;
        state.detailPendidikan = action.payload;
      })
      .addCase(listPendidikan.rejected, (state) => {
        state.additionalLoading = false;
        state.detailPendidikan = null;
      })
      .addCase(karyawanDestroy.pending, (state) => {
        state.loading = true;
      })
      .addCase(karyawanDestroy.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(karyawanDestroy.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.error;
      });
  },
});

export default karyawanSlice.reducer;
