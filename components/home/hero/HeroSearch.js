import React, { useState } from "react";
import Modal from "react-modal";

const HeroDescription = () => {
  const [showSearch, setShowSearch] = useState(false);
  const [destination, setDestination] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [persons, setPersons] = useState(2);

  const handleSearchClick = () => {
    setShowSearch(true);
  };

  const handleModalClose = () => {
    setShowSearch(false);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    // Logic to handle search can be added here
    console.log({ destination, checkIn, checkOut, persons });
    window.open("/tours", "_self");
  };

  return (
    <section className="lg:col-span-12 md:col-span-6 px-4 md:px-8 pb-20 md:pb-12 lg:pb-1 pt-14">
      {/* Desktop View */}
      <div className="bg-white rounded-lg py-8 px-4 md:px-8 flex-col gap-4 md:gap-8 sm:flex-row sm:flex-wrap sm:justify-between hidden md:flex">
        <div className="flex flex-col sm:flex-row sm:items-center sm:gap-4 w-full sm:w-auto">
          <div className="text-black font-semibold mb-2 sm:mb-0">CHECK IN</div>
          <input
            type="date"
            placeholder="mm/dd/yyyy"
            className="bg-white rounded-md px-2 py-1 w-full sm:w-auto"
          />
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center sm:gap-4 w-full sm:w-auto">
          <div className="text-black font-semibold mb-2 sm:mb-0">CHECK OUT</div>
          <input
            type="date"
            placeholder="mm/dd/yyyy"
            className="bg-white rounded-md px-2 py-1 w-full sm:w-auto"
          />
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center sm:gap-4 w-full sm:w-auto">
          <div className="text-black font-semibold mb-2 sm:mb-0">PERSON</div>
          <input
            type="number"
            defaultValue={2}
            className="bg-white rounded-md px-2 py-1 w-full sm:w-16"
          />
        </div>
        <div className="w-full sm:w-auto">
          <button
            className="bg-black text-white rounded-md px-4 py-2 w-full sm:w-auto"
            onClick={() => window.open("/tours", "_self")}
          >
            Check Now
          </button>
        </div>
      </div>

      {/* Mobile View */}
      <div className="flex md:hidden">
        <button
          onClick={handleSearchClick}
          className="bg-white bg-opacity-40 border-white text-black rounded-full px-4 py-3 w-full"
        >
          Search for location, villa...
        </button>
      </div>

      {/* Mobile Search Modal */}
      <Modal
        isOpen={showSearch}
        onRequestClose={handleModalClose}
        className="flex justify-center items-center h-full w-full"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
        ariaHideApp={false}
      >
        <div className="bg-white rounded-lg p-4 w-11/12 md:w-1/2">
          <h2 className="text-lg font-semibold mb-4">Search</h2>
          <form onSubmit={handleFormSubmit} className="flex flex-col gap-4">
            <div>
              <label className="text-black font-semibold">Destination</label>
              <input
                type="text"
                placeholder="Enter destination"
                className="bg-gray-200 rounded-md px-2 py-1 w-full"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
              />
            </div>
            <div>
              <label className="text-black font-semibold">Check In</label>
              <input
                type="date"
                className="bg-gray-200 rounded-md px-2 py-1 w-full"
                value={checkIn}
                onChange={(e) => setCheckIn(e.target.value)}
              />
            </div>
            <div>
              <label className="text-black font-semibold">Check Out</label>
              <input
                type="date"
                className="bg-gray-200 rounded-md px-2 py-1 w-full"
                value={checkOut}
                onChange={(e) => setCheckOut(e.target.value)}
              />
            </div>
            <div>
              <label className="text-black font-semibold">Persons</label>
              <input
                type="number"
                className="bg-gray-200 rounded-md px-2 py-1 w-full"
                value={persons}
                onChange={(e) => setPersons(e.target.value)}
              />
            </div>
            <div className="flex justify-end">
              <button
                type="button"
                onClick={handleModalClose}
                className="bg-gray-500 text-white rounded-md px-4 py-2 mr-2"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-black text-white rounded-md px-4 py-2"
              >
                Search
              </button>
            </div>
          </form>
        </div>
      </Modal>
    </section>
  );
};

export default HeroDescription;
