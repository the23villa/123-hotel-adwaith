import { useRouter } from "next/router";
import React from "react";
import { FaArrowLeft, FaPhone } from "react-icons/fa";
import LoadImage from "../image/LoadImage";

const BackIcon = () => {
  const router = useRouter();
  return (
    <div
      onClick={() => router.back()}
      style={{
        display: "flex",
        alignItems: "center",
        cursor: "pointer",
      }}
      className="cursor-pointer"
    >
      <FaArrowLeft size={15} />
      <span style={{ marginLeft: "10px" }}></span>
    </div>
  );
};

const Logo = () => {
  const router = useRouter();
  const isHomePage = router.pathname === "/";

  // Define your phone number
  const phoneNumber = "+1234567890";

  const callUsHandler = () => {
    window.location.href = `tel:${phoneNumber}`;
  };

  return (
    <div className="flex items-center justify-between w-full">
      {isHomePage ? (
        <>
          <div className="flex items-center">
            <LoadImage
              src="/assets/logo2.png"
              alt="logo"
              title="logo"
              width={80}
              height={80}
              style={{
                maxWidth: "100%",
                height: "auto",
              }}
              className="cursor-pointer object-center max-w-full"
            />
            <div className="flex flex-col">
              <span className="text-xl font-bold text-gray-500">
                The 23 Villa
              </span>
            </div>
          </div>
          {/* Call Us button */}
          <button
            className="flex items-center bg-transparent mr-4 border-none text-gray-700"
            onClick={callUsHandler}
          >
            <FaPhone className="mr-1" />
            Call Us
          </button>
        </>
      ) : (
        <BackIcon />
      )}
    </div>
  );
};

export default Logo;
