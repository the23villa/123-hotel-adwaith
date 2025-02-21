import React from "react";
import Search from "../searchTrio/Search";
import Favorites from "../favorites/Favorites";
import MobileMenu from "../mobileMenu/MobileMenu";

const UserMenu = () => {
  return (
    <div>
      {/* For larger screens */}
      <div className="hidden sm:flex flex-row items-center gap-x-4">
        <Search />
        <Favorites />
        <MobileMenu />
      </div>

      {/* For smaller screens */}
      <div className="flex sm:hidden flex-row items-center gap-x-20">
        <div className="flex flex-col items-center text-gray-600">
          <Search />
          <span className="text-sm text-gray-500 font-serif">Search</span>
        </div>
        <div className="flex flex-col items-center text-gray-600">
          <Favorites />
          <span className="text-sm text-gray-500 font-serif">Wish</span>
        </div>
        <div className="flex flex-col items-center text-gray-600">
          <MobileMenu />
          <span className="text-sm text-gray-500 font-serif">Profile</span>
        </div>
      </div>
    </div>
  );
};

export default UserMenu;
