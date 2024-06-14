import React from "react";
import { AiFillStar } from "react-icons/ai";
import { BsSignTurnRight } from "react-icons/bs";
import { useSelector } from "react-redux";
import { FaUsers, FaParking } from "react-icons/fa";
import { RiWifiLine } from "react-icons/ri";
import { GiKnifeFork, GiSwimmingPoo, GiWeightLiftingUp } from "react-icons/gi";

const Right = () => {
  const tour = useSelector((state) => state?.rent);

  return (
    <div className="lg:col-span-7 md:col-span-6 col-span-12 flex flex-col gap-y-4">
      <article className="flex flex-col gap-y-8">
        <div className="flex flex-col gap-y-4">
          <h1 className="lg:text-5xl md:text-3xl text-xl">{tour?.title}</h1>
          <p className="flex flex-row items-center gap-x-2">
            <span className="text-xs py-0.5 px-2 bg-indigo-50 text-indigo-800 border border-indigo-500 rounded-secondary capitalize">
              {tour?.location}
            </span>
            <span className="text-xs flex items-center gap-x-1 py-0.5 px-2 bg-purple-50 text-purple-800 border border-purple-500 rounded-secondary">
              <AiFillStar className="w-4 h-4 text-yellow-500" /> (
              {tour?.reviews?.length})
            </span>
            <span className="text-xs flex items-center gap-x-1 py-0.5 px-2 bg-indigo-50 text-indigo-800 border border-indigo-500 rounded-secondary">
              <FaUsers className="w-4 h-4 text-yellow-500" /> (
              {tour?.users?.length})
            </span>
          </p>
        </div>
        <div className="flex flex-col gap-y-6">
          <div className="flex flex-col gap-y-1.5">
            <h2 className="md:text-xl text-lg">Summary</h2>
            <p className="text-sm">{tour?.summary}</p>
          </div>
          <div className="flex flex-col gap-y-1.5">
            <h2 className="md:text-xl text-lg">Amenities</h2>
            <div className="flex flex-row flex-wrap gap-2">
              {tour?.amenities?.map((amenity, index) => (
                <span
                  key={index}
                  className="text-xs flex items-center gap-x-1 py-0.5 px-2 bg-indigo-50 text-indigo-800 border border-indigo-500 rounded-secondary"
                >
                  {amenity === "wifi" && (
                    <RiWifiLine className="w-4 h-4 text-indigo-800" />
                  )}
                  {amenity === "dining" && (
                    <GiKnifeFork className="w-4 h-4 text-indigo-800" />
                  )}
                  {amenity === "parking" && (
                    <FaParking className="w-4 h-4 text-indigo-800" />
                  )}
                  {amenity === "gym" && (
                    <GiWeightLiftingUp className="w-4 h-4 text-indigo-800" />
                  )}
                  {amenity}
                </span>
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-y-1.5">
            <h2 className="md:text-xl text-lg">Important Information</h2>
            <div className="flex flex-col gap-y-1">
              {tour?.information?.map((information, index) => (
                <p
                  key={index}
                  className="flex flex-row gap-x-2 items-start text-sm"
                >
                  <span className="p-0.5">
                    <BsSignTurnRight className="h-3.5 w-3.5" />
                  </span>
                  {information}
                </p>
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-y-1.5">
            <h2 className="md:text-xl text-lg">Open Time</h2>
            <div className="flex flex-col gap-y-1">
              {tour?.times?.map((time, index) => (
                <p
                  key={index}
                  className="flex flex-row gap-x-2 items-center text-sm"
                >
                  <span className="p-0.5">
                    <BsSignTurnRight className="h-3.5 w-3.5" />
                  </span>
                  {time}
                </p>
              ))}
            </div>
          </div>
        </div>
      </article>
      <div className=""></div>
    </div>
  );
};

export default Right;
