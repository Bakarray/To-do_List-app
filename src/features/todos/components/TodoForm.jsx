import { useEffect, useState } from "react";
import { addTodo, clearEditingTodo, updateTodo } from "../todosSlice";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

const TodoForm = () => {
  const dispatch = useDispatch();
  const editingTodoId = useSelector((state) => state.todos.editingTodoId);
  const editingTodo = useSelector((state) =>
    state.todos.todos.find((todo) => todo.id === editingTodoId)
  );

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");

  useEffect(() => {
    if (editingTodo) {
      setTitle(editingTodo.title);
      setDescription(editingTodo.description);
      setDueDate(editingTodo.dueDate || "");
    } else {
      setTitle("");
      setDescription("");
      setDueDate("");
    }
  }, [editingTodo]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) {
      toast.warn("Title is required");
      return;
    }
    if (title.length > 100) {
      toast.warn("Title must be less than 100 characters");
      return;
    }
    if (description.length > 500) {
      toast.warn("Description must be less than 500 characters");
      return;
    }
    if (editingTodoId) {
      dispatch(updateTodo({ id: editingTodoId, title, description }));
      dispatch(clearEditingTodo());
    } else {
      dispatch(addTodo({ title, description }));
    }
    setTitle("");
    setDescription("");
    setDueDate("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-3 mb-5 p-4 bg-white rounded shadow"
    >
      <div className="relative">
        <input
          type="text"
          id="title"
          value={title}
          required
          onChange={(e) => setTitle(e.target.value)}
          className="peer border  border-gray-300 p-2 w-full rounded-xl shadow-sm outline-none focus:border-gray-300 focus:ring-1 focus:ring-blue-500"
        />
        <label
          htmlFor="title"
          className="block text-sm text-gray-700 absolute left-4 top-1/2 -translate-y-1/2 bg-white px-1 font-light transition-all peer-focus:top-0 peer-focus:text-sm peer-focus:text-gray-700 peer-valid:top-0 peer-valid:text-sm peer-valid:text-[#4070f4]"
        >
          Task Title
        </label>
      </div>

      <div className="relative">
        <textarea
          type="text"
          id={"description"}
          value={description}
          required
          onChange={(e) => setDescription(e.target.value)}
          className="peer border  border-gray-300 p-2 w-full rounded-xl shadow-sm outline-none focus:ring-1 focus:ring-blue-500"
        />
        <label
          htmlFor="description"
          className="block text-sm text-gray-700 absolute left-4 top-1/2 -translate-y-1/2 bg-white px-1 font-light transition-all peer-focus:top-0 peer-focus:text-sm peer-focus:text-gray-700 peer-valid:top-0 peer-valid:text-sm peer-valid:text-[#4070f4]"
        >
          Description
        </label>
      </div>
      <div>
        <label
          htmlFor="dueDate"
          className="block text-sm font-light text-gray-700 bg-white"
        >
          Due Date
        </label>
        <input
          type="date"
          id="dueDate"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          className="w-full border rounded-xl border-gray-300 shadow-sm py-2 px-3 focus:outline-none focus:ring-1 focus:ring-blue-500 "
        />
      </div>

      <div className="flex justify-end gap-2">
        {editingTodoId && (
          <button
            type="button"
            className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            onClick={() => dispatch(clearEditingTodo())}
          >
            Cancel
          </button>
        )}
        <button
          type="submit"
          className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-500 focus:outline-none focus:ring-1 focus:ring-offset-2 focus:ring-blue-500 text-center"
        >
          {editingTodoId ? "Update" : "Add"}
        </button>
      </div>
    </form>
  );
};

export default TodoForm;
