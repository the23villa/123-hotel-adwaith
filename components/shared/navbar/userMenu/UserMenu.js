/**
 * Title: Write a program using JavaScript on UserMenu
.
 * Date: 15, August 2023
 */

import React from "react";
import Search from "../searchTrio/Search";
import Cart from "../cart/Cart";
import Favorites from "../favorites/Favorites";
import MobileMenu from "../mobileMenu/MobileMenu";

const UserMenu = () => {
  return (
    <div className="flex flex-row items-center gap-x-4">
      <Search/>
      <Favorites />
      {/* <Cart /> */}
      <MobileMenu />
    </div>
  );
};

export default UserMenu;
