import React, { useEffect, useState } from "react";
import axiosInstance from "../../api/axiosInstance";
import { toast } from "react-hot-toast";
import { useParams, useNavigate } from "react-router-dom";
import { contact_input_tailwind_classes, contact_textarea_tailwind_classes } from "./utils/utils"


const UpdateContact = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    primary_contact: "",
    secondary_contact: "",
    address: "",
    city: "",
    state: "",
    country: "",
    primary_email: "",
    secondary_email: "",
    image: null,
    is_favorite: false,
    is_emergency_contact: false,
    category: "Other",
  });

  const [loading, setLoading] = useState(true);

  // Fetch contact details
  useEffect(() => {
    const fetchContact = async () => {
      try {
        const res = await axiosInstance.get(`/contact/${id}/`);
        setFormData({
          ...res.data,
          image: null, // reset image so it doesn't auto-submit old file
        });
      } catch (error) {
        toast.error("Failed to load contact.");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchContact();
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox"
          ? checked
          : type === "file"
          ? files[0]
          : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updateData = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (value !== null && value !== "") {
        updateData.append(key, value);
      }
    });

    try {
      await axiosInstance.put(`/contact/${id}/`, updateData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      toast.success("Contact updated successfully!");
      navigate("/contacts"); // redirect after update
    } catch (error) {
      toast.error("Failed to update contact.");
      console.error(error);
    }
  };

  if (loading) return <p className="text-center">Loading...</p>;

  return (
    <div className="bg-white shadow-lg rounded-xl p-6 md:p-10 w-full max-w-2xl mx-auto">
      <h2 className="text-2xl font-semibold mb-6 text-center text-gray-700">
        Update Contact
      </h2>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-4"
      >
        {/* First Name */}
        <div>
          <label className="block text-sm font-medium text-gray-600">First Name</label>
          <input
            type="text"
            name="first_name"
            value={formData.first_name}
            onChange={handleChange}
            placeholder="Enter first name"
            className={contact_input_tailwind_classes}
            required
          />
        </div>

        {/* Last Name */}
        <div>
          <label className="block text-sm font-medium text-gray-600">Last Name</label>
          <input
            type="text"
            name="last_name"
            value={formData.last_name}
            onChange={handleChange}
            placeholder="Enter last name"
            className={contact_input_tailwind_classes}
            required
          />
        </div>

        {/* Primary Contact */}
        <div>
          <label className="block text-sm font-medium text-gray-600">Primary Contact</label>
          <input
            type="text"
            name="primary_contact"
            value={formData.primary_contact}
            onChange={handleChange}
            placeholder="e.g. 9876543210"
            className={contact_input_tailwind_classes}
            required
          />
        </div>

        {/* Secondary Contact */}
        <div>
          <label className="block text-sm font-medium text-gray-600">Secondary Contact</label>
          <input
            type="text"
            name="secondary_contact"
            value={formData.secondary_contact}
            onChange={handleChange}
            placeholder="e.g. 9876543211"
            className={contact_input_tailwind_classes}
            required
          />
        </div>

        {/* Primary Email */}
        <div>
          <label className="block text-sm font-medium text-gray-600">Primary Email</label>
          <input
            type="email"
            name="primary_email"
            value={formData.primary_email}
            onChange={handleChange}
            placeholder="example@gmail.com"
            className={contact_input_tailwind_classes}
            required
          />
        </div>

        {/* Secondary Email */}
        <div>
          <label className="block text-sm font-medium text-gray-600">Secondary Email</label>
          <input
            type="email"
            name="secondary_email"
            value={formData.secondary_email}
            onChange={handleChange}
            placeholder="backup@example.com"
            className={contact_input_tailwind_classes}
            required
          />
        </div>

        {/* City */}
        <div>
          <label className="block text-sm font-medium text-gray-600">City</label>
          <input
            type="text"
            name="city"
            value={formData.city}
            onChange={handleChange}
            placeholder="Enter city"
            className={contact_input_tailwind_classes}
          />
        </div>

        {/* State */}
        <div>
          <label className="block text-sm font-medium text-gray-600">State</label>
          <input
            type="text"
            name="state"
            value={formData.state}
            onChange={handleChange}
            placeholder="Enter state"
            className={contact_input_tailwind_classes}
          />
        </div>

        {/* Country */}
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-600">Country</label>
          <input
            type="text"
            name="country"
            value={formData.country}
            onChange={handleChange}
            placeholder="Enter country"
            className={contact_input_tailwind_classes}
          />
        </div>

        {/* Category */}
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-600">Category</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className={contact_input_tailwind_classes}
          >
            <option value="Family">Family</option>
            <option value="Friend">Friend</option>
            <option value="Colleague">Colleague</option>
            <option value="Relative">Relative</option>
            <option value="Other">Other</option>
          </select>
        </div>

        {/* Address */}
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-600">Address</label>
          <textarea
            name="address"
            value={formData.address}
            onChange={handleChange}
            placeholder="Enter address"
            className={contact_input_tailwind_classes + contact_textarea_tailwind_classes}
          />
        </div>

        {/* Image */}
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-600">Update Image</label>
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleChange}
            className="w-full mt-1"
          />
        </div>

        {/* Checkboxes */}
        <div className="flex items-center gap-6 md:col-span-2">
          <label className="flex items-center gap-2 text-gray-700">
            <input
              type="checkbox"
              name="is_favorite"
              checked={formData.is_favorite}
              onChange={handleChange}
              className="h-5 w-5 rounded-full border-gray-400 text-blue-600 focus:ring focus:ring-blue-300"
            />
            Favorite
          </label>

          <label className="flex items-center gap-2 text-gray-700">
            <input
              type="checkbox"
              name="is_emergency_contact"
              checked={formData.is_emergency_contact}
              onChange={handleChange}
              className="h-5 w-5 rounded-full border-gray-400 text-red-600 focus:ring focus:ring-red-300"
            />
            Emergency
          </label>
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="md:col-span-2 w-full mt-6 bg-orange-600 text-white py-2 rounded-lg hover:bg-orange-700 transition"
        >
          Update Contact
        </button>
      </form>
    </div>
  );
};

export default UpdateContact;
