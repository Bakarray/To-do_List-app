import { Outlet } from "react-router-dom";
import TodoForm from "./features/todos/components/TodoForm";
import TodoFilters from "./features/todos/components/TodoFilters";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { loadTodos } from "./features/todos/todosSlice";
import { ToastContainer } from "react-toastify";

const App = () => {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.todos.loading);

  useEffect(() => {
    dispatch(loadTodos());
  }, [dispatch]);

  return (
    <div className="max-w-2xl mx-auto p-4 min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
        To-do App
      </h1>
      <TodoForm />
      {loading ? (
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-yellow-500 mx-auto"></div>
          <h2 className="text-zinc-900 dark:text-black mt-4">Loading...</h2>
        </div>
      ) : (
        <>
          <TodoFilters />
          <Outlet />
        </>
      )}

      <ToastContainer limit={3} autoClose={1000} />
    </div>
  );
};

export default App;
