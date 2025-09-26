import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axiosInstance from "../../api/axiosInstance";

const DeleteTodo = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [todoTitle, setTodoTitle] = useState("");
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    document.title = "Delete Todo";
  }, []);
  // Fetch todo title for confirmation message
  useEffect(() => {
    const fetchTodo = async () => {
      try {
        const response = await axiosInstance.get(`todo/${id}/`);
        setTodoTitle(response.data.title);
      } catch (err) {
        console.error(err);
        alert("Failed to fetch todo");
        navigate("/");
      } finally {
        setLoading(false);
      }
    };
    fetchTodo();
  }, [id, navigate]);

  const handleDelete = async () => {
    try {
      await axiosInstance.delete(`todo/${id}/`);
      navigate("/todos"); // Redirect after deletion
    } catch (err) {
      console.error(err);
      alert("Failed to delete todo");
      navigate("/todos");
    }
  };

  const handleCancel = () => {
    navigate("/todos"); // Go back to TodoList
  };

  if (loading) return <div className="text-center mt-10 text-gray-500">Loading...</div>;

  return (
    <div className="max-w-md mx-auto mt-20 p-6 bg-white shadow rounded-lg text-center">
      <h2 className="text-xl font-bold mb-4">Confirm Delete</h2>
      <p className="mb-6 text-gray-700">
        Are you sure you want to delete the todo: <span className="font-semibold">{todoTitle}</span>?
      </p>
      <div className="flex justify-center gap-4">
        <button
          onClick={handleDelete}
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
        >
          Yes, Delete
        </button>
        <button
          onClick={handleCancel}
          className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500 transition"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default DeleteTodo;
