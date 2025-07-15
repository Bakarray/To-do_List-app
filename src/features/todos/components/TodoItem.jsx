import { memo } from "react";
import { useDispatch } from "react-redux";

import { deleteTodo, setEditingTodo, toggleTodoStatus } from "../todosSlice";

import { Check, SquarePen, Trash2, TriangleAlert } from "lucide-react";

const TodoItem = memo(({ todo }) => {
  const dispatch = useDispatch();
  const isOverdue =
    todo.status === "pending" &&
    todo.dueDate &&
    new Date(todo.dueDate) < new Date();

  const handleDelete = () => {
    dispatch(deleteTodo(todo.id));
  };

  const handleToggle = () => {
    dispatch(toggleTodoStatus(todo.id));
  };

  return (
    <li
      className={`flex flex-col sm:flex-row justify-between items-start p-4 border-b ${
        isOverdue ? "bg-red-100" : "bg-white"
      }`}
    >
      <div className="flex-1">
        <h3
          className={`text-lg ${
            todo.status === "completed"
              ? "line-through text-gray-500"
              : "text-gray-800"
          }`}
        >
          {todo.title}
          {isOverdue && (
            <TriangleAlert className="h-5 w-5 text-red-500 inline ml-2" />
          )}
        </h3>
        <p className="text-sm text-gray-600">{todo.description}</p>
        <p className="text-xs text-gray-400 mt-1">
          Created: {new Date(todo.createdAt).toLocaleString()}
        </p>
        <p className="text-xs text-gray-400">
          Due:{" "}
          {todo.dueDate
            ? new Date(todo.dueDate).toLocaleDateString()
            : "No due date"}
        </p>
      </div>
      <div className="flex gap-2 mt-2 sm:mt-0">
        <button
          onClick={() => dispatch(setEditingTodo(todo.id))}
          className="text-blue-500 hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 p-1"
        >
          <SquarePen />
        </button>
        <button
          onClick={handleDelete}
          className="text-red-500 hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 p-1"
        >
          <Trash2 />
        </button>
        <button
          onClick={handleToggle}
          className="text-green-500 hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 p-1"
        >
          <Check />
        </button>
      </div>
    </li>
  );
});

export default TodoItem;
