import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import axiosInstance from "../../api/axiosInstance";
import Loader from "../Components/Loader";

const ContactDetails = () => {
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

  if (isLoading) return <Loader />;
  if (error) return <p className="text-red-500 text-center mt-10">{error}</p>;
  if (!contact) return <p className="text-center text-gray-500 mt-10">No contact found.</p>;

  const getInitials = (first, last) => `${first?.charAt(0).toUpperCase() || ""}${last?.charAt(0).toUpperCase() || ""}`;
  const getAvatarColor = () => {
    if (contact.is_favorite && contact.is_emergency_contact) return "bg-purple-500";
    if (contact.is_favorite) return "bg-yellow-400";
    if (contact.is_emergency_contact) return "bg-red-500";
    return "bg-gray-300";
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 bg-white shadow-lg rounded-xl p-6 md:p-10">
      <button
        onClick={() => navigate(-1)}
        className="mb-6 text-blue-600 hover:underline"
      >
        &larr; Back
      </button>

      <div className="flex flex-col md:flex-row items-center gap-6">
        <div className="w-40 h-40 flex items-center justify-center">
          {contact.image ? (
            <img
              src={contact.image}
              alt={`${contact.first_name} ${contact.last_name}`}
              className="w-full h-full object-cover rounded-full border"
            />
          ) : (
            <div className={`w-full h-full flex items-center justify-center rounded-full border text-white text-3xl font-bold ${getAvatarColor()}`}>
              {getInitials(contact.first_name, contact.last_name)}
            </div>
          )}
        </div>

        <div className="flex-1 space-y-2">
          <h2 className="text-2xl font-semibold">{contact.first_name} {contact.last_name}</h2>
          <p><strong>Category:</strong> {contact.category || "Other"}</p>
          <p><strong>Primary Contact:</strong> {contact.primary_contact}</p>
          <p><strong>Secondary Contact:</strong> {contact.secondary_contact}</p>
          <p><strong>Primary Email:</strong> {contact.primary_email}</p>
          <p><strong>Secondary Email:</strong> {contact.secondary_email}</p>
          <p><strong>City:</strong> {contact.city}</p>
          <p><strong>State:</strong> {contact.state}</p>
          <p><strong>Country:</strong> {contact.country}</p>
          <p><strong>Address:</strong> {contact.address}</p>
          <p><strong>Favorite:</strong> {contact.is_favorite ? "⭐ Yes" : "No"}</p>
          <p><strong>Emergency:</strong> {contact.is_emergency_contact ? "🚨 Yes" : "No"}</p>
        </div>
      </div>

      <div className="flex gap-4 mt-6">
        <Link
          to={`/update-contact/${contact.id}`}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Update
        </Link>
        <Link
          to={`/delete-contact/${contact.id}`}
          className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition"
        >
          Delete
        </Link>
      </div>
    </div>
  );
};

export default ContactDetails;
