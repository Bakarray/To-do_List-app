import { configureStore } from "@reduxjs/toolkit";
import todoReducer from "../features/todos/todosSlice";

export const store = configureStore({
  reducer: {
    todos: todoReducer,
  },
});
