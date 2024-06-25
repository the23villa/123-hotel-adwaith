import React from "react";
import Image from "next/image";

const CollectionCard = ({ imageSrc, title, offset }) => (
  <div
    className={`relative rounded-lg overflow-hidden w-[170px] h-[260px] flex-shrink-0 ${
      offset ? "mt-28" : ""
    }`}
  >
    <Image
      src={imageSrc}
      alt={title}
      width={150}
      height={200}
      className="w-full h-full object-cover"
    />
    <div className="absolute bottom-2 left-2 right-2">
      <p className="text-base font-serif text-white">{title}</p>
    </div>
  </div>
);

const Collections = () => {
  return (
    <section className="py-6">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-serif mb-3">Collections</h2>
          <button className="text-gray-600">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>
        <div className="overflow-x-auto">
          <div className="flex space-x-3 pb-4">
            <CollectionCard
              imageSrc="/assets/home-page/banner/home3.jpg"
              title="Corporate Offsite Villas"
              offset={false}
            />
            <CollectionCard
              imageSrc="/assets/home-page/banner/home8.jpg"
              title="Holiday in Himachal Pradesh"
              offset={true}
            />
            <CollectionCard
              imageSrc="/assets/home-page/banner/home2.jpg"
              title="Another Collection"
              offset={false}
            />
            <CollectionCard
              imageSrc="/assets/home-page/banner/home8.jpg"
              title="Holiday in Himachal Pradesh"
              offset={true}
            />
            <CollectionCard
              imageSrc="/assets/home-page/banner/hero2.png"
              title="Another Collection"
              offset={false}
            />
            <CollectionCard
              imageSrc="/assets/home-page/banner/hero4.jpg"
              title="Holiday in Himachal Pradesh"
              offset={true}
            />
            <CollectionCard
              imageSrc="/assets/home-page/banner/hero5.jpg"
              title="Another Collection"
              offset={false}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Collections;
