import React, { useState, useEffect } from "react";
import { AiFillStar, AiOutlineLoading3Quarters } from "react-icons/ai";
import { IoMdPricetag } from "react-icons/io";
import {
  MdFavorite,
  MdKeyboardArrowLeft,
  MdKeyboardArrowRight,
  MdLocationPin,
  MdOutlineFavoriteBorder,
} from "react-icons/md";
import Button from "../button/Button";
import LoadImage from "../image/LoadImage";
import {
  useAddToFavoriteMutation,
  useDeleteFromFavoriteMutation,
} from "@/services/favorite/favoriteApi";
import { toast } from "react-hot-toast";
import { useSelector } from "react-redux";

const Card = ({ tour }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const user = useSelector((state) => state?.auth);
  const { status, gallery, members, title, location, price, _id } = tour || {};
  const [
    addToFavorite,
    {
      isLoading: addToFavoriteLoading,
      data: addToFavoriteData,
      error: addToFavoriteError,
    },
  ] = useAddToFavoriteMutation();
  const [
    deleteFromFavorite,
    {
      isLoading: deleteFromFavoriteLoading,
      data: deleteFromFavoriteData,
      error: deleteFromFavoriteError,
    },
  ] = useDeleteFromFavoriteMutation();

  useEffect(() => {
    if (addToFavoriteLoading) {
      toast.loading("Adding to favorite...", {
        id: "add-to-favorite",
      });
    }

    if (addToFavoriteData) {
      toast.success(addToFavoriteData?.message, {
        id: "add-to-favorite",
      });
    }

    if (addToFavoriteError?.data) {
      toast.error(addToFavoriteError?.data?.message, {
        id: "add-to-favorite",
      });
    }

    if (deleteFromFavoriteLoading) {
      toast.loading("Removing from favorite...", {
        id: "remove-from-favorite",
      });
    }

    if (deleteFromFavoriteData) {
      toast.success(deleteFromFavoriteData?.message, {
        id: "remove-from-favorite",
      });
    }

    if (deleteFromFavoriteError?.data) {
      toast.error(deleteFromFavoriteError?.data?.message, {
        id: "remove-from-favorite",
      });
    }
  }, [
    addToFavoriteError,
    addToFavoriteData,
    addToFavoriteLoading,
    deleteFromFavoriteError,
    deleteFromFavoriteData,
    deleteFromFavoriteLoading,
  ]);

  const handleNext = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % gallery.length);
  };

  const handlePrev = () => {
    setCurrentImageIndex(
      (prevIndex) => (prevIndex - 1 + gallery.length) % gallery.length
    );
  };

  return (
    <section className="group flex flex-col gap-y-5 border rounded overflow-hidden lg:w-96 w-80 shadow-md">
      <div className="relative">
        {user?.favorite?.rents.some((rent) => rent?._id === _id) ? (
          <button
            className="absolute top-4 right-4 p-1.5 border rounded-full border-secondary bg-white hover:text-white duration-100 z-50 transition-opacity ease-linear delay-100"
            onClick={() => deleteFromFavorite(_id)}
          >
            {deleteFromFavoriteLoading ? (
              <AiOutlineLoading3Quarters className="animate-spin" />
            ) : (
              <MdFavorite />
            )}
          </button>
        ) : (
          <button
            className="absolute top-4 right-4 p-1.5 border rounded-full border-secondary bg-white hover:bg-primary hover:text-white duration-100 z-50 transition-opacity ease-linear delay-100"
            onClick={() => addToFavorite({ rent: _id })}
          >
            {addToFavoriteLoading ? (
              <AiOutlineLoading3Quarters className="animate-spin" />
            ) : (
              <MdOutlineFavoriteBorder />
            )}
          </button>
        )}
        <div className="relative h-56 w-full overflow-hidden">
          {gallery?.map((thumbnail, index) => (
            <LoadImage
              key={index}
              src={thumbnail?.url}
              alt={thumbnail?.public_id}
              width={480}
              height={200}
              className={`absolute top-0 left-0 w-full h-full object-cover transition-transform duration-300 ease-in-out ${
                index === currentImageIndex
                  ? "translate-x-0"
                  : "translate-x-full"
              }`}
              style={{
                transform: `translateX(${(index - currentImageIndex) * 100}%)`,
              }}
            />
          ))}
          <div className="absolute left-2 bottom-4 flex flex-row gap-x-2 z-50">
            <button
              type="button"
              className="h-8 w-8 bg-white rounded-full text-black flex justify-center items-center shadow-2xl"
              onClick={handlePrev}
            >
              <MdKeyboardArrowLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              className="h-8 w-8 bg-white rounded-full text-black flex justify-center items-center shadow-2xl"
              onClick={handleNext}
            >
              <MdKeyboardArrowRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
      <article className="px-2 py-1 flex flex-col gap-y-4 h-full">
        <h2 className="text-lg font-semibold">{title}</h2>
        <div className="flex flex-row justify-between items-center text-sm">
          <span className="flex items-center">
            <MdLocationPin className="w-5 h-5" />
            {location}
          </span>
          <span className="flex items-center gap-x-1">
            <AiFillStar className="w-5 h-5 text-yellow-500" /> (
            {tour?.reviews?.length})
          </span>
        </div>
        <div className="mt-auto flex flex-col gap-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="flex items-center gap-x-1">
              <IoMdPricetag className="w-5 h-5" />₹{price}/night
            </span>
            <Button
              className="px-4 py-2 text-sm"
              onClick={() =>
                window.open(
                  `/tours/${tour._id}?tour_title=${tour.title
                    .replace(/[^\w\s]|[\s]+/g, "-")
                    .replace(/-+/g, "-")
                    .toLowerCase()}`,
                  "_self"
                )
              }
            >
              Check Now
            </Button>
          </div>
          <div className="text-sm text-gray-500">
            <span>{members} Members</span>
          </div>
        </div>
      </article>
    </section>
  );
};

export default Card;
