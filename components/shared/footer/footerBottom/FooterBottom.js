/**
 * Title: Write a program using JavaScript on FooterBottom
.
 * Date: 15, August 2023
 */

import React from "react";
import FooterSocial from "./FooterSocial";
import FooterCopyright from "./FooterCopyright";
import FooterCredit from "./FooterCredit";

const FooterBottom = () => {
  return (
    <section>
      <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4">
        <FooterSocial />
        <FooterCopyright />
      </div>
    </section>
  );
};

export default FooterBottom;
