import { createSlice } from "@reduxjs/toolkit";
import { openDB } from "idb";
import { toast } from "react-toastify";

const dbPromise = openDB("todos", 1, {
  upgrade(db) {
    if (!db.objectStoreNames.contains("todos")) {
      db.createObjectStore("todos", { keyPath: "id" });
    }
  },
});

const initialState = {
  todos: [],
  nextId: 1,
  editingTodoId: null,
  loading: false,
};

const todosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    setTodos: (state, action) => {
      state.todos = action.payload;
      state.nextId = action.payload.length
        ? Math.max(...action.payload.map((t) => t.id)) + 1
        : 1;
    },
    addTodo: (state, action) => {
      const { title, description, dueDate } = action.payload;
      const newTodo = {
        id: state.nextId,
        title,
        description,
        status: "pending",
        createdAt: new Date().toISOString(),
        dueDate,
      };
      state.todos.push(newTodo);
      state.nextId += 1;
      // Use plain object synchronously
      const plainTodo = { ...newTodo }; // do this because immer creates a proxy object
      dbPromise
        .then((db) => db.put("todos", plainTodo))
        .then(() => toast.success("Task added successfully"))
        .catch(() => toast.error("Error adding task"));
    },
    updateTodo: (state, action) => {
      const { id, title, description, dueDate } = action.payload;
      const todo = state.todos.find((t) => t.id === id);
      if (todo) {
        todo.title = title;
        todo.description = description;
        todo.dueDate = dueDate;

        const plainTodo = { ...todo };
        dbPromise
          .then((db) => db.put("todos", plainTodo))
          .then(() => toast.success("Task updated successfully"))
          .catch(() => toast.error("Error updating task"));
      }
    },
    deleteTodo: (state, action) => {
      const id = action.payload;
      state.todos = state.todos.filter((t) => t.id !== id);
      dbPromise
        .then((db) => db.delete("todos", id))
        .then(() => toast.warn("Task deleted"))
        .catch(() => toast.error("Error deleting task"));
    },
    toggleTodoStatus: (state, action) => {
      const id = action.payload;
      const todo = state.todos.find((t) => t.id === id);
      if (todo) {
        todo.status = todo.status === "pending" ? "completed" : "pending";
        const plainTodoObj = { ...todo }; // because immer creates a proxy object
        dbPromise
          .then((db) => db.put("todos", plainTodoObj))
          .then(() => toast.info(`Task${id} ${plainTodoObj.status}`))
          .catch(() => toast.warn("Operation failed"));
      }
    },
    setEditingTodo: (state, action) => {
      state.editingTodoId = action.payload;
    },
    clearEditingTodo: (state) => {
      state.editingTodoId = null;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
});

export const {
  setTodos,
  addTodo,
  updateTodo,
  deleteTodo,
  toggleTodoStatus,
  setEditingTodo,
  clearEditingTodo,
  setLoading,
} = todosSlice.actions;

export const loadTodos = () => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const db = await dbPromise;
    const todos = await db.getAll("todos");
    dispatch(setTodos(todos));
  } catch {
    toast.error("Failed to load todos");
  } finally {
    dispatch(setLoading(false));
  }
};

export default todosSlice.reducer;
