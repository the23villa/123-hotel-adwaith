import React, { useState } from "react";
import Modal from "../shared/modal/Modal";
import { useSelector } from "react-redux";
import { RiWifiLine } from "react-icons/ri";
import {
  FaUsers,
  FaParking,
  FaSwimmingPool,
  FaFire,
  FaMusic,
} from "react-icons/fa";
import { AiFillStar, AiOutlineHome } from "react-icons/ai";
import {
  BsSignTurnRight,
  BsThermometerHalf,
  BsFillLightningFill,
} from "react-icons/bs";
import { GiCricketBat, GiCampingTent } from "react-icons/gi";
import { WiThermometer } from "react-icons/wi";
import {
  MdChildFriendly,
  MdOutlineKitchen,
  MdOutlineLocalCafe,
} from "react-icons/md";
import { HiOutlineSparkles } from "react-icons/hi";

const Right = () => {
  const tour = useSelector((state) => state?.rent);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [houseRulesModalIsOpen, setHouseRulesModalIsOpen] = useState(false);
  const [cancellationPolicyModalIsOpen, setCancellationPolicyModalIsOpen] =
    useState(false);

  const amenities = [
    {
      icon: <BsThermometerHalf className="h-5 w-5 text-gray-500" />,
      text: "2 AC Bedrooms",
    },
    {
      icon: <GiCampingTent className="h-5 w-5 text-gray-500" />,
      text: "Gazebo for dining",
    },
    {
      icon: <AiOutlineHome className="h-5 w-5 text-gray-500" />,
      text: "Television",
    },
    {
      icon: <FaMusic className="h-5 w-5 text-gray-500" />,
      text: "Music system",
    },
    {
      icon: <FaSwimmingPool className="h-5 w-5 text-gray-500" />,
      text: "24x7 Private Pool with filtration plant for clean water",
    },
    {
      icon: <AiOutlineHome className="h-5 w-5 text-gray-500" />,
      text: "2 Separate clean Washrooms",
    },
    {
      icon: <AiOutlineHome className="h-5 w-5 text-gray-500" />,
      text: "Spacious Balcony with Pool and Garden view",
    },
    {
      icon: <HiOutlineSparkles className="h-5 w-5 text-gray-500" />,
      text: "Refrigerator",
    },
    {
      icon: <MdOutlineLocalCafe className="h-5 w-5 text-gray-500" />,
      text: "Authentic Countryside Food",
    },
    {
      icon: <WiThermometer className="h-5 w-5 text-gray-500" />,
      text: "Geysers for hot water",
    },
    {
      icon: <BsFillLightningFill className="h-5 w-5 text-gray-500" />,
      text: "Power backup up to 8 hours (only light, fan and charging point)",
    },
    {
      icon: <MdOutlineKitchen className="h-5 w-5 text-gray-500" />,
      text: "Mineral water 💧",
    },
    { icon: <FaFire className="h-5 w-5 text-gray-500" />, text: "Bonfire" },
    {
      icon: <FaParking className="h-5 w-5 text-gray-500" />,
      text: "Free Parking",
    },
    {
      icon: <GiCricketBat className="h-5 w-5 text-gray-500" />,
      text: "Games - Cricket, Badminton, etc",
    },
    {
      icon: <MdOutlineKitchen className="h-5 w-5 text-gray-500" />,
      text: "Separate kitchen",
    },
  ];

  const houseRulesContent = (
    <div>
      <h2 className="md:text-xl text-lg mb-4">House Rules</h2>
      <ul className="list-disc list-inside">
        <li>
          The primary guest must be at least 18 years of age to be able to check
          into The 23 Villa Property.
        </li>
        <li>
          It is mandatory for all guests to present valid photo identification
          at the time of check-in. According to government regulations, a valid
          Photo ID must be carried by every person above the age of 18 staying
          at the hotel. The identification proofs accepted are Aadhar Card,
          Driving License, Voter ID Card, and Passport. Note that PAN card is
          not acceptable. Without an original copy of a valid ID, you will not
          be allowed to check-in.
        </li>
        <li>Illegal activities are not permitted in The 23 Villa.</li>
        <li>Drinking alcohol inside the pool is strictly prohibited.</li>
        <li>
          Carrying any fragile substance or breakable items (example Alcohol
          bottle, glass substance, etc.) is strictly prohibited inside the pool.
        </li>
        <li>
          Please keep property in a good condition and maintain hygiene and
          cleanliness. You may be held liable for any damage to The 23 Villa
          assets.
        </li>
      </ul>
    </div>
  );

  const cancellationPolicyContent = (
    <div>
      <h2 className="md:text-xl text-lg mb-4">Cancellation Policy</h2>
      <p>
        You can send payment 50% advance on Gpay: 9594232321 (The 23 Villa
        Karjat)
      </p>
      <p>Plus one email ID and Aadhar card of 2 guests</p>
    </div>
  );

  // const handleOpenModal = (content) => {
  //   setModalContent(content);
  //   setModalIsOpen(true);
  // };

  return (
    <div className="lg:col-span-7 md:col-span-6 col-span-12 flex flex-col gap-y-4">
      <article className="flex flex-col gap-y-8">
        <div className="flex flex-col gap-y-4">
          <h1 className="lg:text-5xl md:text-3xl text-xl">{tour?.title}</h1>
        </div>
        <div className="flex flex-col gap-y-6">
          <div className="flex flex-col gap-y-1.5">
            <p className="text-sm">{tour?.summary}</p>
          </div>
          <div className="flex flex-col gap-y-1.5">
            <h2 className="md:text-xl text-lg mb-4">Important Information</h2>
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
            <div className="flex w-full gap-x-4 mt-4">
              <button
                className="flex-1 py-3 px-4 bg-white text-gray-800 rounded-full border border-black text-sm font-serif"
                onClick={() => setHouseRulesModalIsOpen(true)}
              >
                House Rules
              </button>
              <button
                className="flex-1 py-3 px-4 bg-white text-gray-800 rounded-full border border-black text-sm font-serif"
                onClick={() => setCancellationPolicyModalIsOpen(true)}
              >
                Booking procedure
              </button>
            </div>
          </div>
        </div>
      </article>
      <div className="flex flex-col gap-y-6 mb-6">
        <h2 className="md:text-xl text-lg">Amenities</h2>
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center gap-x-2">
            <RiWifiLine className="h-5 w-5 text-gray-600" />
            <span className="text-gray-600">WiFi Fibre</span>
          </div>
          <div className="flex items-center gap-x-2">
            <MdChildFriendly className="h-5 w-5 text-gray-600" />
            <span className="text-gray-600">Child friendly</span>
          </div>
          {amenities.slice(0, 4).map((amenity, index) => (
            <div
              key={index}
              className="flex items-center gap-x-2 text-gray-500"
            >
              {amenity.icon}
              <span>{amenity.text}</span>
            </div>
          ))}
        </div>
        <button
          className="py-3 px-4 mt-4 bg-white text-gray-800 rounded-full border border-black text-base font-serif"
          onClick={() => setModalIsOpen(true)}
        >
          View all Amenities
        </button>
        <Modal
          isOpen={houseRulesModalIsOpen}
          onRequestClose={() => setHouseRulesModalIsOpen(false)}
          contentLabel="House Rules"
          className="modal"
          overlayClassName="modal-overlay"
        >
          {houseRulesContent}
          <button
            className="py-2 px-4 mt-4 bg-red-500 text-white rounded"
            onClick={() => setHouseRulesModalIsOpen(false)}
          >
            Close
          </button>
        </Modal>

        <Modal
          isOpen={cancellationPolicyModalIsOpen}
          onRequestClose={() => setCancellationPolicyModalIsOpen(false)}
          contentLabel="Cancellation Policy"
          className="modal"
          overlayClassName="modal-overlay"
        >
          {cancellationPolicyContent}
          <button
            className="py-2 px-4 mt-4 bg-red-500 text-white rounded"
            onClick={() => setCancellationPolicyModalIsOpen(false)}
          >
            Close
          </button>
        </Modal>
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={() => setModalIsOpen(false)}
          contentLabel="All Amenities"
          className="modal"
          overlayClassName="modal-overlay"
        >
          <h2 className="md:text-xl text-lg mb-4">All Amenities</h2>
          <div className="grid grid-cols-2 gap-4">
            {amenities.map((amenity, index) => (
              <div key={index} className="flex items-center gap-x-2">
                {amenity.icon}
                <span>{amenity.text}</span>
              </div>
            ))}
          </div>
          <button
            className="py-2 px-4 mt-4 bg-red-500 text-white rounded"
            onClick={() => setModalIsOpen(false)}
          >
            Close
          </button>
        </Modal>
      </div>
    </div>
  );
};

export default Right;
