import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axiosInstance from "../../api/axiosInstance";
import { todo_input_classes } from "./utils/utils";

const AddTodo = () => {
  const navigate = useNavigate();

  const [todo, setTodo] = useState({
    title: "",
    priority: "Low",
    due_date: "",
    is_completed: false, // ✅ Added is_completed
  });

  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setTodo({
      ...todo,
      [name]: type === "checkbox" ? checked : value, // Handle checkbox
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        ...todo,
        due_date: todo.due_date === "" ? null : todo.due_date, // Handle empty date
      };
      await axiosInstance.post("todo/", payload);
      navigate("/todos"); // Redirect to TodoList after adding
    } catch (err) {
      console.error(err.response?.data || err.message);
      setError(err.response?.data || err.message || "Failed to add todo");
    }
  };

  return (
    <div className="flex justify-center items-center mx-auto px-4">
      <div className="w-full max-w-md bg-white shadow-md rounded-2xl p-6 sm:p-8">
        <h2 className="text-2xl font-bold mb-4 text-center">Add Todo</h2>

        {error && <p className="text-red-500 mb-4 text-center">{JSON.stringify(error)}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1 font-semibold">Title</label>
            <input
              type="text"
              name="title"
              value={todo.title}
              onChange={handleChange}
              className={todo_input_classes}
              placeholder="Enter title"
              required
            />
          </div>

          <div>
            <label className="block mb-1 font-semibold">Priority</label>
            <select
              name="priority"
              value={todo.priority}
              onChange={handleChange}
              className={todo_input_classes}
            >
              <option>Low</option>
              <option>Medium</option>
              <option>High</option>
            </select>
          </div>

          <div>
            <label className="block mb-1 font-semibold">Due Date</label>
            <input
              type="date"
              name="due_date"
              value={todo.due_date}
              onChange={handleChange}
              className={todo_input_classes}
            />
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              name="is_completed"
              checked={todo.is_completed}
              onChange={handleChange}
            />
            <label className="font-semibold">Mark as Completed</label>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition"
          >
            Add Todo
          </button>
        </form>

        <p className="mt-4 text-sm text-center">
          <Link to="/todos" className="text-blue-600 hover:underline">
            Back to Todo List
          </Link>
        </p>
      </div>
    </div>
  );
};

export default AddTodo;
