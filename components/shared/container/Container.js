/**
 * Title: Write a program using JavaScript on Container
.
 * Date: 15, August 2023
 */

import React from "react";

const Container = ({ children, className }) => {
  return (
    <section
      className={
        "max-w-7xl mx-auto px-primary" + (className ? ` ${className}` : "")
      }
    >
      {children}
    </section>
  );
};

export default Container;
