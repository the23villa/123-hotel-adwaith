import React, { useState } from "react";
import Modal from "react-modal";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { setCountries } from "@/features/filter/filterSlice";
import { FaMountain, FaCity, FaTree, FaHorse } from "react-icons/fa";

const CountryButton = ({ country, icon, onClick }) => (
  <button
    onClick={() => onClick(country)}
    className="flex flex-col items-center justify-center bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium py-3 px-4 rounded-lg w-full transition duration-300"
  >
    {icon}
    <span className="mt-1 text-sm">{country}</span>
  </button>
);

const HeroDescription = () => {
  const [showSearch, setShowSearch] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();

  const handleSearchClick = () => setShowSearch(true);
  const handleModalClose = () => setShowSearch(false);

  const handleCountrySelect = (country) => {
    setShowSearch(false);
    dispatch(setCountries([country]));
    router.push("/tours");
  };

  const countries = [
    {
      name: "Lonavala",
      icon: <FaMountain className="text-gray-600 text-2xl" />,
    },
    { name: "Karjat", icon: <FaCity className="text-gray-600 text-2xl" /> },
    { name: "Alibaug", icon: <FaTree className="text-gray-600 text-2xl" /> },
    { name: "Palghar", icon: <FaHorse className="text-gray-600 text-2xl" /> },
  ];

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
      <div className="flex md:hidden mb-52">
        <button
          onClick={handleSearchClick}
          className="bg-gray-300 bg-opacity-20 backdrop-blur-sm text-lg text-opacity-60 font-serif text-black rounded-full px-4 py-3 w-full"
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
        <div className="bg-white rounded-lg p-6 w-11/12 max-w-xl">
          <h2 className="text-xl font-semibold mb-4">Select a Location</h2>
          <div className="grid grid-cols-2 gap-4">
            {countries.map((country) => (
              <CountryButton
                key={country.name}
                country={country.name}
                icon={country.icon}
                onClick={handleCountrySelect}
              />
            ))}
          </div>
          <button
            onClick={handleModalClose}
            className="mt-6 bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-lg w-full transition duration-300"
          >
            Cancel
          </button>
        </div>
      </Modal>
    </section>
  );
};

export default HeroDescription;
