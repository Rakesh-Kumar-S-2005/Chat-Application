import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

/**
 * Dynamic fetch thunk
 * You pass the endpoint when dispatching
 */
export const fetchData = createAsyncThunk(
  "data/fetch",
  async ({ endpoint, token }, { rejectWithValue }) => {
    try {
      const response = await axios.get(endpoint, {
        headers: {
          Authorization: token ? `Bearer ${token}` : undefined,
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const fetchSlice = createSlice({
  name: "data",
  initialState: {
    data: null,
    loading: false,
    error: null,
  },
  reducers: {
    clearData: (state) => {
      state.data = null;
      state.error = null;
    },
    sendMsg: (state, action) => {
        axios.post("http://localhost:8080/messages", action.payload, {
            headers: {
                Authorization: `Bearer ${action.payload.token}`,
            },
        });
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchData.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearData, sendMsg } = fetchSlice.actions;
export default fetchSlice.reducer;
