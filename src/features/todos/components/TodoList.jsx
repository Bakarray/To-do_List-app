import { useSelector } from "react-redux";
import { useLocation, useSearchParams } from "react-router";
import TodoItem from "./TodoItem";
import { useEffect, useMemo, useState } from "react";
import { MoveLeft, MoveRight } from "lucide-react";

const TodoList = () => {
  const todos = useSelector((state) => state.todos.todos);
  const location = useLocation();
  const filter = location.pathname.slice(1) || "all";
  const [searchParams] = useSearchParams();
  const search = searchParams.get("search") || "";
  const [page, setPage] = useState(1);
  const todosPerPage = 10;

  useEffect(() => {
    setPage(1);
  }, [search]);

  const filteredTodos = useMemo(() => {
    return todos
      .filter((todo) => {
        if (filter === "active") return todo.status === "pending";
        if (filter === "completed") return todo.status === "completed";
        return true;
      })
      .filter(
        (todo) =>
          todo.title.toLowerCase().includes(search.toLowerCase()) ||
          todo.description.toLowerCase().includes(search.toLowerCase())
      );
  }, [todos, filter, search]);

  const startIndex = (page - 1) * todosPerPage;
  const endIndex = startIndex + todosPerPage;
  const currentTodos = filteredTodos.slice(startIndex, endIndex);

  return (
    <div>
      <ul className="space-y-2">
        {currentTodos.length ? (
          currentTodos.map((todo) => <TodoItem key={todo.id} todo={todo} />)
        ) : (
          <li className="text-center text-gray-500 py-4">No todos found</li>
        )}
      </ul>
      {filteredTodos.length > todosPerPage && (
        <div className="mt-4 flex justify-between items-center">
          <button
            onClick={() => setPage((p) => Math.max(p - 1, 1))}
            disabled={page === 1}
            className={`p-2 rounded ${
              page === 1
                ? "opacity-50"
                : "cursor-pointer hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            }`}
            title="Go to previous page"
          >
            <MoveLeft className="h-5 w-5" />
          </button>

          <span>
            Page {page} of {Math.ceil(filteredTodos.length / todosPerPage)}
          </span>
          <button
            onClick={() => setPage((p) => p + 1)}
            disabled={endIndex >= filteredTodos.length}
            className={`p-2 rounded ${
              endIndex >= filteredTodos.length
                ? "opacity-50"
                : "cursor-pointer hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            }`}
            title="Go to next page"
          >
            <MoveRight className="h-5 w-5" />
          </button>
        </div>
      )}
    </div>
  );
};

export default TodoList;
