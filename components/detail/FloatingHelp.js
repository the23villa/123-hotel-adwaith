import React, { useState } from 'react';
import { FaQuestion, FaWhatsapp } from 'react-icons/fa';

const FloatingHelp = ({ ownerWhatsApp }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openWhatsApp = () => {
    window.open(`https://wa.me/${ownerWhatsApp}`, '_blank');
  };

  return (
    <>
      <button
        className="fixed bottom-4 right-4 bg-blue-500 text-white rounded-full p-3 shadow-lg"
        onClick={() => setIsModalOpen(true)}
      >
        <FaQuestion size={24} />
      </button>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-xl">
            <h2 className="text-xl font-bold mb-4">Need help?</h2>
            <p className="mb-4">Would you like to connect with the owner?</p>
            <div className="flex justify-end">
              <button
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded mr-2"
                onClick={() => setIsModalOpen(false)}
              >
                Cancel
              </button>
              <button
                className="bg-green-500 text-white px-4 py-2 rounded flex items-center"
                onClick={openWhatsApp}
              >
                <FaWhatsapp className="mr-2" />
                Connect on WhatsApp
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default FloatingHelp;