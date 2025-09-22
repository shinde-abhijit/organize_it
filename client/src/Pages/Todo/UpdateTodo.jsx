import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import axiosInstance from "../../api/axiosInstance";
import { todo_input_classes } from "./utils/utils";

const UpdateTodo = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [todo, setTodo] = useState({
    title: "",
    priority: "Low",
    due_date: "",
    is_completed: false,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch existing todo data
  useEffect(() => {
    const fetchTodo = async () => {
      try {
        const response = await axiosInstance.get(`todo/${id}/`);
        setTodo({
          ...response.data,
          due_date: response.data.due_date ? response.data.due_date.split("T")[0] : "",
        });
      } catch (err) {
        setError(err.response?.data || err.message || "Failed to fetch todo");
      } finally {
        setLoading(false);
      }
    };
    fetchTodo();
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setTodo({
      ...todo,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        ...todo,
        due_date: todo.due_date === "" ? null : todo.due_date,
      };
      await axiosInstance.put(`todo/${id}/`, payload);
      navigate("/todos"); // Redirect after update
    } catch (err) {
      console.error(err.response?.data || err.message);
      setError(err.response?.data || err.message || "Failed to update todo");
    }
  };

  if (loading)
    return <div className="text-center mt-10 text-gray-500">Loading todo...</div>;
  if (error)
    return <div className="text-center mt-10 text-red-500">{JSON.stringify(error)}</div>;

  return (
    <div className="flex justify-center items-center mx-auto px-4">
      <div className="w-full max-w-md bg-white shadow-md rounded-2xl p-6 sm:p-8">
        <h2 className="text-2xl font-bold mb-4 text-center">Update Todo</h2>

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

export default UpdateTodo;
