import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axiosInstance from '../../../api/axiosInstance';
import { toast } from 'react-hot-toast';

const ContactCard = ({ contact, onUpdate }) => {
  const [isFavorite, setIsFavorite] = useState(Boolean(contact.is_favorite));
  const [isEmergency, setIsEmergency] = useState(Boolean(contact.is_emergency_contact));

  const toggleFavorite = async () => {
    const newFavorite = !isFavorite;
    try {
      await axiosInstance.patch(`/contact/${contact.id}/`, { is_favorite: newFavorite });
      setIsFavorite(newFavorite);
      onUpdate(contact.id, { is_favorite: newFavorite });
      toast.success(newFavorite ? "Contact marked as favorite." : "Removed from favorites.");
    } catch (error) {
      console.error(error);
      toast.error(newFavorite ? "Failed to mark as favorite." : "Failed to remove favorite.");
    }
  };

  const toggleEmergency = async () => {
    const newEmergency = !isEmergency;
    try {
      await axiosInstance.patch(`/contact/${contact.id}/`, { is_emergency_contact: newEmergency });
      setIsEmergency(newEmergency);
      onUpdate(contact.id, { is_emergency_contact: newEmergency });
      toast.success(newEmergency ? "Contact marked as emergency." : "Removed from emergency.");
    } catch (error) {
      console.error(error);
      toast.error(newEmergency ? "Failed to mark as emergency." : "Failed to remove emergency.");
    }
  };

  // Determine circle color for initials
  const getCircleColor = () => {
    if (isFavorite && isEmergency) return "bg-purple-500";
    if (isFavorite) return "bg-yellow-400";
    if (isEmergency) return "bg-red-500";
    return "bg-gray-300";
  };

  // Get initials
  const getInitials = () => {
    const first = contact.first_name?.[0] || "";
    const last = contact.last_name?.[0] || "";
    return (first + last).toUpperCase();
  };

  return (
    <div className="bg-gray-50 rounded-xl shadow-md p-6 hover:shadow-xl transition relative">
      <div className="flex items-center gap-4 mb-4">
        {/* Image or Initials Circle */}
        <div className="w-16 h-16 flex items-center justify-center rounded-full overflow-hidden flex-shrink-0">
          {contact.image ? (
            <img
              src={contact.image}
              alt={`${contact.first_name} ${contact.last_name}`}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className={`w-full h-full flex items-center justify-center text-white font-bold text-lg ${getCircleColor()}`}>
              {getInitials()}
            </div>
          )}
        </div>

        {/* Contact Info */}
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-800">
            <Link to={`/contact-details/${contact.id}`} className="hover:underline">
              {contact.first_name} {contact.last_name}
            </Link>
          </h3>
          <p className="text-gray-500">{contact.primary_contact}</p>
          <p className="text-gray-500">{contact.primary_email}</p>
        </div>
      </div>

      <div className="flex justify-between items-center mt-4">
        {/* Emergency Checkbox */}
        <label className="flex items-center space-x-2 cursor-pointer">
          <input
            type="checkbox"
            checked={isEmergency}
            onChange={toggleEmergency}
            className="
              w-6 h-6
              rounded-full
              border-2 border-red-300
              appearance-none
              checked:bg-red-600
              checked:border-red-600
              focus:outline-none
              focus:ring-2
              focus:ring-red-500
              transition
            "
          />
          <span className="text-gray-700 font-medium">Emergency</span>
        </label>

        {/* Favorite Checkbox */}
        <label className="flex items-center space-x-2 cursor-pointer">
          <input
            type="checkbox"
            checked={isFavorite}
            onChange={toggleFavorite}
            className="
              w-6 h-6
              rounded-full
              border-2 border-yellow-300
              appearance-none
              checked:bg-yellow-500
              checked:border-yellow-500
              focus:outline-none
              focus:ring-2
              focus:ring-yellow-400
              transition
            "
          />
          <span className="text-gray-700 font-medium">Favorite</span>
        </label>
      </div>
    </div>
  );
};

export default ContactCard;
