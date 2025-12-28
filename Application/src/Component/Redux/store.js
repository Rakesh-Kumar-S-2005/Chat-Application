import { configureStore } from "@reduxjs/toolkit";
import usersReducer from "./User/UserSlice";
import messageReducer from "./Message/FetchSlice";
export const store = configureStore({
  reducer: {
    users: usersReducer,
    messages: messageReducer,
  },
});
