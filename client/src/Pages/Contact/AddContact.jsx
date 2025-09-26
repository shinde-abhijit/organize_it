import React, { useState } from "react";
import axiosInstance from "../../api/axiosInstance";
import { toast } from "react-hot-toast";
import { contact_input_tailwind_classes, contact_textarea_tailwind_classes } from "./utils/utils"


const AddContact = () => {
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
    category: "Other", // 👈 added default
    is_favorite: false,
    is_emergency_contact: false,
  });

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
    try {
      await axiosInstance.post("/contact/", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      toast.success("Contact added successfully!");
      setFormData({
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
        category: "Other",
        is_favorite: false,
        is_emergency_contact: false,
      });
    } catch (error) {
      toast.error("Failed to add contact.");
      console.error(error);
      const data = error.response?.data
      if (data && typeof data === "object") {
        Object.values(data).forEach((messages) => {
          if (Array.isArray(messages)) {
            messages.forEach((message) => toast.error(message)); // show each error
          } else {
            toast.error(messages);
          }
        });
      } else {
        toast.error(err.message || "Failed to add todo");
      }
    }
  };

  return (
    <div className="bg-white shadow-lg rounded-xl p-6 md:p-10 w-full max-w-2xl mx-auto">
      <h2 className="text-2xl font-semibold mb-6 text-center text-gray-700">
        Add New Contact
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
          <label className="block text-sm font-medium text-gray-600">Contact Image</label>
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
            />
            Favorite
          </label>

          <label className="flex items-center gap-2 text-gray-700">
            <input
              type="checkbox"
              name="is_emergency_contact"
              checked={formData.is_emergency_contact}
              onChange={handleChange}
            />
            Emergency
          </label>
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="md:col-span-2 w-full mt-6 bg-orange-600 text-white py-2 rounded-lg hover:bg-orange-700 transition"
        >
          Add Contact
        </button>
      </form>
    </div>
  );
};

export default AddContact;
