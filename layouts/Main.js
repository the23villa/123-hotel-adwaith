/**
 * Title: Write a program using JavaScript on Main
.
 * Date: 15, August 2023
 */

import Footer from "@/components/shared/footer/Footer";
import Navbar from "@/components/shared/navbar/Navbar";
import React from "react";

const Main = ({ children }) => {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
};

export default Main;
