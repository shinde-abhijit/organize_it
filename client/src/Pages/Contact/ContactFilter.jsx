import React, { useEffect, useState } from 'react';
import axiosInstance from '../../api/axiosInstance';
import { Link } from 'react-router-dom';
import ContactCard from './ContactComponents/ContactCard';
import Loader from '../Components/Loader';
import { toast } from 'react-hot-toast';
import { filter_contact_input_tailwind_classes, filter_contact_select_tailwind_classes } from './utils/utils';


const ContactFilter = () => {
  const [contacts, setContacts] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Search, sort, and pagination state
  const [search, setSearch] = useState('');
  const [sortField, setSortField] = useState('first_name');
  const [sortOrder, setSortOrder] = useState('asc');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const contactsPerPage = 6;

  const fetchContacts = async () => {
    document.title = "Contact Filter";
    try {
      setIsLoading(true);
      const response = await axiosInstance.get(`/contact`, {
        params: {
          search,
          ordering: sortOrder === 'asc' ? sortField : `-${sortField}`,
          page: currentPage,
          limit: contactsPerPage,
        },
      });

      setContacts(response.data.results || response.data);
      setTotalPages(response.data.total_pages || Math.ceil((response.data.length || 0) / contactsPerPage));
    } catch (error) {
      setError(error?.message || 'Failed to fetch contacts.');
      toast.error('Failed to fetch contacts.');
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    document.title = 'Contact List';
    fetchContacts();
  }, [search, sortField, sortOrder, currentPage]);

  const handleUpdateContact = (contactId, updatedFields) => {
    setContacts((prevContacts) =>
      prevContacts.map((c) =>
        c.id === contactId ? { ...c, ...updatedFields } : c
      )
    );
  };

  return (
    <div className="max-w-6xl mx-auto mt-10 p-6 bg-white rounded-lg">
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
        <h2 className="text-3xl font-bold text-gray-800">My Contacts</h2>
        <Link
          to="/add-contact"
          className="bg-green-600 text-white px-5 py-2 rounded-lg hover:bg-green-700 transition"
        >
          + Add Contact
        </Link>
      </div>

      {/* Search & Sort Controls */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
        <input
          type="text"
          placeholder="Search by name, email, or phone"
          value={search}
          onChange={(e) => { setSearch(e.target.value); setCurrentPage(1); }}
          className={filter_contact_input_tailwind_classes}
        />

        <select
          value={sortField}
          onChange={(e) => setSortField(e.target.value)}
          className={filter_contact_select_tailwind_classes}
        >
          <option value="first_name">First Name</option>
          <option value="last_name">Last Name</option>
          <option value="primary_contact">Phone</option>
        </select>

        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
          className={filter_contact_select_tailwind_classes}
        >
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
      </div>

      {/* Loader or Error */}
      {isLoading && <Loader />}
      {error && <p className="text-red-500">{error}</p>}

      {/* Contact Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {contacts.map((contact) => (
          <ContactCard
            key={contact.id}
            contact={contact}
            onUpdate={handleUpdateContact}
          />
        ))}
      </div>

      {/* Pagination */}
      {contacts.length > 0 && (
        <div className="flex justify-center items-center gap-4 mt-6">
          <button
            onClick={() => currentPage > 1 && setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
          >
            Prev
          </button>
          <span>Page {currentPage} of {totalPages}</span>
          <button
            onClick={() => currentPage < totalPages && setCurrentPage(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default ContactFilter;
