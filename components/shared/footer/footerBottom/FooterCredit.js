/**
 * Title: Write a program using JavaScript on FooterCredit
.
 * Date: 15, August 2023
 */

import Link from "next/link";
import React from "react";

const FooterCredit = () => {
  return (
    <section>
      <p className="text-sm lg:text-right md:text-left text-center">
        Team Members{" "}
        <Link
          href="https://www.linkedin.com/in/saifulislam"
          className="text-primary hover:text-primary/50"
        >
          @saifulislam
        </Link>{" "}
        &{" "}
        <Link
          href="https://www.devhasibulislam.vercel.app"
          className="text-primary hover:text-primary/50"
        >
          @devhasibulislam
        </Link>
      </p>
    </section>
  );
};

export default FooterCredit;
