import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

/* 🔹 Async thunk to fetch users */
export const fetchUsers = createAsyncThunk(
  "users/fetchUsers",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.get(
        "http://localhost:8080/users",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return response.data; // array of users
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to fetch users");
    }
  }
);

const usersSlice = createSlice({
  name: "users",
  initialState: {
    list: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default usersSlice.reducer;
