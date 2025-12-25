import { configureStore } from "@reduxjs/toolkit";
import usersReducer from "./User/UserSlice";

export const store = configureStore({
  reducer: {
    users: usersReducer,
  },
});
