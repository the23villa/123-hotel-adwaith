import React from "react";

const HeroDescription = () => {
  return (
    <section className="lg:col-span-12 md:col-span-6 px-4 md:px-8 pb-20 md:pb-12 lg:pb-1 pt-14">
      <div className="bg-white rounded-lg py-8 px-4 md:px-8 flex flex-col gap-4 md:gap-8 sm:flex-row sm:flex-wrap sm:justify-between">
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
    </section>
  );
};

export default HeroDescription;
