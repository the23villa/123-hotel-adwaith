/**
 * Title: Write a program using JavaScript on MobileMenu
.
 * Date: 15, August 2023
 */

// import Image from "next/image";
import React, { useState } from "react";
import MenuItems from "./MenuItems";
import LoadImage from "../../image/LoadImage";
import { useSelector } from "react-redux";
import { HiOutlineUser } from "react-icons/hi";
import Image from "next/image";

const MobileMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const user = useSelector((state) => state?.auth);

  return (
    <div className="relative">
      <button
        className="p-1.5 shadow rounded border-primary/15 border"
        onClick={() => setIsOpen(!isOpen)}
      >
        <Image
          src="/assets/home-page/icons/login.png"
          alt="Search"
          width={30}
          height={30}
        />
      </button>
      <MenuItems isOpen={isOpen} setIsOpen={setIsOpen} />
    </div>
  );
};

export default MobileMenu;
