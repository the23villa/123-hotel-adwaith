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
import { BsSignTurnRight } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import { useForm, Controller } from "react-hook-form";
import { useState } from "react";
import Modal from "../shared/modal/Modal";
import { setBooking } from "@/features/booking/bookingSlice";
import { useCreatePaymentIntentMutation } from "@/services/payment/paymentApi";
import Image from "next/image";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FaDownload } from "react-icons/fa";
import jsPDF from "jspdf";
import { FaRegCommentAlt } from "react-icons/fa";
import { FaQuestion } from "react-icons/fa";

const Left = () => {
  const [isOpen, setIsOpen] = useState(false);
  const user = useSelector((state) => state?.auth);
  const [currentSlide, setCurrentSlide] = useState(0);
  const tour = useSelector((state) => state?.rent);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentModalImage, setCurrentModalImage] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);
  const { handleSubmit, control, watch, setValue } = useForm();
  const dispatch = useDispatch();
  const members = watch("members");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const duration = watch("duration");
  const price = watch("price");
  const [includeFood, setIncludeFood] = useState(false);
  const [hasSaturday, setHasSaturday] = useState(false);
  const foodBasePrice = tour?.foodBasePrice || 700;
  const [foodLabelText, setFoodLabelText] = useState(
    "check the box to Include food"
  );
  const [blockedDates, setBlockedDates] = useState([]);

  useEffect(() => {
    if (tour?._id) {
      fetch(`/api/getBlockedDates?rentId=${tour._id}`)
        .then((response) => response.json())
        .then((data) => {
          setBlockedDates(data.blockedDates.map((date) => new Date(date)));
        })
        .catch((error) =>
          console.error("Error fetching blocked dates:", error)
        );
    }
  }, [tour?._id]);

  const isBlockedDate = (date) => {
    return blockedDates.some(
      (blockedDate) =>
        date.getDate() === blockedDate.getDate() &&
        date.getMonth() === blockedDate.getMonth() &&
        date.getFullYear() === blockedDate.getFullYear()
    );
  };

  const isValidStartDate = (date) => {
    // Check if the date is blocked
    const isBlocked = blockedDates.some(
      (blockedDate) =>
        date.getDate() === blockedDate.getDate() &&
        date.getMonth() === blockedDate.getMonth() &&
        date.getFullYear() === blockedDate.getFullYear()
    );

    // If it's not blocked, it's a valid start date
    return !isBlocked;
  };

  const isValidEndDate = (date) => {
    if (!startDate) return true;

    // Check if the end date is after the start date
    if (date <= startDate) return false;

    // Check if there's any blocked date between start and end (exclusive)
    for (let d = new Date(startDate); d < date; d.setDate(d.getDate() + 1)) {
      if (isBlockedDate(d)) {
        return false;
      }
    }
    return true;
  };

  const openModal = () => {
    setIsModalOpen(true);
    setCurrentModalImage(0);
  };

  const changeModalImage = (index) => {
    setCurrentModalImage(index);
  };

  function calculateNights(startDate, endDate) {
    if (!startDate || !endDate) return 0;
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = Math.abs(end - start);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  }

  useEffect(() => {
    const baseMembers = tour?.members || 1;
    const basePrice = tour?.price || 0;
    const priceIncrease = tour?.priceIncrease || 1000;

    const nights = calculateNights(startDate, endDate);

    let totalPrice = basePrice * Math.max(1, nights); // Minimum 1 night

    if (members > baseMembers) {
      const extraMembers = members - baseMembers;
      totalPrice += extraMembers * priceIncrease * nights;
    }

    if (includeFood) {
      totalPrice += foodBasePrice * members * nights;
    }

    setValue("price", Math.ceil(totalPrice));
  }, [
    startDate,
    endDate,
    members,
    includeFood,
    setValue,
    tour?.price,
    tour?.members,
    tour?.priceIncrease,
    foodBasePrice,
  ]);

  const [
    addToCart,
    { isLoading: addToCartLoading, data: addToCartData, error: addToCartError },
  ] = useAddToCartMutation();

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % tour?.gallery?.length);
    }, 3000);

    return () => clearInterval(timer);
  }, [tour?.gallery]);

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
    dispatch(setBooking({ ...data, includeFood, updatedPrice: price }));
  }

  const handleFoodCheckboxChange = (event) => {
    setIncludeFood(event.target.checked);
  };

  function formatDate(date) {
    if (!date) return "";
    return new Date(date).toISOString();
  }

  useEffect(() => {
    const startDate = watch("duration.startDate");
    const endDate = watch("duration.endDate");

    if (startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);
      let saturdayFound = false;

      // Check each day in the range
      for (
        let day = new Date(start);
        day <= end;
        day.setDate(day.getDate() + 1)
      ) {
        if (day.getDay() === 6) {
          // 6 represents Saturday
          saturdayFound = true;
          break;
        }
      }

      setHasSaturday(saturdayFound);
      if (saturdayFound) {
        setIncludeFood(true);
        setFoodLabelText(
          "Food is compulsorily included as the stay includes a Saturday"
        );
      } else {
        setFoodLabelText("Check the box to include food");
      }
    } else {
      setHasSaturday(false);
      setFoodLabelText("Check the box to include food");
    }
  }, [watch("duration.startDate"), watch("duration.endDate")]);

  useEffect(() => {
    const startDate = watch("duration.startDate");
    const endDate = watch("duration.endDate");

    if (startDate && endDate && new Date(endDate) < new Date(startDate)) {
      setValue("duration.endDate", startDate);
    }
  }, [watch("duration.startDate"), watch("duration.endDate"), setValue]);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const hasGallery = tour?.gallery && tour.gallery.length > 0;

  if (!hasGallery) {
    return <div>No images available</div>;
  }

  const handleDownloadPDF = () => {
    const doc = new jsPDF();

    doc.setFontSize(20);
    doc.text(tour?.title || "Tour Details", 20, 20);

    // Basic details
    doc.setFontSize(12);
    doc.text(`Location: ${tour?.location || "N/A"}`, 20, 30);
    doc.text(`Price: ₹${tour?.price || "N/A"}`, 20, 40);
    doc.text(`Base Members: ${tour?.members || "N/A"}`, 20, 50);
    doc.text(
      `Additional Member Price: ₹${tour?.priceIncrease || "N/A"}`,
      20,
      60
    );

    doc.text("Important Information:", 20, 70);
    tour?.information?.forEach((info, index) => {
      const infoLines = doc.splitTextToSize(`• ${info}`, 170);
      doc.text(infoLines, 20, 80 + index * 10);
    });

    doc.addPage();
    doc.text("Amenities:", 20, 20);
    const amenities = [
      "WiFi Fibre",
      "Child friendly",
      "2 AC Bedrooms",
      "Gazebo for dining",
      "Television",
      "Music system",
      "24x7 Private Pool with filtration plant for clean water",
      "2 Separate clean Washrooms",
      "Spacious Balcony with Pool and Garden view",
      "Refrigerator",
      "Authentic Countryside Food",
      "Geysers for hot water",
      "Power backup up to 8 hours (only light, fan and charging point)",
      "Mineral water 💧",
      "Bonfire",
      "Free Parking",
      "Games - Cricket, Badminton, etc",
      "Separate kitchen",
    ];
    amenities.forEach((amenity, index) => {
      doc.text(`• ${amenity}`, 20, 30 + index * 10);
    });

    // Meal details
    doc.addPage();
    doc.text("Meal Details:", 20, 20);
    doc.setFontSize(10);
    doc.text("Veg (lunch & dinner):", 20, 30);
    doc.text("Time: 1:30 pm to 3 pm", 30, 40);
    doc.text("We provide lunch, dinner, breakfast and Tea", 30, 50);
    doc.text(
      "Menu: Daal, Paneer mutter/Mix veg/Palak paneer, Rice bhakari or Chapati, Rice, Salad, Papad, Pickle, Sweet",
      30,
      60
    );

    doc.text("Non veg (lunch & dinner):", 20, 80);
    doc.text("Time: 8:30 pm to 10 pm", 30, 90);
    doc.text(
      "Menu: Chicken (suka or rassa), Rice bhakari or Chapati, Rice, Salad, Papad, Pickle",
      30,
      100
    );

    doc.text("Breakfast (8.30 am to 10 am):", 20, 120);
    doc.text(
      "Any one for each person: Poha or upma, Misal paav, Burji paav, Tea",
      30,
      130
    );

    doc.text("Evening:", 20, 150);
    doc.text("Tea Biscuits + 2 Vada Pav", 30, 160);
    doc.save("tour_details.pdf");
  };

  const handleWhatsAppRedirect = () => {
    const phoneNumber = "919004992867";
    const message = encodeURIComponent(
      "Hello, I have a query about The 23 Villa."
    );
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, "_blank");
  };

  return (
    <>
      <div className="lg:col-span-5 md:col-span-6 col-span-12 flex flex-col md:gap-y-8 gap-y-4">
        <div className="flex justify-end mt-2">
          <button
            onClick={handleDownloadPDF}
            className="flex items-center text-xs bg-primary text-white px-3 py-1 rounded-md hover:bg-primary-dark transition-colors"
          >
            <FaDownload className="mr-2" />
            Download PDF
          </button>
        </div>
        <div className="mt-5 relative w-full h-60 overflow-hidden">
          {tour?.gallery?.map((thumbnail, index) => (
            <LoadImage
              key={index}
              src={thumbnail?.url}
              alt={thumbnail?.public_id}
              className={`absolute top-0 left-0 w-full object-cover transition-opacity duration-500 ${
                index === currentSlide ? "opacity-100" : "opacity-0"
              }`}
              width={680}
              height={384}
            />
          ))}
          <div className="absolute bottom-4 inset-x-0 flex justify-center items-center">
            {tour?.gallery?.map((_, index) => (
              <button
                key={index}
                className={`w-3 h-3 rounded-full mx-1 ${
                  index === currentSlide ? "bg-white" : "bg-gray-400"
                }`}
                onClick={() => setCurrentSlide(index)}
              />
            ))}
          </div>

          {/* Overlay button to show all photos */}
          <button
            className="absolute bottom-10 right-4 bg-white bg-opacity-80 text-black px-2 py-2 rounded-lg shadow-md hover:bg-opacity-100 transition-all duration-200"
            onClick={openModal}
          >
            See all {tour?.gallery?.length} photos
          </button>
        </div>

        {/* Modal for all photos */}
        {isModalOpen && (
          <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
            <div className="flex flex-col h-full">
              {/* Main image */}
              <div className="flex-grow overflow-hidden">
                <LoadImage
                  src={tour?.gallery[currentModalImage]?.url}
                  alt={tour?.gallery[currentModalImage]?.public_id}
                  className="w-full h-full object-contain"
                  width={1024}
                  height={768}
                />
              </div>

              {/* Thumbnails */}
              <div className="flex overflow-x-auto p-2 bg-gray-100">
                {tour?.gallery?.map((image, index) => (
                  <div
                    key={index}
                    className={`flex-shrink-0 w-20 h-20 mr-2 cursor-pointer ${
                      index === currentModalImage
                        ? "border-2 border-blue-500"
                        : ""
                    }`}
                    onClick={() => changeModalImage(index)}
                  >
                    <LoadImage
                      src={image?.url}
                      alt={image?.public_id}
                      className="w-full h-full object-cover"
                      width={80}
                      height={80}
                    />
                  </div>
                ))}
              </div>
            </div>
          </Modal>
        )}
        <div
          className="fixed bottom-28 right-5 bg-gray-600 text-white rounded-full w-12 h-12 flex justify-center items-center cursor-pointer shadow-lg hover:bg-blue-600 transition-colors duration-300 ease-in-out z-50"
          onClick={handleWhatsAppRedirect}
          title="Need help? Click to chat with us"
        >
          <div className="relative">
            <FaRegCommentAlt className="mt-1 w-8 h-8" />
            <FaQuestion className="absolute mt-1 top-1 right-2 w-4 h-4" />
          </div>
        </div>
        <Right />
        <label className="flex flex-col items-start gap-2">
          <h2 className="text-lg mb-2">Meal</h2>
          <div
            className={`mt-4 ${isExpanded ? "" : "max-h-40 overflow-hidden"}`}
          >
            <h3 className="text-md font-semibold">Veg (lunch & dinner) 🥦</h3>
            <p>Time: 1:30 pm to 3 pm</p>
            <p>We provide lunch, dinner, breakfast and Tea</p>
            <ul className="list-disc pl-5">
              <li>Daal</li>
              <li>
                Paneer mutter /Mix veg/Palak paneer (Any one for one group)
              </li>
              <li>Rice bhakari or Chapati</li>
              <li>Rice</li>
              <li>Salad</li>
              <li>Papad</li>
              <li>Pickle</li>
              <li>Sweet (2 gulab jamun)</li>
            </ul>

            <h3 className="text-md font-semibold mt-4">
              Non veg (lunch & dinner) 🐔
            </h3>
            <p>Time: 8:30 pm to 10 pm</p>
            <ul className="list-disc pl-5">
              <li>Chicken (suka or rassa)</li>
              <li>Rice bhakari or Chapati</li>
              <li>Rice</li>
              <li>Salad</li>
              <li>Papad</li>
              <li>Pickle</li>
            </ul>

            <h3 className="text-md font-semibold mt-4">
              Breakfast (8.30 am to 10 am)
            </h3>
            <p>Any one for each person from below👇👇👇</p>
            <ul className="list-disc pl-5">
              <li>Poha or upma (upto 2 plates)</li>
              <li>Misal paav (2 plates)</li>
              <li>Burji paav (2 eggs)</li>
              <li>Tea (1 cup)</li>
            </ul>

            <h3 className="text-md font-semibold mt-4">Evening</h3>
            <p>Tea Biscuits + 2 Vada Pav</p>
          </div>
          <button onClick={toggleExpand} className="text-blue-500 mt-2">
            {isExpanded ? "Read Less" : "Read More"}
          </button>
        </label>
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
            <div className="flex lg:flex-row flex-col justify-between gap-5">
              <h2 className="font-serif">Check In</h2>
              <Controller
                control={control}
                name="duration.startDate"
                rules={{
                  required: true,
                  validate: (date) => isValidStartDate(new Date(date)),
                }}
                render={({ field }) => (
                  <div>
                    <DatePicker
                      selected={startDate}
                      onChange={(date) => {
                        setStartDate(date);
                        setEndDate(null);
                        field.onChange(date);
                        setValue("duration.startDate", date);
                      }}
                      selectsStart
                      startDate={startDate}
                      endDate={endDate}
                      minDate={new Date()}
                      filterDate={isValidStartDate}
                      inline
                    />
                  </div>
                )}
              />
              <h2 className="font-serif">Check Out</h2>
              <Controller
                control={control}
                name="duration.endDate"
                rules={{
                  required: true,
                  validate: (date) => isValidEndDate(new Date(date)),
                }}
                render={({ field }) => (
                  <div>
                    <DatePicker
                      selected={endDate}
                      onChange={(date) => {
                        setEndDate(date);
                        field.onChange(date);
                        setValue("duration.endDate", date);
                      }}
                      selectsEnd
                      startDate={startDate}
                      endDate={endDate}
                      minDate={
                        startDate
                          ? new Date(startDate.getTime() + 86400000)
                          : null
                      }
                      filterDate={isValidEndDate}
                      inline
                      disabled={!startDate}
                    />
                  </div>
                )}
              />
              <div className="fixed bottom-0 left-0 right-0 bg-white z-50 p-4 shadow-md border-t border-gray-200">
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

            <div className="flex md:flex-row mt-2 flex-col justify-between gap-2">
              <Controller
                control={control}
                name="members"
                defaultValue={tour?.members || 1}
                render={({ field }) => (
                  <label
                    htmlFor="members"
                    className="flex flex-col gap-y-2 w-full"
                  >
                    <div className="flex flex-row gap-x-2 items-center">
                      <span className="h-7 w-7 rounded-secondary border-2 border-black flex justify-center items-center p-1.5">
                        <FiUsers className="w-6 h-6" />
                      </span>
                      <input
                        {...field}
                        type="number"
                        name="members"
                        id="members"
                        placeholder="Members"
                        className="rounded-secondary h-10 w-full flex-1"
                        defaultValue={field.value || tour?.members}
                        value={field.value}
                        min="1"
                        onChange={(e) =>
                          field.onChange(parseInt(e.target.value))
                        }
                      />
                    </div>
                    {field.value > tour?.members && (
                      <p className="text-xs text-orange-600 mt-1">
                        Base limit is {tour?.members} members. Additional
                        members will incur an extra charge of ₹
                        {tour?.priceIncrease} per person.
                      </p>
                    )}
                  </label>
                )}
              />
            </div>
          </form>
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={includeFood}
              onChange={handleFoodCheckboxChange}
              disabled={hasSaturday}
            />
            <span>{foodLabelText}</span>
          </div>
        </div>
      </div>

      {isOpen && (
        <Modal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          className="lg:w-1/4 md:w-1/3 w-full z-50"
        >
          <Checkout
            rent={tour}
            setIsOpen={setIsOpen}
            members={members}
            updatedPrice={price}
          />
        </Modal>
      )}
    </>
  );
};

function Checkout({ rent, setIsOpen, members, updatedPrice }) {
  const booking = useSelector((state) => state?.booking);
  const user = useSelector((state) => state?.auth);
  const [createPaymentIntent, { isLoading, data, error }] =
    useCreatePaymentIntentMutation();

  const [showSuccess, setShowSuccess] = useState(false);
  const [orderId, setOrderId] = useState(null);
  const [isRazorpayOpen, setIsRazorpayOpen] = useState(false);
  const totalPrice =
    booking.updatedPrice || updatedPrice || members * rent?.price;
  const { control } = useForm({
    defaultValues: {
      email: user?.email,
    },
  });

  useEffect(() => {
    if (isLoading) {
      toast.loading("Processing payment...", { id: "paymentIntent" });
    }

    if (data) {
      toast.success("Payment intent created", { id: "paymentIntent" });
      handleRazorpayPayment(data);
    }

    if (error?.data) {
      toast.error(error?.data?.message, { id: "paymentIntent" });
    }
  }, [data, error, isLoading]);

  function formatDate(date) {
    if (!date) return "";
    return new Date(date).toLocaleDateString();
  }

  function handleRazorpayPayment(paymentData) {
    setIsRazorpayOpen(true);
    const options = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
      amount: paymentData.amount,
      currency: paymentData.currency,
      name: "The 23 Villa",
      description: `Payment for ${rent?.title}`,
      order_id: paymentData.orderId,
      handler: function (response) {
        setIsRazorpayOpen(false);
        toast.success("Payment Successful");
        setShowSuccess(true);
        setOrderId(response.razorpay_order_id);
        setIsOpen(true);
        setIsOpen(true);
        sendConfirmationEmail({
          rent: rent?._id,
          price: rent?.price * members,
          members: members,
          duration: {
            startDate: formatDate(booking?.duration?.startDate),
            endDate: formatDate(booking?.duration?.endDate),
          },
          email: user?.email,
          orderId: response.razorpay_order_id,
          amount: paymentData.amount,
          currency: paymentData.currency,
        });
        updateBlockedDates(
          rent?._id,
          booking?.duration?.startDate,
          booking?.duration?.endDate
        );
      },
      modal: {
        ondismiss: function () {
          setIsRazorpayOpen(false);
        },
      },
      prefill: {
        name: user?.name,
        email: user?.email,
      },
      theme: {
        color: "#3399cc",
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  }

  async function updateBlockedDates(rentId, startDate, endDate) {
    try {
      const response = await fetch("/api/updateBlockedDates", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ rentId, startDate, endDate }),
      });

      const result = await response.json();
      if (response.ok) {
        console.log("Blocked dates updated successfully");
      } else {
        console.error("Failed to update blocked dates:", result.message);
      }
    } catch (error) {
      console.error("Error updating blocked dates:", error);
    }
  }

  async function sendConfirmationEmail(data) {
    try {
      const response = await fetch("/api/sendConfirmationEmail", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      if (result.success) {
        toast.success("Confirmation email sent successfully");
      } else {
        toast.error("Failed to send confirmation email");
      }
    } catch (error) {
      toast.error("Error sending confirmation email");
    }
  }

  function handlePaymentClick() {
    createPaymentIntent({
      rent: rent?._id,
      price: totalPrice,
      members: members,
      duration: booking?.duration,
      email: user?.email,
    });
  }

  if (showSuccess) {
    return (
      <div className="h-full w-full flex flex-col justify-center items-center gap-4">
        <Image
          src="/check.gif"
          alt="check"
          height={200}
          width={200}
          className=""
        />
        <h2 className="text-xl font-semibold">Payment Successful!</h2>
        <div className="text-center">
          <p className="font-medium">{rent?.title}</p>
          <p>
            Dates: {formatDate(booking?.duration?.startDate)} to{" "}
            {formatDate(booking?.duration?.endDate)}
          </p>
          <p>Members: {members}</p>
          <p>Total Amount: ₹{totalPrice}</p>
        </div>
        <code
          className="text-xs bg-slate-100 p-2 rounded text-center"
          onClick={() => navigator.clipboard.writeText(orderId)}
        >
          Order ID: {orderId}
        </code>
        <button
          type="button"
          className="py-2 px-4 text-primary bg-primary/10 border border-primary hover:bg-secondary rounded w-fit text-sm flex flex-row justify-center items-center"
          onClick={() => setIsOpen(false)}
        >
          Close
        </button>
      </div>
    );
  }

  return (
    <section className="flex flex-col gap-8">
      <article className="h-full w-full flex flex-col gap-y-4">
        <h1 className="text-xl font-semibold">{rent?.title}</h1>
        <div className="flex flex-col gap-y-2">
          <div className="flex -space-x-4">
            {rent?.gallery?.slice(0, 3).map((gallery) => (
              <LoadImage
                key={gallery?._id}
                src={gallery?.url}
                alt={gallery?.public_id}
                height={40}
                width={40}
                className="h-[40px] w-[40px] rounded-full border border-primary object-cover"
              />
            ))}
          </div>
          <p className="text-sm">{rent?.summary}</p>
          <div className="flex flex-wrap gap-2">
            <span className="text-xs py-0.5 px-2 bg-indigo-50 text-indigo-800 border border-indigo-500 rounded-full capitalize">
              {rent?.location}
            </span>
            <span className="text-xs py-0.5 px-2 bg-purple-50 text-purple-800 border border-purple-500 rounded-full capitalize">
              {rent?.owner?.name}
            </span>
          </div>
          <div className="flex justify-between text-sm">
            <span>
              Dates: {formatDate(booking?.duration?.startDate)} to{" "}
              {formatDate(booking?.duration?.endDate)}
            </span>
            <span>Members: {members}</span>
          </div>
        </div>
      </article>

      <div className="text-sm flex flex-col gap-y-2">
        <p className="flex justify-between items-center">
          <span>Base Price</span>
          <span>₹{rent?.price}</span>
        </p>
        <p className="flex justify-between items-center">
          <span>Number of Members</span>
          <span>{members}</span>
        </p>
        {updatedPrice > members * rent?.price && (
          <p className="flex justify-between items-center">
            <span>Additional Charges</span>
            <span>₹{updatedPrice - members * rent?.price}</span>
          </p>
        )}
        <hr />
        <p className="flex justify-between items-center font-semibold">
          <span>Total Cost</span>
          <span>₹{totalPrice}</span>
        </p>
      </div>

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

      <button
        type="button"
        onClick={handlePaymentClick}
        disabled={isLoading || isRazorpayOpen}
        className="py-2 text-white bg-primary hover:bg-primary-dark rounded w-full mt-2 text-sm flex justify-center items-center"
      >
        {isLoading || isRazorpayOpen ? (
          <AiOutlineLoading3Quarters className="animate-spin h-5 w-5 mr-2" />
        ) : null}
        Pay with Razorpay
      </button>
    </section>
  );
}
export default Left;
