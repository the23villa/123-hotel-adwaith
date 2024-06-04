/**
 * Title: Write a program using JavaScript on FooterCopyright
.
 * Date: 15, August 2023
 */

import React from "react";

const FooterCopyright = () => {
  return (
    <section>
      <p className="text-sm text-center">
        © {new Date().getFullYear()} All Right Reserved by <b>123 Hotel Booking</b>
      </p>
    </section>
  );
};

export default FooterCopyright;
