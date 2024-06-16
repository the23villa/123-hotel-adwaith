import React, { useEffect, useRef } from "react";
import Right from "@/components/detail/Right";
import LoadImage from "@/components/shared/image/LoadImage";
import { AiOutlineCalendar, AiOutlineLoading3Quarters } from "react-icons/ai";
import { FiUsers } from "react-icons/fi";
import { FaRupeeSign } from "react-icons/fa";
import {
  useAddToCartMutation,
  useRemoveFromCartMutation,
} from "@/services/cart/cartApi";
import { useDispatch, useSelector } from "react-redux";
import { IoCheckmarkSharp } from "react-icons/io5";
import { toast } from "react-hot-toast";
import { useForm, Controller } from "react-hook-form";
import { useState } from "react";
import Modal from "../shared/modal/Modal";
import { setBooking } from "@/features/booking/bookingSlice";
import { useCreatePaymentIntentMutation } from "@/services/payment/paymentApi";
import {
  Elements,
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import Image from "next/image";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
);

const Left = () => {
  const [isOpen, setIsOpen] = useState(false);
  const user = useSelector((state) => state?.auth);
  const tour = useSelector((state) => state?.rent);
  const { handleSubmit, control, watch, setValue } = useForm();
  const dispatch = useDispatch();

  const members = watch("members");
  const duration = watch("duration");
  const price = watch("price");

  const [sliderRef, instanceRef] = useKeenSlider({
    loop: true,
    breakpoints: {
      "(max-width: 768px)": {
        slides: { perView: 1, spacing: 10 },
      },
      "(min-width: 768px)": {
        slides: { perView: 1, spacing: 10 },
      },
      "(min-width: 1080px)": {
        slides: { perView: 1, spacing: 10 },
      },
    },
  });

  const isMounted = useRef(false);

  useEffect(() => {
    if (!isMounted.current && instanceRef.current) {
      instanceRef.current.update();
      isMounted.current = true;
    }
  }, [instanceRef]);

  useEffect(() => {
    setValue("price", tour?.price * members);
  }, [members, setValue, tour?.price]);

  const [
    addToCart,
    { isLoading: addToCartLoading, data: addToCartData, error: addToCartError },
  ] = useAddToCartMutation();

  const [
    removeFromCart,
    {
      isLoading: removeFromCartLoading,
      data: removeFromCartData,
      error: removeFromCartError,
    },
  ] = useRemoveFromCartMutation();

  useEffect(() => {
    if (addToCartLoading) {
      toast.loading("Adding to cart...", { id: "add-to-cart" });
    }

    if (addToCartData) {
      toast.success(addToCartData?.message, { id: "add-to-cart" });
    }

    if (addToCartError?.data) {
      toast.error(addToCartError?.data?.message, { id: "add-to-cart" });
    }

    if (removeFromCartLoading) {
      toast.loading("Removing from cart...", { id: "remove-from-cart" });
    }

    if (removeFromCartData) {
      toast.success(removeFromCartData?.message, {
        id: "remove-from-cart",
      });
    }

    if (removeFromCartError?.data) {
      toast.error(removeFromCartError?.data?.message, {
        id: "remove-from-cart",
      });
    }
  }, [
    addToCartLoading,
    addToCartData,
    addToCartError,
    removeFromCartLoading,
    removeFromCartData,
    removeFromCartError,
  ]);

  function getColumnSpanClass(index, totalThumbnails) {
    if (totalThumbnails === 1 || totalThumbnails === 2) {
      return "col-span-12";
    } else if (totalThumbnails === 3) {
      return index === 0 ? "col-span-12" : "col-span-6";
    } else if (totalThumbnails === 4) {
      return index === 0 || index === 1 ? "col-span-12" : "col-span-6";
    } else if (totalThumbnails === 5) {
      return index === 0 || index === 1
        ? "col-span-12"
        : index === 2 || index === 3
        ? "col-span-6"
        : "col-span-12";
    } else {
      return "";
    }
  }

  function formatDate(dateString) {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }

  function handleIntegratePurchase(data) {
    console.log(data);
    setIsOpen(true);
    dispatch(setBooking(data));
  }

  return (
    <>
      <div className="lg:col-span-5 md:col-span-6 col-span-12 flex flex-col md:gap-y-8 gap-y-4">
        <div ref={sliderRef} className="keen-slider relative">
          {tour?.gallery?.map((thumbnail, index) => (
            <LoadImage
              key={index}
              src={thumbnail?.url}
              alt={thumbnail?.public_id}
              className="rounded mx-auto max-w-full h-96 keen-slider__slide"
              width={680}
              height={200}
            />
          ))}
          <div className="absolute bottom-4 inset-x-0 flex justify-center items-center">
            {Array.from({ length: tour?.gallery?.length || 0 }).map(
              (_, index) => (
                <div
                  key={index}
                  style={{
                    width: "12px",
                    height: "12px",
                    borderRadius: "50%",
                    backgroundColor:
                      sliderRef.current?.track.details().absoluteSlide === index
                        ? "grey"
                        : "white",
                    marginRight:
                      index !== tour?.gallery?.length - 1 ? "8px" : "0",
                  }}
                ></div>
              )
            )}
          </div>
        </div>
        <Right />
        <div className="border border-secondary flex flex-col gap-y-8 lg:p-8 md:p-6 p-4 rounded w-full">
          <div className="flex flex-col gap-y-2">
            <h2 className="text-lg">Booking Now</h2>
            <hr className="border-1 border-primary" />
          </div>

          <form
            action=""
            className="flex flex-col gap-y-3"
            onSubmit={handleSubmit(handleIntegratePurchase)}
          >
            {/* startDate & endDate */}
            <div className="flex lg:flex-row flex-col justify-between gap-2">
              <Controller
                control={control}
                rules={{ required: true }}
                name="duration.startDate"
                defaultValue={formatDate(tour?.duration?.startDate)}
                render={({ field }) => (
                  <label
                    htmlFor="startDate"
                    className="flex flex-row gap-x-2 items-start w-full"
                  >
                    <span className="h-8 w-8 rounded-secondary border border-black flex justify-center items-center p-1.5">
                      <AiOutlineCalendar className="w-6 h-6" />
                    </span>
                    <input
                      {...field}
                      type="date"
                      name="startDate"
                      id="startDate"
                      className="rounded-secondary h-8 w-full flex-1"
                      onChange={(e) => field.onChange(e.target.value)}
                      min={formatDate(tour?.duration?.startDate)}
                      max={formatDate(tour?.duration?.endDate)}
                    />
                  </label>
                )}
              />
              <Controller
                control={control}
                rules={{ required: true }}
                name="duration.endDate"
                defaultValue={formatDate(tour?.duration?.endDate)}
                render={({ field }) => (
                  <label
                    htmlFor="endDate"
                    className="flex flex-row gap-x-2 items-start w-full"
                  >
                    <input
                      {...field}
                      type="date"
                      name="endDate"
                      id="endDate"
                      className="rounded-secondary h-8 w-full flex-1"
                      onChange={(e) => field.onChange(e.target.value)}
                      min={formatDate(tour?.duration?.startDate)}
                      max={formatDate(tour?.duration?.endDate)}
                    />
                    <span className="h-8 w-8 rounded-secondary border border-black flex justify-center items-center p-1.5">
                      <AiOutlineCalendar className="w-6 h-6" />
                    </span>
                  </label>
                )}
              />

              <div className="fixed bottom-0 left-0 right-0 bg-white z-10 p-4 shadow-md border-t border-gray-200">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-semibold flex flex-col">
                    <div className="flex items-center">
                      <FaRupeeSign className="ml-1" />
                      {price}
                    </div>
                    <div className="font-serif font-light text-base">
                      Total amount
                    </div>
                  </span>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-primary text-white rounded"
                  >
                    Book Now
                  </button>
                </div>
              </div>
            </div>

            <div className="flex md:flex-row flex-col justify-between gap-2">
              <Controller
                control={control}
                name="members"
                defaultValue={tour?.members || 1}
                render={({ field }) => (
                  <label
                    htmlFor="members"
                    className="flex flex-row gap-x-2 items-center w-full"
                  >
                    <span className="h-8 w-8 rounded-secondary border border-black flex justify-center items-center p-1.5">
                      <FiUsers className="w-6 h-6" />
                    </span>
                    <input
                      {...field}
                      type="number"
                      name="members"
                      id="members"
                      className="rounded-secondary h-8 w-full flex-1"
                      defaultValue={field.value || tour?.members}
                      value={field.value}
                      min="1"
                      max={tour?.members}
                      onChange={(e) => field.onChange(parseInt(e.target.value))}
                    />
                  </label>
                )}
              />
            </div>
          </form>
        </div>
      </div>

      {isOpen && (
        <Modal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          className="lg:w-1/4 md:w-1/3 w-full z-50"
        >
          <Checkout rent={tour} setIsOpen={setIsOpen} members={members} />
        </Modal>
      )}
    </>
  );
};

function Checkout({ rent, setIsOpen, members }) {
  const booking = useSelector((state) => state?.booking);
  const user = useSelector((state) => state?.auth);
  const [createPaymentIntent, { isLoading, data, error }] =
    useCreatePaymentIntentMutation();
  const { control, handleSubmit } = useForm({
    defaultValues: {
      name: user?.name,
      email: user?.email,
    },
  });

  useEffect(() => {
    if (isLoading) {
      toast.loading("Creating Payment Intent...", {
        id: "paymentIntent",
      });
    }

    if (data) {
      toast.success(data?.message, {
        id: "paymentIntent",
      });
    }

    if (error?.data) {
      toast.error(error?.data?.message, {
        id: "paymentIntent",
      });
    }
  }, [data, error, isLoading]);

  function handleIntegratePurchase(data) {
    console.log(data);

    createPaymentIntent({
      rent: rent?._id,
      ...booking,
    });
  }

  return (
    <>
      {data?.success ? (
        <div className="h-full w-full flex flex-col justify-center items-center gap-4">
          <Image
            src="/check.gif"
            alt="check"
            height={200}
            width={200}
            className=""
          />
          <code
            className="text-xs bg-slate-100 p-2 rounded text-center"
            onClick={() => navigator.clipboard.writeText(data?.clientSecret)}
          >
            {data?.clientSecret}
          </code>
          <button
            type="button"
            className="py-2 px-4 text-primary bg-primary/10 border border-primary hover:bg-secondary rounded w-fit text-sm flex flex-row justify-center items-center"
            onClick={() => setIsOpen(false)}
          >
            Close
          </button>
        </div>
      ) : (
        <section className="flex flex-col gap-8">
          <article className="h-full w-full flex flex-col gap-y-8">
            <h1 className="text-xl">Pay Travello Booking</h1>
            <div className="flex flex-col gap-y-2">
              <div className="flex flex-col gap-y-1">
                <span className="flex -space-x-4">
                  {rent?.gallery?.map((gallery) => (
                    <LoadImage
                      key={gallery?._id}
                      src={gallery?.url}
                      alt={gallery?.public_id}
                      height={30}
                      width={30}
                      className="h-[30px] w-[30px] rounded-secondary border border-primary object-cover"
                    />
                  ))}
                </span>
                <h2 className="text-lg">{rent?.title}</h2>
              </div>
              <p className="text-sm">{rent?.summary}</p>
              <p className="flex flex-row items-center justify-center gap-x-2 overflow-x-auto scrollbar-hide">
                <span className="text-xs py-0.5 px-2 bg-indigo-50 text-indigo-800 border border-indigo-500 rounded-secondary capitalize w-fit whitespace-nowrap">
                  {rent?.location}
                </span>
                <span className="text-xs py-0.5 px-2 bg-purple-50 text-purple-800 border border-purple-500 rounded-secondary capitalize w-fit whitespace-nowrap">
                  {rent?.owner?.name}
                </span>
                <hr className="w-4 bg-black rotate-90" />
                <span className="text-xs py-0.5 px-2 bg-teal-50 text-teal-800 border border-teal-500 rounded-secondary capitalize w-fit whitespace-nowrap">
                  {booking?.duration?.startDate}
                </span>
                →
                <span className="text-xs py-0.5 px-2 bg-cyan-50 text-cyan-800 border border-cyan-500 rounded-secondary capitalize w-fit whitespace-nowrap">
                  {booking?.duration?.endDate}
                </span>
              </p>
            </div>
          </article>

          <form
            action=""
            className="flex flex-col gap-y-4"
            onSubmit={handleSubmit(handleIntegratePurchase)}
          >
            <Controller
              control={control}
              name="name"
              rules={{ required: true }}
              render={({ field }) => (
                <label
                  htmlFor="name"
                  className="w-full text-sm flex flex-col gap-y-1"
                >
                  Enter Card Name*
                  <input
                    {...field}
                    type="text"
                    placeholder="Adwaith viju"
                    className="w-full border rounded p-2"
                  />
                </label>
              )}
            />

            <Controller
              control={control}
              name="email"
              rules={{ required: true }}
              render={({ field }) => (
                <label
                  htmlFor="email"
                  className="w-full text-sm flex flex-col gap-y-1"
                >
                  Enter Card Email*
                  <input
                    {...field}
                    type="email"
                    placeholder="adwaithviju@gmail.com"
                    className="w-full border rounded p-2"
                  />
                </label>
              )}
            />

            <Controller
              control={control}
              name="card"
              rules={{ required: true }}
              render={({ field }) => (
                <label
                  htmlFor="card"
                  className="w-full text-sm flex flex-col gap-y-1"
                >
                  Enter Card Number*
                  <input
                    {...field}
                    type="text"
                    placeholder="4242 4242 4242 4242"
                    className="w-full border rounded p-2"
                    pattern="\d*"
                    maxlength="16"
                  />
                </label>
              )}
            />

            <Controller
              control={control}
              name="expiry"
              rules={{ required: true }}
              render={({ field }) => (
                <label
                  htmlFor="expiry"
                  className="w-full text-sm flex flex-col gap-y-1 flex-1"
                >
                  Enter Card Expiry*
                  <input
                    {...field}
                    type="date"
                    placeholder="12/23"
                    className="w-full border rounded p-2"
                  />
                </label>
              )}
            />

            <Controller
              control={control}
              name="cvc"
              rules={{ required: true }}
              render={({ field }) => (
                <label
                  htmlFor="cvc"
                  className="w-full text-sm flex flex-col gap-y-1 flex-1"
                >
                  Enter Card CVC*
                  <input
                    {...field}
                    type="number"
                    placeholder="123"
                    className="w-full border rounded p-2"
                  />
                </label>
              )}
            />
            <div className="text-sm flex flex-col gap-y-1">
              <p className="flex flex-row justify-between items-center">
                <span className="">Cost Per Night (₹)</span>
                <span className="">{rent?.price}</span>
              </p>
              <p className="flex flex-row justify-between items-center">
                <span className="">Overall Members</span>
                <span className="">{members}</span>
              </p>
              <hr />
              <p className="flex flex-row justify-between items-center">
                <span className="">Total Cost (₹)</span>
                <span className="">{members * rent?.price}</span>
              </p>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="py-2 text-primary bg-primary/10 border border-primary hover:bg-secondary rounded w-full mt-2 text-sm flex flex-row justify-center items-center"
            >
              {isLoading ? (
                <AiOutlineLoading3Quarters className="animate-spin h-5 w-5" />
              ) : (
                "Pay Now"
              )}
            </button>
          </form>
        </section>
      )}
    </>
  );
}

export default Left;
