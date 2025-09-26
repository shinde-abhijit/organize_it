import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axiosInstance from "../../api/axiosInstance";
import Loader from "../Components/Loader";
import { toast } from "react-hot-toast";

const DeleteContact = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [contact, setContact] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchContact = async () => {
      try {
        setIsLoading(true);
        const response = await axiosInstance.get(`/contact/${id}/`);
        setContact(response.data);
      } catch (err) {
        setError("Failed to load contact.");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchContact();
  }, [id]);

  const handleDelete = async () => {
    try {
      await axiosInstance.delete(`/contact/${id}/`);
      toast.success("Contact deleted successfully!");
      navigate("/contacts");
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete contact.");
    }
  };

  if (isLoading) return <Loader />;
  if (error) return <p className="text-red-500 text-center mt-10">{error}</p>;
  if (!contact) return <p className="text-center text-gray-500 mt-10">No contact found.</p>;

  return (
    <div className="max-w-md mx-auto mt-20 bg-white shadow-lg rounded-xl p-6 text-center">
      <h2 className="text-2xl font-semibold mb-4">Delete Contact</h2>
      <p className="mb-6 text-gray-700">
        Are you sure you want to delete <strong>{contact.first_name} {contact.last_name}</strong>?
      </p>
      <div className="flex justify-center gap-4">
        <button
          onClick={handleDelete}
          className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition"
        >
          Yes, Delete
        </button>
        <button
          onClick={() => navigate(-1)}
          className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400 transition"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default DeleteContact;
