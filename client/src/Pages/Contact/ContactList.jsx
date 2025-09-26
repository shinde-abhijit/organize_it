import React, { useEffect, useState } from 'react';
import axiosInstance from '../../api/axiosInstance';
import { Link } from 'react-router-dom';
import ContactCard from './ContactComponents/ContactCard';
import Loader from '../Components/Loader';

const ContactList = () => {
  const [contacts, setContacts] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const contactsPerPage = 10; // number of contacts per page

  useEffect(() => {
    document.title = "Contact List";

    const fetchContacts = async () => {
      try {
        setIsLoading(true);
        const response = await axiosInstance.get(`/contact`);
        setContacts(response.data);
      } catch (error) {
        setError(error || "Failed to fetch contacts.");
        console.log(error || "Failed to fetch contacts.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchContacts();
  }, []);

  const handleUpdateContact = (contactId, updatedFields) => {
    setContacts((prevContacts) =>
      prevContacts.map((c) =>
        c.id === contactId ? { ...c, ...updatedFields } : c
      )
    );
  };

  // Pagination calculations
  const indexOfLast = currentPage * contactsPerPage;
  const indexOfFirst = indexOfLast - contactsPerPage;
  const currentContacts = contacts.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(contacts.length / contactsPerPage);

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  return (
    <div className="max-w-6xl mx-auto mt-10 p-6 bg-white rounded-lg">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-gray-800">My Contacts</h2>
        <Link
          to="/add-contact"
          className="bg-green-600 text-white px-5 py-2 rounded-lg hover:bg-green-700 transition"
        >
          + Add Contact
        </Link>
      </div>

      {isLoading && <Loader />}
      {error && <><p className="text-red-500">{error}</p></>}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {currentContacts.map((contact) => (
          <ContactCard
            key={contact.id}
            contact={contact}
            onUpdate={handleUpdateContact}
          />
        ))}
      </div>

      {/* Pagination controls */}
      {contacts.length > contactsPerPage && (
        <div className="flex justify-center items-center gap-4 mt-6">
          <button
            onClick={handlePrev}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
          >
            Prev
          </button>
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={handleNext}
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

export default ContactList;
