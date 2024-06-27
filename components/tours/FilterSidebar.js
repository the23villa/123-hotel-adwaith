import useGetCountries from "@/hooks/useGetCountries";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import LoadImage from "../shared/image/LoadImage";
import {
  setCountries,
  setDateRange,
  resetFilter,
} from "@/features/filter/filterSlice";

const FilterSidebar = () => {
  const [selectedCountries, setSelectedCountries] = useState([]);
  const [dateRange, setDateRangeLocal] = useState({
    startDate: null,
    endDate: null,
  });

  const countries = useGetCountries();
  const dispatch = useDispatch();

  function formatDate(dateString) {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }

  // handle functions for updating local state and dispatching actions

  const handleCountriesChange = (selectedOptions) => {
    setSelectedCountries(selectedOptions);
    dispatch(setCountries(selectedOptions));
  };


  const handleDateRangeChange = (startDate, endDate) => {
    setDateRangeLocal({ startDate, endDate });
    dispatch(setDateRange({ startDate, endDate }));
  };


  return (
    <aside className="lg:col-span-3 md:col-span-4 col-span-12">
      <section className="flex flex-col gap-y-4 md:sticky md:top-4">
        {/* Choose Country */}
        <div className="flex flex-col gap-y-4 border py-2 px-4 rounded">
          <h2 className="text-lg">Choose Country</h2>
          <div className="flex flex-col gap-y-2.5 h-40 overflow-y-auto">
            {countries?.length === 0 && <>Loading...</>}
            {countries?.map((country, index) => (
              <label
                key={index}
                htmlFor={country.name}
                className="text-sm flex flex-row items-center gap-x-1.5"
              >
                <input
                  type="checkbox"
                  name={country.name}
                  id={country.name}
                  className="!rounded-secondary checked:bg-primary checked:text-primary"
                  onChange={(e) => {
                    const isChecked = e.target.checked;
                    const updatedCountries = isChecked
                      ? [...selectedCountries, country.name]
                      : selectedCountries.filter((c) => c !== country.name);
                    handleCountriesChange(updatedCountries);
                  }}
                />
                <span className="flex flex-row gap-x-2 items-center whitespace-normal truncate">
                  <LoadImage
                    src={country.flag}
                    alt={country.name}
                    height={10}
                    width={20}
                  />
                  {country.name}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Date Range */}
        <div className="flex flex-col gap-y-4 border py-2 px-4 rounded">
          <h2 className="text-lg">Date Range</h2>
          <label
            htmlFor="startDate"
            className="flex flex-row gap-x-2 items-center"
          >
            <input
              type="date"
              id="startDate"
              value={dateRange.startDate}
              onChange={(e) =>
                handleDateRangeChange(e.target.value, dateRange.endDate)
              }
              className="flex-1 !text-sm !p-0 !border-0"
            />
            <div className="h-4 border" />
            <input
              type="date"
              id="endDate"
              value={dateRange.endDate}
              onChange={(e) =>
                handleDateRangeChange(dateRange.startDate, e.target.value)
              }
              className="flex-1 !text-sm !p-0 !border-0"
            />
          </label>
        </div>
        {/* Reset Button */}
        <button
          className="px-4 py-1 border border-primary !rounded-secondary flex flex-row gap-x-2 items-center w-fit bg-secondary text-primary"
          onClick={() => {
            setSelectedCountries([]);
            setDateRangeLocal({ startDate: null, endDate: null });
            dispatch(resetFilter());
          }}
        >
          Reset Filter
        </button>
      </section>
    </aside>
  );
};

export default FilterSidebar;
