import React, { useEffect, useState } from "react";
import axiosInstance from "../../api/axiosInstance";
import { Link } from "react-router-dom"; // For navigation

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch todos from API
  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await axiosInstance.get("todo/");
        setTodos(response.data);
      } catch (err) {
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchTodos();
  }, []);

  // Handlers for mark complete/incomplete and delete
  const toggleComplete = async (id, isCompleted) => {
    try {
      // Send PATCH request to update the `is_completed` field
      await axiosInstance.patch(`todo/${id}/`, {
        is_completed: !isCompleted,
      });

      // Update local state
      setTodos((prev) =>
        prev.map((todo) =>
          todo.id === id ? { ...todo, is_completed: !isCompleted } : todo
        )
      );
    } catch (err) {
      console.error(err);
    }
  };


  const deleteTodo = async (id) => {
    try {
      await axiosInstance.delete(`todo/${id}/`);
      setTodos((prev) => prev.filter((todo) => todo.id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return <div className="text-center mt-10 text-gray-500">Loading todos...</div>;
  if (error) return <div className="text-center mt-10 text-red-500">Error: {error}</div>;

  const completedCount = todos.filter((todo) => todo.is_completed).length;
  const incompleteCount = todos.length - completedCount;

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white shadow rounded-lg">
      <h2 className="text-2xl font-bold mb-4 text-center">My Todos</h2>

      <div className="mb-4 flex justify-between items-center">
        <Link
          to="/add-todo"
          className={`bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition ${
            incompleteCount >= 20 ? "opacity-50 cursor-not-allowed pointer-events-none" : ""
          }`}
        >
          + Add Todo
        </Link>
        <span className="text-gray-600 text-sm">
          Total: {todos.length} | Completed: {completedCount} | Incomplete: {incompleteCount}
        </span>
      </div>

      {todos.length === 0 ? (
        <div className="text-gray-500 text-center">
          No todos found. <Link to="/add-todo" className="text-blue-600 hover:underline">Add a new todo</Link>
        </div>
      ) : (
        <ul className="space-y-4">
          {todos.map((todo, index) => (
            <li
              key={todo.id || index}
              className={`p-4 rounded-lg ${todo.is_completed ? "bg-green-50" : "bg-gray-50"} hover:shadow-md transition`}
            >
              <div>
                <h3 className={`font-semibold break-words ${todo.is_completed ? "line-through text-gray-500" : ""}`}>
                  {todo.title}
                </h3>
                <p className="text-sm text-gray-500">
                  Priority: {todo.priority} {todo.due_date && `| Due: ${new Date(todo.due_date).toLocaleDateString()}`}
                </p>
                <p className={`text-xs ${todo.is_completed ? "text-green-600" : "text-red-600"}`}>
                  {todo.is_completed ? "✔ Completed" : "⏳ Incomplete"}
                </p>
              </div>

              <div className="mt-3 flex flex-wrap gap-2">
                <button
                  onClick={() => toggleComplete(todo.id, todo.is_completed)}
                  className={`px-3 py-1 rounded text-white text-sm ${
                    todo.is_completed ? "bg-yellow-500 hover:bg-yellow-600" : "bg-green-600 hover:bg-green-700"
                  }`}
                >
                  {todo.is_completed ? "Mark Incomplete" : "Mark Complete"}
                </button>

                <Link to={`/update-todo/${todo.id}`} className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm">
                  Edit
                </Link>
                <Link to={`/todo-details/${todo.id}`} className="px-3 py-1 bg-orange-600 text-white rounded hover:bg-orange-700 text-sm">
                  Details
                </Link>
                <Link to={`/delete-todo/${todo.id}`} className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 text-sm">
                  Delete
                </Link>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TodoList;
