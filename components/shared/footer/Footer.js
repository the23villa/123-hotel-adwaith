/**
 * Title: Write a program using JavaScript on Footer
.
 * Date: 15, August 2023
 */

import React from "react";
import FooterTop from "./footerTop/FooterTop";
import Container from "../container/Container";
import FooterBottom from "./footerBottom/FooterBottom";

const Footer = () => {
  return (
    <footer className="bg-black py-8">
      <Container>
        <div className="flex flex-col gap-y-8">
          <FooterTop />
          <hr className="border-primary" />
          <FooterBottom />
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
