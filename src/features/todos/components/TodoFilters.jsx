import { CircleCheckBig, FileClock, ListTodo } from "lucide-react";
import { NavLink, useSearchParams } from "react-router-dom";

const TodoFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const search = searchParams.get("search") || "";

  return (
    <div className=" mb-6 py-1 flex flex-col gap-4 items-center sm:flex-row-reverse sm:items-center justify-between">
      <input
        className="w-min h-8 bg-zinc-200 text-zinc-600 font-mono ring-1 ring-zinc-400 focus:ring-2 focus:ring-blue-400 outline-none duration-300 placeholder:text-zinc-600 placeholder:opacity-50 rounded-full px-4 py-2 shadow focus:shadow-lg"
        autoComplete="off"
        placeholder="Search todos..."
        id="search"
        type="text"
        value={search}
        onChange={(e) => setSearchParams({ search: e.target.value })}
      />
      <div className=" flex gap-4 justify-center">
        <NavLink
          to={"/"}
          className={({ isActive }) =>
            `flex items-center gap-1 py-1 px-3 rounded-full ${
              isActive ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700"
            } hover:bg-blue-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors`
          }
        >
          <ListTodo className="h-5 w-5" />
          <span>All</span>
        </NavLink>
        <NavLink
          to="/active"
          className={({ isActive }) =>
            `flex gap-1 px-3 items-center py-1 rounded-full ${
              isActive ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700"
            } hover:bg-blue-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors`
          }
        >
          <FileClock className="h-5 w-5" />
          <span>Active</span>
        </NavLink>
        <NavLink
          to="/completed"
          className={({ isActive }) =>
            `flex items-center gap-1 px-3 py-1 rounded-full ${
              isActive ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700"
            } hover:bg-blue-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors`
          }
        >
          <CircleCheckBig className="w-5 h-5" />
          <span>Completed</span>
        </NavLink>
      </div>
    </div>
  );
};

export default TodoFilters;
