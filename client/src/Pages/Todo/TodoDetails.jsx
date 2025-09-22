import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axiosInstance from "../../api/axiosInstance";

const TodoDetails = () => {
  const { id } = useParams();
  const [todo, setTodo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTodo = async () => {
      try {
        const response = await axiosInstance.get(`todo/${id}/`);
        setTodo(response.data);
      } catch (err) {
        setError(err.message || "Failed to fetch todo");
      } finally {
        setLoading(false);
      }
    };
    fetchTodo();
  }, [id]);

  if (loading) return <div className="text-center mt-10">Loading...</div>;
  if (error) return <div className="text-center mt-10 text-red-500">{error}</div>;
  if (!todo) return <div className="text-center mt-10">Todo not found</div>;

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white shadow rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Todo Details</h2>
      <p className="mb-2"><strong>Title:</strong> {todo.title}</p>
      <p className="mb-2"><strong>Priority:</strong> {todo.priority}</p>
      <p className="mb-2"><strong>Due Date:</strong> {todo.due_date ? new Date(todo.due_date).toLocaleDateString() : "N/A"}</p>
      <p className="mb-4">
        <strong>Status:</strong> {todo.is_completed ? "✔ Completed" : "⏳ Incomplete"}
      </p>
      <Link to="/todos" className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700">
        Back to Todos
      </Link>
    </div>
  );
};

export default TodoDetails;
