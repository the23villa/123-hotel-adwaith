/**
 * Title: Write a program using JavaScript on TravelMenu
.
 * Date: 15, August 2023
 */

import React from "react";
import LargeDevice from "./LargeDevice";

const TravelMenu = () => {
  return (
    <section className="lg:block hidden">
      <LargeDevice />
    </section>
  );
};

export default TravelMenu;
